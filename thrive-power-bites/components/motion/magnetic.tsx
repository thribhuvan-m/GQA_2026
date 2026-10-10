"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Pulls its child slightly toward the pointer on hover (fine pointers only). */
export function Magnetic({ children, strength = 0.28 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: React.PointerEvent<HTMLSpanElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  }

  function onLeave() {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  }

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="inline-flex">
      {children}
    </span>
  );
}
