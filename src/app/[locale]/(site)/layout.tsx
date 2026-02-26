import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function SiteLayout({ children, params }: Props) {
  const { locale } = await params;
  const typedLocale = (locale === "bg" ? "bg" : "en") as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Header
        locale={typedLocale}
        labels={{ brand: dict.brand.name, nav: dict.nav }}
      />
      <main className="flex-1">
        <div className="grid-page">{children}</div>
      </main>
      <Footer locale={typedLocale} labels={dict.footer} />
    </div>
  );
}

