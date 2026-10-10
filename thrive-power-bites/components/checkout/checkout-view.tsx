"use client";

import Link from "next/link";
import { useState } from "react";
import { FlaskConical, Info, Loader2, Lock } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { CartSummary } from "@/components/cart/cart-summary";
import { formatINR } from "@/lib/format";
import { getPaymentProvider, isLiveCheckoutEnabled } from "@/lib/payments";
import { hasErrors, validateDelivery, type DeliveryInput, type FieldErrors } from "@/lib/validation";

const initial: DeliveryInput = { fullName: "", phone: "", addressLine: "", city: "Bengaluru", pincode: "" };

const fields: { name: keyof DeliveryInput; label: string; autoComplete: string; type?: string; inputMode?: "numeric" | "tel" }[] = [
  { name: "fullName", label: "Full name", autoComplete: "name" },
  { name: "phone", label: "Mobile number", autoComplete: "tel", type: "tel", inputMode: "tel" },
  { name: "addressLine", label: "Delivery address", autoComplete: "street-address" },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "pincode", label: "Pincode", autoComplete: "postal-code", inputMode: "numeric" },
];

export function CheckoutView() {
  const { lines, subtotal, hydrated } = useCart();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors<keyof DeliveryInput>>({});
  const [state, setState] = useState<"idle" | "checking" | "unavailable">("idle");
  const [reason, setReason] = useState("");
  const live = isLiveCheckoutEnabled();

  if (!hydrated) {
    return (
      <p className="mt-10 flex items-center gap-2 text-forest/60" role="status">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
      </p>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="card mt-10 px-6 py-14 text-center">
        <p className="text-lg font-bold">There is nothing to check out yet.</p>
        <Link href="/shop" className="btn-primary mt-6">Explore Power Bites</Link>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDelivery(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setState("checking");
    const result = await getPaymentProvider().startCheckout({ lines, subtotal });
    if (result.kind === "redirect") {
      window.location.assign(result.url);
      return;
    }
    setReason(result.reason);
    setState("unavailable");
  }

  return (
    <div className="mt-8 space-y-8">
      {!live ? (
        <div className="flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-5">
          <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-[#8a5a12]" aria-hidden="true" />
          <div className="text-sm">
            <p className="font-bold">Demo checkout — online ordering is not open yet.</p>
            <p className="mt-1 text-forest/75">
              You can review your order and try the delivery form, but no order will be created, no payment will be taken and
              the details you enter are not saved or sent anywhere.
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <form noValidate onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8" aria-labelledby="delivery-title">
          <h2 id="delivery-title" className="heading-md">Delivery details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.name} className={f.name === "addressLine" ? "sm:col-span-2" : undefined}>
                <label htmlFor={`delivery-${f.name}`} className="field-label">{f.label}</label>
                <input
                  id={`delivery-${f.name}`}
                  name={f.name}
                  type={f.type ?? "text"}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  value={values[f.name]}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, [f.name]: e.target.value }));
                    if (errors[f.name]) setErrors((er) => ({ ...er, [f.name]: undefined }));
                  }}
                  aria-invalid={errors[f.name] ? true : undefined}
                  aria-describedby={errors[f.name] ? `delivery-${f.name}-error` : undefined}
                  className="field-input"
                />
                {errors[f.name] ? <p id={`delivery-${f.name}-error`} className="field-error">{errors[f.name]}</p> : null}
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-cream px-4 py-3 text-sm text-forest/70">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Payment details are never entered on this site. When live, payment will be completed on our payment
            provider&apos;s secure page.
          </div>

          <button type="submit" className="btn-primary w-full" disabled={state === "checking"}>
            {state === "checking" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {live ? `Continue to payment · ${formatINR(subtotal)}` : "Try demo checkout"}
          </button>

          <div role="status" aria-live="polite">
            {state === "unavailable" ? (
              <div className="flex items-start gap-2 rounded-xl bg-forest px-4 py-4 text-sm text-cream">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-bold">No order was placed.</p>
                  <p className="mt-1 text-cream/80">{reason}</p>
                  <p className="mt-1 text-cream/80">Your cart has been kept so you can come back once ordering opens.</p>
                </div>
              </div>
            ) : null}
          </div>
        </form>

        <aside className="card h-fit space-y-5 p-6" aria-labelledby="checkout-summary-title">
          <h2 id="checkout-summary-title" className="heading-md">Order summary</h2>
          <ul className="space-y-3 text-sm">
            {lines.map((line) => (
              <li key={line.productId} className="flex justify-between gap-3">
                <span>
                  {line.product.name} · {line.product.packSizeGrams} g <span className="text-forest/55">× {line.quantity}</span>
                </span>
                <span className="font-semibold tabular-nums">{formatINR(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-forest/10 pt-4">
            <CartSummary />
          </div>
          <Link href="/cart" className="text-sm font-bold text-leaf hover:text-forest">Edit cart</Link>
        </aside>
      </div>
    </div>
  );
}
