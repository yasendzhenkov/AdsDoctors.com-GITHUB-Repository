"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function LocaleHome() {
  const params = useParams<{ locale: Locale }>();
  const locale = (params.locale ?? "en") as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-[0.22em] text-black/60"
        >
          {dict.brand.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="heading-hover text-3xl font-semibold leading-tight md:text-4xl"
        >
          {dict.homepage.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-2xl text-sm leading-relaxed text-black/70 md:text-base"
        >
          {dict.homepage.subtitle}
        </motion.p>
        <div className="flex justify-center">
          <a href="#tiles" className="btn-primary text-xs">
            {dict.cta.applyNow}
          </a>
        </div>
      </section>

      <section id="tiles" className="grid gap-4 md:grid-cols-2">
        {dict.homepage.tiles.map((tile, index) => (
          <motion.div
            key={tile.key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.04 * index }}
          >
            <Link href={tile.href} className="block card-3d p-[1px]">
              <div className="flex h-full flex-col justify-between rounded-[0.95rem] bg-black/90 px-5 py-5 text-left text-white md:px-6 md:py-6">
                <div className="space-y-3">
                  <h2 className="heading-hover text-base font-semibold md:text-lg">
                    {tile.title}
                  </h2>
                  <p className="text-xs leading-relaxed text-white/80 md:text-sm">
                    {tile.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-white/80">
                  <span>{dict.cta.viewDetails}</span>
                  <span className="text-primary">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

