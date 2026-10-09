import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE, LINKS } from "@/config/brand";
import { LuxButton } from "./LuxButton";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

const NAV: { label: string; href: string; external?: boolean }[] = [
  { label: "Collections", href: "#collections" },
  { label: "Bridal Couture", href: `${SITE}/couture-`, external: true },
  { label: "Sarees", href: `${SITE}/womens-wear/saree`, external: true },
  { label: "Men's Wear", href: LINKS.mens, external: true },
  { label: "Our Story", href: LINKS.story, external: true },
];
const ext = (e?: boolean) => (e ? { target: "_blank", rel: "noreferrer" } : {});

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuBtnRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-40 border-b text-ink-foreground transition-all duration-500",
        scrolled ? "border-ink-foreground/10 bg-ink/90 backdrop-blur-md" : "border-transparent bg-transparent")}>
        <nav aria-label="Primary" className={cn("mx-auto flex max-w-[1500px] items-center justify-between px-6 transition-all duration-500 md:px-12", scrolled ? "py-3" : "py-6")}>
          <a href="#top" className="font-serif text-xl tracking-[0.32em] md:text-2xl" aria-label="Amrin Khan — back to top">AMRIN KHAN</a>
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV.map((n) => (
              <li key={n.label}><a href={n.href} {...ext(n.external)} className="eyebrow opacity-80 transition hover:text-gold hover:opacity-100">{n.label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <LuxButton href="#consult" variant="glass" className="hidden !min-h-11 !px-6 md:inline-flex" onClick={() => track("cta_consultation", { from: "nav" })}>Private Appointment</LuxButton>
            <button ref={menuBtnRef} type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-nav" className="grid h-11 w-11 place-items-center lg:hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <div id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu" data-open={open} className="drawer fixed inset-0 z-50 flex flex-col bg-oxblood text-ink-foreground lg:hidden">
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-serif text-xl tracking-[0.32em]">AMRIN KHAN</span>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center border border-ink-foreground/25 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold">
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-6 px-8">
          {NAV.map((n, i) => (
            <li key={n.label} className={cn("transition-all duration-700", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")} style={{ transitionDelay: `${120 + i * 60}ms` }}>
              <a href={n.href} {...ext(n.external)} onClick={() => setOpen(false)} className="display text-4xl hover:text-gold">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="px-8 pb-10">
          <LuxButton href="#consult" variant="ivory" arrow className="w-full" onClick={() => { setOpen(false); track("cta_consultation", { from: "drawer" }); }}>Private Appointment</LuxButton>
        </div>
      </div>
    </>
  );
}
