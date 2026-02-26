import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  labels: {
    otherClinics: string;
    about: string;
    careers: string;
    privacy: string;
    terms: string;
    bonuses: string;
    login?: string;
  };
};

export function Footer({ locale, labels }: Props) {
  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-6 text-center text-xs md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 md:flex-1 md:justify-center md:gap-8">
          <Link
            href={`/${locale}/other-clinics`}
            className="text-white/80 hover:text-white"
          >
            {labels.otherClinics}
          </Link>
          <Link href={`/${locale}/about`} className="text-white/80 hover:text-white">
            {labels.about}
          </Link>
          <Link href={`/${locale}/careers`} className="text-white/80 hover:text-white">
            {labels.careers}
          </Link>
          <Link href={`/${locale}/privacy`} className="text-white/80 hover:text-white">
            {labels.privacy}
          </Link>
          <Link href={`/${locale}/terms`} className="text-white/80 hover:text-white">
            {labels.terms}
          </Link>
          <Link href={`/${locale}/bonuses`} className="text-white/80 hover:text-white">
            {labels.bonuses}
          </Link>
          <Link href="/admin" className="text-white/80 hover:text-white">
            {labels.login ?? "Вход"}
          </Link>
        </div>
        <div className="shrink-0 text-white/60">
          © {new Date().getFullYear()} Ads Doctors
        </div>
      </div>
    </footer>
  );
}

