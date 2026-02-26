import { defineField, defineType } from "sanity";

const pageTypes = [
  "home",
  "dentalMarketing",
  "plasticMarketing",
  "inHouse",
  "guidesIndex",
  "guide",
  "contact",
  "privacy",
  "terms",
] as const;

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Bulgarian", value: "bg" },
        ],
        layout: "radio",
      },
      initialValue: "en",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      options: {
        list: pageTypes.map((value) => ({ title: value, value })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "problemSection" },
        { type: "howItWorksSection" },
        { type: "caseStudyPreviewSection" },
        { type: "bonusStackSection" },
        { type: "faqSection" },
        { type: "applicationFormSection" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageType",
    },
  },
});

