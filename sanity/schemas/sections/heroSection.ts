import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Small Label",
      type: "string",
      description: "Optional small label above the main heading.",
    }),
    defineField({
      name: "rotatingWords",
      title: "Rotating Words",
      type: "array",
      of: [{ type: "string" }],
      description: "Used for the rotating hero headline on some pages.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaAnchorId",
      title: "CTA Anchor ID",
      type: "string",
      description: "E.g. #apply – without the #.",
    }),
  ],
});

