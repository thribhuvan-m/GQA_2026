import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { FeaturedProduct } from "@/components/sections/featured-product";
import { IngredientsOverview } from "@/components/sections/ingredients-overview";
import { BrandStory } from "@/components/sections/brand-story";
import { Packaging } from "@/components/sections/packaging";
import { FaqPreview } from "@/components/sections/faq-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <FeaturedProduct />
      <IngredientsOverview />
      <BrandStory />
      <Packaging />
      <FaqPreview />
    </>
  );
}
