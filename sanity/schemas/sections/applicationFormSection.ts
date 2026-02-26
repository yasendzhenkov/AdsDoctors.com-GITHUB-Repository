import { defineField, defineType } from "sanity";

export default defineType({
  name: "applicationFormSection",
  title: "Application Form Section",
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
      type: "text",
      rows: 3,
      description: "Helper text above the application form. The real form embed is handled in code.",
    }),
  ],
});

