## Ads Doctors – Marketing Site

High‑end bilingual marketing site for the **Ads Doctors** agency, built with **Next.js App Router**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**.

### Tech stack

- Next.js (App Router, TypeScript, `src/` structure)
- Tailwind CSS v4 (utility classes + a few custom global utilities)
- Framer Motion for scroll + hover animations
- Supabase (optional, recommended) for form submissions and case study gating

### Running the project

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The middleware will redirect you to `/en` or `/bg` depending on browser language (default `/en`).

### Environment variables

Create a `.env.local` file in the project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

> The service role key is required because server actions insert directly into Supabase. Restrict table access appropriately with RLS.

### Supabase schema (SQL)

You can use the following as a starting point:

```sql
create table public.leads_applications (
  id bigint generated always as identity primary key,
  created_at timestamptz default timezone('utc', now()),
  full_name text not null,
  email text not null,
  phone text not null,
  business text not null,
  budget text not null,
  message text,
  locale text not null,
  source_page text not null
);

create table public.leads_contacts (
  id bigint generated always as identity primary key,
  created_at timestamptz default timezone('utc', now()),
  full_name text not null,
  email text not null,
  message text not null,
  locale text not null
);

create table public.case_study_access (
  id bigint generated always as identity primary key,
  created_at timestamptz default timezone('utc', now()),
  token uuid not null unique,
  full_name text not null,
  email text not null,
  phone text not null,
  business text not null,
  locale text not null,
  niche text not null,
  slug text not null
);
```

Add Row Level Security (RLS) rules that allow inserts and token lookups from the service role key.

### Locale routing & i18n

- URL structure: `/[locale]/(site)/...` where `locale` is `en` or `bg`
- Locale detection middleware in `middleware.ts`:
  - If path does not start with `/en` or `/bg`, redirect based on `Accept-Language` (fallback `/en`)
- Dictionaries live in `src/lib/i18n.ts`:
  - Navigation labels
  - Homepage copy
  - Sales page sections
  - Case study meta
  - Products, guides, form labels, thank‑you texts and footer labels
- To add / change copy:
  - Extend the `Dictionary` type in `src/lib/i18n.ts` if needed
  - Update both `en` and `bg` dictionaries

### Main structure

- `src/app/layout.tsx` – root layout, global styles
- `src/app/page.tsx` – redirects to `/en`
- `src/app/[locale]/(site)/layout.tsx` – shared header, footer and page container
- `src/app/[locale]/(site)/page.tsx` – locale homepage (router to 4 main destinations)

Key pages (for both `/en` and `/bg`):

- Dental marketing: `/[locale]/dental`
- Plastic surgery marketing: `/[locale]/plastic`
- In‑house team (enterprise): `/[locale]/in-house`
- Bonuses: `/[locale]/bonuses`
- Individual product pages: `/[locale]/bonuses/[slug]`
- Guides index: `/[locale]/guides`
- Guide pages: `/[locale]/guides/[slug]`
- Contact: `/[locale]/contact`
- Other types of clinics: `/[locale]/other-clinics`
- About / Careers / Privacy / Terms: `/[locale]/about`, `/[locale]/careers`, `/[locale]/privacy`, `/[locale]/terms`
- Thank‑you pages:
  - Application submit: `/[locale]/thank-you/application`
  - Contact submit: `/[locale]/thank-you/contact`
  - Case study thank‑you: `/[locale]/thank-you/case-study`

Case studies:

- Preview cards live on each main sales page
- Full case study pages (gated) at:
  - `/[locale]/case-studies/dental/[slug]`
  - `/[locale]/case-studies/plastic/[slug]`
  - `/[locale]/case-studies/in-house/[slug]`

### Forms & gating

Server actions live in `src/lib/actions.ts` and use Supabase:

- `submitApplication` → inserts into `leads_applications`, redirects to `/[locale]/thank-you/application`
- `submitContact` → inserts into `leads_contacts`, redirects to `/[locale]/thank-you/contact`
- `submitCaseStudyAccess` → inserts into `case_study_access`, generates a `token` (`uuid`), then redirects to the gated case study page with `?token=...`

The gated case study page:

- `src/app/[locale]/(site)/case-studies/[niche]/[slug]/page.tsx`
- If the `token` query param matches a row in `case_study_access`, the detailed section is revealed
- If not, the access form is shown again

Form components:

- `ApplicationForm` – used at the bottom of each main sales page (anchor `#apply`)
- `ContactForm` – used on the contact page
- `CaseStudyAccessForm` – used on case study pages when access is not granted

### Sanity CMS & admin

- Uses **Sanity** as a headless CMS (via `next-sanity` + `sanity`).
- Sanity Studio is embedded at `/studio` and is protected behind the `/admin` login.
- Main config: `sanity.config.ts`, schemas in `sanity/schemas`.
  - `globalSettings` – site title, nav/footer links, brand colors (fixed to black / white / #2272FF), CTA labels.
  - `page` – pages collection (`pageType` + `locale`), each with an orderable `sections` array.
  - Section types:
    - `heroSection` – rotating words, headline, subheadline, CTA text and anchor id.
    - `problemSection` – title, intro, bullets.
    - `howItWorksSection` – three modules with collapsible rich‑text details.
    - `caseStudyPreviewSection` – title, intro, CTA label for gated case studies.
    - `bonusStackSection` – cards with crossed‑out prices + “free” label.
    - `faqSection` – FAQ items (question + answer).
    - `applicationFormSection` – copy above the application form (embed stays in code).
- Shared Sanity client lives in `src/lib/sanityClient.ts`.

### Admin login & /studio protection

- Auth is handled with **NextAuth Credentials**:
  - API route: `src/app/api/auth/[...nextauth]/route.ts`
  - Protected routes: `/admin` and `/studio` via `middleware.ts` + `next-auth/jwt`.
  - Login page: `/admin/login` (password only, taken from `ADMIN_PASSWORD`).
  - Admin dashboard: `/admin` – links to `/studio` and quick info.
- Footer:
  - Adds a localized link `Вход` / `Admin` pointing to `/admin`.
- The `/studio` route is only usable after logging in (direct access is also protected by middleware).

### Adding content

**New case study**

1. Add a new entry to the `caseStudies` array in `src/lib/i18n.ts` for both `en` and `bg` (reuse slug between locales).
2. Reference it from the relevant sales page automatically via its `niche`.

**New product**

1. Add to the `products` array in `src/lib/i18n.ts` with a unique `slug`.
2. The bonuses index and individual product route will pick it up automatically.

**New guide**

1. Add to `guides.items` in `src/lib/i18n.ts` for both locales.
2. The index and dynamic guide pages will start serving it.

### Design & interaction

- Colors:
  - Background: pure black `#000000`
  - Foreground: pure white `#FFFFFF`
  - Primary: blue `#2272FF`
  - No other colors are used – all hierarchy comes from opacity, borders, blur, shadow and spacing.
- Typography:
  - System font stack via `globals.css`
- Components:
  - Header with nav + language switcher
  - Footer with required links
  - 3D cards (`card-3d` class) for bonuses and selected sections
  - Primary and outline buttons (`.btn-primary`, `.btn-outline`)
  - Inputs styled via `.input-base` and `.textarea-base`
- Animations (Framer Motion):
  - Used for section reveal on scroll and subtle heading / card entrance animations
  - Headline hover underline handled via `.heading-hover` CSS

### Notes

- Supabase is optional in development; without environment variables, form submissions will throw server errors. Wire up Supabase before going live.
- All pages are implemented as server components except where client hooks are required (e.g. language switcher, product “Buy” button redirect).

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
