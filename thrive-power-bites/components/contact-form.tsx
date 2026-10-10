"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from "lucide-react";
import { hasErrors, validateContact, type ContactInput, type FieldErrors } from "@/lib/validation";

type Status = "idle" | "submitting" | "sent" | "not_configured" | "error";

const initial: ContactInput = { name: "", email: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(initial);
  const [errors, setErrors] = useState<FieldErrors<keyof ContactInput>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(field: keyof ContactInput, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      const first = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const company = (form.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      const data = (await res.json().catch(() => ({}))) as { status?: string; errors?: FieldErrors<keyof ContactInput> };
      if (res.ok && data.status === "sent") {
        setStatus("sent");
        setValues(initial);
      } else if (data.status === "not_configured") {
        setStatus("not_configured");
      } else if (data.status === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldProps = (field: keyof ContactInput) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: "field-input",
  });

  return (
    <form noValidate onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="contact-name" className="field-label">Name</label>
        <input {...fieldProps("name")} type="text" autoComplete="name" onChange={(e) => update("name", e.target.value)} />
        {errors.name ? <p id="contact-name-error" className="field-error">{errors.name}</p> : null}
      </div>
      <div>
        <label htmlFor="contact-email" className="field-label">Email</label>
        <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" onChange={(e) => update("email", e.target.value)} />
        {errors.email ? <p id="contact-email-error" className="field-error">{errors.email}</p> : null}
      </div>
      <div>
        <label htmlFor="contact-message" className="field-label">Message</label>
        <textarea {...fieldProps("message")} rows={5} onChange={(e) => update("message", e.target.value)} />
        {errors.message ? <p id="contact-message-error" className="field-error">{errors.message}</p> : null}
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      <div role="status" aria-live="polite">
        {status === "sent" ? (
          <p className="flex items-start gap-2 rounded-xl bg-leaf/10 px-4 py-3 text-sm text-forest">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
            Thank you — your message has been sent. We will get back to you soon.
          </p>
        ) : null}
        {status === "not_configured" ? (
          <p className="flex items-start gap-2 rounded-xl bg-gold/15 px-4 py-3 text-sm text-forest">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#8a5a12]" aria-hidden="true" />
            Your message was not sent: our messaging service is not connected yet. Please try again after launch. Nothing
            you entered has been stored.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="flex items-start gap-2 rounded-xl bg-rust/10 px-4 py-3 text-sm text-forest">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rust" aria-hidden="true" />
            Something went wrong and your message was not sent. Please try again in a moment.
          </p>
        ) : null}
      </div>
    </form>
  );
}
