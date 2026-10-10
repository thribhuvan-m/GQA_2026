import { AlertTriangle, Archive, CalendarClock, FlaskConical, Leaf, Truck } from "lucide-react";
import type { Product } from "@/config/product";
import { FieldValue, PendingPill } from "@/components/ui/pending";

function Panel({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: typeof Leaf;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="card scroll-mt-28 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream">
          <Icon className="h-5 w-5 text-leaf" aria-hidden="true" />
        </span>
        <h2 id={`${id}-title`} className="heading-md">
          {title}
        </h2>
      </div>
      <div className="mt-5 text-forest/75">{children}</div>
    </section>
  );
}

export function ProductInfoPanels({ product }: { product: Product }) {
  const nutritionVerified = product.nutrition.status === "verified";
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel id="ingredients" icon={Leaf} title="Ingredients">
        <ul className="flex flex-wrap gap-2">
          {product.ingredients.map((i) => (
            <li key={i.name} className="rounded-full bg-cream px-3 py-1.5 text-sm font-semibold text-forest">
              {i.name}
            </li>
          ))}
        </ul>
        {!product.ingredientOrderVerified ? (
          <p className="mt-4 text-sm">
            This is the current recipe brief. The final ingredient declaration, listed in descending order by weight, will be
            published before launch.
          </p>
        ) : null}
      </Panel>

      <Panel id="allergens" icon={AlertTriangle} title="Allergen information">
        <p>{product.allergenGuidance}</p>
        {product.allergens.status !== "verified" ? (
          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <PendingPill>Full allergen statement pending</PendingPill>
            <span>Including cross-contact information.</span>
          </p>
        ) : (
          <p className="mt-4 text-sm">
            <FieldValue field={product.allergens} />
          </p>
        )}
      </Panel>

      <Panel id="nutrition" icon={FlaskConical} title="Nutrition information">
        {!nutritionVerified ? (
          <p className="mb-4 flex flex-wrap items-center gap-2 text-sm">
            <PendingPill>Being tested</PendingPill>
            <span>Values will be published only after laboratory testing.</span>
          </p>
        ) : null}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Nutrition information per 100 g and per bite</caption>
            <thead>
              <tr className="border-b border-forest/10 text-forest">
                <th scope="col" className="py-2 font-semibold">Nutrient</th>
                <th scope="col" className="py-2 text-right font-semibold">Per 100 g</th>
                <th scope="col" className="py-2 text-right font-semibold">Per bite ({product.biteWeightGrams} g)</th>
              </tr>
            </thead>
            <tbody>
              {product.nutrition.rows.map((row) => (
                <tr key={row.nutrient} className="border-b border-forest/5">
                  <th scope="row" className="py-2 font-medium">{row.nutrient} ({row.unit})</th>
                  <td className="py-2 text-right tabular-nums">{row.per100g ?? <span aria-label="Pending">—</span>}</td>
                  <td className="py-2 text-right tabular-nums">{row.perBite ?? <span aria-label="Pending">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-5">
        <Panel id="storage" icon={Archive} title="Storage">
          <p>
            <FieldValue field={product.storage} fallback="Storage instructions will be confirmed for the final packaging before launch." />
          </p>
        </Panel>
        <Panel id="shelf-life" icon={CalendarClock} title="Shelf life">
          <p>
            {product.shelfLife.status === "verified" && product.shelfLife.value ? (
              product.shelfLife.value
            ) : (
              <span className="text-forest/55 italic">
                The confirmed shelf life will be printed on every pack and published here before launch.
              </span>
            )}
          </p>
        </Panel>
      </div>

      <Panel id="shipping" icon={Truck} title="Shipping and returns">
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-forest">Shipping</dt>
            <dd className="mt-1">
              <FieldValue
                field={product.shipping}
                fallback="We plan to start deliveries in Bengaluru and Karnataka. Delivery areas, charges and timelines will be published before orders open."
              />
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-forest">Returns and refunds</dt>
            <dd className="mt-1">
              <FieldValue field={product.returns} fallback="Our returns and refunds policy will be published before orders open." />
            </dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}
