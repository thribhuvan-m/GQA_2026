/**
 * SVG building blocks shared by the illustrations. Every gradient id is
 * prefixed so several illustrations can render on one page without clashing.
 */

export function FoilDefs({ id }: { id: string }) {
  return (
    <>
      <radialGradient id={`${id}-foil`} cx="36%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#FFF4CF" />
        <stop offset="22%" stopColor="#F3CF72" />
        <stop offset="55%" stopColor="#D69A2D" />
        <stop offset="82%" stopColor="#9C6512" />
        <stop offset="100%" stopColor="#6E440A" />
      </radialGradient>
      <radialGradient id={`${id}-bite`} cx="38%" cy="32%" r="72%">
        <stop offset="0%" stopColor="#A8552E" />
        <stop offset="45%" stopColor="#7A3418" />
        <stop offset="100%" stopColor="#3E180B" />
      </radialGradient>
    </>
  );
}

/** A gold-foil wrapped bite centred on (cx, cy). */
export function FoilBiteShape({ id, cx, cy, r }: { id: string; cx: number; cy: number; r: number }) {
  const s = r / 40;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <circle r="40" fill={`url(#${id}-foil)`} />
      <g fill="#FFF3C4" opacity="0.35">
        <path d="M-30-12 -14-30 -4-16 -18-4Z" />
        <path d="M2-34 18-28 12-12 0-18Z" />
        <path d="M-36 8 -22 2 -16 18 -30 24Z" />
      </g>
      <g fill="#7A4A0C" opacity="0.28">
        <path d="M14-6 32-14 36 6 20 10Z" />
        <path d="M-10 14 8 8 14 28-4 34Z" />
        <path d="M20 16 34 14 26 30Z" />
        <path d="M-24-28-8-38-14-24Z" />
      </g>
      <g stroke="#FFF1B8" strokeWidth="0.9" fill="none" opacity="0.55">
        <path d="M-30-12-14-30M-4-16-18-4M2-34 12-12M-36 8-16 18" />
      </g>
      <g stroke="#6E440A" strokeWidth="0.8" fill="none" opacity="0.35">
        <path d="M14-6 36 6M-10 14 14 28M-24-28-14-24" />
      </g>
      <ellipse cx="-14" cy="-17" rx="11" ry="6" fill="#FFFBEA" opacity="0.7" transform="rotate(-35 -14 -17)" />
      <path d="M-4 38c-4-3-4-7 0-9 4 2 4 6 0 9Z" fill="#B57A1C" opacity="0.6" />
    </g>
  );
}

/** An unwrapped bite: date base studded with nut and raisin pieces. */
export function UnwrappedBiteShape({ id, cx, cy, r }: { id: string; cx: number; cy: number; r: number }) {
  const s = r / 40;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <path
        d="M0-40C22-40 40-23 40 0c0 22-17 40-40 40-23 0-40-17-40-40 0-23 18-40 40-40Z"
        fill={`url(#${id}-bite)`}
      />
      <g fill="#EBD3A6">
        <ellipse cx="-16" cy="-18" rx="7" ry="4.5" transform="rotate(-25 -16 -18)" />
        <ellipse cx="10" cy="-24" rx="6" ry="4" transform="rotate(15 10 -24)" />
        <ellipse cx="20" cy="2" rx="7.5" ry="4.5" transform="rotate(70 20 2)" />
        <ellipse cx="-22" cy="10" rx="6.5" ry="4" transform="rotate(40 -22 10)" />
        <ellipse cx="2" cy="20" rx="7" ry="4.2" transform="rotate(-10 2 20)" />
        <ellipse cx="-4" cy="-4" rx="5" ry="3.4" transform="rotate(60 -4 -4)" />
      </g>
      <g fill="#C9A06A" opacity="0.9">
        <path d="M-30-6c3-4 8-4 9 0-2 4-7 4-9 0Z" />
        <path d="M24-18c3-3 7-2 7 1-2 3-6 3-7-1Z" />
        <path d="M12 30c3-3 7-2 7 1-2 3-6 3-7-1Z" />
      </g>
      <g fill="#3A1208">
        <circle cx="-8" cy="-28" r="3.2" />
        <circle cx="28" cy="16" r="3" />
        <circle cx="-14" cy="26" r="3.4" />
        <circle cx="8" cy="6" r="2.6" />
      </g>
      <ellipse cx="-16" cy="-20" rx="12" ry="6" fill="#FFFFFF" opacity="0.12" transform="rotate(-35 -16 -20)" />
    </g>
  );
}

export function FoilBite({ className, id }: { className?: string; id: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <FoilDefs id={id} />
      </defs>
      <ellipse cx="50" cy="92" rx="30" ry="5" fill="#173F2B" opacity="0.12" />
      <FoilBiteShape id={id} cx={50} cy={48} r={40} />
    </svg>
  );
}

export function UnwrappedBite({ className, id }: { className?: string; id: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <FoilDefs id={id} />
      </defs>
      <ellipse cx="50" cy="92" rx="30" ry="5" fill="#173F2B" opacity="0.12" />
      <UnwrappedBiteShape id={id} cx={50} cy={48} r={40} />
    </svg>
  );
}
