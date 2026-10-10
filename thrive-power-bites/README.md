# THRIVE.in — POWER BITES website

Pre-launch storefront for **THRIVE.in POWER BITES**, handmade dry-fruit snack bites (60 g pack, 3 bites × 20 g), launching in Bengaluru and Karnataka.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4 and Lucide icons.

> **Status: pre-launch preview.** Prices are draft values, checkout is a clearly labelled demo, and the contact form only reports success when a delivery service is configured. See [Before going live](#before-going-live).

## Run locally

Requires Node.js 20.9+ (tested with Node 22) and npm.

```bash
cd thrive-power-bites
npm install
cp .env.example .env.local   # optional — see "Environment variables"
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check (run `npm run build` or `npx next typegen` once first so route types exist) |

## Project structure

```
app/                     Pages, layout, metadata, API route
  page.tsx               Home
  shop/                  Product page
  our-story/  ingredients/  faq/  contact/  policies/
  cart/  checkout/       Cart page and demo checkout
  launch-checklist/      Internal pre-launch checklist (noindex, removed once launched)
  api/contact/route.ts   Contact form endpoint (forwards to CONTACT_FORM_ENDPOINT)
components/
  brand/                 Logo, SVG pack mockup, tray, bites, ingredient art
  cart/                  Cart provider (localStorage), drawer, lines, summary
  product/               Price tag, quantity selector, add-to-cart, gallery, info panels
  sections/              Home-page sections
  layout/                Announcement bar, header, footer
config/                  ← all editable business data lives here
  site.ts                Brand, announcement, nav, contact, business & regulatory fields
  product.ts             Product, prices, ingredients, allergens, nutrition, shelf life…
  faq.ts                 FAQ questions and answers
  checkout.ts            Live-orders switch and payment provider
lib/                     Price formatting, cart logic, validation, payments, checklist
public/images/           Product photo
docs/                    Research & strategy document
assets/                  Reference brand/packaging boards and concept renders (not used on the site)
```

## Animation

Motion is built with [GSAP](https://gsap.com) + ScrollTrigger (free for commercial use under GSAP's standard licence), [Lenis](https://lenis.darkroom.engineering) smooth scrolling, and plain CSS.

| Effect | Where |
|---|---|
| First-load brand intro (sprout draws, curtain lifts) | `components/motion/intro-curtain.tsx` (home page only, once per visit) |
| Hero line-by-line reveal, drifting leaves, cursor tilt on the pack, magnetic buttons | `components/sections/hero.tsx`, `components/motion/{drifting-leaves,tilt,magnetic}.tsx` |
| **The journey of one bite**: pinned, scroll-scrubbed story (ingredients converge, bite forms, 0→20 g counter, gold-foil wrap, tray, carton) | `components/motion/bite-journey.tsx` |
| Packaging scene: carton turns, tray slides out | `components/motion/packaging-visual.tsx` |
| Section reveals, parallax, number count-ups | Add `data-reveal`, `data-parallax="0.2"` or `data-countup="20"` to any element; handled by `components/motion/reveal-controller.tsx` |
| Fly-to-cart and badge bump | `lib/fly-to-cart.ts` |
| Foil shimmer on bites | `components/brand/bites.tsx` |

Visitors with **reduced motion** enabled in their OS get no smooth scrolling, no intro, no shimmer, and a static five-step version of the journey. All content remains available.

## Editing content

Everything business-related is in `config/`. You should not need to touch components to change content.

- **Prices**: `config/product.ts` → `price.sellingPrice` and `price.mrp` (whole rupees, inclusive of all taxes). While `price.status` is `"draft"`, the site shows a "Proposed launch price" label. Set it to `"confirmed"` once final. The price per 100 g is calculated automatically. Cart totals always read prices from this file, never from stored cart data.
- **Announcement bar**: `config/site.ts` → `announcement`.
- **Contact details, FSSAI number, GSTIN, legal name, addresses**: `config/site.ts` → `contact` and `business`. Each field uses `{ value, status }`. Enter the real value and set `status: "verified"`; until then the site shows "To be confirmed / Coming soon" instead of invented data.
- **Ingredients, allergens, nutrition, storage, shelf life, shipping, returns**: `config/product.ts`. Nutrition rows stay `null` (shown as "—" with a "Being tested" label) until lab-verified values are entered and `nutrition.status` is set to `"verified"`. Set `ingredientOrderVerified: true` once the list is in the final declared order.
- **FAQ**: `config/faq.ts`. Mark answers that still depend on unverified data with `pending: true`.
- **Search engines**: `config/site.ts` → `launched`. While `false`, every page is `noindex` and `robots.txt` disallows crawling. The internal `/launch-checklist` page disappears when it is set to `true`.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for metadata, `sitemap.xml` and `robots.txt` |
| `CONTACT_FORM_ENDPOINT` | JSON endpoint that receives contact messages (e.g. Formspree, Basin or your own webhook). Without it, the form tells visitors their message was **not** sent. |

## Cart and checkout

- The cart is stored in the browser (`localStorage`, key `thrive.cart.v1`). It syncs across tabs and is capped by `maxQuantityPerOrder`.
- `/checkout` is a **demo**: it validates delivery details locally but never stores or sends them, never creates an order and never takes payment.
- Payments are modular: `lib/payments.ts` defines a `PaymentProvider` interface. To go live, implement a provider (e.g. Razorpay Standard Checkout, Shopify Checkout via the Storefront API, or Cashfree) that creates the order on the server and returns a hosted-payment redirect. Then register it in `getPaymentProvider()` and set `liveOrdersEnabled: true` and `paymentProvider` in `config/checkout.ts`. Card and UPI details must only ever be entered on the provider's hosted page or SDK.

## Before going live

Open **`/launch-checklist`** (while `site.launched` is `false`) for a live list generated from the config, or see [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md). At minimum:

1. FSSAI licence/registration number, legal entity name, manufacturer address and GSTIN (if applicable) entered and verified.
2. Final ingredient declaration, allergen statement, lab-tested nutrition values, storage instructions and an evidenced shelf life.
3. Compliance review of the tagline "The Natural Way" and all product wording by a food-labelling professional. FSSAI restricts "natural" claims for composite foods.
4. Confirmed prices, shipping and returns policies, privacy policy and terms.
5. Payment provider account and hosted checkout integrated, with `liveOrdersEnabled` switched on.
6. Contact-form delivery service configured, plus customer-care email, phone and grievance officer details.
7. Professional photography of the real product. The pack is currently an SVG concept illustration.

Building this website does not by itself make the business or its labels compliant.

## Deployment

Any Node.js host that supports Next.js works (Vercel, Netlify, a VPS with `npm run build && npm start`, etc.). Set the project root to `thrive-power-bites/` and add the environment variables above. The contact route needs a server runtime, so a static export alone is not enough unless the form is pointed at a third-party endpoint directly.

The repository's existing GitHub Pages workflow publishes the repository root as static files and does not build this app.
