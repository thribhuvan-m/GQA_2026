import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/config/faq";
import { FaqList } from "@/components/faq-list";
import { PageIntro } from "@/components/sections/page-intro";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about THRIVE.in POWER BITES: pack size, ingredients, allergens, storage and delivery.",
};

export default function FaqPage() {
  return (
    <>
      <PageIntro eyebrow="FAQ" title="Frequently asked questions">
        Some details are still being finalised before launch. Where that is the case, we say so.
      </PageIntro>
      <section className="py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <FaqList items={faqs} />
          <p className="mt-8 text-center text-forest/70">
            Still have a question?{" "}
            <Link href="/contact" className="font-bold text-leaf underline-offset-4 hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
