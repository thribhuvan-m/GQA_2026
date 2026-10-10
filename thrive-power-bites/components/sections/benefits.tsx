import { Backpack, HandHeart, Nut, Scale } from "lucide-react";
import { powerBites } from "@/config/product";

const benefits = [
  {
    icon: Scale,
    title: `Portioned at ${powerBites.biteWeightGrams} g`,
    body: "Each bite is a consistent size, so it is easy to enjoy one at a time and keep the rest for later.",
  },
  {
    icon: Nut,
    title: "Made with dry fruits",
    body: "Cashews, almonds, raisins and dates come together in every bite, for a rich, chewy texture.",
  },
  {
    icon: HandHeart,
    title: "Handmade",
    body: "Every bite is shaped by hand, the way dry-fruit sweets have long been made in Indian homes.",
  },
  {
    icon: Backpack,
    title: "Made for your routine",
    body: "A compact pack of three that fits in a bag, a desk drawer or a lunchbox.",
  },
];

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="py-16 sm:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Why POWER BITES</p>
          <h2 id="benefits-title" className="heading-lg mt-4">
            A simple snack, thoughtfully made.
          </h2>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, body }) => (
            <li key={title} className="card group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-gold transition group-hover:bg-leaf group-hover:text-cream">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="heading-md mt-5">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest/70">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
