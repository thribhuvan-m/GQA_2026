"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, MousePointer2 } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { powerBites } from "@/config/product";
import { AlmondArt, CashewArt, DateArt, RaisinArt } from "@/components/brand/ingredient-art";
import { FoilBite, UnwrappedBite } from "@/components/brand/bites";
import { PackMockup } from "@/components/brand/pack-mockup";
import { TrayIllustration } from "@/components/brand/tray-illustration";

const p = powerBites;

const steps = [
  { title: "It starts with dry fruits.", body: "Cashews, almonds, raisins and dates — ingredients you already know." },
  { title: "Brought together by hand.", body: "Everything is mixed and rolled by hand into one round bite." },
  { title: `Exactly ${p.biteWeightGrams} grams.`, body: `About ${p.biteDiameterMm} mm across, so every bite is the same size.` },
  { title: "Wrapped in gold.", body: "Each bite gets its own gold-foil wrap in our proposed packaging." },
  { title: "Three to a pack.", body: `${p.bitesPerPack} bites, a tray with a cavity for each, and a compact hanging carton.` },
];
const STEP_TIMES = [0, 1.4, 3, 4.8, 6.4];

const ingredients = [
  { Art: CashewArt, left: 16, top: 20, size: 17, delay: "0s" },
  { Art: AlmondArt, left: 80, top: 14, size: 15, delay: "-1.5s" },
  { Art: RaisinArt, left: 88, top: 52, size: 13, delay: "-3s" },
  { Art: DateArt, left: 13, top: 62, size: 17, delay: "-4.5s" },
  { Art: CashewArt, left: 72, top: 86, size: 15, delay: "-2s" },
  { Art: AlmondArt, left: 30, top: 88, size: 13, delay: "-5s" },
  { Art: RaisinArt, left: 44, top: 9, size: 11, delay: "-6s" },
  { Art: DateArt, left: 90, top: 30, size: 12, delay: "-3.5s" },
];

const TRAY_Y = 61.6;
const SLOT_X = [23.7, 50, 76.3];

function Spot({
  left,
  top,
  width,
  j,
  children,
  initial,
  z,
}: {
  left: number;
  top: number;
  width: number;
  j: string;
  children: React.ReactNode;
  initial?: React.CSSProperties;
  z?: number;
}) {
  return (
    <div
      data-j={j}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, zIndex: z }}
    >
      <div data-j={`${j}-in`} style={initial}>
        {children}
      </div>
    </div>
  );
}

const hidden: React.CSSProperties = { opacity: 0, visibility: "hidden" };

