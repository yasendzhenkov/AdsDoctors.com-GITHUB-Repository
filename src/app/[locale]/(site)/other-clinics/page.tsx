import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

type Props = {
  params: { locale: Locale };
};

export default function OtherClinicsPage({ params }: Props) {
  const dict = getDictionary(params.locale);

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="space-y-4">
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          {dict.footer.otherClinics}
        </h1>
        <p className="max-w-2xl text-sm text-black/70 md:text-base">
          We also work with selected ophthalmology, dermatology, cardiology and
          multi‑disciplinary clinics where the same trust and ticket size
          dynamics apply. If you do not fit neatly into “dental” or “plastic”
          but recognise the way we work, we are open to a focused conversation.
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

