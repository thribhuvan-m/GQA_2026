import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/config/faq";
import { PendingPill } from "@/components/ui/pending";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-forest/10 rounded-[var(--radius-card)] border border-forest/10 bg-white/70">
      {items.map((item) => (
        <details key={item.question} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-bold">
            <span>{item.question}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-leaf transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="pb-6 text-forest/75">
            <p className="leading-relaxed">{item.answer}</p>
            {item.pending ? (
              <p className="mt-3">
                <PendingPill>Details confirmed before launch</PendingPill>
              </p>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
