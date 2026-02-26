import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudyPreviewSection",
  title: "Case Study Preview Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      description: "Label for a button that leads to gated case studies.",
    }),
  ],
});

