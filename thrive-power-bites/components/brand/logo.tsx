import Link from "next/link";
import { site } from "@/config/site";

export function SproutMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path d="M16 29V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path
        d="M16 17C16 10.5 11.5 6 4.5 6c0 6.5 4.6 11 11.5 11Z"
        fill="var(--color-leaf)"
      />
      <path
        d="M16 15c0-6.4 4.2-10.6 11-11 .4 6.8-4 11-11 11Z"
        fill="var(--color-gold)"
      />
      <path d="M8 9.5c2.6 1.3 5 3.6 7.6 7" stroke="var(--color-cream)" strokeWidth="0.9" fill="none" opacity="0.8" />
      <path d="M24.5 6.8c-2.5 1.5-5 4.2-8.2 7.8" stroke="var(--color-cream)" strokeWidth="0.9" fill="none" opacity="0.8" />
    </svg>
  );
}

export function Wordmark({ tone = "forest" }: { tone?: "forest" | "cream" }) {
  const color = tone === "cream" ? "text-cream" : "text-forest";
  return (
    <span className={`inline-flex items-baseline ${color}`}>
      <span className="text-[0.95rem] font-semibold tracking-[0.28em]">{site.brand.name}</span>
      <span className={`text-[0.7rem] font-bold tracking-wider ${tone === "cream" ? "text-gold" : "text-[#9a6a17]"}`}>
        {site.brand.suffix}
      </span>
    </span>
  );
}

export function Logo({ tone = "forest" }: { tone?: "forest" | "cream" }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 rounded-lg"
      aria-label={`${site.brand.fullName} — home`}
    >
      <SproutMark
        className={`h-7 w-7 transition-transform duration-300 group-hover:-rotate-6 ${tone === "cream" ? "text-cream" : "text-forest"}`}
      />
      <Wordmark tone={tone} />
    </Link>
  );
}
