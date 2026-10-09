import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Phone, Mail, Plus, Check } from "lucide-react";
import { SITE, PHONE, PHONE_TEL, EMAIL, WHATSAPP, whatsappUrl, LINKS, WOMEN, MEN, COLLECTIONS, IMAGES, SOCIAL, type BrandImage } from "@/config/brand";
import { submitLead, OCCASIONS, CATEGORIES, CONTACT_METHODS } from "@/lib/leads.functions";
import { track } from "@/lib/track";
import { LuxButton } from "@/components/lux/LuxButton";
import { Reveal } from "@/components/lux/Reveal";
import { SiteHeader } from "@/components/lux/SiteHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amrin Khan Couture — Designer Lehengas, Sarees & Bridal Wear" },
      {
        name: "description",
        content:
          "Book a private appointment with Amrin Khan. Explore designer lehengas, sarees, bridal couture and men's sherwanis for life's unforgettable occasions.",
      },
      { property: "og:title", content: "Amrin Khan — An Expression of Your Extraordinary" },
      { property: "og:description", content: "Designer couture for weddings, receptions and festive occasions. Request a private appointment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: IMAGES.heroDesktop.src, media: "(min-width: 768px)", fetchPriority: "high" } as never],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      <a href="#collections" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink-foreground focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <SiteHeader />
      <main>
        <Hero />
        <Categories />
        <NamedCollections />
        <Craft />
        <Consultation />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Image helper ---------- */
function Photo({ img, className, eager, sizes }: { img: BrandImage; className?: string; eager?: boolean; sizes?: string }) {
  return (
    <img
      src={img.src}
      alt={img.alt}
      width={img.w}
      height={img.h}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={img.position ? { objectPosition: img.position } : undefined}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = imgRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        el.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1.06 - y * 0.00004})`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-ink-foreground">
      <div ref={imgRef} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.06)" }}>
        <picture>
          <source media="(min-width: 768px)" srcSet={IMAGES.heroDesktop.src} width={IMAGES.heroDesktop.w} height={IMAGES.heroDesktop.h} />
          <img
            src={IMAGES.heroMobile.src}
            alt={IMAGES.heroDesktop.alt}
            width={IMAGES.heroMobile.w}
            height={IMAGES.heroMobile.h}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[50%_30%]"
          />
        </picture>
      </div>
      <div className="hero-overlay absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-20 pt-40 md:px-12 md:pb-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <p className="eyebrow rise text-gold">Amrin Khan · Couture</p>
            <h1 className="display rise mt-6 text-[11.5vw] sm:text-7xl lg:text-[5.6rem] xl:text-[7rem] 2xl:text-[8rem]" style={{ animationDelay: ".15s" }}>
              An expression<br />of your <em className="whitespace-nowrap text-gold">extraordinary.</em>
            </h1>
          </div>
          <div className="rise lg:pb-4" style={{ animationDelay: ".4s" }}>
            <p className="max-w-sm text-base leading-relaxed opacity-85 md:text-lg">
              Discover designer couture created for life's most unforgettable moments.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <LuxButton href="#collections" variant="ivory" arrow>Discover the collection</LuxButton>
              <LuxButton href="#consult" variant="glass" onClick={() => track("cta_consultation", { from: "hero" })}>Book a private appointment</LuxButton>
            </div>
          </div>
        </div>
      </div>

      <a href="#collections" aria-label="Scroll to collections" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="eyebrow text-[0.6rem] opacity-70">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ink-foreground/20"><span className="scroll-cue absolute inset-0 bg-gold" /></span>
      </a>
    </section>
  );
}

/* ---------- Categories: editorial alternating layout ---------- */
const FEATURED = [
  { img: IMAGES.lehenga, no: "01", label: "Women's Wear", title: "Lehengas", note: "For the bride and her celebrations.", href: `${SITE}/womens-wear/lehenga` },
  { img: IMAGES.saree, no: "02", label: "Women's Wear", title: "Sarees", note: "Occasion sarees, considered drapes.", href: `${SITE}/womens-wear/saree` },
  { img: IMAGES.contemporary, no: "03", label: "Women's Wear", title: "Contemporary", note: "Modern silhouettes with an old-world soul.", href: `${SITE}/womens-wear/contemporary` },
  { img: IMAGES.sherwani, no: "04", label: "Men's Wear", title: "Men's Wear", note: "Sherwani, jacket and kurta sets.", href: LINKS.mens },
];

function Categories() {
  return (
    <section id="collections" className="relative bg-background">
      <div className="mx-auto max-w-[1500px] px-6 pt-28 md:px-12 md:pt-40">
        <Reveal className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow text-primary">The Collections</p>
            <h2 className="display mt-6 text-5xl md:text-8xl">Dressed for moments<br /><em className="text-primary">that become memory.</em></h2>
          </div>
          <LuxButton href={LINKS.collections} target="_blank" rel="noreferrer" variant="text" arrow className="text-foreground">All collections</LuxButton>
        </Reveal>
      </div>

      <div className="mx-auto mt-20 max-w-[1500px] space-y-24 px-6 pb-28 md:mt-28 md:space-y-40 md:px-12 md:pb-40">
        {FEATURED.map((f, i) => (
          <article key={f.title} className={cn("grid items-center gap-8 md:grid-cols-12 md:gap-12", i % 2 && "md:[&>*:first-child]:order-2")}>
            <Reveal img className={cn("min-w-0 md:col-span-7", i % 2 ? "md:col-start-6" : "")}>
              <a href={f.href} target="_blank" rel="noreferrer" className="group block overflow-hidden bg-ink" aria-label={`Explore ${f.title}`}>
                <div className="aspect-[4/3] max-w-[600px] overflow-hidden md:max-w-none">
                  <Photo img={f.img} sizes="(min-width: 768px) 600px, 100vw" className="img-zoom group-hover:scale-[1.04]" />
                </div>
              </a>
            </Reveal>
            <Reveal className={cn("min-w-0 md:col-span-5", i % 2 ? "md:pr-8" : "md:pl-8")} delay={150}>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-sm italic text-gold">{f.no}</span>
                <span className="eyebrow text-muted-foreground">{f.label}</span>
              </div>
              <h3 className="display mt-5 text-6xl md:text-7xl">{f.title}</h3>
              <p className="mt-5 max-w-xs text-muted-foreground">{f.note}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LuxButton href={f.href} target="_blank" rel="noreferrer" variant="text" arrow className="text-foreground">Explore</LuxButton>
              </div>
            </Reveal>
          </article>
        ))}

        <Reveal className="grid gap-12 border-t border-border pt-14 md:grid-cols-2">
          <CatList title="Women" items={WOMEN} />
          <CatList title="Men" items={MEN} />
        </Reveal>
      </div>
    </section>
  );
}

function CatList({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <p className="eyebrow text-primary">{title}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1">
        {items.map(([i, path]) => (
          <li key={i + path}>
            <a href={`${SITE}${path}`} target="_blank" rel="noreferrer" className="group flex min-h-11 items-center justify-between border-b border-border py-2 font-serif text-lg transition hover:text-primary">
              {i}<span className="text-gold opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Named collections ---------- */
const NAMED_IMG: Record<string, BrandImage> = { Ruksati: IMAGES.ruksati, Couture: IMAGES.couture, Ibtida: IMAGES.ibtida };

function NamedCollections() {
  const withImg = COLLECTIONS.filter(([c]) => NAMED_IMG[c]);
  const textOnly = COLLECTIONS.filter(([c]) => !NAMED_IMG[c]);
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-40">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-gold">Named Collections</p>
            <h2 className="display mt-6 text-5xl md:text-7xl">Stories, <em>in thread.</em></h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          {withImg.map(([c, path], i) => (
            <Reveal key={c} img delay={i * 120} className={cn(i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5")}>
              <a href={`${SITE}${path}`} target="_blank" rel="noreferrer" className="group relative block h-full overflow-hidden">
                <div className={cn("overflow-hidden", i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[16/10]")}>
                  <Photo img={NAMED_IMG[c]!} sizes="(min-width: 768px) 800px, 100vw" className="img-zoom group-hover:scale-[1.04]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                  <h3 className="display text-4xl md:text-5xl">{c}</h3>
                  <span className="eyebrow text-gold transition group-hover:translate-x-1">Explore →</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-baseline gap-x-12 gap-y-4 border-t border-ink-foreground/10 pt-10">
          <span className="eyebrow text-stone">Also discover</span>
          {textOnly.map(([c, path]) => (
            <a key={c} href={`${SITE}${path}`} target="_blank" rel="noreferrer" className="display text-4xl italic transition hover:text-gold md:text-5xl">{c}</a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Craftsmanship (verified copy from amrinkhan.com/ourstory) ---------- */
function Craft() {
  return (
    <section id="story" className="overflow-hidden bg-background">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:pt-16">
            <p className="eyebrow text-primary">Craftsmanship · Since 2007</p>
            <h2 className="display mt-6 text-5xl md:text-7xl">The art of exceptional <em className="text-primary">couture.</em></h2>
            <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
              Vadodara-based designer Amrin Khan creates bespoke, glamorous and elegant clothing for men and women — drawing on the timeless elegance of old-world charm, with a contemporary twist.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              Her designs weave together indigenous craft techniques, flattering silhouettes and meticulously detailed drapery, across couture, prêt-à-porter and occasion wear.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <LuxButton href="#consult" variant="couture" arrow onClick={() => track("cta_consultation", { from: "craft" })}>Book an appointment</LuxButton>
              <LuxButton href={LINKS.story} target="_blank" rel="noreferrer" variant="text" arrow className="text-foreground">Our story</LuxButton>
            </div>
          </Reveal>
          <div className="relative md:col-span-7">
            <Reveal img className="aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <Photo img={IMAGES.craftWide} sizes="(min-width: 768px) 60vw, 100vw" />
            </Reveal>
            <Reveal img delay={250} className="absolute -bottom-10 -left-6 hidden w-[46%] overflow-hidden border-8 border-background md:block lg:-left-20">
              <div className="aspect-[4/3]"><Photo img={IMAGES.galicha} sizes="400px" /></div>
            </Reveal>
          </div>
        </div>
      </div>
      <Reveal img className="h-[60svh] min-h-[360px] overflow-hidden">
        <Photo img={IMAGES.craftGroup} sizes="100vw" />
      </Reveal>
    </section>
  );
}

/* ---------- Consultation (logic unchanged) ---------- */
type Status = { kind: "idle" } | { kind: "loading" } | { kind: "ok" } | { kind: "error"; msg: string };

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
    if (v["phone"] && !/^\+\d[\d\s-]{6,18}$/.test(v["phone"].trim())) errs["phone"] = "Include country code, e.g. +91 98…";
    if (v["email"] && !/^\S+@\S+\.\S+$/.test(v["email"])) errs["email"] = "Enter a valid email";
    if (!fd.get("consent")) errs["consent"] = "Please confirm consent";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus({ kind: "loading" });
    try {
      const campaign = new URLSearchParams(window.location.search).get("utm_campaign") ?? "";
      const res = await submitLead({ data: { ...v, consent: true, campaign } as never });
      if (!res.ok) {
        setStatus({
          kind: "error",
          msg: res.reason === "duplicate"
            ? "We've already received this exact inquiry in the last few minutes — no need to resend. Our team will be in touch. To add details, please call or email us."
            : "You've sent several inquiries in a short time. Please wait a few minutes, or call or email us directly.",
        });
        return;
      }
      setStatus({ kind: "ok" });
      track("lead_submitted", { occasion: v["occasion"], category: v["category_interest"] });
      form.reset();
    } catch {
      setStatus({ kind: "error", msg: "We couldn't send your inquiry. Please try again, or call us directly." });
    }
  }

  return (
    <section id="consult" className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-gold/30 lg:left-[40%] lg:block" />
      <div className="relative mx-auto grid max-w-[1500px] gap-16 px-6 py-28 md:px-12 md:py-40 lg:grid-cols-[1fr_1.45fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow text-gold">Private Appointment</p>
          <h2 className="display mt-6 text-5xl md:text-7xl">Your occasion.<br />Your vision.<br /><em className="text-gold">Your couture.</em></h2>
          <p className="mt-8 max-w-sm leading-relaxed opacity-80">Begin a personal consultation to explore the collections suited to your occasion and individual style.</p>
          <div className="mt-12 space-y-4 border-t border-gold/25 pt-8">
            <p className="eyebrow opacity-60">Prefer to speak now?</p>
            <a href={`tel:${PHONE_TEL}`} onClick={() => track("cta_call", { from: "consult" })} className="flex min-h-11 items-center gap-3 font-serif text-2xl hover:text-gold"><Phone className="h-4 w-4 text-gold" />{PHONE}</a>
            <a href={`mailto:${EMAIL}`} onClick={() => track("cta_email", { from: "consult" })} className="flex min-h-11 items-center gap-3 font-serif text-2xl hover:text-gold"><Mail className="h-4 w-4 text-gold" />{EMAIL}</a>
          </div>
        </Reveal>

        {status.kind === "ok" ? (
          <div role="status" className="flex flex-col justify-center border border-gold/30 p-10 md:p-16">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-gold text-gold"><Check className="h-5 w-5" /></span>
            <p className="eyebrow mt-8 text-gold">Inquiry received</p>
            <h3 className="display mt-4 text-5xl">Thank you.</h3>
            <p className="mt-4 max-w-md opacity-80">Your inquiry has been received. Our team will contact you through your preferred channel to arrange a consultation.</p>
            <div className="mt-10"><LuxButton variant="editorial" onClick={() => setStatus({ kind: "idle" })}>Send another inquiry</LuxButton></div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-x-10 gap-y-8 sm:grid-cols-2" aria-describedby={status.kind === "error" ? "form-error" : undefined}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <Field label="Full name" name="full_name" err={errors["full_name"]} autoComplete="name" required />
            <Field label="Phone (with country code)" name="phone" type="tel" placeholder="+91" err={errors["phone"]} autoComplete="tel" required />
            <Field label="Email" name="email" type="email" err={errors["email"]} autoComplete="email" required />
            <Field label="City" name="city" err={errors["city"]} autoComplete="address-level2" required />
            <Field label="Country" name="country" err={errors["country"]} autoComplete="country-name" required />
            <SelectField label="Occasion" name="occasion" options={OCCASIONS} err={errors["occasion"]} />
            <SelectField label="Interested in" name="category_interest" options={CATEGORIES} err={errors["category_interest"]} />
            <SelectField label="Preferred collection" name="collection_interest" options={COLLECTIONS.map(([c]) => c)} optional />
            <Field label="Event date" name="event_date" type="date" optional />
            <SelectField label="Approximate budget" name="budget_range" options={BUDGETS} optional />
            <SelectField label="Preferred contact" name="contact_method" options={CONTACT_METHODS} err={errors["contact_method"]} />
            <SelectField label="Preferred language" name="preferred_language" options={["English", "Hindi", "Gujarati", "Urdu", "Other"]} err={errors["preferred_language"]} />
            <label className="group flex cursor-pointer items-start gap-4 text-sm sm:col-span-2">
              <input type="checkbox" name="consent" aria-invalid={!!errors["consent"]} className="peer sr-only" />
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-gold/60 transition peer-checked:bg-gold peer-checked:[&>svg]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                <Check className="h-3.5 w-3.5 text-ink opacity-0" />
              </span>
              <span className="opacity-80">
                I agree to be contacted by Amrin Khan about this inquiry. My details are used only to respond and are never sold. <a href={LINKS.privacy} target="_blank" rel="noreferrer" className="underline decoration-gold/60 underline-offset-4">Privacy policy</a>
                {errors["consent"] && <span className="mt-1 block text-error-soft">{errors["consent"]}</span>}
              </span>
            </label>
            {status.kind === "error" && <p id="form-error" role="alert" className="border-l border-error-soft pl-4 text-sm text-error-soft sm:col-span-2">{status.msg}</p>}
            <div className="sm:col-span-2">
              <LuxButton type="submit" variant="ivory" arrow loading={status.kind === "loading"} disabled={status.kind === "loading"} className="w-full sm:w-auto sm:min-w-[300px]">
                {status.kind === "loading" ? "Sending" : "Request appointment"}
              </LuxButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

const BUDGETS = ["Under ₹1,00,000", "₹1,00,000 – ₹3,00,000", "₹3,00,000 – ₹6,00,000", "Above ₹6,00,000", "Prefer to discuss"];

function Label({ text, optional }: { text: string; optional?: boolean | undefined }) {
  return (
    <span className="flex items-baseline justify-between">
      <span className="eyebrow text-[0.62rem] opacity-70">{text}</span>
      {optional && <span className="font-serif text-xs italic opacity-50">Optional</span>}
    </span>
  );
}

function Field({ label, name, err, optional, ...rest }: { label: string; name: string; err?: string | undefined; optional?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <Label text={label} optional={optional} />
      <input name={name} aria-invalid={!!err} aria-describedby={err ? `${name}-err` : undefined} className="field" {...rest} />
      {err && <span id={`${name}-err`} className="mt-2 block text-xs text-error-soft">{err}</span>}
    </label>
  );
}

function SelectField({ label, name, options, err, optional }: { label: string; name: string; options: readonly string[]; err?: string | undefined; optional?: boolean }) {
  return (
    <label className="block">
      <Label text={label} optional={optional} />
      <div className="relative">
        <select name={name} defaultValue="" aria-invalid={!!err} aria-describedby={err ? `${name}-err` : undefined} className="field cursor-pointer appearance-none pr-8">
          <option value="" disabled={!optional}>{optional ? "—" : "Select"}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gold" aria-hidden="true">⌄</span>
      </div>
      {err && <span id={`${name}-err`} className="mt-2 block text-xs text-error-soft">{err}</span>}
    </label>
  );
}

/* ---------- FAQ (summarised from amrinkhan.com/faqs) ---------- */
const FAQ: [string, string][] = [
  ["Can I customise or personalise my order?", "Yes. Amrin Khan offers customisation — submit an inquiry or contact the team for guidance and availability."],
  ["Can I modify or cancel an order?", "Orders enter production immediately once placed, so cancellations or changes can't be accommodated."],
  ["Do you ship internationally?", "Domestic shipping within India is complimentary. International orders are not currently accepted; delivery to an address in India is possible."],
  ["What is the estimated delivery time?", "Orders typically arrive within 4 to 6 weeks."],
  ["What about returns and exchanges?", "Please refer to the official returns & exchange policy on amrinkhan.com, or ask our team."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="contact" className="bg-background">
      <div className="mx-auto grid max-w-[1500px] gap-16 px-6 py-28 md:px-12 md:py-40 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <p className="eyebrow text-primary">Questions</p>
          <h2 className="display mt-6 text-5xl md:text-6xl">Before you <em className="text-primary">begin.</em></h2>
          <div className="mt-10"><LuxButton href={LINKS.faqs} target="_blank" rel="noreferrer" variant="text" arrow className="text-foreground">All FAQs</LuxButton></div>
        </Reveal>
        <Reveal>
          <ul className="border-t border-border">
            {FAQ.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <li key={q} className="border-b border-border">
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-btn-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left font-serif text-2xl transition hover:text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold md:text-3xl">
                      {q}
                      <Plus className={cn("h-5 w-5 shrink-0 text-gold transition-transform duration-500", isOpen && "rotate-45")} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className="faq-panel" data-open={isOpen}>
                    <div className="overflow-hidden"><p className="max-w-xl pb-8 leading-relaxed text-muted-foreground">{a}</p></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1500px] px-6 pt-24 md:px-12">
        <div className="flex flex-col justify-between gap-10 border-b border-ink-foreground/10 pb-16 md:flex-row md:items-end">
          <h2 className="display text-5xl md:text-7xl">Begin your <em className="text-gold">couture.</em></h2>
          <div className="flex flex-wrap gap-3">
            <LuxButton href="#consult" variant="couture" arrow onClick={() => track("cta_consultation", { from: "footer" })}>Private appointment</LuxButton>
            {WHATSAPP.enabled && (
              <LuxButton href={whatsappUrl()} target="_blank" rel="noreferrer" variant="glass" onClick={() => track("cta_whatsapp")}>Enquire on WhatsApp</LuxButton>
            )}
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl tracking-[0.32em]">AMRIN KHAN</p>
            <p className="mt-4 max-w-xs text-sm opacity-60">An expression of your extraordinary.</p>
          </div>
          <FooterCol title="Collections" links={[["Women's Wear", LINKS.womens], ["Men's Wear", LINKS.mens], ["Lehengas", `${SITE}/womens-wear/lehenga`], ["Sarees", `${SITE}/womens-wear/saree`], ["All collections", LINKS.collections]]} />
          <div>
            <p className="eyebrow text-gold">Contact</p>
            <ul className="mt-6 space-y-3 text-sm opacity-80">
              <li><a href={`tel:${PHONE_TEL}`} onClick={() => track("cta_call", { from: "footer" })} className="hover:text-gold">{PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`} onClick={() => track("cta_email", { from: "footer" })} className="hover:text-gold">{EMAIL}</a></li>
              <li><a href={LINKS.contact} target="_blank" rel="noreferrer" className="hover:text-gold">Store locations</a></li>
            </ul>
          </div>
          <FooterCol title="Information" links={[["Our story", LINKS.story], ["FAQs", LINKS.faqs], ["Returns & exchange", LINKS.returns], ["Privacy policy", LINKS.privacy], ["Terms & conditions", LINKS.terms]]} />
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-ink-foreground/10 py-8 text-xs opacity-50 md:flex-row">
          <p>© {new Date().getFullYear()} Amrin Khan. All rights reserved.</p>
          <div className="flex gap-6">
            {SOCIAL.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" className="hover:text-gold">{n}</a>)}
            <a href={SITE} target="_blank" rel="noreferrer" className="hover:text-gold">amrinkhan.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="eyebrow text-gold">{title}</p>
      <ul className="mt-6 space-y-3 text-sm opacity-80">
        {links.map(([l, h]) => <li key={l}><a href={h} target="_blank" rel="noreferrer" className="hover:text-gold">{l}</a></li>)}
      </ul>
    </div>
  );
}
