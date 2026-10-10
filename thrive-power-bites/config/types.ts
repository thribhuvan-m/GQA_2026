export type VerificationStatus = "verified" | "pending-verification";

/**
 * A field whose value is not yet confirmed by the store owner. `value` stays
 * `null` until real, verified information is supplied; the UI then shows an
 * honest "to be confirmed" message instead of an invented value.
 */
export type ConfigField<T = string> = {
  label: string;
  value: T | null;
  status: VerificationStatus;
  /** Internal note explaining what is needed before this can be verified. */
  note?: string;
};

export const PENDING = "Pending verification" as const;

export function pending<T = string>(label: string, note?: string, value: T | null = null): ConfigField<T> {
  return { label, value, status: "pending-verification", note };
}

export function isVerified<T>(field: ConfigField<T>): field is ConfigField<T> & { value: T } {
  return field.status === "verified" && field.value !== null;
}
