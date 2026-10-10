"use client";

import Image from "next/image";
import { useState } from "react";
import { PackMockup } from "@/components/brand/pack-mockup";
import { TrayIllustration } from "@/components/brand/tray-illustration";
import { FoilBite, UnwrappedBite } from "@/components/brand/bites";
import productPhoto from "@/public/images/real-product-photo.jpg";

const views = [
  { id: "pack", label: "Pack (concept)" },
  { id: "tray", label: "Inside the pack (concept)" },
  { id: "photo", label: "Handmade bites (photo)" },
  { id: "bite", label: "Wrapped and unwrapped (illustration)" },
] as const;

type ViewId = (typeof views)[number]["id"];

function View({ id, thumb = false }: { id: ViewId; thumb?: boolean }) {
  const suffix = thumb ? "thumb" : "main";
  switch (id) {
    case "pack":
      return <PackMockup id={`gallery-pack-${suffix}`} className={thumb ? "h-14 w-auto" : "h-[22rem] w-auto sm:h-[28rem]"} />;
    case "tray":
      return <TrayIllustration id={`gallery-tray-${suffix}`} className={thumb ? "h-auto w-16" : "h-auto w-full max-w-md"} />;
    case "photo":
      return (
        <Image
          src={productPhoto}
          alt={thumb ? "" : "A bowl of handmade POWER BITES dry-fruit bites"}
          className={thumb ? "h-14 w-14 rounded-lg object-cover" : "h-auto w-full max-w-sm rounded-2xl shadow-lift"}
          sizes={thumb ? "56px" : "(min-width: 1024px) 384px, 90vw"}
          placeholder={thumb ? "empty" : "blur"}
        />
      );
    case "bite":
      return (
        <div className={`flex items-center ${thumb ? "gap-0" : "gap-6"}`}>
          <FoilBite id={`gallery-foil-${suffix}`} className={thumb ? "h-9 w-9" : "h-40 w-40 sm:h-48 sm:w-48"} />
          <UnwrappedBite id={`gallery-bite-${suffix}`} className={thumb ? "h-9 w-9" : "h-40 w-40 sm:h-48 sm:w-48"} />
        </div>
      );
  }
}

export function ProductGallery() {
  const [active, setActive] = useState<ViewId>("pack");
  const activeLabel = views.find((v) => v.id === active)?.label;

  return (
    <div className="space-y-4">
      <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-beige/80 via-cream-deep to-cream p-8 sm:min-h-[32rem]">
        <div aria-hidden="true" className="absolute h-80 w-80 rounded-full bg-white/60 blur-3xl" />
        <div className="relative flex w-full items-center justify-center" aria-live="polite">
          <View id={active} />
        </div>
        <p className="absolute bottom-3 left-0 w-full text-center text-[0.7rem] font-medium text-forest/50">{activeLabel}</p>
      </div>
      <div role="tablist" aria-label="Product images" className="grid grid-cols-4 gap-3">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={active === v.id}
            aria-label={v.label}
            onClick={() => setActive(v.id)}
            className={`flex h-20 items-center justify-center rounded-2xl border bg-white/70 transition ${
              active === v.id ? "border-forest ring-2 ring-gold/40" : "border-forest/10 hover:border-forest/40"
            }`}
          >
            <View id={v.id} thumb />
          </button>
        ))}
      </div>
    </div>
  );
}
