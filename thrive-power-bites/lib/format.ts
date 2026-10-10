const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatINR(amount: number): string {
  return inr.format(amount);
}

export function pricePer100g(price: number, grams: number): number {
  return Math.round((price / grams) * 100 * 100) / 100;
}
