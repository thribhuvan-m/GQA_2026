import type { Product } from "@/config/product";
import { formatINR, pricePer100g } from "@/lib/format";
import { PendingPill } from "@/components/ui/pending";

export function PriceTag({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  const { sellingPrice, mrp, status } = product.price;
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={`font-extrabold tracking-tight ${size === "lg" ? "text-4xl" : "text-2xl"}`}>
          <span className="sr-only">Price: </span>
          {formatINR(sellingPrice)}
        </span>
        <span className="text-sm text-forest/65">
          MRP {formatINR(mrp)} <span className="text-forest/50">(incl. of all taxes)</span>
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-forest/60">
        <span>
          {formatINR(pricePer100g(sellingPrice, product.packSizeGrams))} / 100 g · {product.packSizeGrams} g pack
        </span>
        {status === "draft" ? <PendingPill>Proposed launch price</PendingPill> : null}
      </div>
    </div>
  );
}
