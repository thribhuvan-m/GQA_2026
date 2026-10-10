import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { PageIntro } from "@/components/sections/page-intro";
import { ContactForm } from "@/components/contact-form";
import { FieldValue } from "@/components/ui/pending";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with THRIVE.in about POWER BITES.",
};

export default function ContactPage() {
  const { contact } = site;
  const details = [
    { icon: Mail, label: "Email", field: contact.email },
    { icon: Phone, label: "Phone", field: contact.phone },
    { icon: MapPin, label: "Address", field: contact.address },
    { icon: Clock, label: "Hours", field: contact.hours },
  ];

  return (
    <>
      <PageIntro eyebrow="Contact" title="We would love to hear from you.">
        Questions about POWER BITES, bulk orders or stocking us in your store? Send us a message.
      </PageIntro>
      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <ContactForm />
          <aside aria-labelledby="contact-details-title" className="space-y-4">
            <h2 id="contact-details-title" className="heading-md">Contact details</h2>
            <ul className="space-y-3">
              {details.map(({ icon: Icon, label, field }) => (
                <li key={label} className="card flex items-start gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream">
                    <Icon className="h-5 w-5 text-leaf" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-sm text-forest/75">
                      <FieldValue field={field} fallback="Will be published before launch" />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-forest/60">Based in {site.market.initialRegion.split(" and ")[0]}, Karnataka.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
