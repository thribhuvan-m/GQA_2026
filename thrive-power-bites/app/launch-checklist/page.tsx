import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";
import { site } from "@/config/site";
import { getLaunchChecklist } from "@/lib/launch-checklist";

export const metadata: Metadata = {
  title: "Launch checklist (internal)",
  robots: { index: false, follow: false },
};

export default function LaunchChecklistPage() {
  if (site.launched) notFound();

  const items = getLaunchChecklist();
  const done = items.filter((i) => i.done).length;
  const areas = [...new Set(items.map((i) => i.area))];

  return (
    <div className="container-page max-w-4xl py-12 sm:py-16">
      <p className="eyebrow">Internal · not linked from the site</p>
      <h1 className="heading-lg mt-3">Launch checklist</h1>
      <p className="lead mt-4">
        Everything below must be verified before accepting orders or publishing final labels. Items are generated from the
        configuration in <code className="rounded bg-beige/60 px-1.5 py-0.5 text-sm">config/</code>. This page disappears once{" "}
        <code className="rounded bg-beige/60 px-1.5 py-0.5 text-sm">site.launched</code> is set to true.
      </p>
      <p className="mt-6 text-sm font-bold">
        {done} of {items.length} complete
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-beige">
        <div className="h-full rounded-full bg-leaf" style={{ width: `${(done / items.length) * 100}%` }} />
      </div>

      <div className="mt-10 space-y-8">
        {areas.map((area) => (
          <section key={area} aria-labelledby={`area-${area}`}>
            <h2 id={`area-${area}`} className="heading-md">{area}</h2>
            <ul className="mt-3 divide-y divide-forest/8 rounded-2xl border border-forest/10 bg-white/70">
              {items
                .filter((i) => i.area === area)
                .map((i) => (
                  <li key={i.item} className="flex items-start gap-3 px-5 py-4">
                    {i.done ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-label="Done" />
                    ) : (
                      <Circle className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-label="Pending verification" />
                    )}
                    <div>
                      <p className="font-semibold">{i.item}</p>
                      {i.note ? <p className="mt-0.5 text-sm text-forest/60">{i.note}</p> : null}
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
