import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { submitApplication } from "@/lib/actions";

type Props = {
  locale: Locale;
  sourcePage: string;
};

export function ApplicationForm({ locale, sourcePage }: Props) {
  const dict = getDictionary(locale);
  const formDict = dict.forms.application;

  return (
    <section id="apply" className="mt-10 space-y-6 border-t border-black/10 pt-8">
      <div className="space-y-3">
        <h2 className="heading-hover text-xl font-semibold">
          {formDict.title}
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-black/70">{formDict.subtitle}</p>
      </div>

      <form action={submitApplication} className="space-y-4">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="sourcePage" value={sourcePage} />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1 text-xs">
            <label className="block text-black/70">
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
            <label className="block text-black/70">
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
            <label className="block text-black/70">
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
            <label className="block text-black/70">
              {formDict.fields.business}
            </label>
            <input name="business" required className="input-base" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,3fr)]">
          <div className="space-y-1 text-xs">
            <label className="block text-black/70">
              {formDict.fields.budget}
            </label>
            <select name="budget" required className="input-base">
              <option value="">{/* empty for placeholder */}</option>
              {formDict.budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1 text-xs">
            <label className="block text-black/70">
              {formDict.fields.message}
            </label>
            <textarea
              name="message"
              className="textarea-base"
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn-primary text-xs">
            {formDict.submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}

