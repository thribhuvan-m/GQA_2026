import { powerBites } from "@/config/product";

const p = powerBites;

const stats = [
  { value: p.bitesPerPack, unit: "", label: "bites in every pack" },
  { value: p.biteWeightGrams, unit: "g", label: "each bite" },
  { value: p.biteDiameterMm, unit: "mm", prefix: "~", label: "across" },
  { value: p.packSizeGrams, unit: "g", label: "per pack" },
];

export function ByTheNumbers() {
  return (
    <section aria-labelledby="numbers-title" className="py-16 sm:py-20">
      <div className="container-page">
        <h2 id="numbers-title" className="sr-only">
          POWER BITES by the numbers
        </h2>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-forest/10 bg-forest/10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col-reverse items-center bg-cream px-4 py-8 text-center sm:py-10">
              <dt className="mt-2 text-sm font-semibold text-forest/60">{s.label}</dt>
              <dd className="text-5xl font-extrabold tracking-tight text-forest sm:text-6xl">
                <span className="sr-only">{`${s.prefix ?? ""}${s.value} ${s.unit}`}</span>
                <span aria-hidden="true">
                  {s.prefix}
                  <span data-countup={s.value}>{s.value}</span>
                  {s.unit ? <span className="ml-1 text-2xl text-leaf sm:text-3xl">{s.unit}</span> : null}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
