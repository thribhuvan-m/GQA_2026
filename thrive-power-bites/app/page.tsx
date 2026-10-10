import { BiteJourney } from "@/components/motion/bite-journey";
import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { ByTheNumbers } from "@/components/sections/by-the-numbers";
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
      <MarqueeBand />
      <BiteJourney />
      <ByTheNumbers />
      <Benefits />
      <FeaturedProduct />
      <IngredientsOverview />
      <BrandStory />
      <Packaging />
      <FaqPreview />
    </>
  );
}
