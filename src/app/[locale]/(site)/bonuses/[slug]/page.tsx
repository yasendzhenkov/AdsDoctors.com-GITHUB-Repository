"use client";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const SECTIONS = [
  "what",
  "who",
  "promise",
  "included",
  "format",
  "faq",
] as const;

export default function ProductPage() {
  const params = useParams<{ locale: Locale; slug: string }>();
  const locale = (params.locale ?? "en") as Locale;
  const slug = params.slug ?? "";
  const dict = getDictionary(locale);
  const product = dict.products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="space-y-4">
        <h1 className="heading-hover text-2xl font-semibold">
          Product not found
        </h1>
        <p className="text-sm text-black/70">
          This product is not available.{" "}
          <Link href={`/${locale}/bonuses`} className="underline">
            Back to bonuses
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="grid gap-6 md:grid-cols-[minmax(0,3fr),minmax(0,2fr)] md:items-start">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-black/60">
            Product
          </p>
          <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
            {product.name}
          </h1>
          <p className="text-sm text-black/70 md:text-base">
            A focused, implementation‑ready system built specifically for clinic
            teams. You get the frameworks, scripts and examples we use inside
            engagements, without a long‑term retainer.
          </p>
        </div>
        <div className="space-y-4 rounded-2xl border border-black/10 bg-black/80 p-5 text-left text-white md:p-6">
          <div className="space-y-1">
            <p className="text-xs text-white/80">Investment</p>
            <p className="text-xl font-semibold">{product.price}</p>
          </div>
          <p className="text-xs text-white/80">
            One‑time purchase. Lifetime access for your clinic team.
          </p>
          <button
            type="button"
            className="btn-primary w-full text-xs"
            onClick={() => {
              window.location.href = `/contact?subject=${encodeURIComponent(
                `buy-product:${product.slug}`
              )}`;
            }}
          >
            {dict.misc.buyNow}
          </button>
          <p className="text-[11px] text-white/70">
            Checkout is currently handled manually. We will confirm details and
            issue an invoice.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        {SECTIONS.map((key, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.05 * index }}
            className="space-y-2 rounded-2xl border border-black/10 bg-black/80 p-5 text-white md:p-6"
          >
            <h2 className="heading-hover text-base font-semibold capitalize">
              {key === "what"
                ? "What it is"
                : key === "who"
                ? "Who it’s for"
                : key === "promise"
                ? "Promise"
                : key === "included"
                ? "What’s included"
                : key === "format"
                ? "Delivery format"
                : "FAQ"}
            </h2>
            <p className="text-xs leading-relaxed text-white/90 md:text-sm">
              {key === "what" &&
                "A structured, step‑by‑step system with concrete templates, scripts and examples. You can implement it in days, not months."}
              {key === "who" &&
                "Clinic owners, managing partners and marketing leads who want more structure, without adding a full agency engagement."}
              {key === "promise" &&
                "If you implement the materials as described, your team will have a measurable, higher quality flow of consultations and a calmer, clearer execution rhythm."}
              {key === "included" &&
                "Core playbook, worksheets, example assets, recommended tech stack and rollout checklist. All files are provided in editable formats."}
              {key === "format" &&
                "Digital delivery. You receive secure access links for your team, plus optional implementation call add‑ons if you prefer a guided rollout."}
              {key === "faq" &&
                "If you have questions before purchasing or want to combine several products for your group, contact us and we will suggest a configuration."}
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

