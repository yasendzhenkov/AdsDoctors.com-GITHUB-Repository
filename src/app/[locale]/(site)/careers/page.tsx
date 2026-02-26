import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

type Props = {
  params: { locale: Locale };
};

export default function CareersPage({ params }: Props) {
  const dict = getDictionary(params.locale);

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="space-y-4">
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          {dict.footer.careers}
        </h1>
        <p className="max-w-2xl text-sm text-black/70 md:text-base">
          We occasionally add senior specialists in performance marketing,
          lifecycle, analytics and creative direction who are comfortable
          working closely with owners and CEOs.
        </p>
        <p className="max-w-2xl text-sm text-black/70 md:text-base">
          If you have a track record with clinics or other high‑trust
          services, you can send a short note and relevant work examples.
        </p>
        <div>
          <Link href={`/${params.locale}/contact`} className="btn-primary text-xs">
            {dict.cta.contactUs}
          </Link>
        </div>
      </section>
    </div>
  );
}

