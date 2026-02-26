import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

type Props = {
  params: { locale: Locale };
};

export default function CaseStudyThankYou({ params }: Props) {
  const dict = getDictionary(params.locale);
  const copy = dict.thankYou.caseStudy;

  return (
    <div className="space-y-6">
      <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
        {copy.title}
      </h1>
      <p className="max-w-xl text-sm text-black/70 md:text-base">
        {copy.body}
      </p>
      <Link href={`/${params.locale}`} className="btn-primary text-xs">
        {dict.misc.backToHome}
      </Link>
    </div>
  );
}

