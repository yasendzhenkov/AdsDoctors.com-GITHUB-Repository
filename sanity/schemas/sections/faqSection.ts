import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Често задавани въпроси",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineField({
          name: "item",
          title: "FAQ Item",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
    }),
  ],
});

