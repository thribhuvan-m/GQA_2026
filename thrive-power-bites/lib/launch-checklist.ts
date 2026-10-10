import { checkout } from "@/config/checkout";
import { powerBites } from "@/config/product";
import { site } from "@/config/site";
import type { ConfigField } from "@/config/types";

export type ChecklistItem = {
  area: string;
  item: string;
  done: boolean;
  note?: string;
};

function fromField(area: string, field: ConfigField<unknown>): ChecklistItem {
  return { area, item: field.label, done: field.status === "verified" && field.value !== null, note: field.note };
}

export function getLaunchChecklist(): ChecklistItem[] {
  const p = powerBites;
  return [
    ...Object.values(site.business).map((f) => fromField("Business & regulatory", f)),
    ...Object.values(site.contact).map((f) => fromField("Contact details", f)),
    fromField("Delivery", site.market.deliveryAreas),
    {
      area: "Product label",
      item: "Final ingredient list in descending order by weight",
      done: p.ingredientOrderVerified,
      note: "Include ingredient percentages where required.",
    },
    fromField("Product label", p.allergens),
    {
      area: "Product label",
      item: "Nutrition information (per 100 g and per serve)",
      done: p.nutrition.status === "verified",
      note: "Use laboratory-tested values only.",
    },
    fromField("Product label", p.storage),
    fromField("Product label", p.shelfLife),
    {
      area: "Product label",
      item: "Compliance review of claims and tagline",
      done: false,
      note: "Have a food-labelling professional review “The Natural Way”, “Handmade” and any benefit wording before printing labels or running ads.",
    },
    fromField("Packaging", p.packaging.provisionalDimensions),
    {
      area: "Pricing",
      item: "Confirm selling price and MRP",
      done: p.price.status === "confirmed",
      note: p.price.note,
    },
    fromField("Policies", p.shipping),
    fromField("Policies", p.returns),
    { area: "Policies", item: "Privacy policy and terms of service", done: false },
    {
      area: "Checkout",
      item: "Payment provider account, keys and hosted checkout",
      done: checkout.liveOrdersEnabled && checkout.paymentProvider !== "none",
    },
    {
      area: "Checkout",
      item: "Contact-form delivery service (CONTACT_FORM_ENDPOINT)",
      done: Boolean(process.env.CONTACT_FORM_ENDPOINT),
    },
    { area: "Content", item: "Professional product photography of the real product", done: false },
  ];
}
