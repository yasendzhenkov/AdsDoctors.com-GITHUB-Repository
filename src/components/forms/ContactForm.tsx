import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { submitContact } from "@/lib/actions";

type Props = {
  locale: Locale;
};

export function ContactForm({ locale }: Props) {
  const dict = getDictionary(locale);
  const formDict = dict.forms.contact;

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="heading-hover text-2xl font-semibold md:text-3xl">
          {formDict.title}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-black/70">{formDict.subtitle}</p>
      </div>

      <form action={submitContact} className="space-y-4">
        <input type="hidden" name="locale" value={locale} />

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

        <div className="space-y-1 text-xs">
          <label className="block text-black/70">
            {formDict.fields.message}
          </label>
          <textarea
            name="message"
            className="textarea-base"
            rows={5}
            required
          ></textarea>
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