export function BiteJourney() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const one = (sel: string) => q(sel)[0] as HTMLElement;
        const caps = q('[data-j="cap"]');
        const countEl = one('[data-j="count"]');
        const gramsEl = one('[data-j="grams"]');
        const ingOuter = q('[data-j="ing"]');
        const ingInner = q('[data-j="ing-in"]');
        const counter = { v: 0 };

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: one(".journey-pin"),
            start: "top top",
            end: "+=420%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const t = self.progress * tl.duration();
              const step = STEP_TIMES.reduce((acc, at, i) => (t >= at ? i : acc), 0);
              countEl.textContent = String(step + 1).padStart(2, "0");
              gsap.set(one('[data-j="bar"]'), { scaleX: self.progress });
            },
          },
        });

        const caption = (i: number) => {
          const at = STEP_TIMES[i];
          tl.to(caps[i - 1], { autoAlpha: 0, y: -28, duration: 0.4, ease: "power2.in" }, at).fromTo(
            caps[i],
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
            at + 0.25,
          );
        };

        // 1 — dry fruits drift
        tl.to(ingInner, { rotation: "+=25", scale: 1.08, duration: 1, stagger: 0.03 }, 0);
        tl.to(one('[data-j="hint"]'), { autoAlpha: 0, duration: 0.4 }, 0.3);

        // 2 — converge and roll into a bite
        caption(1);
        tl.to(ingOuter, { left: "50%", top: "50%", duration: 1.2, stagger: 0.05 }, 1)
          .to(ingInner, { scale: 0.2, rotation: "+=200", autoAlpha: 0, duration: 1.2, stagger: 0.05 }, 1)
          .fromTo(
            one('[data-j="bite-in"]'),
            { scale: 0, rotation: -140, autoAlpha: 0 },
            { scale: 1, rotation: 0, autoAlpha: 1, duration: 1, ease: "back.out(1.6)" },
            1.9,
          )
          .fromTo(one('[data-j="ring"]'), { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1 }, 1.9)
          .fromTo(one('[data-j="shadow-in"]'), { scaleX: 0.2, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 1 }, 1.9);

        // 3 — 20 g, ~35 mm
        caption(2);
        tl.fromTo(
          one('[data-j="badge-in"]'),
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(2)" },
          3.2,
        )
          .fromTo(
            counter,
            { v: 0 },
            {
              v: p.biteWeightGrams,
              duration: 1.2,
              ease: "power1.out",
              onUpdate: () => {
                gramsEl.textContent = String(Math.round(counter.v));
              },
            },
            3.2,
          )
          .fromTo(one('[data-j="rule"]'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.out" }, 3.3)
          .fromTo(one('[data-j="rule-label"]'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 3.8);

        // 4 — wrapped in gold
        caption(3);
        tl.to([one('[data-j="badge-in"]'), one('[data-j="measure-in"]')], { autoAlpha: 0, duration: 0.4 }, 4.8)
          .fromTo(
            one('[data-j="foil-in"]'),
            { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 1 },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
            5,
          )
          .fromTo(one('[data-j="sparkle"]'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(3)" }, 6)
          .to(one('[data-j="sparkle"]'), { scale: 0, autoAlpha: 0, duration: 0.3 }, 6.4);

        // 5 — into the tray, into the pack
        caption(4);
        tl.set(one('[data-j="bite-in"]'), { autoAlpha: 0 }, 6.3)
          .to(one('[data-j="ring"]'), { autoAlpha: 0, scale: 1.3, duration: 0.6 }, 6.3)
          .to(one('[data-j="shadow-in"]'), { autoAlpha: 0, duration: 0.3 }, 6.3)
          .fromTo(one('[data-j="tray-in"]'), { yPercent: 140, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }, 6.4)
          .to(one('[data-j="foil"]'), { top: `${TRAY_Y}%`, duration: 1, ease: "power2.inOut" }, 6.5)
          .to(one('[data-j="foil-in"]'), { scale: 0.6, duration: 1 }, 6.5)
          .fromTo(
            q('[data-j="side-in"]'),
            { yPercent: -320, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.18, ease: "bounce.out" },
            7,
          )
          .to(
            [one('[data-j="tray-in"]'), one('[data-j="foil-in"]'), ...q('[data-j="side-in"]')],
            { autoAlpha: 0, scale: 0.85, duration: 0.6, ease: "power2.in" },
            8.4,
          )
          .fromTo(
            one('[data-j="pack-in"]'),
            { yPercent: 35, scale: 0.8, rotation: 8, autoAlpha: 0 },
            { yPercent: 0, scale: 1, rotation: 0, autoAlpha: 1, duration: 1, ease: "back.out(1.3)" },
            8.7,
          )
          .to({}, { duration: 0.6 }, 9.7);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="journey-title" className="relative bg-cream-deep">
      <h2 id="journey-title" className="sr-only">
        The journey of one POWER BITE
      </h2>

      {/* Animated, scroll-driven version */}
      <div className="journey-pin relative hidden h-svh overflow-hidden motion-safe:block">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,255,255,0.75),transparent_55%)]" />
        <div className="container-page relative grid h-full grid-rows-[auto_1fr] content-center items-center gap-6 pt-20 pb-6 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-1 lg:pt-16">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">The journey of one bite</p>
            <div className="mt-4 flex items-center gap-3 text-xs font-bold tracking-widest text-forest/60" aria-hidden="true">
              <span data-j="count" className="text-forest">01</span>
              <span className="relative h-px w-28 bg-forest/15">
                <span data-j="bar" className="absolute inset-0 origin-left scale-x-0 bg-gold" />
              </span>
              <span>05</span>
            </div>
            <div className="relative mt-5 h-44 sm:h-48 lg:h-60">
              {steps.map((s, i) => (
                <div key={s.title} data-j="cap" className="absolute inset-x-0 top-0" style={i === 0 ? undefined : hidden}>
                  <h3 className="heading-lg">{s.title}</h3>
                  <p className="lead mt-3 max-w-md">{s.body}</p>
                  {i === steps.length - 1 ? (
                    <Link href="/shop" className="btn-primary mt-6">
                      Explore Power Bites <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative aspect-square w-[min(86vw,50svh,34rem)] lg:w-[min(40vw,70svh,36rem)]" aria-hidden="true">
              <div className="absolute inset-[6%] rounded-full bg-white/55 shadow-[inset_0_0_60px_rgba(221,163,61,0.12)]" />
              <div className="absolute inset-[3%] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-gold/35" />

              {ingredients.map(({ Art, left, top, size, delay }, i) => (
                <Spot key={i} j="ing" left={left} top={top} width={size}>
                  <div className="animate-float" style={{ animationDelay: delay }}>
                    <Art className="h-auto w-full drop-shadow-[0_8px_10px_rgba(23,63,43,0.15)]" />
                  </div>
                </Spot>
              ))}

              <Spot j="shadow" left={50} top={68} width={30} initial={hidden}>
                <div className="h-3 rounded-[50%] bg-forest/15 blur-[3px]" />
              </Spot>

              <Spot j="ring" left={50} top={50} width={56} initial={hidden}>
                <div className="aspect-square rounded-full border-2 border-gold/40" />
              </Spot>

              <Spot j="bite" left={50} top={50} width={42} initial={hidden}>
                <UnwrappedBite id="journey-bite" shadow={false} className="h-auto w-full" />
              </Spot>

              <Spot j="foil" left={50} top={50} width={42} z={5} initial={{ ...hidden, clipPath: "inset(100% 0% 0% 0%)" }}>
                <FoilBite id="journey-foil" shadow={false} className="h-auto w-full" />
              </Spot>

              <Spot j="sparkle" left={66} top={32} width={9} initial={hidden}>
                <svg viewBox="0 0 24 24" className="h-auto w-full">
                  <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6Z" fill="#DDA33D" />
                </svg>
              </Spot>

              <Spot j="badge" left={80} top={24} width={22} initial={hidden}>
                <div className="flex aspect-square flex-col items-center justify-center rounded-full bg-forest text-cream shadow-lift">
                  <span className="text-[clamp(1.25rem,4vw,2.25rem)] leading-none font-extrabold tabular-nums">
                    <span data-j="grams">0</span>
                    <span className="text-[0.55em]"> g</span>
                  </span>
                  <span className="mt-1 text-[clamp(0.5rem,1.2vw,0.7rem)] font-bold tracking-widest text-gold uppercase">per bite</span>
                </div>
              </Spot>

              <Spot j="measure" left={50} top={77} width={34}>
                <div data-j="rule" className="relative h-px origin-center scale-x-0 bg-forest">
                  <span className="absolute top-1/2 left-0 h-3 w-px -translate-y-1/2 bg-forest" />
                  <span className="absolute top-1/2 right-0 h-3 w-px -translate-y-1/2 bg-forest" />
                </div>
                <p data-j="rule-label" className="mt-2 text-center text-xs font-bold tracking-wider text-forest/70" style={hidden}>
                  ≈ {p.biteDiameterMm} mm
                </p>
              </Spot>

              <Spot j="tray" left={50} top={TRAY_Y} width={92} initial={hidden}>
                <TrayIllustration id="journey-tray" withBites={false} className="h-auto w-full" />
              </Spot>
              {[SLOT_X[0], SLOT_X[2]].map((x) => (
                <Spot key={x} j="side" left={x} top={TRAY_Y} width={25} z={5} initial={hidden}>
                  <FoilBite id={`journey-side-${x}`} className="h-auto w-full" />
                </Spot>
              ))}

              <Spot j="pack" left={50} top={50} width={36} z={6} initial={hidden}>
                <PackMockup id="journey-pack" className="h-auto w-full drop-shadow-[0_30px_40px_rgba(23,63,43,0.2)]" />
              </Spot>
            </div>
          </div>
        </div>

        <p
          data-j="hint"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs font-semibold tracking-widest text-forest/50 uppercase"
        >
          <MousePointer2 className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" /> Scroll to follow the journey
        </p>
      </div>

      {/* Static version for reduced motion */}
      <div className="container-page py-16 motion-safe:hidden sm:py-24">
        <p className="eyebrow">The journey of one bite</p>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="card flex flex-col items-center p-6 text-center">
              <div className="flex h-28 items-center justify-center" aria-hidden="true">
                {i === 0 ? (
                  <div className="grid grid-cols-2 gap-1">
                    <CashewArt className="h-11 w-11" />
                    <AlmondArt className="h-11 w-11" />
                    <RaisinArt className="h-11 w-11" />
                    <DateArt className="h-11 w-11" />
                  </div>
                ) : i < 3 ? (
                  <UnwrappedBite id={`journey-static-${i}`} className="h-24 w-24" />
                ) : i === 3 ? (
                  <FoilBite id="journey-static-foil" className="h-24 w-24" />
                ) : (
                  <PackMockup id="journey-static-pack" className="h-28 w-auto" />
                )}
              </div>
              <h3 className="mt-4 font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-forest/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
