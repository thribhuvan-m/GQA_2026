import { pending, type ConfigField } from "./types";

export type PriceStatus = "draft" | "confirmed";

export type Ingredient = {
  name: string;
  /** Short, factual, non-medical description. */
  description: string;
  featured: boolean;
};

export type NutritionRow = {
  nutrient: string;
  unit: string;
  per100g: number | null;
  perBite: number | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  flavour: string;
  fullName: string;
  shortDescription: string;
  packSizeGrams: number;
  bitesPerPack: number;
  biteWeightGrams: number;
  biteDiameterMm: number;
  manufacturing: string;
  price: {
    /** Selling price in whole rupees, inclusive of all taxes. */
    sellingPrice: number;
    /** Maximum retail price in whole rupees, inclusive of all taxes. */
    mrp: number;
    status: PriceStatus;
    note: string;
  };
  maxQuantityPerOrder: number;
  ingredients: Ingredient[];
  ingredientOrderVerified: boolean;
  allergens: ConfigField<string>;
  allergenGuidance: string;
  nutrition: {
    status: "pending-verification" | "verified";
    rows: NutritionRow[];
  };
  storage: ConfigField<string>;
  shelfLife: ConfigField<string>;
  shipping: ConfigField<string>;
  returns: ConfigField<string>;
  packaging: {
    status: "concept" | "final";
    carton: string;
    tray: string;
    wrap: string;
    hanging: string;
    provisionalDimensions: ConfigField<string>;
  };
};

export const powerBites: Product = {
  id: "power-bites-original-60g",
  slug: "power-bites-original",
  name: "POWER BITES",
  flavour: "Original Mixed Dry Fruit",
  fullName: "THRIVE.in POWER BITES — Original Mixed Dry Fruit",
  shortDescription:
    "Three handmade dry-fruit bites made with cashews, almonds, raisins and dates, portioned at 20 g each for an easy everyday snack.",
  packSizeGrams: 60,
  bitesPerPack: 3,
  biteWeightGrams: 20,
  biteDiameterMm: 35,
  manufacturing: "Handmade",

  price: {
    sellingPrice: 79,
    mrp: 89,
    status: "draft",
    note: "Proposed launch price. Target range ₹129–₹149 per 100 g. Confirm before accepting orders.",
  },
  maxQuantityPerOrder: 12,

  // Order shown here is not the final declared order (descending by weight); see ingredientOrderVerified.
  ingredients: [
    { name: "Cashews", description: "Creamy, mild cashew pieces for a rich bite.", featured: true },
    { name: "Almonds", description: "Chopped almonds for texture and crunch.", featured: true },
    { name: "Raisins", description: "Plump raisins for a fruity sweetness.", featured: true },
    { name: "Seedless dates", description: "Soft dates that bind every bite together.", featured: true },
    { name: "Dry dates", description: "Traditional dry dates (kharek) for depth of flavour.", featured: false },
    { name: "Jaggery", description: "A traditional Indian sweetener.", featured: false },
    { name: "Ghee", description: "Clarified butter used in the handmade preparation.", featured: false },
  ],
  ingredientOrderVerified: false,

  allergens: pending<string>(
    "Allergen statement",
    "Confirm the full allergen and cross-contact statement with a food-labelling professional.",
  ),
  allergenGuidance:
    "Based on the current ingredient list, this product contains tree nuts (cashews, almonds) and dairy (ghee). It is not suitable for people with tree-nut or milk allergies.",

  nutrition: {
    status: "pending-verification",
    rows: [
      { nutrient: "Energy", unit: "kcal", per100g: null, perBite: null },
      { nutrient: "Protein", unit: "g", per100g: null, perBite: null },
      { nutrient: "Carbohydrate", unit: "g", per100g: null, perBite: null },
      { nutrient: "Total sugars", unit: "g", per100g: null, perBite: null },
      { nutrient: "Added sugars", unit: "g", per100g: null, perBite: null },
      { nutrient: "Dietary fibre", unit: "g", per100g: null, perBite: null },
      { nutrient: "Total fat", unit: "g", per100g: null, perBite: null },
      { nutrient: "Saturated fat", unit: "g", per100g: null, perBite: null },
      { nutrient: "Trans fat", unit: "g", per100g: null, perBite: null },
      { nutrient: "Sodium", unit: "mg", per100g: null, perBite: null },
    ],
  },

  storage: pending<string>(
    "Storage instructions",
    "Provide storage guidance validated for the final packaging.",
  ),
  shelfLife: pending<string>(
    "Shelf life",
    "Owner reports 3+ months. Supporting shelf-life study evidence has not been supplied.",
    "3+ months (owner-reported)",
  ),
  shipping: pending<string>(
    "Shipping policy",
    "Configure courier, delivery areas, charges and timelines.",
  ),
  returns: pending<string>(
    "Returns and refunds policy",
    "Define the policy for damaged, incorrect or undelivered orders.",
  ),

  packaging: {
    status: "concept",
    carton: "Compact rectangular hanging carton designed for exactly three bites",
    tray: "Inner tray with three individual cavities",
    wrap: "Each bite individually wrapped in gold foil",
    hanging: "Reinforced hanging slot for retail display",
    provisionalDimensions: pending<string>(
      "Carton and tray dimensions",
      "Provisional until wrapped bites are measured and a physical prototype is tested.",
    ),
  },
};

export const products: Product[] = [powerBites];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
