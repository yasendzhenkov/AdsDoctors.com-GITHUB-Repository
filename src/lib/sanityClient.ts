import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId: projectId || "",
  dataset,
  apiVersion: "2025-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

