import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: { locale: Locale };
};

export default function TermsPage({ params }: Props) {
  const dict = getDictionary(params.locale);

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="space-y-4">
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          {dict.footer.terms}
        </h1>
        <p className="text-sm text-black/70 md:text-base">
          This site is informational. Nothing here constitutes medical, legal
          or financial advice. Any collaboration is governed by a separate
          written agreement between your clinic and Ads Doctors.
        </p>
        <p className="text-sm text-black/70 md:text-base">
          We reserve the right to decline applications where we see a conflict
          of interest or a misalignment in ways of working, even if there is
          available capacity.
        </p>
      </section>
    </div>
  );
}

