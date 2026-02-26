export type Locale = "en" | "bg";

export type NavLinkKey =
  | "dental"
  | "plastic"
  | "inHouse"
  | "bonuses"
  | "guides"
  | "contact";

export type SalesPageKey = "dental" | "plastic" | "inHouse";

type CaseStudy = {
  slug: string;
  niche: "dental" | "plastic" | "in-house";
  title: string;
  summary: string;
  outcomes: string[];
};

type Product = {
  slug: string;
  name: string;
  price: string;
  niche: "dental" | "plastic" | "shared";
};

type Guide = {
  slug: string;
  title: string;
  summary: string;
};

type Dictionary = {
  locale: Locale;
  brand: {
    name: string;
    tagline: string;
  };
  nav: Record<NavLinkKey, string>;
  cta: {
    applyNow: string;
    contactUs: string;
    viewDetails: string;
    requestCaseStudy: string;
  };
  homepage: {
    title: string;
    subtitle: string;
    tiles: {
      key: "dental" | "plastic" | "inHouse" | "bonuses";
      title: string;
      description: string;
      href: string;
    }[];
  };
  salesPages: Record<
    SalesPageKey,
    {
      heroTitle: string;
      heroSubtitle: string;
      sections: {
        id: string;
        title: string;
        body: string;
      }[];
    }
  >;
  caseStudies: CaseStudy[];
  products: Product[];
  guides: {
    introTitle: string;
    introBody: string;
    items: Guide[];
  };
  forms: {
    application: {
      title: string;
      subtitle: string;
      fields: {
        fullName: string;
        email: string;
        phone: string;
        business: string;
        budget: string;
        message: string;
      };
      budgetOptions: { value: string; label: string }[];
      submitLabel: string;
    };
    contact: {
      title: string;
      subtitle: string;
      fields: {
        fullName: string;
        email: string;
        message: string;
      };
      submitLabel: string;
    };
    caseStudy: {
      title: string;
      subtitle: string;
      fields: {
        fullName: string;
        email: string;
        phone: string;
        business: string;
      };
      submitLabel: string;
    };
  };
  thankYou: {
    application: {
      title: string;
      body: string;
    };
    contact: {
      title: string;
      body: string;
    };
    caseStudy: {
      title: string;
      body: string;
    };
  };
  footer: {
    otherClinics: string;
    about: string;
    careers: string;
    privacy: string;
    terms: string;
    bonuses: string;
    login?: string;
  };
  misc: {
    languageBg: string;
    languageEn: string;
    backToHome: string;
    buyNow: string;
  };
};

