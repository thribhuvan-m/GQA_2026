import { Box, Gem, Grid3x3, Link2 } from "lucide-react";
import { powerBites } from "@/config/product";
import { PackMockup } from "@/components/brand/pack-mockup";
import { TrayIllustration } from "@/components/brand/tray-illustration";

export function Packaging() {
  const pk = powerBites.packaging;
  const features = [
    { icon: Box, title: "Compact hanging carton", body: pk.carton },
    { icon: Grid3x3, title: "Three-cavity tray", body: pk.tray },
    { icon: Gem, title: "Gold-foil wrap", body: pk.wrap },
    { icon: Link2, title: "Reinforced hanging slot", body: pk.hanging },
  ];

  return (
    <section aria-labelledby="packaging-title" className="relative overflow-hidden bg-forest py-16 text-cream sm:py-24">
      <div aria-hidden="true" className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-leaf/20 blur-3xl" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-end justify-center gap-6">
          <PackMockup id="packaging-pack" className="h-80 w-auto sm:h-[26rem]" />
          <div className="hidden w-56 rounded-3xl bg-cream/5 p-4 ring-1 ring-cream/10 sm:block">
            <TrayIllustration id="packaging-tray" className="h-auto w-full" />
            <p className="mt-3 text-center text-xs text-cream/60">Inside: three cavities, one bite each</p>
          </div>
        </div>
        <div>
          <p className="eyebrow !text-gold">Proposed packaging</p>
          <h2 id="packaging-title" className="heading-lg mt-4 text-cream">
            Three bites. One neat little pack.
          </h2>
          <p className="mt-5 max-w-xl text-cream/75">
            Designed to hold exactly three {powerBites.biteDiameterMm} mm bites — nothing extra, no oversized box. A clear
            window shows what you are getting.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-2xl bg-cream/5 p-5 ring-1 ring-cream/10">
                <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-1 text-sm text-cream/65">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-cream/50">
            Packaging shown is a concept illustration. Final carton and tray dimensions will be confirmed after wrapped bites
            are measured and a physical prototype is tested.
          </p>
        </div>
      </div>
    </section>
  );
}
