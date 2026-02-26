import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const locales = ["en", "bg"] as const;
const defaultLocale = "en";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow Next internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Allow NextAuth API routes without locale handling
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Protect /admin and /studio with NextAuth (credentials)
  if (pathname.startsWith("/admin") || pathname.startsWith("/studio")) {
    const token = await getToken({
      // NextAuth expects a Node request, but the edge request is compatible for our usage here.
      req: request as unknown as Request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const isLoginRoute = pathname.startsWith("/admin/login");

    if (!token && !isLoginRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Locale handling for all other routes
  const segments = pathname.split("/");
  const firstSegment = segments[1];

  if (locales.includes(firstSegment as (typeof locales)[number])) {
    return NextResponse.next();
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0];
  const locale = locales.includes(preferred as (typeof locales)[number])
    ? preferred
    : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