const en: Dictionary = {
  locale: "en",
  brand: {
    name: "Ads Doctors",
    tagline: "Performance marketing for ambitious clinics.",
  },
  nav: {
    dental: "Dental Marketing",
    plastic: "Plastic Surgery Marketing",
    inHouse: "In‑House Team (Enterprise)",
    bonuses: "Bonuses",
    guides: "Guides",
    contact: "Contact",
  },
  cta: {
    applyNow: "Apply now",
    contactUs: "Contact us",
    viewDetails: "View details",
    requestCaseStudy: "Request full case study",
  },
  homepage: {
    title: "Operational marketing partner for premium clinics.",
    subtitle:
      "We design, run and scale predictable acquisition systems for dental and plastic surgery clinics, and build in‑house media teams for enterprises.",
    tiles: [
      {
        key: "dental",
        title: "Dental Marketing",
        description: "Full‑funnel systems for high‑value dental treatments.",
        href: "/en/dental",
      },
      {
        key: "plastic",
        title: "Plastic Surgery Marketing",
        description:
          "Discreet performance marketing for premium aesthetic clinics.",
        href: "/en/plastic",
      },
      {
        key: "inHouse",
        title: "Build In‑House Team",
        description:
          "We help you build, train and lead your own media team.",
        href: "/en/in-house",
      },
      {
        key: "bonuses",
        title: "Bonuses & Systems",
        description: "Ready‑to‑deploy playbooks and communication systems.",
        href: "/en/bonuses",
      },
    ],
  },
  salesPages: {
    dental: {
      heroTitle: "Dental growth systems with predictable consult volume.",
      heroSubtitle:
        "From first impression to booked consultation – we engineer the full journey for implant, ortho and aesthetic patients.",
      sections: [
        {
          id: "diagnosis",
          title: "Precision diagnosis before prescription.",
          body: "We audit your full funnel – positioning, offer, front‑desk process and media – before touching a single ad. The outcome is a clear growth protocol, not random experiments.",
        },
        {
          id: "system",
          title: "A system for qualified consultations, not cheap clicks.",
          body: "We focus on the few campaigns and workflows that consistently generate high‑intent consults, align them with your schedule and train your team to protect every lead.",
        },
        {
          id: "partnership",
          title: "Fewer clinics, deeper partnerships.",
          body: "We work with a limited number of clinics per city to maintain category focus, clean reporting and true strategic support for your management team.",
        },
      ],
    },
    plastic: {
      heroTitle: "Discreet performance marketing for plastic surgery clinics.",
      heroSubtitle:
        "We combine strict compliance, brand sensitivity and hard performance targets for premium aesthetic practices.",
      sections: [
        {
          id: "positioning",
          title: "Positioning built for high‑trust procedures.",
          body: "We refine your messaging, photography and video frameworks so every touchpoint supports the level of trust your surgeons require.",
        },
        {
          id: "pipeline",
          title: "From inquiry to booked surgery, fully instrumented.",
          body: "We map and measure each step – inquiry, consult, follow‑up, surgery – and align media with your theatre capacity and margins.",
        },
        {
          id: "discretion",
          title: "Discreet, compliant communication.",
          body: "We design flows that protect patient privacy, respect local regulations and still move ideal patients confidently to a decision.",
        },
      ],
    },
    inHouse: {
      heroTitle: "Build a world‑class in‑house marketing team.",
      heroSubtitle:
        "For groups and enterprise clinics ready to own their media, content and data stack.",
      sections: [
        {
          id: "org",
          title: "Org design and role clarity.",
          body: "We help you design the right structure – from Head of Growth to creators and coordinators – with clear scorecards and decision rights.",
        },
        {
          id: "playbooks",
          title: "Playbooks, templates and training.",
          body: "Your team gets concrete briefs, scripts and review frameworks so they can ship campaigns weekly without waiting for an agency.",
        },
        {
          id: "transition",
          title: "Smooth transition from agency to in‑house.",
          body: "We de‑risk the transition period, keep performance stable and then phase out external dependencies once your team is ready.",
        },
      ],
    },
  },
  caseStudies: [
    {
      slug: "dental-implant-consults",
      niche: "dental",
      title: "Implant consult pipeline for a multi‑chair clinic.",
      summary:
        "How we rebuilt the patient journey and consistently filled high‑value implant consult slots.",
      outcomes: [
        "4.2x increase in qualified implant consults in 90 days",
        "Calendar‑based campaign orchestration by chair and doctor",
        "Front‑desk scripts and automations that protected every lead",
      ],
    },
    {
      slug: "clear-aligner-demand",
      niche: "dental",
      title: "Clear‑aligner demand without discounts.",
      summary:
        "Positioning and messaging work that moved patients away from pure price comparison.",
      outcomes: [
        "32% higher average case value",
        "Reduced no‑show rate on first consults",
        "Organic and paid content working from one content spine",
      ],
    },
    {
      slug: "hygiene-to-high-ticket",
      niche: "dental",
      title: "From hygiene traffic to high‑ticket treatments.",
      summary:
        "Turning routine hygiene visits into a stable source of aesthetic treatment demand.",
      outcomes: [
        "Documented chair‑side upgrade scripts",
        "Follow‑up sequences mapped to treatment plans",
        "New revenue line from existing patient base",
      ],
    },
    {
      slug: "rhinoplasty-funnel",
      niche: "plastic",
      title: "Rhinoplasty funnel with strict pre‑qualification.",
      summary:
        "Tight targeting, pre‑consult education and intake process for a premium clinic.",
      outcomes: [
        "Fewer, but significantly better prepared consults",
        "Increased surgery acceptance rate",
        "Predictable monthly theatre utilisation",
      ],
    },
    {
      slug: "body-contouring-launch",
      niche: "plastic",
      title: "Body‑contouring launch across two cities.",
      summary:
        "Coordinated launch sequence, creatives and localised landing journeys.",
      outcomes: [
        "Booked‑out launch calendar in 6 weeks",
        "Shared playbook for both locations",
        "Executive reporting on CAC and payback",
      ],
    },
    {
      slug: "group-inhouse-team",
      niche: "in-house",
      title: "In‑house growth team for a clinic group.",
      summary:
        "From scattered agencies to a focused internal team with one growth roadmap.",
      outcomes: [
        "Central growth function across 7 locations",
        "Weekly campaign rhythm owned by the team",
        "Agency fees redeployed into media and content",
      ],
    },
  ],
  products: [
    {
      slug: "dental-consult-system",
      name: "Система за увеличаване на записаните дентални консултации + анонимна оценка преди/след – 997 €",
      price: "997 €",
      niche: "dental",
    },
    {
      slug: "plastic-consult-system",
      name: "Система за увеличаване на записаните консултации за пластична хирургия + анонимна оценка преди/след – 997 €",
      price: "997 €",
      niche: "plastic",
    },
    {
      slug: "dental-on-camera",
      name: "Какво да говоря пред камера (Dental) + анализ преди/след – 997 €",
      price: "997 €",
      niche: "dental",
    },
    {
      slug: "plastic-on-camera",
      name: "Какво да говоря пред камера (Plastic) + анализ преди/след – 997 €",
      price: "997 €",
      niche: "plastic",
    },
    {
      slug: "shooting-day-playbook",
      name: "Наръчник: Как да мотивирам и организирам екипа си за снимачен ден – 597 €",
      price: "597 €",
      niche: "shared",
    },
  ],
  guides: {
    introTitle: "Guides & Tutorials",
    introBody:
      "Short, practical notes on how to think about growth, content and operations for clinics.",
    items: [
      {
        slug: "designing-the-dental-patient-journey",
        title: "Designing the modern dental patient journey",
        summary:
          "From first search to long‑term recall, structured as one continuous experience.",
      },
      {
        slug: "front-desk-as-revenue-engine",
        title: "Turning your front‑desk into a revenue engine",
        summary:
          "Scripts, tooling and reporting that protect every lead and every slot.",
      },
      {
        slug: "leading-an-inhouse-media-team",
        title: "Leading an in‑house media team",
        summary:
          "How to brief, review and develop creative talent inside your clinic group.",
      },
    ],
  },
  forms: {
    application: {
      title: "Apply to work with Ads Doctors",
      subtitle:
        "Share a few details about your clinic and current marketing setup. We reply within one business day.",
      fields: {
        fullName: "Full name",
        email: "Email",
        phone: "Phone",
        business: "Clinic / Business name",
        budget: "Monthly marketing budget",
        message: "Anything else we should know? (optional)",
      },
      budgetOptions: [
        { value: "5-10", label: "€5k – €10k" },
        { value: "10-20", label: "€10k – €20k" },
        { value: "20+", label: "€20k+" },
      ],
      submitLabel: "Submit application",
    },
    contact: {
      title: "Contact Ads Doctors",
      subtitle:
        "For partnerships, speaking engagements or press, use the form below.",
      fields: {
        fullName: "Full name",
        email: "Email",
        message: "Message",
      },
      submitLabel: "Send message",
    },
    caseStudy: {
      title: "Request full case study access",
      subtitle:
        "We keep our detailed numbers private. Request access and we will unlock this case study for you.",
      fields: {
        fullName: "Full name",
        email: "Email",
        phone: "Phone",
        business: "Clinic / Business name",
      },
      submitLabel: "Request access",
    },
  },
  thankYou: {
    application: {
      title: "Thank you for your application.",
      body: "We have received your details. A member of the Ads Doctors team will reach out within one business day.",
    },
    contact: {
      title: "Thank you for reaching out.",
      body: "We have your message in our queue and will respond shortly.",
    },
    caseStudy: {
      title: "Access granted.",
      body: "You now have access to the full case study below.",
    },
  },
  footer: {
    otherClinics: "Other Types of Clinics",
    about: "About",
    careers: "Careers",
    privacy: "Privacy Policy",
    terms: "Terms",
    bonuses: "Bonuses",
    login: "Admin",
  },
  misc: {
    languageBg: "BG",
    languageEn: "EN",
    backToHome: "Back to homepage",
    buyNow: "Buy",
  },
};

