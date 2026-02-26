import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: { locale: Locale };
};

export default function AboutPage({ params }: Props) {
  const dict = getDictionary(params.locale);

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="space-y-4">
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          {dict.footer.about}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-black/70 md:text-base">
          Ads Doctors is a specialised marketing partner for clinics. We limit
          the number of clients we work with at any time and build deep,
          operational relationships with owners and management teams.
        </p>
        <p className="mx-auto max-w-2xl text-sm text-black/70 md:text-base">
          Our team combines performance marketing, operations and creative
          direction backgrounds. The common thread is a calm, numbers‑first way
          of working and respect for the realities of clinical work.
        </p>
      </section>
    </div>
  );
}

