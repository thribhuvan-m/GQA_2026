"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { site } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { useCart } from "@/components/cart/cart-provider";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, hydrated, open } = useCart();
  const visibleCount = hydrated ? count : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-forest/8 bg-cream/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-forest/80 transition hover:bg-forest/5 hover:text-forest"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={open}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-forest transition hover:bg-forest/5"
            aria-label={`Open cart, ${visibleCount} ${visibleCount === 1 ? "item" : "items"}`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {visibleCount > 0 ? (
              <span className="absolute top-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.68rem] font-extrabold text-forest">
                {visibleCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest transition hover:bg-forest/5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`overflow-hidden border-t border-forest/8 transition-[max-height] duration-300 md:hidden ${menuOpen ? "max-h-96" : "max-h-0 border-transparent"}`}
        hidden={!menuOpen}
      >
        <ul className="container-page flex flex-col py-3">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-semibold text-forest hover:bg-forest/5"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
