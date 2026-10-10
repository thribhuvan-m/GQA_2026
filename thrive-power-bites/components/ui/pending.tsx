import { Clock } from "lucide-react";
import type { ConfigField } from "@/config/types";

/** Shows a verified value, or an honest "to be confirmed" message when it is still pending. */
export function FieldValue({
  field,
  fallback = "To be confirmed before launch",
}: {
  field: ConfigField<string>;
  fallback?: string;
}) {
  if (field.status === "verified" && field.value) return <>{field.value}</>;
  return <span className="text-forest/55 italic">{fallback}</span>;
}

export function PendingPill({ children = "To be confirmed" }: { children?: React.ReactNode }) {
  return (
    <span className="pending-pill">
      <Clock className="h-3 w-3" aria-hidden="true" />
      {children}
    </span>
  );
}
