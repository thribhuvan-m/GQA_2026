import { powerBites } from "./product";

export type FaqItem = {
  question: string;
  answer: string;
  /** Answers that still depend on unverified information. */
  pending?: boolean;
};

const ingredientList = powerBites.ingredients.map((i) => i.name.toLowerCase()).join(", ");

export const faqs: FaqItem[] = [
  {
    question: "What are THRIVE.in POWER BITES?",
    answer: `POWER BITES are handmade dry-fruit snack bites. Each pack contains ${powerBites.bitesPerPack} bites of about ${powerBites.biteWeightGrams} g each, made for an easy, convenient snack during your day.`,
  },
  {
    question: "How many bites are in one pack?",
    answer: `Each ${powerBites.packSizeGrams} g pack contains ${powerBites.bitesPerPack} bites of ${powerBites.biteWeightGrams} g each.`,
  },
  {
    question: "What ingredients are used?",
    answer: `The current recipe uses ${ingredientList}. The final ingredient declaration, in the order required on the label, will be published before launch.`,
    pending: true,
  },
  {
    question: "Are the bites suitable for people with nut allergies?",
    answer:
      "No. POWER BITES contain cashews and almonds (tree nuts) and ghee (dairy), so they are not suitable for people with tree-nut or milk allergies. A complete allergen statement, including cross-contact information, will be published before launch.",
  },
  {
    question: "How should the product be stored?",
    answer:
      "Storage instructions are being finalised for the final packaging and will be confirmed before launch.",
    pending: true,
  },
  {
    question: "What is the confirmed shelf life?",
    answer:
      "The confirmed shelf life will be printed on every pack and published here before launch, once supporting evidence has been reviewed.",
    pending: true,
  },
  {
    question: "Where do you currently deliver?",
    answer:
      "We plan to start in Bengaluru and the rest of Karnataka. Serviceable areas and delivery timelines will be confirmed before online orders open.",
    pending: true,
  },
  {
    question: "How can customers contact the brand?",
    answer:
      "Our customer-care email and phone number will be listed on the Contact page before launch. Until then, you can leave us a message through the contact form once it is enabled.",
    pending: true,
  },
];
