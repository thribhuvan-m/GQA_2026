import { FoilBiteShape, FoilDefs, UnwrappedBiteShape } from "./bites";

/** Top view of the proposed inner tray: three cavities, two wrapped bites and one unwrapped. */
export function TrayIllustration({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 420 200" className={className} role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>
        Concept illustration of the inner tray with three cavities holding two gold-foil wrapped bites and one unwrapped bite
      </title>
      <defs>
        <FoilDefs id={id} />
        <linearGradient id={`${id}-tray`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EFE9DD" />
        </linearGradient>
        <filter id={`${id}-blur`}>
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <rect x="22" y="34" width="380" height="146" rx="26" fill="#173F2B" opacity="0.18" filter={`url(#${id}-blur)`} />
      <rect x="16" y="22" width="388" height="152" rx="26" fill={`url(#${id}-tray)`} stroke="#173F2B" strokeOpacity="0.1" />
      {[90, 210, 330].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="98" r="56" fill="#E9E1D1" />
          <circle cx={cx} cy="101" r="52" fill="#DCD2BF" opacity="0.6" />
        </g>
      ))}
      <FoilBiteShape id={id} cx={90} cy={96} r={46} />
      <FoilBiteShape id={id} cx={210} cy={96} r={46} />
      <UnwrappedBiteShape id={id} cx={330} cy={96} r={46} />
    </svg>
  );
}
