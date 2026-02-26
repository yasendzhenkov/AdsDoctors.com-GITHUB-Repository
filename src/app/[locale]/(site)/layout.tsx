import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export default function SiteLayout({ children, params }: Props) {
  const dict = getDictionary(params.locale);

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Header
        locale={params.locale}
        labels={{ brand: dict.brand.name, nav: dict.nav }}
      />
      <main className="flex-1">
        <div className="grid-page">{children}</div>
      </main>
      <Footer locale={params.locale} labels={dict.footer} />
    </div>
  );
}

