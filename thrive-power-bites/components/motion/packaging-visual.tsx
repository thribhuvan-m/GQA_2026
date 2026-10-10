"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { PackMockup } from "@/components/brand/pack-mockup";
import { TrayIllustration } from "@/components/brand/tray-illustration";

/** The carton turns to face the viewer while the tray slides out, scrubbed by scroll. */
export function PackagingVisual() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "center 45%", scrub: 1 },
        });
        tl.fromTo(
          "[data-p='pack']",
          { rotateY: -38, rotateZ: -5, y: 70, transformPerspective: 1000 },
          { rotateY: 0, rotateZ: 0, y: 0, ease: "power2.out" },
          0,
        ).fromTo(
          "[data-p='tray']",
          { xPercent: -70, autoAlpha: 0, rotate: -8 },
          { xPercent: 0, autoAlpha: 1, rotate: 0, ease: "power3.out" },
          0.25,
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="flex items-end justify-center gap-6">
      <div data-p="pack" className="relative z-10">
        <PackMockup id="packaging-pack" className="h-80 w-auto sm:h-[26rem]" />
      </div>
      <div data-p="tray" className="hidden w-56 rounded-3xl bg-cream/5 p-4 ring-1 ring-cream/10 sm:block">
        <TrayIllustration id="packaging-tray" className="h-auto w-full" />
        <p className="mt-3 text-center text-xs text-cream/60">Inside: three cavities, one bite each</p>
      </div>
    </div>
  );
}
