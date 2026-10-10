import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { powerBites } from "@/config/product";
import { PageIntro } from "@/components/sections/page-intro";
import { ingredientArt } from "@/components/brand/ingredient-art";
import { PendingPill } from "@/components/ui/pending";

export const metadata: Metadata = {
  title: "Ingredients",
  description: "The ingredients in THRIVE.in POWER BITES: cashews, almonds, raisins, seedless dates, dry dates, jaggery and ghee.",
};

export default function IngredientsPage() {
  const p = powerBites;
  return (
    <>
      <PageIntro eyebrow="Ingredients" title="Seven ingredients. Nothing hidden.">
        Here is what goes into every batch of POWER BITES {p.flavour}.
      </PageIntro>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.ingredients.map((ingredient) => {
              const Art = ingredientArt[ingredient.name];
              return (
                <li key={ingredient.name} className="card flex items-center gap-5 p-6">
                  <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-cream">
                    {Art ? (
                      <Art className="h-14 w-14" />
                    ) : (
                      <span aria-hidden="true" className="text-2xl font-extrabold text-gold">
                        {ingredient.name.charAt(0)}
                      </span>
                    )}
                  </span>
                  <div>
                    <h2 className="font-bold">{ingredient.name}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-forest/65">{ingredient.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="card p-6 sm:p-8">
              <h2 className="heading-md flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rust" aria-hidden="true" /> Allergens
              </h2>
              <p className="mt-3 text-forest/75">{p.allergenGuidance}</p>
              <p className="mt-4"><PendingPill>Full allergen statement pending</PendingPill></p>
            </div>
            <div className="card p-6 sm:p-8">
              <h2 className="heading-md">About this list</h2>
              <p className="mt-3 text-forest/75">
                This list reflects the current recipe. The final ingredient declaration — in descending order by weight, with
                any required percentages — and the nutrition information will be published here and printed on the label once
                verified.
              </p>
              <Link href="/shop#nutrition" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-leaf hover:text-forest">
                Nutrition information status <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
