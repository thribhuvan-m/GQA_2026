"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

/** 3D tilt that follows the pointer across the wrapper (fine pointers only). */
export function Tilt({ children, className, max = 10 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current || !inner.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(inner.current, {
      rotateY: px * max * 2,
      rotateX: -py * max * 1.4,
      duration: 0.6,
      ease: "power3.out",
      transformPerspective: 900,
    });
  }

  function onLeave() {
    if (inner.current) gsap.to(inner.current, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={className}>
      <div ref={inner} className="[transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
}
