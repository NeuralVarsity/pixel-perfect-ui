import * as React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type LuxVariant = "couture" | "ivory" | "editorial" | "glass" | "text";

type Common = { variant?: LuxVariant; arrow?: boolean; loading?: boolean; className?: string; children: React.ReactNode };
type AsLink = Common & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = Common & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function onGlassMove(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function LuxButton(props: AsLink | AsButton) {
  const { variant = "couture", arrow, loading, className, children, ...rest } = props;
  const cls = cn("btn", `btn-${variant}`, className);
  const inner = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      <span>{children}</span>
      {arrow && !loading && <ArrowRight className="btn-arrow h-3.5 w-3.5" aria-hidden="true" />}
    </>
  );
  const glass = variant === "glass" ? { onPointerMove: onGlassMove } : {};
  if (typeof props.href === "string") {
    return (
      <a className={cls} {...glass} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} aria-busy={loading || undefined} {...glass} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
