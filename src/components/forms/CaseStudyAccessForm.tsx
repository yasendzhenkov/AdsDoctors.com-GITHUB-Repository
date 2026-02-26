import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { submitCaseStudyAccess } from "@/lib/actions";

type Props = {
  locale: Locale;
  niche: string;
  slug: string;
};

export function CaseStudyAccessForm({ locale, niche, slug }: Props) {
  const dict = getDictionary(locale);
  const formDict = dict.forms.caseStudy;

  return (
    <section className="mt-8 space-y-6 rounded-2xl border border-black/10 bg-black/70 p-5 text-left text-white md:p-6">
      <div className="space-y-2">
        <h2 className="heading-hover text-lg font-semibold">
          {formDict.title}
        </h2>
        <p className="text-xs text-white/80 md:text-sm">{formDict.subtitle}</p>
      </div>

      <form action={submitCaseStudyAccess} className="space-y-4">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="niche" value={niche} />
        <input type="hidden" name="slug" value={slug} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1 text-xs">
            <label className="block text-white/80">
              {formDict.fields.fullName}
            </label>
            <input
              name="fullName"
              required
              className="input-base"
              autoComplete="name"
            />
          </div>
          <div className="space-y-1 text-xs">
            <label className="block text-white/80">
              {formDict.fields.email}
            </label>
            <input
              name="email"
              type="email"
              required
              className="input-base"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1 text-xs">
            <label className="block text-white/80">
              {formDict.fields.phone}
            </label>
            <input
              name="phone"
              required
              className="input-base"
              autoComplete="tel"
            />
          </div>
          <div className="space-y-1 text-xs">
            <label className="block text-white/80">
              {formDict.fields.business}
            </label>
            <input name="business" required className="input-base" />
          </div>
        </div>

        <button type="submit" className="btn-primary text-xs">
          {formDict.submitLabel}
        </button>
      </form>
    </section>
  );
}

