import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import productPhoto from "@/public/images/real-product-photo.jpg";

export function BrandStory() {
  return (
    <section aria-labelledby="story-title" className="py-16 sm:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-sm">
          <div aria-hidden="true" className="absolute -inset-4 -rotate-3 rounded-[2rem] bg-leaf/15" />
          <figure className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lift">
            <Image
              src={productPhoto}
              alt="A bowl of handmade POWER BITES dry-fruit bites"
              className="h-auto w-full rounded-[1.5rem]"
              sizes="(min-width: 1024px) 384px, 90vw"
              placeholder="blur"
            />
            <figcaption className="px-2 pt-3 pb-1 text-xs text-forest/55">Our handmade bites, before wrapping.</figcaption>
          </figure>
        </div>
        <div>
          <p className="eyebrow">Our story</p>
          <h2 id="story-title" className="heading-lg mt-4">
            Everyday nourishment should be simple.
          </h2>
          <div className="lead mt-6 space-y-4">
            <p>
              Between work, travel and everything else, the snacks we reach for are often whatever is closest. THRIVE.in
              started with a simple idea: make a dry-fruit snack that is just as convenient — and much more considered.
            </p>
            <p>
              POWER BITES take the familiar comfort of dry fruits and dates, shape them by hand into neat 20 g bites, and pack
              them three at a time so they are ready whenever you are.
            </p>
          </div>
          <Link href="/our-story" className="btn-secondary mt-8">
            Read our story <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
