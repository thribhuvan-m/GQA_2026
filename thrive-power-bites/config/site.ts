import { pending, type ConfigField } from "./types";

export const site = {
  brand: {
    name: "THRIVE",
    suffix: ".in",
    fullName: "THRIVE.in",
    productLine: "POWER BITES",
    tagline: "Nourishing Everyday. The Natural Way.",
    category: "Premium dry-fruit snack bites",
  },

  /** Set to true only when the launch checklist is complete. Keeps search engines out until then. */
  launched: false,

  announcement: {
    enabled: true,
    message: "Launching soon in Bengaluru — online ordering opens once our store is ready.",
  },

  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Our Story", href: "/our-story" },
    { label: "Ingredients", href: "/ingredients" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],

  market: {
    country: "India",
    initialRegion: "Bengaluru and Karnataka",
    deliveryAreas: pending<string>(
      "Delivery areas",
      "Confirm serviceable pincodes and courier partner before accepting orders.",
    ),
  },

  contact: {
    email: pending<string>("Business email", "Add a monitored business email address."),
    phone: pending<string>("Business phone", "Add a customer-care phone number."),
    address: pending<string>("Business address", "Add the registered business address."),
    hours: pending<string>("Customer-care hours"),
  },

  social: [
    { label: "Instagram", href: null as string | null },
    { label: "Facebook", href: null as string | null },
    { label: "YouTube", href: null as string | null },
  ],

  business: {
    legalName: pending<string>("Registered legal entity name"),
    fssaiLicence: pending<string>(
      "FSSAI licence / registration number",
      "Mandatory on the website and label for food businesses in India. Do not launch without it.",
    ),
    gstin: pending<string>("GSTIN", "GST registration status not yet confirmed."),
    manufacturerAddress: pending<string>(
      "Manufacturer name and address",
      "Required on the label and product page.",
    ),
    grievanceOfficer: pending<string>(
      "Grievance officer (name and contact)",
      "Required for e-commerce sellers under the Consumer Protection (E-Commerce) Rules, 2020.",
    ),
    domain: pending<string>("Website domain"),
  } satisfies Record<string, ConfigField>,
} as const;

export type Site = typeof site;
