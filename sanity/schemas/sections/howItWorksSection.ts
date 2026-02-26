import { defineField, defineType } from "sanity";

export default defineType({
  name: "howItWorksSection",
  title: "How It Works Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      of: [
        defineField({
          name: "module",
          title: "Module",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
              description: "Use paragraphs and bullet lists to describe the module.",
            }),
          ],
        }),
      ],
    }),
  ],
});

