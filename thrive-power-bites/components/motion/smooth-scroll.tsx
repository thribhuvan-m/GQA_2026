"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";
import { useCart } from "@/components/cart/cart-provider";

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const { isOpen } = useCart();

  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;
    const lenis = new Lenis({
      lerp: 0.1,
      anchors: { offset: -88 },
      prevent: (node) => node.closest("dialog") !== null,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (isOpen) lenis.stop();
    else lenis.start();
  }, [isOpen]);

  return null;
}
