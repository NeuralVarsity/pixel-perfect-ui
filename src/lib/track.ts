// Privacy-conscious conversion events: no personal data. Pushes to dataLayer if an analytics tool is added later.
export function track(event: string, props: Record<string, string | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ||= []).push({ event, ...props });
}
