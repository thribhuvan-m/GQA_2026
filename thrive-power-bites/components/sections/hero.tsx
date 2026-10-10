import Link from "next/link";
import { ArrowRight, HandHeart, Leaf, Scale } from "lucide-react";
import { powerBites } from "@/config/product";
import { PackMockup } from "@/components/brand/pack-mockup";
import { FoilBite, UnwrappedBite } from "@/components/brand/bites";
import { DriftingLeaves } from "@/components/motion/drifting-leaves";
import { Magnetic } from "@/components/motion/magnetic";
import { Tilt } from "@/components/motion/tilt";

const d = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

export function Hero() {
  const p = powerBites;
  const facts = [
    { icon: Scale, label: `${p.bitesPerPack} bites × ${p.biteWeightGrams} g` },
    { icon: HandHeart, label: p.manufacturing },
    { icon: Leaf, label: "Made with dry fruits" },
  ];

  return (
    <section id="home-hero" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[38rem] w-[38rem] animate-[float_14s_ease-in-out_infinite] rounded-full bg-beige/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 h-[28rem] w-[28rem] animate-[float_18s_ease-in-out_infinite] rounded-full bg-leaf/10 blur-3xl [animation-delay:-6s]"
      />
      <DriftingLeaves />

      <div className="container-page relative grid min-h-[calc(100svh-6.5rem)] items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="eyebrow hero-in" style={d(0.95)}>
            THRIVE.in · {p.name}
          </p>
          <h1 className="heading-xl mt-5">
            <span className="hero-line">
              <span style={d(1.0)}>Small Bites.</span>
            </span>
            <span className="hero-line">
              <span style={d(1.12)}>
                <span className="text-leaf">Everyday</span> Nourishment.
              </span>
            </span>
          </h1>
          <p className="lead hero-in mt-6 max-w-xl" style={d(1.3)}>
            Discover THRIVE.in POWER BITES — a convenient dry-fruit snack crafted for your everyday routine.
          </p>
          <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={d(1.42)}>
            <Magnetic>
              <Link href="/shop" className="btn-primary group w-full sm:w-auto">
                Explore Power Bites
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/our-story" className="btn-secondary w-full sm:w-auto">
                Our Story
              </Link>
            </Magnetic>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-forest/80">
            {facts.map(({ icon: Icon, label }, i) => (
              <li key={label} className="hero-in inline-flex items-center gap-2" style={d(1.55 + i * 0.08)}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-soft">
                  <Icon className="h-4 w-4 text-leaf" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-in relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none" style={d(1.15)}>
          <div aria-hidden="true" className="absolute inset-x-6 top-10 bottom-10 rounded-[3rem] bg-gradient-to-b from-beige/80 to-beige/30" />
          <div
            aria-hidden="true"
            className="absolute top-12 left-1/2 h-72 w-72 -translate-x-1/2 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-gold/40"
          />
          <Tilt className="relative py-6">
            <figure>
              <PackMockup
                id="hero-pack"
                className="relative z-10 mx-auto block h-[24rem] w-auto drop-shadow-[0_30px_40px_rgba(23,63,43,0.18)] sm:h-[30rem]"
              />
              <figcaption className="relative z-10 mt-3 text-center text-[0.7rem] font-medium tracking-wide text-forest/50">
                Concept packaging illustration — final design may differ
              </figcaption>
            </figure>
            <FoilBite
              id="hero-foil"
              className="absolute bottom-16 -left-14 z-20 h-24 w-24 animate-float sm:-left-20 sm:h-28 sm:w-28"
            />
            <UnwrappedBite
              id="hero-bite"
              className="absolute -right-12 bottom-6 z-20 h-24 w-24 animate-float [animation-delay:-3s] sm:-right-16 sm:h-28 sm:w-28"
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
}
