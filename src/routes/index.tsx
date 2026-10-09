import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Phone, Mail, ArrowRight, Loader2 } from "lucide-react";
import hero from "@/assets/hero.jpg";
import saree from "@/assets/saree.jpg";
import menswear from "@/assets/menswear.jpg";
import detail from "@/assets/detail.jpg";
import contemporary from "@/assets/contemporary.jpg";
import { submitLead, OCCASIONS, CATEGORIES, CONTACT_METHODS } from "@/lib/leads.functions";
import { track } from "@/lib/track";

const SITE = "https://amrinkhan.com";
const PHONE = "+91 98246 77719";
const PHONE_TEL = "+919824677719";
const EMAIL = "info@amrinkhan.com";
// Enable only after the brand confirms this number is active on WhatsApp.
const WHATSAPP_ENABLED = false;
const WA_MSG = encodeURIComponent(
  "Hello Amrin Khan team, I'd like to enquire about your couture collections for an upcoming occasion.",
);
const search = (q: string) => `${SITE}/search?q=${encodeURIComponent(q)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amrin Khan Couture — Designer Lehengas, Sarees & Bridal Wear" },
      {
        name: "description",
        content:
          "Book a private consultation with Amrin Khan. Explore designer lehengas, sarees, bridal couture and men's sherwanis for life's unforgettable occasions.",
      },
      { property: "og:title", content: "Amrin Khan — An Expression of Your Extraordinary" },
      {
        property: "og:description",
        content: "Designer couture for weddings, receptions and festive occasions. Request a private consultation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WOMEN = ["Lehengas", "Sarees", "Contemporary Wear", "Kurta Sets", "Jacket Sets", "Pant Sets", "Skirt Sets", "Gowns", "Anarkali Sets", "Jumpsuits"];
const MEN = ["Sherwani Sets", "Jacket Sets", "Kurta Sets"];
const COLLECTIONS = ["NAYAB", "KAHANIYAAN", "Tassavur", "Ibtida", "Ruksati", "Couture"];
const FEATURED = [
  { img: hero, title: "Lehengas", note: "Heirloom silhouettes for the bride and her celebrations.", q: "lehenga", cls: "md:col-span-2 md:row-span-2", w: 1920, h: 1088 },
  { img: saree, title: "Sarees", note: "Six yards, quietly embellished.", q: "saree", cls: "", w: 832, h: 1152 },
  { img: contemporary, title: "Contemporary Wear", note: "Capes, co-ords and modern drapes.", q: "contemporary", cls: "", w: 832, h: 1152 },
  { img: menswear, title: "Men's Wear", note: "Sherwani, jacket and kurta sets.", q: "sherwani", cls: "md:col-span-2", w: 832, h: 1152 },
];

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Collections />
        <Story />
        <Consultation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-ink-foreground md:px-10">
        <a href="#top" className="font-serif text-2xl tracking-[0.3em]">AMRIN KHAN</a>
        <div className="hidden gap-10 md:flex">
          {[["Collections", "#collections"], ["The Atelier", "#story"], ["Consultation", "#consult"], ["Contact", "#contact"]].map(([l, h]) => (
            <a key={h} href={h} className="eyebrow opacity-80 transition hover:opacity-100">{l}</a>
          ))}
        </div>
        <a href={SITE} target="_blank" rel="noreferrer" className="eyebrow border-b border-gold pb-1">Shop online</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden bg-ink text-ink-foreground">
      <img src={hero} alt="Bride in a burgundy lehenga with gold zardozi embroidery in a candlelit palace arch" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
        <p className="eyebrow rise text-gold">Designer Couture · Ahmedabad</p>
        <h1 className="rise mt-6 max-w-3xl text-5xl leading-[1.02] md:text-7xl lg:text-8xl" style={{ animationDelay: ".15s" }}>
          An expression of your <em className="text-gold">extraordinary.</em>
        </h1>
        <p className="rise mt-6 max-w-md text-lg opacity-85" style={{ animationDelay: ".3s" }}>
          Discover designer couture for life's most unforgettable occasions.
        </p>
        <div className="rise mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: ".45s" }}>
          <a href="#collections" className="btn-lux bg-ink-foreground text-ink hover:bg-gold">Explore the collections</a>
          <a href="#consult" onClick={() => track("cta_consultation", { from: "hero" })} className="btn-lux border-ink-foreground/60 hover:border-gold hover:text-gold">Book a private consultation</a>
        </div>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section id="collections" className="mx-auto max-w-7xl px-6 py-28 md:px-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-primary">The Collections</p>
          <h2 className="mt-4 text-4xl md:text-6xl">Dressed for the moments<br />that become memories.</h2>
        </div>
        <a href={SITE} target="_blank" rel="noreferrer" className="eyebrow flex items-center gap-2 border-b border-foreground/30 pb-1">View the full store <ArrowRight className="h-3 w-3" /></a>
      </div>

      <div className="mt-16 grid auto-rows-[340px] gap-4 md:grid-cols-4">
        {FEATURED.map((f) => (
          <a key={f.title} href={search(f.q)} target="_blank" rel="noreferrer" className={`group relative overflow-hidden bg-ink ${f.cls}`}>
            <img src={f.img} alt={`${f.title} by Amrin Khan`} loading="lazy" width={f.w} height={f.h} className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
              <h3 className="text-3xl">{f.title}</h3>
              <p className="mt-1 text-sm opacity-80">{f.note}</p>
              <span className="eyebrow mt-4 inline-block text-gold opacity-0 transition group-hover:opacity-100">Discover →</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-20 grid gap-12 border-t border-border pt-12 md:grid-cols-3">
        <CatList title="Women" items={WOMEN} />
        <CatList title="Men" items={MEN} />
        <div>
          <p className="eyebrow text-primary">Named Collections</p>
          <ul className="mt-6 space-y-3">
            {COLLECTIONS.map((c) => (
              <li key={c}><a href={search(c)} target="_blank" rel="noreferrer" className="font-serif text-2xl italic transition hover:text-primary">{c}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CatList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="eyebrow text-primary">{title}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {items.map((i) => (
          <li key={i}><a href={search(i)} target="_blank" rel="noreferrer" className="border-b border-transparent hover:border-primary">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}

function Story() {
  return (
    <section id="story" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:grid-cols-2 md:px-10">
        <img src={detail} alt="Close-up of gold zari and pearl hand embroidery on burgundy velvet" loading="lazy" width={1152} height={832} className="aspect-[4/5] w-full object-cover" />
        <div>
          <p className="eyebrow text-gold">The Private Couture Experience</p>
          <h2 className="mt-6 text-4xl leading-tight md:text-5xl">Where Indian craft meets <em>contemporary</em> elegance.</h2>
          <p className="mt-8 max-w-md leading-relaxed opacity-85">
            Every Amrin Khan piece begins with traditional Indian design — hand embroidery, rich textiles and considered silhouettes — reinterpreted for the way you celebrate today.
          </p>
          <p className="mt-4 max-w-md leading-relaxed opacity-85">
            Our team guides you personally through the collections, helping you find the piece that suits your occasion.
          </p>
          <a href="#consult" onClick={() => track("cta_consultation", { from: "story" })} className="btn-lux mt-10 border-gold text-gold hover:bg-gold hover:text-ink">Request a consultation</a>
        </div>
      </div>
    </section>
  );
}

type Status = { kind: "idle" } | { kind: "loading" } | { kind: "ok"; duplicate: boolean } | { kind: "error"; msg: string };

function Consultation() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "loading") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    for (const k of ["full_name", "phone", "email", "city", "country", "occasion", "category_interest", "contact_method", "preferred_language"]) if (!v[k]?.trim()) errs[k] = "Required";
    if (v.phone && !/^\+\d[\d\s-]{6,18}$/.test(v.phone.trim())) errs.phone = "Include country code, e.g. +91 98…";
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) errs.email = "Enter a valid email";
    if (!fd.get("consent")) errs.consent = "Please confirm consent";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus({ kind: "loading" });
    try {
      const campaign = new URLSearchParams(window.location.search).get("utm_campaign") ?? "";
      const res = await submitLead({ data: { ...v, consent: true, campaign } as never });
      setStatus({ kind: "ok", duplicate: res.duplicate });
      track("lead_submitted", { occasion: v.occasion, category: v.category_interest });
      form.reset();
    } catch {
      setStatus({ kind: "error", msg: "We couldn't send your inquiry. Please try again, or call us directly." });
    }
  }

  return (
    <section id="consult" className="mx-auto max-w-7xl px-6 py-28 md:px-10">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow text-primary">Private Consultation</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Your occasion deserves something exceptional.</h2>
          <p className="mt-6 max-w-sm text-muted-foreground">Tell us about your vision, and our team will help you explore the collections suited to your occasion.</p>
          <p className="mt-10 text-sm text-muted-foreground">Prefer to speak now?</p>
          <a href={`tel:${PHONE_TEL}`} onClick={() => track("cta_call", { from: "consult" })} className="mt-2 block font-serif text-2xl hover:text-primary">{PHONE}</a>
        </div>

        {status.kind === "ok" ? (
          <div role="status" className="flex flex-col justify-center border border-border bg-card p-12">
            <p className="eyebrow text-primary">Inquiry received</p>
            <h3 className="mt-4 text-4xl">Thank you.</h3>
            <p className="mt-4 text-muted-foreground">
              {status.duplicate
                ? "We already have your recent inquiry — our team will be in touch shortly."
                : "Your inquiry has been received. Our team will contact you through your preferred channel to arrange a consultation."}
            </p>
            <button onClick={() => setStatus({ kind: "idle" })} className="eyebrow mt-8 self-start border-b border-foreground/30 pb-1">Send another inquiry</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <Field label="Full name" name="full_name" err={errors.full_name} autoComplete="name" />
            <Field label="Phone (with country code)" name="phone" type="tel" placeholder="+91" err={errors.phone} autoComplete="tel" />
            <Field label="Email" name="email" type="email" err={errors.email} autoComplete="email" />
            <Field label="City" name="city" err={errors.city} autoComplete="address-level2" />
            <Field label="Country" name="country" err={errors.country} autoComplete="country-name" />
            <SelectField label="Occasion" name="occasion" options={OCCASIONS} err={errors.occasion} />
            <SelectField label="Interested in" name="category_interest" options={CATEGORIES} err={errors.category_interest} />
            <SelectField label="Preferred collection (optional)" name="collection_interest" options={COLLECTIONS} optional />
            <Field label="Event date (optional)" name="event_date" type="date" />
            <SelectField label="Approximate budget (optional)" name="budget_range" options={BUDGETS} optional />
            <SelectField label="Preferred contact" name="contact_method" options={CONTACT_METHODS} err={errors.contact_method} />
            <SelectField label="Preferred language" name="preferred_language" options={["English", "Hindi", "Gujarati", "Urdu", "Other"]} err={errors.preferred_language} />
            <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
              <input type="checkbox" name="consent" className="mt-1 accent-[var(--primary)]" />
              <span>I agree to be contacted by Amrin Khan about this inquiry. My details are used only to respond and are never sold.{errors.consent && <span className="block text-destructive">{errors.consent}</span>}</span>
            </label>
            {status.kind === "error" && <p role="alert" className="text-sm text-destructive sm:col-span-2">{status.msg}</p>}
            <button type="submit" disabled={status.kind === "loading"} className="btn-lux bg-primary text-primary-foreground hover:bg-ink disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
              {status.kind === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : "Request consultation"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

const BUDGETS = ["Under ₹1,00,000", "₹1,00,000 – ₹3,00,000", "₹3,00,000 – ₹6,00,000", "Above ₹6,00,000", "Prefer to discuss"];

function Field({ label, name, err, ...rest }: { label: string; name: string; err?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <input name={name} aria-invalid={!!err} className="field" {...rest} />
      {err && <span className="mt-1 block text-xs text-destructive">{err}</span>}
    </label>
  );
}

function SelectField({ label, name, options, err, optional }: { label: string; name: string; options: readonly string[]; err?: string; optional?: boolean }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <select name={name} defaultValue="" aria-invalid={!!err} className="field">
        <option value="" disabled={!optional}>{optional ? "—" : "Select"}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {err && <span className="mt-1 block text-xs text-destructive">{err}</span>}
    </label>
  );
}

const FAQ = [
  ["How does a private consultation work?", "Share your occasion and preferences through the form. Our team will reach out on your preferred channel to discuss suitable pieces from the collections."],
  ["Can I shop online?", "Yes — the complete catalogue is available on the official Amrin Khan store at amrinkhan.com."],
  ["Where can I read delivery and return policies?", "Please refer to the policy pages on amrinkhan.com, or ask our team during your consultation."],
];

function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:px-10">
        <div>
          <p className="eyebrow text-primary">Questions</p>
          <div className="mt-8 divide-y divide-border">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between font-serif text-xl">{q}<span className="text-primary transition group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-primary">Speak with us</p>
          <div className="mt-8 space-y-6">
            <a href={`tel:${PHONE_TEL}`} onClick={() => track("cta_call", { from: "contact" })} className="flex items-center gap-4 font-serif text-2xl hover:text-primary"><Phone className="h-5 w-5 text-gold" />Request a call · {PHONE}</a>
            <a href={`mailto:${EMAIL}`} onClick={() => track("cta_email")} className="flex items-center gap-4 font-serif text-2xl hover:text-primary"><Mail className="h-5 w-5 text-gold" />{EMAIL}</a>
            {WHATSAPP_ENABLED && (
              <a href={`https://wa.me/${PHONE_TEL.slice(1)}?text=${WA_MSG}`} target="_blank" rel="noreferrer" onClick={() => track("cta_whatsapp")} className="block font-serif text-2xl hover:text-primary">Enquire on WhatsApp</a>
            )}
            <a href="#consult" className="btn-lux mt-4 bg-primary text-primary-foreground hover:bg-ink">Book a private consultation</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-serif text-3xl tracking-[0.3em]">AMRIN KHAN</p>
          <p className="mt-3 text-sm opacity-60">An expression of your extraordinary.</p>
        </div>
        <div className="flex flex-wrap gap-8 eyebrow opacity-70">
          <a href={SITE} target="_blank" rel="noreferrer">Official store</a>
          <a href={`${SITE}/policies/privacy-policy`} target="_blank" rel="noreferrer">Privacy</a>
          <a href={`mailto:${EMAIL}`}>Email</a>
        </div>
      </div>
      <p className="border-t border-ink-foreground/10 py-6 text-center text-xs opacity-40">© {new Date().getFullYear()} Amrin Khan. All rights reserved.</p>
    </footer>
  );
}
