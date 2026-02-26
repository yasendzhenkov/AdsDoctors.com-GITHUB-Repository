"use client";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function GuidesIndex() {
  const params = useParams<{ locale: Locale }>();
  const locale = (params.locale ?? "en") as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-black/60">
          Guides & Tutorials
        </p>
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          {dict.guides.introTitle}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-black/70 md:text-base">
          {dict.guides.introBody}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {dict.guides.items.map((guide, index) => (
          <motion.article
            key={guide.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.05 * index }}
            className="space-y-3 rounded-2xl border border-black/10 bg-black/80 p-5 text-left text-white"
          >
            <h2 className="heading-hover text-sm font-semibold md:text-base">
              {guide.title}
            </h2>
            <p className="text-xs text-white/90">{guide.summary}</p>
            <Link
              href={`/${locale}/guides/${guide.slug}`}
              className="btn-outline-dark text-xs"
            >
              {dict.cta.viewDetails}
            </Link>
          </motion.article>
        ))}
      </section>
    </div>
  );
}

