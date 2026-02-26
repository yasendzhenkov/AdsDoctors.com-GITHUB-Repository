import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: { locale: Locale };
};

export default function PrivacyPage({ params }: Props) {
  const dict = getDictionary(params.locale);

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="space-y-4">
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          {dict.footer.privacy}
        </h1>
        <p className="text-sm text-black/70 md:text-base">
          This is a short, human‑readable summary. For legal detail, adapt this
          page with your legal counsel.
        </p>
        <p className="text-sm text-black/70 md:text-base">
          We collect contact details and context from the forms on this site
          solely to respond to your enquiry or application. We do not sell or
          rent your data. Access is limited to the Ads Doctors team and trusted
          infrastructure providers.
        </p>
        <p className="text-sm text-black/70 md:text-base">
          You can request deletion or export of your data at any time by
          contacting us via the contact form, using the email address you used
          when applying.
        </p>
      </section>
    </div>
  );
}

