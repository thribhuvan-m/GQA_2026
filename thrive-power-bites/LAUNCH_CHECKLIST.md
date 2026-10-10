# THRIVE.in — launch checklist

Everything below must be verified **before accepting orders or publishing final product labels**. The same list is generated live from `config/` at `/launch-checklist` while `site.launched` is `false`.

Status legend: ☐ pending verification · ☑ done

## Business and regulatory
- ☐ FSSAI licence / registration number (`config/site.ts → business.fssaiLicence`). Required on the website and the label.
- ☐ Registered legal entity name
- ☐ GSTIN, or confirmation that GST registration is not required
- ☐ Manufacturer name and address (label and product page)
- ☐ Grievance officer name and contact (Consumer Protection (E-Commerce) Rules, 2020)
- ☐ Website domain, and `NEXT_PUBLIC_SITE_URL` set

## Product label and product page
- ☐ Final ingredient list in descending order by weight, with percentages where required
- ☐ Allergen statement, including cross-contact. Current recipe contains tree nuts (cashew, almond) and dairy (ghee).
- ☐ Lab-tested nutrition information per 100 g and per serve (energy, protein, carbohydrate, total and added sugars, fibre, fat, saturated and trans fat, sodium)
- ☐ Storage instructions validated for the final packaging
- ☐ Shelf life backed by a shelf-life study. The owner reports 3+ months, but no evidence has been supplied yet.
- ☐ Compliance review of all claims and wording, including the tagline "Nourishing Everyday. The Natural Way.", "Handmade" and benefit copy. Do not use "no added sugar" (recipe contains jaggery) or "vegan / plant-based" (recipe contains ghee).
- ☐ Veg symbol, net quantity, MRP, batch number, date marking and other mandatory label declarations on the physical pack

## Packaging
- ☐ Wrapped bites measured and a physical carton and tray prototype tested
- ☐ Final carton and tray dimensions entered (`packaging.provisionalDimensions`)
- ☐ Product photography of the real manufactured pack to replace the concept illustration

## Pricing
- ☐ Selling price and MRP confirmed (`config/product.ts → price`, set `status: "confirmed"`)

## Policies
- ☐ Shipping policy: serviceable pincodes, courier, charges and timelines
- ☐ Returns and refunds policy
- ☐ Privacy policy
- ☐ Terms of service

## Checkout and operations
- ☐ Payment provider account, KYC and API keys (Razorpay, Shopify, Cashfree…)
- ☐ Hosted checkout integrated in `lib/payments.ts`; `config/checkout.ts → liveOrdersEnabled: true`
- ☐ Order notification and fulfilment process tested end to end
- ☐ Contact-form delivery service (`CONTACT_FORM_ENDPOINT`) configured and tested
- ☐ Customer-care email, phone and hours published

## Go live
- ☐ All items above complete
- ☐ `config/site.ts → launched: true` (enables indexing, hides `/launch-checklist`)
- ☐ Announcement bar message updated
