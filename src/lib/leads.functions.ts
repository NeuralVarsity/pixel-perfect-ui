import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const OCCASIONS = ["Wedding", "Reception", "Engagement", "Festive", "Formal Event", "Other"] as const;
export const CATEGORIES = ["Lehenga", "Saree", "Men's Wear", "Contemporary Wear", "Bespoke Inquiry", "Other"] as const;
export const CONTACT_METHODS = ["Phone", "WhatsApp", "Email"] as const;

const clean = (max: number) => z.string().trim().max(max).transform((s) => s.replace(/[<>]/g, ""));

export const leadSchema = z.object({
  full_name: clean(100).pipe(z.string().min(2, "Please enter your name")),
  phone: z.string().trim().regex(/^\+\d[\d\s-]{6,18}$/, "Include country code, e.g. +91 98..."),
  email: z.string().trim().email("Enter a valid email").max(255),
  city: clean(80).pipe(z.string().min(1, "Required")),
  country: clean(80).pipe(z.string().min(1, "Required")),
  occasion: z.enum(OCCASIONS),
  category_interest: z.enum(CATEGORIES),
  collection_interest: clean(80).optional().or(z.literal("")),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  budget_range: clean(60).optional().or(z.literal("")),
  contact_method: z.enum(CONTACT_METHODS),
  preferred_language: clean(40).pipe(z.string().min(1, "Required")),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  campaign: clean(80).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export type LeadInput = z.input<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => leadSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const, duplicate: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();

    // Duplicate / rate limit: same email within last 10 minutes
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count, error: cErr } = await supabaseAdmin
      .from("fashion_leads")
      .select("id", { count: "exact", head: true })
      .ilike("email", email)
      .gte("created_at", since);
    if (cErr) throw new Error("We couldn't save your inquiry. Please try again.");
    if ((count ?? 0) > 0) return { ok: true as const, duplicate: true };

    const row = {
      full_name: data.full_name,
      phone: data.phone,
      email,
      city: data.city,
      country: data.country,
      occasion: data.occasion,
      category_interest: data.category_interest,
      collection_interest: data.collection_interest || null,
      event_date: data.event_date || null,
      budget_range: data.budget_range || null,
      contact_method: data.contact_method,
      preferred_language: data.preferred_language,
      consent: true,
      lead_source: "landing_page",
      campaign: data.campaign || null,
    };
    const { data: inserted, error } = await supabaseAdmin
      .from("fashion_leads")
      .insert(row)
      .select("id")
      .single();
    if (error || !inserted) throw new Error("We couldn't save your inquiry. Please try again.");

    // Optional n8n automation — only if configured
    const hook = process.env["N8N_WEBHOOK_URL"];
    if (hook) {
      try {
        const res = await fetch(hook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env["N8N_WEBHOOK_SECRET"] ? { "X-Webhook-Secret": process.env["N8N_WEBHOOK_SECRET"] } : {}),
            "Idempotency-Key": inserted.id,
          },
          body: JSON.stringify({ id: inserted.id, ...row }),
        });
        if (!res.ok) throw new Error(`n8n ${res.status}`);
        await supabaseAdmin.from("fashion_leads").update({ lead_status: "automation_sent" }).eq("id", inserted.id);
      } catch (e) {
        await supabaseAdmin
          .from("fashion_leads")
          .update({ automation_error: String(e).slice(0, 500) })
          .eq("id", inserted.id);
      }
    }
    return { ok: true as const, duplicate: false };
  });
