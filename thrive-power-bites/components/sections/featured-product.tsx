import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { powerBites } from "@/config/product";
import { PackMockup } from "@/components/brand/pack-mockup";
import { PriceTag } from "@/components/product/price-tag";
import { AddToCart } from "@/components/product/add-to-cart";

export function FeaturedProduct() {
  const p = powerBites;
  const details = [
    { label: "Pack size", value: `${p.packSizeGrams} g` },
    { label: "In each pack", value: `${p.bitesPerPack} bites × ${p.biteWeightGrams} g` },
    { label: "Bite size", value: `About ${p.biteDiameterMm} mm` },
    { label: "Flavour", value: p.flavour },
  ];

  return (
    <section aria-labelledby="featured-title" className="pb-16 sm:pb-24">
      <div className="container-page">
        <div className="card grid overflow-hidden lg:grid-cols-2">
          <div className="relative flex items-center justify-center bg-gradient-to-br from-beige/70 via-cream-deep to-cream px-6 py-12">
            <div aria-hidden="true" className="absolute h-72 w-72 rounded-full bg-white/60 blur-2xl" />
            <PackMockup id="featured-pack" className="relative h-80 w-auto sm:h-96" />
          </div>
          <div className="flex flex-col justify-center gap-6 p-7 sm:p-10">
            <div>
              <p className="eyebrow">Launch flavour</p>
              <h2 id="featured-title" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {p.name}
              </h2>
              <p className="mt-1 text-sm font-semibold tracking-wide text-forest/60">
                by <span className="tracking-[0.2em]">THRIVE</span>.in · {p.flavour}
              </p>
            </div>
            <p className="text-forest/75">{p.shortDescription}</p>
            <dl className="grid grid-cols-2 gap-3">
              {details.map((d) => (
                <div key={d.label} className="rounded-2xl bg-cream px-4 py-3">
                  <dt className="text-xs font-semibold text-forest/55">{d.label}</dt>
                  <dd className="mt-0.5 text-sm font-bold">{d.value}</dd>
                </div>
              ))}
            </dl>
            <PriceTag product={p} />
            <AddToCart product={p} />
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-bold text-leaf hover:text-forest">
              View full product details <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
