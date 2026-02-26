"use client";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { sanityClient } from "@/lib/sanityClient";

export default function DentalPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = (params.locale ?? "en") as Locale;
  const dict = getDictionary(locale);

  if (locale === "bg") {
    return <DentalPageBg locale={locale} />;
  }

  return <DentalPageEn locale={locale} dictLocale={dict.locale} />;
}

type DentalPageVariantProps = {
  locale: Locale;
  dictLocale: Locale;
};

function DentalPageEn({ locale }: DentalPageVariantProps) {
  const dict = getDictionary(locale);
  const content = dict.salesPages.dental;
  const caseStudies = dict.caseStudies.filter((c) => c.niche === "dental");

  const scrollToApply = useCallback(() => {
    const el = document.getElementById("apply");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="space-y-5">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-[0.22em] text-white/60"
        >
          Dental Marketing
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
          <button
            type="button"
            onClick={scrollToApply}
            className="btn-primary text-xs"
          >
            {dict.cta.applyNow}
          </button>
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
              <button
                type="button"
                onClick={scrollToApply}
                className="btn-outline-dark text-xs"
              >
                {dict.cta.applyNow}
              </button>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="heading-hover text-lg font-semibold">
            Dental case studies
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
              <p className="text-xs text-white/90">{cs.summary}</p>
              <ul className="space-y-1 text-xs text-white/90">
                {cs.outcomes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <Link
                href={`/${locale}/case-studies/dental/${cs.slug}`}
                className="btn-outline-dark text-xs"
              >
                {dict.cta.requestCaseStudy}
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <ApplicationForm locale={locale} sourcePage="dental" />
    </div>
  );
}

type DentalBgProps = {
  locale: Locale;
};

type CmsSection = {
  _type?: string;
  // hero
  rotatingWords?: string[];
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  // faq
  items?: { question?: string; answer?: string }[];
};

type CmsPage = {
  sections?: CmsSection[];
};

function DentalPageBg({ locale }: DentalBgProps) {
  const [cmsPage, setCmsPage] = useState<CmsPage | null>(null);
  const dict = getDictionary(locale);
  const caseStudies = dict.caseStudies.filter((c) => c.niche === "dental");

  const scrollToApply = useCallback(() => {
    const el = document.getElementById("apply");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Fetch dental page content for BG from Sanity
    sanityClient
      .fetch<CmsPage>(
        `*[_type == "page" && pageType == "dentalMarketing" && locale == $locale][0]{sections}`,
        { locale: "bg" }
      )
      .then((data) => {
        if (data) {
          setCmsPage(data);
        }
      })
      .catch(() => {
        // Fail silently and keep fallback copy
      });

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const [openModule, setOpenModule] = useState<1 | 2 | 3>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleModule = (module: 1 | 2 | 3) => {
    setOpenModule((prev) => (prev === module ? module : module));
  };

  const cmsHero =
    cmsPage?.sections?.find((section) => section._type === "heroSection") ??
    undefined;

  const cmsFaq =
    cmsPage?.sections?.find((section) => section._type === "faqSection") ??
    undefined;

  const rotatingPhrases =
    cmsHero?.rotatingWords && cmsHero.rotatingWords.length > 0
      ? cmsHero.rotatingWords
      : ["Запълнете графика", "Утвърдете бранда", "Увеличете печалбите"];

  const faqItems =
    cmsFaq?.items && cmsFaq.items.length > 0
      ? cmsFaq.items.map((item) => ({
          question: item.question ?? "",
          answer: item.answer ?? "",
        }))
      : [
          {
            question: "Колко време отнема да се внедри системата?",
            answer:
              "Обикновено стартът е в рамките на първите седмици, след което системата се оптимизира и мащабира месец след месец.",
          },
          {
            question: "Как измервате резултатите?",
            answer:
              "Чрез интегрирани tracking инструменти и ясни конверсионни пътища, така че да знаем кое носи реални запитвания.",
          },
          {
            question: "Трябва ли екипът да участва?",
            answer:
              "Да — най-вече за съдържанието и процеса по приемане на запитванията. Ние даваме структура и процеси.",
          },
        ];

  return (
    <div className="space-y-10 md:space-y-12">
      {/* HERO */}
      <section className="space-y-6">
        <div className="space-y-3">
          <div className="text-3xl font-semibold md:text-4xl lg:text-5xl">
            <div className="flex flex-col items-center gap-1">
              <div className="relative inline-flex min-h-[1.5em] items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="heading-hover"
                  >
                    {rotatingPhrases[activeIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="heading-hover text-3xl md:text-4xl lg:text-5xl">
                {cmsHero?.headline ?? "на денталната ви клиника."}
              </span>
            </div>
          </div>
          <p className="mx-auto max-w-xl text-center text-sm text-black/70 md:text-base">
            {cmsHero?.subheadline ??
              "постоянно, предвидимо и с контрол върху резултатите."}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={scrollToApply}
            className="btn-primary text-xs"
          >
            {cmsHero?.ctaLabel ?? "Кандидатствайте"}
          </button>
        </div>
      </section>

      {/* Problem */}
      <section className="space-y-4">
        <h2 className="heading-hover text-lg font-semibold">
          Защо това има значение
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-black/75 md:text-base">
          В повечето дентални клиники маркетингът „се случва“ — но не се
          управлява като <strong>система</strong>. И това води до един и същ цикъл: силни месеци
          → спад → паника → единични кампании → пак спад.
        </p>
        <p className="mx-auto max-w-2xl text-sm text-black/75 md:text-base">
          Най-честите последствия от липсата на структурирана система:
        </p>
        <ul className="space-y-1 text-sm text-black/75">
          <li>• <strong>Непредвидим</strong> поток от нови пациенти (добри периоди, после тишина)</li>
          <li>• Зависимост от препоръки, сезонност и “късмет”</li>
          <li>
            • Разпиляване на бюджет (кампании без ясно измерване и оптимизация)
          </li>
          <li>
            • Трафик има, но <strong>конверсии</strong> няма (запитванията не се превръщат в
            записани часове)
          </li>
        </ul>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={scrollToApply}
            className="btn-outline text-xs"
          >
            Кандидатствайте
          </button>
        </div>
      </section>

      {/* Solution */}
      <section className="space-y-4">
        <h2 className="heading-hover text-lg font-semibold">
          Какво е решението
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-black/75 md:text-base">
          Ние изграждаме и управляваме <strong>операционна маркетингова система</strong> за
          дентални клиники.
        </p>
        <p className="mx-auto max-w-2xl text-sm text-black/75 md:text-base">
          Не „пускаме реклами“. Не правим единични кампании, които работят,
          докато изразходят топлите хора.
        </p>
        <p className="mx-auto max-w-2xl text-sm text-black/75 md:text-base">
          Целта е една: да достигаме <strong>постоянно</strong> до нови пациенти, да изграждаме
          доверие и да конвертираме предвидимо — месец след месец.
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={scrollToApply}
            className="btn-outline text-xs"
          >
            Кандидатствайте
          </button>
        </div>
      </section>

      {/* Three modules accordion */}
      <section className="space-y-4">
        <h2 className="heading-hover text-lg font-semibold">
          Как работи системата (3 модула)
        </h2>
        <div className="space-y-3">
          <ModuleCard
            index={1}
            open={openModule === 1}
            onToggle={() => toggleModule(1)}
            title="I. Социални мрежи и органично съдържание"
            subtitle="(Създаване на търсене и доверие)"
          >
            <p className="text-sm text-white">
              Какво правим:
            </p>
            <ul className="space-y-1 text-sm text-white">
              <li>
                • Стратегия за съдържание, която превръща клиниката в
                разпознаваем авторитет
              </li>
              <li>
                • Видео и постове за Instagram / Facebook / TikTok / YouTube
                Shorts
              </li>
              <li>
                • Баланс между образование (експертиза) и внимание (задържане)
              </li>
            </ul>
            <p className="pt-2 text-sm text-white">Резултат:</p>
            <ul className="space-y-1 text-sm text-white">
              <li>• Хората започват да ви разпознават</li>
              <li>• Влизат в сайта</li>
              <li>• Пишат / обаждат се, когато имат нужда</li>
            </ul>
            <div className="pt-3">
              <button
                type="button"
                onClick={scrollToApply}
                className="btn-outline-dark text-xs"
              >
                Кандидатствайте
              </button>
            </div>
          </ModuleCard>

          <ModuleCard
            index={2}
            open={openModule === 2}
            onToggle={() => toggleModule(2)}
            title="II. Платена реклама (Meta + Google)"
            subtitle="(Ускоряване и мащабиране)"
          >
            <p className="text-sm text-white">Meta (Facebook/Instagram):</p>
            <ul className="space-y-1 text-sm text-white">
              <li>• Кампании с ясни оферти и структури</li>
              <li>• Рекламата стъпва върху органичното съдържание</li>
              <li>
                • Конвертира “затоплената” аудитория и привлича нова
              </li>
            </ul>
            <p className="pt-2 text-sm text-white">Google Search:</p>
            <ul className="space-y-1 text-sm text-white">
              <li>• Улавяме хора, които вече търсят решение</li>
              <li>• Конвертираме трафика директно в запитвания</li>
            </ul>
            <p className="pt-2 text-sm text-white">Резултат:</p>
            <ul className="space-y-1 text-sm text-white">
              <li>• Предвидим поток от обаждания и заявки</li>
              <li>• Контрол върху обем и качество</li>
            </ul>
            <div className="pt-3">
              <button
                type="button"
                onClick={scrollToApply}
                className="btn-outline-dark text-xs"
              >
                Кандидатствайте
              </button>
            </div>
          </ModuleCard>

          <ModuleCard
            index={3}
            open={openModule === 3}
            onToggle={() => toggleModule(3)}
            title="III. Система за конвертиране и управление на пациентския поток"
            subtitle="(гръбнакът на системата)"
          >
            <p className="text-sm text-white">
              Това е причината системата да е предвидима.
            </p>
            <p className="pt-1 text-sm text-white">Какво включва:</p>
            <ul className="space-y-1 text-sm text-white">
              <li>
                • Уебсайт като център за конверсии (страници за ключови услуги)
              </li>
              <li>
                • Проследяване и измерване: Meta Pixel, Google Analytics, Google
                Tag Manager
              </li>
              <li>
                • Оптимизация на пътя на пациента:
                <br />
                &nbsp;&nbsp;• видео → сайт → действие
                <br />
                &nbsp;&nbsp;• реклама → страница → запитване
                <br />
                &nbsp;&nbsp;• интерес → обаждане/чат → записан час
              </li>
            </ul>
            <p className="pt-2 text-sm text-white">Резултат:</p>
            <ul className="space-y-1 text-sm text-white">
              <li>• Виждаме кое работи</li>
              <li>• Подобряваме логично</li>
              <li>• Спираме “guess marketing”</li>
            </ul>
            <div className="pt-3">
              <button
                type="button"
                onClick={scrollToApply}
                className="btn-outline-dark text-xs"
              >
                Кандидатствайте
              </button>
            </div>
          </ModuleCard>
        </div>
      </section>

      {/* What you get */}
      <section className="space-y-4">
        <h2 className="heading-hover text-lg font-semibold">
          Какво получавате (като услуга)
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-black/75 md:text-base">
          Това, което получавате, е <strong>цялата система</strong>, не отделни „услуги на
          парче“:
        </p>
        <ul className="mx-auto max-w-2xl space-y-1 text-sm text-black/75">
          <li>• <strong>Стратегия</strong> + управление на съдържание</li>
          <li>• Управление на Meta и Google реклами</li>
          <li>• Изграждане/оптимизация на конверсионен уебсайт + tracking</li>
          <li>• Постоянно управление, анализ и оптимизация</li>
        </ul>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={scrollToApply}
            className="btn-outline text-xs"
          >
            Кандидатствайте
          </button>
        </div>
      </section>

      {/* Bonuses */}
      <section className="space-y-4">
        <h2 className="heading-hover text-lg font-semibold">Бонуси</h2>
        <p className="mx-auto max-w-2xl text-sm text-black/75 md:text-base">
          Получавате ги безплатно при работа по системата.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <BonusCard
            href={`/${locale}/bonuses/dental-consult-system`}
            title="Система за записване на повече консултации по телефона и чат (Dental)"
            originalPrice="997 €"
          />
          <BonusCard
            href={`/${locale}/bonuses/dental-on-camera`}
            title="Система за уверено присъствие пред камера (Dental)"
            originalPrice="997 €"
          />
          <BonusCard
            href={`/${locale}/bonuses/shooting-day-playbook`}
            title="Наръчник за мотивиране и организиране на екипа за снимачен ден"
            originalPrice="597 €"
          />
        </div>
      </section>

      {/* For whom */}
      <section className="space-y-4">
        <h2 className="heading-hover text-lg font-semibold">За кого е</h2>
        <p className="mx-auto max-w-2xl text-sm text-black/75 md:text-base">
          Подходящо за дентални клиники, които:
        </p>
        <ul className="mx-auto max-w-2xl space-y-1 text-sm text-black/75">
          <li>• искат <strong>постоянен поток</strong> от нови пациенти</li>
          <li>• искат дългосрочна, мащабируема система</li>
          <li>
            • имат намерение да растат и да управляват маркетинга като бизнес
            функция
          </li>
          <li>• могат да инвестират сериозно в маркетинг (high-end позициониране)</li>
        </ul>
        <p className="mx-auto max-w-2xl pt-2 text-sm text-black/75 md:text-base">
          Не е подходящо, ако търсите единична кампания „да пробваме нещо“.
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={scrollToApply}
            className="btn-outline text-xs"
          >
            Кандидатствайте
          </button>
        </div>
      </section>

      {/* Price – same bubble as final CTA */}
      <section className="mx-auto max-w-2xl rounded-2xl border-2 border-primary bg-primary/5 px-5 py-6 text-center md:px-6 md:py-8">
        <p className="text-base font-medium text-black/90 md:text-lg">
          <span className="font-semibold text-primary">4 997 €</span>
          {" "}
          плюс 10% комисионна върху стойността на генерираните пациенти.
        </p>
      </section>

      {/* Case studies */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="heading-hover text-lg font-semibold">Кейс стадии</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {caseStudies.map((cs, index) => (
            <motion.article
              key={cs.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.05 * index }}
              className="space-y-3 rounded-2xl border border-black/10 bg-gray-100 p-4 text-left text-black/90"
            >
              <h3 className="heading-hover text-sm font-semibold md:text-base">
                {cs.title}
              </h3>
              <p className="text-xs text-black/75">{cs.summary}</p>
              <ul className="space-y-1 text-xs text-black/75">
                {cs.outcomes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <Link
                href={`/${locale}/case-studies/dental/${cs.slug}`}
                className="btn-outline text-xs"
              >
                Виж пълния кейс
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="heading-hover text-lg font-semibold">
          Често задавани въпроси
        </h2>
        <div className="mx-auto max-w-2xl space-y-1 text-left text-sm md:text-base">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-black/10"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-semibold text-black underline decoration-black underline-offset-2 hover:decoration-black"
              >
                {faq.question}
                <span className="text-black/60">{openFaq === index ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="border-t border-black/10 px-4 py-3 text-black/75">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA – blue bubble, no title, striking text */}
      <section className="mx-auto max-w-2xl rounded-2xl border-2 border-primary bg-primary/5 px-5 py-6 text-center md:px-6 md:py-8">
        <p className="text-base font-semibold text-black/90 md:text-lg">
          Ако искате маркетинг система, която се управлява като отдел, а не като
          поредица от кампании — кандидатствайте по-долу.
        </p>
      </section>

      {/* Application form – keeps existing Supabase-backed form */}
      <ApplicationForm locale={locale} sourcePage="dental" />
    </div>
  );
}

type ModuleCardProps = {
  index: 1 | 2 | 3;
  open: boolean;
  onToggle: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

function ModuleCard({ open, onToggle, title, subtitle, children }: ModuleCardProps) {
  return (
    <div className="block card-3d p-[1px]">
      <div className="overflow-hidden rounded-[0.95rem] bg-black/90 text-left text-white">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <div className="space-y-1">
            <p className="heading-hover text-sm font-semibold md:text-base">
              {title}
            </p>
            {subtitle && (
              <p className="text-xs text-white md:text-sm">{subtitle}</p>
            )}
          </div>
          <span className="text-xs text-white">{open ? "−" : "+"}</span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="space-y-2 border-t border-white/10 px-5 py-4 text-xs md:text-sm">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

type BonusCardProps = {
  href: string;
  title: string;
  originalPrice: string;
};

function BonusCard({ href, title, originalPrice }: BonusCardProps) {
  return (
    <Link href={href} className="block card-3d p-[1px]">
      <div className="flex h-full flex-col justify-between rounded-[0.95rem] bg-black/90 p-5 text-left text-white md:p-6">
        <div className="space-y-3">
          <h3 className="heading-hover text-sm font-semibold md:text-base">
            {title}
          </h3>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-white">
          <span className="line-through">{originalPrice}</span>
          <span className="text-white">→ Безплатно</span>
        </div>
      </div>
    </Link>
  );
}

