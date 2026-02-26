import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

type Props = {
  params: { locale: Locale; slug: string };
};

export default function GuidePage({ params }: Props) {
  const dict = getDictionary(params.locale);
  const guide = dict.guides.items.find((g) => g.slug === params.slug);

  if (!guide) {
    return (
      <div className="space-y-4">
        <h1 className="heading-hover text-2xl font-semibold">
          Guide not found
        </h1>
        <p className="text-sm text-black/70">
          <Link href={`/${params.locale}/guides`} className="underline">
            Back to all guides
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-black/60">
          Guide
        </p>
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          {guide.title}
        </h1>
        <p className="max-w-2xl text-sm text-black/70 md:text-base">
          {guide.summary}
        </p>
      </section>

      <section className="space-y-4 text-sm leading-relaxed text-black/75 md:text-base">
        <p>
          This guide is intentionally short. It is meant to help you make one
          or two concrete decisions about how you structure your growth work,
          not to add another 40‑page PDF to your backlog.
        </p>
        <p>
          Start by mapping what is already working inside your clinic. Then use
          a simple weekly rhythm – one core experiment, one content asset, one
          process improvement – and keep that rhythm consistent for several
          months.
        </p>
        <p>
          If you want a deeper, custom version of this for your clinic, the
          next step is usually an application call where we look at your data
          and team in detail.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-black/10 bg-black/80 p-5 text-white md:p-6">
        <h2 className="heading-hover text-base font-semibold">
          Light next step.
        </h2>
        <p className="text-sm text-white/90">
          If this topic is timely for you, share the guide with your leadership
          team and then decide whether an application or a short contact note
          is the right next move.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${params.locale}/dental#apply`}
            className="btn-outline-dark text-xs"
          >
            {dict.cta.applyNow}
          </Link>
          <Link
            href={`/${params.locale}/contact`}
            className="btn-primary text-xs"
          >
            {dict.cta.contactUs}
          </Link>
        </div>
      </section>
    </div>
  );
}

