import type { Metadata } from "next";
import { powerBites } from "@/config/product";
import { PageIntro } from "@/components/sections/page-intro";
import { FieldValue, PendingPill } from "@/components/ui/pending";

export const metadata: Metadata = {
  title: "Policies",
  description: "Shipping, returns, privacy and terms for THRIVE.in.",
};

export default function PoliciesPage() {
  const sections = [
    { id: "shipping", title: "Shipping policy", body: <FieldValue field={powerBites.shipping} fallback="Our shipping policy — delivery areas, charges and timelines — will be published here before orders open." /> },
    { id: "returns", title: "Returns and refunds", body: <FieldValue field={powerBites.returns} fallback="Our returns and refunds policy will be published here before orders open." /> },
    { id: "privacy", title: "Privacy policy", body: <span className="text-forest/55 italic">Our privacy policy will be published here before we collect any customer data. The contact form and demo checkout currently do not store your details.</span> },
    { id: "terms", title: "Terms of service", body: <span className="text-forest/55 italic">Our terms of service will be published here before orders open.</span> },
  ];

  return (
    <>
      <PageIntro eyebrow="Policies" title="Store policies">
        These policies are being prepared and will be finalised before online ordering opens.
      </PageIntro>
      <div className="container-page max-w-3xl space-y-5 py-14 sm:py-20">
        {sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="card scroll-mt-28 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id={`${s.id}-title`} className="heading-md">{s.title}</h2>
              <PendingPill>In preparation</PendingPill>
            </div>
            <p className="mt-4 leading-relaxed text-forest/75">{s.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
