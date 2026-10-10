import { powerBites } from "@/config/product";
import { SproutMark } from "@/components/brand/logo";

const words = [
  "Cashews",
  "Almonds",
  "Raisins",
  "Dates",
  "Handmade",
  `${powerBites.biteWeightGrams} g bites`,
  `${powerBites.bitesPerPack} to a pack`,
];

export function MarqueeBand() {
  return (
    <section aria-label="What goes into POWER BITES" className="marquee overflow-hidden bg-forest py-5 text-cream sm:py-6">
      <p className="sr-only">{words.join(", ")}</p>
      <div className="marquee-track flex w-max" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {words.map((w) => (
              <li key={w} className="flex items-center gap-8 px-8 text-2xl font-extrabold tracking-tight whitespace-nowrap sm:text-4xl">
                <span className={w === "Handmade" ? "text-gold" : undefined}>{w}</span>
                <SproutMark className="h-6 w-6 text-cream sm:h-7 sm:w-7" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
