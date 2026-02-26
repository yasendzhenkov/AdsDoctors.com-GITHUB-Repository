"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname() || "/";

  const segments = pathname.split("/");
  const hasLocalePrefix = segments[1] === "en" || segments[1] === "bg";
  const restPath = hasLocalePrefix
    ? "/" + segments.slice(2).join("/")
    : pathname;

  const buildHref = (target: Locale) => {
    if (restPath === "/" || restPath === "") {
      return `/${target}`;
    }
    return `/${target}${restPath}`;
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/20 px-1 py-0.5 text-xs">
      {(["en", "bg"] as Locale[]).map((code) => {
        const isActive = code === locale;
        return (
          <Link
            key={code}
            href={buildHref(code)}
            className={`px-2 py-0.5 rounded-full transition ${
              isActive
                ? "bg-white text-primary"
                : "text-white/70 hover:text-white"
            }`}
            aria-label={`Switch language to ${code.toUpperCase()}`}
          >
            {code.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

