import { site } from "@/config/site";

/** First-load brand intro, pure CSS. Hidden for reduced motion and after it has played once. */
export function IntroCurtain() {
  return (
    <div
      aria-hidden="true"
      className="intro-curtain pointer-events-none fixed inset-0 z-[70] flex flex-col items-center justify-center gap-5 bg-forest text-cream"
    >
      <svg viewBox="0 0 32 32" className="h-20 w-20" focusable="false">
        <path className="draw" d="M16 29V15" stroke="#F7F1E5" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path className="leaf-pop" style={{ animationDelay: "0.4s" }} d="M16 17C16 10.5 11.5 6 4.5 6c0 6.5 4.6 11 11.5 11Z" fill="#6D963F" />
        <path className="leaf-pop" style={{ animationDelay: "0.55s" }} d="M16 15c0-6.4 4.2-10.6 11-11 .4 6.8-4 11-11 11Z" fill="#DDA33D" />
      </svg>
      <p className="intro-word inline-flex items-baseline">
        <span className="text-lg font-semibold tracking-[0.4em]">{site.brand.name}</span>
        <span className="text-sm font-bold text-gold">{site.brand.suffix}</span>
      </p>
    </div>
  );
}
