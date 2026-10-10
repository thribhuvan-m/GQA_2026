"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Page-level scroll effects driven by data attributes, so server components
 * can opt in without becoming client components:
 *   data-reveal            fade/slide in when scrolled into view (batched + staggered)
 *   data-parallax="0.2"    drift vertically while passing through the viewport
 *   data-countup="20"      count from 0 to the value when it enters the viewport
 */
export function RevealController() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const fold = window.innerHeight * 0.92;
      const pending = gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter((el) => el.getBoundingClientRect().top > fold);
      gsap.set(pending, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(pending, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number.parseFloat(el.dataset.parallax ?? "0.15");
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-countup]").forEach((el) => {
        const target = Number.parseFloat(el.dataset.countup ?? "0");
        const counter = { value: 0 };
        el.textContent = "0";
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });

      ScrollTrigger.refresh();
    });
  });

  return null;
}
