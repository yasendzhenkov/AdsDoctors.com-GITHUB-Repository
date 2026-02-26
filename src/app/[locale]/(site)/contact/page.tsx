import type { Locale } from "@/lib/i18n";
import { ContactForm } from "@/components/forms/ContactForm";

type Props = {
  params: { locale: Locale };
};

export default function ContactPage({ params }: Props) {
  return <ContactForm locale={params.locale} />;
}

