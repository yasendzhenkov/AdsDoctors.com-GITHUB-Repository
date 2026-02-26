"use client";

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { useParams } from "next/navigation";

type Props = {
  locale: Locale;
  labels: {
    brand: string;
    nav: {
      dental: string;
      plastic: string;
      inHouse: string;
      bonuses: string;
      guides: string;
      contact: string;
    };
  };
};

export function Header({ locale: initialLocale, labels }: Props) {
  const params = useParams<{ locale?: Locale }>();
  const locale = (params.locale ?? initialLocale ?? "en") as Locale;

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-black text-white backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-white">
          <span className="text-sm font-semibold tracking-[0.22em] uppercase">
            Ads Doctors
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-4 overflow-x-auto py-1 text-xs font-medium text-white md:gap-6 md:py-0" aria-label="Main navigation">
          <Link href={`/${locale}/dental`} className="shrink-0 hover:text-white/90">{labels.nav.dental}</Link>
          <Link href={`/${locale}/plastic`} className="shrink-0 hover:text-white/90">{labels.nav.plastic}</Link>
          <Link href={`/${locale}/in-house`} className="shrink-0 hover:text-white/90">{labels.nav.inHouse}</Link>
          <Link href={`/${locale}/bonuses`} className="shrink-0 hover:text-white/90">{labels.nav.bonuses}</Link>
          <Link href={`/${locale}/guides`} className="shrink-0 hover:text-white/90">{labels.nav.guides}</Link>
          <Link href={`/${locale}/contact`} className="shrink-0 hover:text-white/90">{labels.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-3 text-white">
          <Link
            href={`/${locale}/contact`}
            className="hidden text-xs font-medium text-white hover:text-white/90 md:inline-flex"
          >
            {labels.nav.contact}
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}

