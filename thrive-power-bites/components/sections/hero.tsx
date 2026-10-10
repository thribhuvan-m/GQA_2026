import Link from "next/link";
import { ArrowRight, HandHeart, Leaf, Scale } from "lucide-react";
import { powerBites } from "@/config/product";
import { PackMockup } from "@/components/brand/pack-mockup";
import { FoilBite, UnwrappedBite } from "@/components/brand/bites";

export function Hero() {
  const p = powerBites;
  const facts = [
    { icon: Scale, label: `${p.bitesPerPack} bites × ${p.biteWeightGrams} g` },
    { icon: HandHeart, label: p.manufacturing },
    { icon: Leaf, label: "Made with dry fruits" },
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[38rem] w-[38rem] rounded-full bg-beige/45 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow">THRIVE.in · {p.name}</p>
          <h1 className="heading-xl mt-5">
            Small Bites.
            <br />
            <span className="text-leaf">Everyday</span> Nourishment.
          </h1>
          <p className="lead mt-6 max-w-xl">
            Discover THRIVE.in POWER BITES — a convenient dry-fruit snack crafted for your everyday routine.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/shop" className="btn-primary">
              Explore Power Bites <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/our-story" className="btn-secondary">
              Our Story
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-forest/80">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-soft">
                  <Icon className="h-4 w-4 text-leaf" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-6 top-10 bottom-10 rounded-[3rem] bg-gradient-to-b from-beige/80 to-beige/30" />
          <div aria-hidden="true" className="absolute top-14 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border border-gold/30" />
          <figure className="relative py-6">
            <PackMockup id="hero-pack" className="relative z-10 mx-auto block h-[24rem] w-auto drop-shadow-[0_30px_40px_rgba(23,63,43,0.18)] sm:h-[30rem]" />
            <FoilBite id="hero-foil" className="absolute bottom-16 -left-14 z-20 h-24 w-24 animate-float sm:-left-20 sm:h-28 sm:w-28" />
            <UnwrappedBite
              id="hero-bite"
              className="absolute -right-12 bottom-6 z-20 h-24 w-24 animate-float [animation-delay:-3s] sm:-right-16 sm:h-28 sm:w-28"
            />
            <figcaption className="relative z-10 mt-3 text-center text-[0.7rem] font-medium tracking-wide text-forest/50">
              Concept packaging illustration — final design may differ
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
