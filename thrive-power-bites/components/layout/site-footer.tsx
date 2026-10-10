import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { FieldValue } from "@/components/ui/pending";

const policyLinks = [
  { label: "Shipping policy", href: "/policies#shipping" },
  { label: "Returns & refunds", href: "/policies#returns" },
  { label: "Privacy policy", href: "/policies#privacy" },
  { label: "Terms of service", href: "/policies#terms" },
];

export function SiteFooter() {
  const { contact, business, social } = site;
  return (
    <footer className="mt-auto bg-forest text-cream">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo tone="cream" />
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            {site.brand.productLine} — handmade dry-fruit snack bites. {site.brand.tagline}
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold uppercase">Explore</h2>
          <ul className="space-y-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/80 transition hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold uppercase">Policies</h2>
          <ul className="space-y-2.5 text-sm">
            {policyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/80 transition hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 mb-4 text-xs font-bold tracking-[0.2em] text-gold uppercase">Follow</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {social.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} className="rounded-full border border-cream/20 px-3 py-1 hover:border-cream/60" rel="noopener noreferrer" target="_blank">
                    {s.label}
                  </a>
                ) : (
                  <span className="rounded-full border border-cream/10 px-3 py-1 text-cream/45" title="Coming soon">
                    {s.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold tracking-[0.2em] text-gold uppercase">Contact</h2>
          <dl className="space-y-3 text-sm text-cream/80 [&_.italic]:text-cream/45">
            <div>
              <dt className="text-cream/50">Email</dt>
              <dd><FieldValue field={contact.email} fallback="Coming soon" /></dd>
            </div>
            <div>
              <dt className="text-cream/50">Phone</dt>
              <dd><FieldValue field={contact.phone} fallback="Coming soon" /></dd>
            </div>
            <div>
              <dt className="text-cream/50">Address</dt>
              <dd><FieldValue field={contact.address} fallback="Coming soon" /></dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.brand.fullName}. Bengaluru, Karnataka, India.</p>
          <p className="[&_.italic]:text-cream/45">
            FSSAI Lic. No.: <FieldValue field={business.fssaiLicence} fallback="to be published before sales begin" /> · GSTIN:{" "}
            <FieldValue field={business.gstin} fallback="to be published before sales begin" />
          </p>
        </div>
      </div>
    </footer>
  );
}
