import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, HandHeart, Ruler, Scale } from "lucide-react";
import { powerBites } from "@/config/product";
import { site } from "@/config/site";
import { ProductGallery } from "@/components/product/product-gallery";
import { PriceTag } from "@/components/product/price-tag";
import { AddToCart } from "@/components/product/add-to-cart";
import { ProductInfoPanels } from "@/components/product/product-info-panels";
import { isLiveCheckoutEnabled } from "@/lib/payments";

export const metadata: Metadata = {
  title: `${powerBites.name} — ${powerBites.flavour}`,
  description: `${powerBites.fullName}. ${powerBites.packSizeGrams} g pack with ${powerBites.bitesPerPack} handmade bites of ${powerBites.biteWeightGrams} g each.`,
};

export default function ShopPage() {
  const p = powerBites;
  const live = isLiveCheckoutEnabled();

  return (
    <div className="container-page py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-forest/60">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-forest">Home</Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
          <li aria-current="page" className="font-semibold text-forest">Shop</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery />

        <div className="flex flex-col gap-7">
          <div>
            <p className="text-sm font-semibold text-forest/60">
              <span className="tracking-[0.24em]">{site.brand.name}</span>
              <span className="text-[#9a6a17]">{site.brand.suffix}</span>
            </p>
            <h1 className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl">{p.name}</h1>
            <p className="mt-2 text-lg font-semibold text-leaf">{p.flavour}</p>
            <p className="sr-only">{p.fullName}</p>
          </div>

          <p className="text-forest/75">{p.shortDescription}</p>

          <ul className="grid grid-cols-3 gap-3 text-center">
            <li className="rounded-2xl bg-white/70 px-3 py-4 shadow-soft">
              <Scale className="mx-auto h-5 w-5 text-leaf" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold">{p.packSizeGrams} g</p>
              <p className="text-xs text-forest/60">{p.bitesPerPack} × {p.biteWeightGrams} g bites</p>
            </li>
            <li className="rounded-2xl bg-white/70 px-3 py-4 shadow-soft">
              <Ruler className="mx-auto h-5 w-5 text-leaf" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold">~{p.biteDiameterMm} mm</p>
              <p className="text-xs text-forest/60">per bite</p>
            </li>
            <li className="rounded-2xl bg-white/70 px-3 py-4 shadow-soft">
              <HandHeart className="mx-auto h-5 w-5 text-leaf" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold">{p.manufacturing}</p>
              <p className="text-xs text-forest/60">shaped by hand</p>
            </li>
          </ul>

          <div className="card space-y-5 p-6">
            <PriceTag product={p} size="lg" />
            <AddToCart product={p} />
            {!live ? (
              <p className="rounded-xl bg-gold/10 px-4 py-3 text-sm text-forest/80">
                <strong className="font-bold">Pre-launch preview.</strong> You can build a cart, but online ordering and
                payments are not open yet. No order will be placed.
              </p>
            ) : null}
          </div>

          <nav aria-label="Product information" className="flex flex-wrap gap-2 text-sm">
            {[
              ["Ingredients", "#ingredients"],
              ["Allergens", "#allergens"],
              ["Nutrition", "#nutrition"],
              ["Storage", "#storage"],
              ["Shelf life", "#shelf-life"],
              ["Shipping & returns", "#shipping"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="rounded-full border border-forest/15 px-3.5 py-1.5 font-semibold text-forest/75 hover:border-forest hover:text-forest">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-14 sm:mt-20">
        <ProductInfoPanels product={p} />
      </div>
    </div>
  );
}
