import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { getSupabaseServerClient } from "@/lib/supabaseClient";
import { CaseStudyAccessForm } from "@/components/forms/CaseStudyAccessForm";

type Props = {
  params: { locale: Locale; niche: string; slug: string };
  searchParams: { token?: string };
};

export default async function CaseStudyPage({
  params,
  searchParams,
}: Props) {
  const dict = getDictionary(params.locale);
  const caseStudy = dict.caseStudies.find(
    (c) => c.slug === params.slug && c.niche === params.niche
  );

  const token = searchParams.token;
  let hasAccess = false;

  if (token) {
    try {
      const client = getSupabaseServerClient();
      const { data, error } = await client
        .from("case_study_access")
        .select("id")
        .eq("token", token)
        .eq("slug", params.slug)
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        hasAccess = true;
      }
    } catch {
      hasAccess = false;
    }
  }

  if (!caseStudy) {
    return (
      <div className="space-y-4">
        <h1 className="heading-hover text-2xl font-semibold">
          Case study not found
        </h1>
        <p className="text-sm text-black/70">
          This case study is not available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-black/60">
          Case study
        </p>
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          {caseStudy.title}
        </h1>
        <p className="max-w-2xl text-sm text-black/70">{caseStudy.summary}</p>
      </section>

      {!hasAccess && (
        <CaseStudyAccessForm
          locale={params.locale}
          niche={params.niche}
          slug={params.slug}
        />
      )}

      {hasAccess && (
        <section className="space-y-6 rounded-2xl border border-black/10 bg-black/80 p-5 text-white md:p-6">
          <div className="space-y-2 transition-all duration-300">
            <h2 className="heading-hover text-lg font-semibold">
              {dict.thankYou.caseStudy.title}
            </h2>
            <p className="text-sm text-white/90">
              {dict.thankYou.caseStudy.body}
            </p>
          </div>

          <div className="space-y-3 text-sm text-white/80">
            <h3 className="heading-hover text-base font-semibold">
              Outcomes overview
            </h3>
            <ul className="space-y-1 text-xs md:text-sm">
              {caseStudy.outcomes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <p className="pt-3 text-xs text-white/60">
              For a walkthrough of how this maps to your clinic,{" "}
              <span className="underline underline-offset-4">
                book an application call at the bottom of the relevant service
                page.
              </span>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

