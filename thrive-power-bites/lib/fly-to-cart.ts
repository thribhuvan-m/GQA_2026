import { gsap } from "@/lib/gsap";

/** Animates a small gold bite from `from` to the header cart button, then calls `done`. */
export function flyToCart(from: HTMLElement, done: () => void) {
  const target = document.getElementById("cart-button");
  if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    done();
    return;
  }
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const size = 34;
  const dot = document.createElement("div");
  dot.setAttribute("aria-hidden", "true");
  Object.assign(dot.style, {
    position: "fixed",
    left: `${a.left + a.width / 2 - size / 2}px`,
    top: `${a.top + a.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "9999px",
    background: "radial-gradient(circle at 35% 30%, #FFF4CF, #F3CF72 25%, #D69A2D 60%, #8A5A12)",
    boxShadow: "0 8px 18px rgba(23, 63, 43, 0.35)",
    zIndex: "80",
    pointerEvents: "none",
  });
  document.body.appendChild(dot);

  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  gsap
    .timeline({
      onComplete: () => {
        dot.remove();
        done();
      },
    })
    .fromTo(dot, { scale: 0.4 }, { scale: 1.1, duration: 0.18, ease: "back.out(3)" })
    .to(dot, { x: dx, duration: 0.75, ease: "power1.inOut" }, 0.12)
    .to(dot, { y: dy, duration: 0.75, ease: "power3.in" }, 0.12)
    .to(dot, { scale: 0.35, duration: 0.75, ease: "power2.in" }, 0.12);
}
