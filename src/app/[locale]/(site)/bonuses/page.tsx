"use client";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function BonusesPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = (params.locale ?? "en") as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-black/60">
          Bonuses & Products
        </p>
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          Curated systems and communication assets for clinics.
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-black/70 md:text-base">
          Each product is designed to plug directly into your existing patient
          journey and team structure, with clear instructions, templates and
          examples.
        </p>
        <div className="flex justify-center">
          <a href="#products" className="btn-primary text-xs">
            {dict.cta.applyNow}
          </a>
        </div>
      </section>

      <section id="products" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {dict.products.map((product, index) => (
          <motion.article
            key={product.slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.04 * index }}
            className="relative"
          >
            <Link
              href={`/${locale}/bonuses/${product.slug}`}
              className="block card-3d p-[1px]"
            >
              <div className="flex h-full flex-col justify-between rounded-[0.95rem] bg-black/85 p-5 text-left text-white md:p-6">
                <div className="space-y-3">
                  <h2 className="heading-hover text-sm font-semibold md:text-base">
                    {product.name}
                  </h2>
                  <p className="text-xs text-white/80">
                    {product.niche === "dental"
                      ? "Optimised for dental clinics."
                      : product.niche === "plastic"
                      ? "Optimised for plastic surgery clinics."
                      : "Works across dental and aesthetic clinics."}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between text-xs text-white/90">
                  <span>{product.price}</span>
                  <span className="text-primary">{dict.misc.buyNow} →</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </section>
    </div>
  );
}

