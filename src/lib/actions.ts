'use server';

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "./supabaseClient";
import type { Locale } from "./i18n";

export async function submitApplication(formData: FormData) {
  const locale = (formData.get("locale") as Locale) ?? "en";
  const fullName = String(formData.get("fullName") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const business = String(formData.get("business") ?? "");
  const budget = String(formData.get("budget") ?? "");
  const message = String(formData.get("message") ?? "");
  const sourcePage = String(formData.get("sourcePage") ?? "");

  const client = getSupabaseServerClient();

  await client.from("leads_applications").insert({
    full_name: fullName,
    email,
    phone,
    business,
    budget,
    message,
    locale,
    source_page: sourcePage,
  });

  redirect(`/${locale}/thank-you/application`);
}

export async function submitContact(formData: FormData) {
  const locale = (formData.get("locale") as Locale) ?? "en";
  const fullName = String(formData.get("fullName") ?? "");
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "");

  const client = getSupabaseServerClient();

  await client.from("leads_contacts").insert({
    full_name: fullName,
    email,
    message,
    locale,
  });

  redirect(`/${locale}/thank-you/contact`);
}

export async function submitCaseStudyAccess(formData: FormData) {
  const locale = (formData.get("locale") as Locale) ?? "en";
  const niche = String(formData.get("niche") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const fullName = String(formData.get("fullName") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const business = String(formData.get("business") ?? "");

  const token = crypto.randomUUID();

  const client = getSupabaseServerClient();

  await client.from("case_study_access").insert({
    token,
    full_name: fullName,
    email,
    phone,
    business,
    locale,
    niche,
    slug,
  });

  redirect(`/${locale}/case-studies/${niche}/${slug}?token=${token}`);
}

