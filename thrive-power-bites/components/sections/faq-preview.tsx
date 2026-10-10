import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqs } from "@/config/faq";
import { FaqList } from "@/components/faq-list";

export function FaqPreview() {
  return (
    <section aria-labelledby="faq-title" className="py-16 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="heading-lg mt-4">
            Good questions, honest answers.
          </h2>
          <p className="lead mt-5">Some details are still being finalised. We will only publish them once they are confirmed.</p>
          <Link href="/faq" className="btn-secondary mt-8">
            All questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div data-reveal>
          <FaqList items={faqs.slice(0, 5)} />
        </div>
      </div>
    </section>
  );
}
