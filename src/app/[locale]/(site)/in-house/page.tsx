"use client";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function InHousePage() {
  const params = useParams<{ locale: Locale }>();
  const locale = (params.locale ?? "en") as Locale;
  const dict = getDictionary(locale);
  const content = dict.salesPages.inHouse;
  const caseStudies = dict.caseStudies.filter((c) => c.niche === "in-house");

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="space-y-5">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-[0.22em] text-black/60"
        >
          In‑House Team (Enterprise)
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="heading-hover text-2xl font-semibold md:text-3xl"
        >
          {content.heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto max-w-2xl text-sm text-black/70 md:text-base"
        >
          {content.heroSubtitle}
        </motion.p>
        <div className="flex justify-center">
          <a href="#apply" className="btn-primary text-xs">
            {dict.cta.applyNow}
          </a>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        {content.sections.map((section, index) => (
          <motion.article
            key={section.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.06 * index }}
            className="space-y-3 rounded-2xl border border-black/10 bg-black/80 p-5 text-left text-white"
          >
            <h2 className="heading-hover text-base font-semibold">
              {section.title}
            </h2>
            <p className="text-xs leading-relaxed text-white/90">
              {section.body}
            </p>
            <div>
              <a href="#apply" className="btn-outline-dark text-xs">
                {dict.cta.applyNow}
              </a>
            </div>
          </motion.article>
        ))}
      </section>

      {caseStudies.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="heading-hover text-lg font-semibold">
              In‑house team case studies
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {caseStudies.map((cs, index) => (
              <motion.article
                key={cs.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.05 * index }}
                className="space-y-3 rounded-2xl border border-black/10 bg-black/80 p-4 text-left text-white"
              >
                <h3 className="heading-hover text-sm font-semibold md:text-base">
                  {cs.title}
                </h3>
                <p className="text-xs text-white/70">{cs.summary}</p>
                <ul className="space-y-1 text-xs text-white/70">
                  {cs.outcomes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/case-studies/in-house/${cs.slug}`}
                  className="btn-outline text-xs"
                >
                  {dict.cta.requestCaseStudy}
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      <ApplicationForm locale={locale} sourcePage="in-house" />
    </div>
  );
}

