import { defineField, defineType } from "sanity";

export default defineType({
  name: "bonusStackSection",
  title: "Bonus Stack Section",
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
      name: "bonuses",
      title: "Bonuses",
      type: "array",
      of: [
        defineField({
          name: "bonus",
          title: "Bonus",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "originalPrice",
              title: "Original Price",
              type: "string",
            }),
            defineField({
              name: "freeLabel",
              title: "Free Label",
              type: "string",
              initialValue: "Безплатно",
            }),
          ],
        }),
      ],
    }),
  ],
});