const bg: Dictionary = {
  locale: "bg",
  brand: {
    name: "Ads Doctors",
    tagline: "Маркетинг партньор за взискателни клиники.",
  },
  nav: {
    dental: "Маркетинг за дентални клиники",
    plastic: "Маркетинг за пластична хирургия",
    inHouse: "Изграждане на вътрешен екип",
    bonuses: "Бонуси",
    guides: "Ръководства",
    contact: "Контакт",
  },
  cta: {
    applyNow: "Кандидатствайте",
    contactUs: "Свържете се с нас",
    viewDetails: "Вижте детайли",
    requestCaseStudy: "Поискайте пълен казус",
  },
  homepage: {
    title: "Оперативен маркетинг партньор за премиум клиники.",
    subtitle:
      "Планираме, изграждаме и мащабираме предвидими системи за нови пациенти за дентални и естетични клиники и помагаме на групи да изградят вътрешни медия екипи.",
    tiles: [
      {
        key: "dental",
        title: "Маркетинг за дентални клиники",
        description:
          "Системи за високостойностни имплантологични и естетични случаи.",
        href: "/bg/dental",
      },
      {
        key: "plastic",
        title: "Маркетинг за пластична хирургия",
        description:
          "Дискретен, измерим маркетинг за премиум естетични клиники.",
        href: "/bg/plastic",
      },
      {
        key: "inHouse",
        title: "Вътрешен маркетинг екип",
        description:
          "Организация, процеси и обучение за вашия екип по място.",
        href: "/bg/in-house",
      },
      {
        key: "bonuses",
        title: "Бонуси и продукти",
        description:
          "Готови системи и наръчници за комуникация и съдържание.",
        href: "/bg/bonuses",
      },
    ],
  },
  salesPages: {
    dental: {
      heroTitle:
        "Системи за дентален растеж с предвидим брой консултации.",
      heroSubtitle:
        "От първото търсене до записан час – проектираме цялото пътешествие за имплантологични, ортодонтски и естетични пациенти.",
      sections: [
        {
          id: "diagnosis",
          title: "Диагностика преди рецепта.",
          body: "Анализираме цялата ви фуния – позициониране, оферта, процес на рецепция и медиа – преди да пуснем каквато и да е реклама. Резултатът е ясен протокол за растеж, а не поредица от случайни експерименти.",
        },
        {
          id: "system",
          title: "Система за квалифицирани консултации, не за евтини кликове.",
          body: "Фокусираме се върху малък брой кампании и workflows, които последователно носят високоиентни пациенти и ги синхронизираме с графика и екипа ви.",
        },
        {
          id: "partnership",
          title: "Малко клиники, дългосрочни партньорства.",
          body: "Работим с ограничен брой клиники на град, за да поддържаме категорична фокусираност, чисти отчети и истинска стратегическа подкрепа към управлението.",
        },
      ],
    },
    plastic: {
      heroTitle:
        "Дискретен performance маркетинг за клиники по пластична хирургия.",
      heroSubtitle:
        "Съчетаваме регулаторна стриктност, грижа за бранда и ясни таргети за резултат.",
      sections: [
        {
          id: "positioning",
          title: "Позициониране за високорискови, високодоверени процедури.",
          body: "Прецизираме посланията, фото и видео рамките така, че всеки контакт с бранда да поддържа доверието, което хирургът изисква.",
        },
        {
          id: "pipeline",
          title: "От запитване до операция, напълно измерено.",
          body: "Картографираме и измерваме всеки етап – запитване, консултация, проследяване, операция – и връзваме медиата към заетостта на операционната и маржа.",
        },
        {
          id: "discretion",
          title: "Дискретна, съобразена комуникация.",
          body: "Изграждаме кампании и автоматизации, които пазят поверителността на пациента, покриват локалните изисквания и въпреки това движат идеалните пациенти към решение.",
        },
      ],
    },
    inHouse: {
      heroTitle: "Изграждане на вътрешен маркетинг екип от нулата.",
      heroSubtitle:
        "За групи и вериги клиники, готови да притежават своята медия, съдържание и данни.",
      sections: [
        {
          id: "org",
          title: "Организационен дизайн и роли.",
          body: "Помагаме да структурирате екипа – от Head of Growth до криейтиви и координатори – с ясни отговорности и KPI.",
        },
        {
          id: "playbooks",
          title: "Playbook-и, шаблони и обучение.",
          body: "Екипът ви получава конкретни брифове, скриптове и рамки за оценка, за да може да пуска кампании всяка седмица без да чака агенция.",
        },
        {
          id: "transition",
          title: "Плавен преход от агенция към вътрешен екип.",
          body: "Минимизираме риска в преходния период, запазваме резултатите стабилни и постепенно намаляваме външните зависимости.",
        },
      ],
    },
  },
  caseStudies: en.caseStudies,
  products: en.products,
  guides: {
    introTitle: "Ръководства и туториали",
    introBody:
      "Кратки, практични бележки за растеж, съдържание и организация в клиники.",
    items: en.guides.items.map((g) => ({
      ...g,
    })),
  },
  forms: {
    application: {
      title: "Кандидатствайте за работа с Ads Doctors",
      subtitle:
        "Споделете няколко детайла за клиниката и текущия ви маркетинг. Отговаряме до един работен ден.",
      fields: {
        fullName: "Пълно име",
        email: "Имейл",
        phone: "Телефон",
        business: "Име на клиника / бизнес",
        budget: "Месечен маркетинг бюджет",
        message: "Какво друго е важно да знаем? (по желание)",
      },
      budgetOptions: [
        { value: "5-10", label: "5k – 10k €" },
        { value: "10-20", label: "10k – 20k €" },
        { value: "20+", label: "20k+ €" },
      ],
      submitLabel: "Изпратете заявка",
    },
    contact: {
      title: "Контакт с Ads Doctors",
      subtitle:
        "За партньорства, участия и медии използвайте формата по‑долу.",
      fields: {
        fullName: "Пълно име",
        email: "Имейл",
        message: "Съобщение",
      },
      submitLabel: "Изпрати",
    },
    caseStudy: {
      title: "Достъп до пълния казус",
      subtitle:
        "Пълните ни резултати са защитени. Попълнете формата и ще отключим казуса за вас.",
      fields: {
        fullName: "Пълно име",
        email: "Имейл",
        phone: "Телефон",
        business: "Име на клиника / бизнес",
      },
      submitLabel: "Поискайте достъп",
    },
  },
  thankYou: {
    application: {
      title: "Благодаря за кандидатурата.",
      body: "Получихме информацията ви. Член на екипа на Ads Doctors ще се свърже с вас до един работен ден.",
    },
    contact: {
      title: "Благодаря за съобщението.",
      body: "Съобщението ви е при нас и скоро ще отговорим.",
    },
    caseStudy: {
      title: "Достъпът е активен.",
      body: "Вече имате достъп до пълния казус по‑долу.",
    },
  },
  footer: {
    otherClinics: "Други типове клиники",
    about: "За Ads Doctors",
    careers: "Кариери",
    privacy: "Политика за поверителност",
    terms: "Общи условия",
    bonuses: "Бонуси",
    login: "Вход",
  },
  misc: {
    languageBg: "BG",
    languageEn: "EN",
    backToHome: "Към началната страница",
    buyNow: "Купи",
  },
};

const dictionaries: Record<Locale, Dictionary> = {
  en,
  bg,
};

export function getDictionary(rawLocale: string): Dictionary {
  const locale: Locale = rawLocale === "bg" ? "bg" : "en";
  return dictionaries[locale];
}

