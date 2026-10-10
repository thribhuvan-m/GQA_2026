import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandHeart, MapPin, Scale, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/sections/page-intro";
import { TrayIllustration } from "@/components/brand/tray-illustration";
import productPhoto from "@/public/images/real-product-photo.jpg";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Why THRIVE.in makes POWER BITES: convenient, thoughtfully presented dry-fruit bites for everyday nourishment.",
};

const values = [
  {
    icon: HandHeart,
    title: "Made by hand",
    body: "Every bite is shaped by hand. It takes longer, and we think it is worth it.",
  },
  {
    icon: Scale,
    title: "Thoughtfully portioned",
    body: "20 g bites, three to a pack. Easy to enjoy one, easy to share, easy to carry.",
  },
  {
    icon: ShieldCheck,
    title: "Honest information",
    body: "We publish ingredients, nutrition and shelf-life details only once they are verified — never before.",
  },
  {
    icon: MapPin,
    title: "Starting close to home",
    body: "We are beginning in Bengaluru and Karnataka, and growing one neighbourhood at a time.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageIntro eyebrow="Our story" title="Nourishing everyday, one small bite at a time.">
        THRIVE.in is a modern Indian snack brand built around a simple belief: everyday nourishment should be convenient,
        and convenient food should still feel considered.
      </PageIntro>

      <section className="py-16 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="lead space-y-5">
            <h2 className="heading-lg text-forest">Where the idea came from</h2>
            <p>
              Dry fruits and dates have a special place in Indian kitchens — packed into tiffins, offered to guests, rolled into
              laddoos for festivals. Yet on a busy weekday, they rarely make it into our bags.
            </p>
            <p>
              POWER BITES bring that familiar goodness into a form that fits modern routines: cashews, almonds, raisins and
              dates, shaped by hand into neat bites and packed three at a time.
            </p>
            <p>
              We care about how the product is presented, too. Our packaging is being designed around a compact carton, a clear
              window and individually wrapped bites, so every pack feels like a small treat — whether it is for you or for
              someone else.
            </p>
          </div>
          <div className="space-y-5">
            <figure className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-lift">
              <Image
                src={productPhoto}
                alt="Handmade POWER BITES in a bowl"
                className="h-auto w-full rounded-[1.5rem]"
                sizes="(min-width: 1024px) 540px, 90vw"
                placeholder="blur"
              />
            </figure>
            <div className="card p-5">
              <TrayIllustration id="story-tray" className="h-auto w-full" />
              <p className="mt-2 text-center text-xs text-forest/55">Proposed inner tray — concept illustration</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-white/60 py-16 sm:py-24">
        <div className="container-page">
          <p className="eyebrow">What we stand for</p>
          <h2 id="values-title" className="heading-lg mt-4 max-w-2xl">Simple principles, every batch.</h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, body }) => (
              <li key={title} className="card p-6">
                <Icon className="h-6 w-6 text-leaf" aria-hidden="true" />
                <h3 className="heading-md mt-4">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest/70">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-forest p-8 text-cream sm:flex-row sm:items-center sm:p-12">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Meet POWER BITES.</h2>
              <p className="mt-2 text-cream/70">Three handmade dry-fruit bites in every 60 g pack.</p>
            </div>
            <Link href="/shop" className="btn bg-gold text-forest hover:bg-gold-soft">
              Explore Power Bites <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
