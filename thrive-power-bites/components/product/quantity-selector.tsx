"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  label: string;
  size?: "sm" | "md";
};

export function QuantitySelector({ value, onChange, min = 1, max, label, size = "md" }: Props) {
  const btn =
    size === "sm"
      ? "h-8 w-8"
      : "h-11 w-11";
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-forest/15 bg-white"
    >
      <button
        type="button"
        className={`${btn} inline-flex items-center justify-center rounded-full text-forest transition hover:bg-forest/5 disabled:opacity-35`}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <output aria-live="polite" className={`min-w-8 text-center font-bold tabular-nums ${size === "sm" ? "text-sm" : ""}`}>
        {value}
      </output>
      <button
        type="button"
        className={`${btn} inline-flex items-center justify-center rounded-full text-forest transition hover:bg-forest/5 disabled:opacity-35`}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
