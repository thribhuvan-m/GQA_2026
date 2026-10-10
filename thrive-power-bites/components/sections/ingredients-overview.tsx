import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { powerBites } from "@/config/product";
import { ingredientArt } from "@/components/brand/ingredient-art";

export function IngredientsOverview() {
  const featured = powerBites.ingredients.filter((i) => i.featured);
  const others = powerBites.ingredients.filter((i) => !i.featured);

  return (
    <section id="ingredients" aria-labelledby="ingredients-title" className="bg-white/60 py-16 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">What goes inside</p>
            <h2 id="ingredients-title" className="heading-lg mt-4">
              Familiar ingredients you can recognise.
            </h2>
          </div>
          <Link href="/ingredients" className="btn-secondary self-start sm:self-auto">
            All ingredients <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((ingredient) => {
            const Art = ingredientArt[ingredient.name];
            return (
              <li key={ingredient.name} className="card flex flex-col items-center p-6 text-center">
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-cream">
                  {Art ? <Art className="h-16 w-16" /> : null}
                </span>
                <h3 className="mt-4 font-bold">{ingredient.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-forest/65">{ingredient.description}</p>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-sm text-forest/70">
          <span className="font-semibold text-forest">Also in the recipe:</span>{" "}
          {others.map((i) => i.name.toLowerCase()).join(", ")}.{" "}
          <span className="text-forest/55">
            Contains tree nuts and dairy. The final ingredient declaration and allergen statement will be published before launch.
          </span>
        </p>
      </div>
    </section>
  );
}
