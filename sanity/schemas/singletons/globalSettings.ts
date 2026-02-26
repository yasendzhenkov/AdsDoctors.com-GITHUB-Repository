import { defineField, defineType } from "sanity";

export default defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        defineField({
          name: "navLink",
          title: "Nav Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Href",
              type: "string",
              description: "Relative URL, e.g. /en/dental or /bg/dental",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [
        defineField({
          name: "footerLink",
          title: "Footer Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Href",
              type: "string",
              description: "Relative URL, e.g. /en/privacy or /bg/privacy",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "brandColors",
      title: "Brand Colors",
      type: "object",
      fields: [
        defineField({
          name: "background",
          title: "Background",
          type: "string",
          initialValue: "#FFFFFF",
          readOnly: true,
        }),
        defineField({
          name: "foreground",
          title: "Foreground",
          type: "string",
          initialValue: "#000000",
          readOnly: true,
        }),
        defineField({
          name: "primary",
          title: "Primary",
          type: "string",
          initialValue: "#2272FF",
          readOnly: true,
        }),
      ],
    }),
    defineField({
      name: "ctaLabels",
      title: "CTA Labels",
      type: "object",
      fields: [
        defineField({
          name: "applyNow",
          title: "Apply Now",
          type: "string",
        }),
        defineField({
          name: "contactUs",
          title: "Contact Us",
          type: "string",
        }),
        defineField({
          name: "viewDetails",
          title: "View Details",
          type: "string",
        }),
      ],
    }),
  ],
});

