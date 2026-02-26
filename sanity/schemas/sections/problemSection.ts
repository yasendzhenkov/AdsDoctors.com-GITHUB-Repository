import { defineField, defineType } from "sanity";

export default defineType({
  name: "problemSection",
  title: "Problem Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bullets",
      title: "Problem Bullets",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

