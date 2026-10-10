import { powerBites } from "@/config/product";
import { site } from "@/config/site";
import { FoilBiteShape, FoilDefs } from "./bites";

type Props = {
  /** Unique prefix for SVG ids; required when several mockups share a page. */
  id: string;
  className?: string;
  title?: string;
};

function Leaf({ d, fill, vein = true }: { d: string; fill: string; vein?: boolean }) {
  return (
    <g>
      <path d={d} fill={fill} />
      {vein ? <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="0.6" /> : null}
    </g>
  );
}

/**
 * Concept illustration of the proposed hanging carton. Not to scale and not a
 * photograph of manufactured packaging.
 */
export function PackMockup({ id, className, title = "Concept illustration of the POWER BITES three-bite hanging carton" }: Props) {
  const p = powerBites;
  return (
    <svg viewBox="0 0 240 620" className={className} role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>{title}</title>
      <defs>
        <FoilDefs id={id} />
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FCF8EF" />
          <stop offset="100%" stopColor="#F1E6D1" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DCC7A2" />
          <stop offset="100%" stopColor="#CDB58C" />
        </linearGradient>
        <linearGradient id={`${id}-window`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#EADFC9" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`${id}-glare`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-face`}>
          <rect x="14" y="44" width="192" height="546" rx="10" />
        </clipPath>
        <clipPath id={`${id}-win`}>
          <rect x="47" y="206" width="126" height="300" rx="63" />
        </clipPath>
        <mask id={`${id}-slot`}>
          <rect x="0" y="0" width="240" height="620" fill="#FFFFFF" />
          <rect x="88" y="17" width="44" height="12" rx="6" fill="#000000" />
        </mask>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <ellipse cx="122" cy="604" rx="100" ry="9" fill="#173F2B" opacity="0.22" filter={`url(#${id}-shadow)`} />

      {/* Reinforced hanging tab */}
      <g mask={`url(#${id}-slot)`}>
        <path d="M58 46 66 10Q68 4 74 4H146Q152 4 154 10L162 46Z" fill="#F4EBDA" />
        <path d="M58 46 66 10Q68 4 74 4H146Q152 4 154 10L162 46Z" fill="none" stroke="#173F2B" strokeOpacity="0.12" />
      </g>
      <rect x="85" y="14" width="50" height="18" rx="9" fill="none" stroke="#DDA33D" strokeOpacity="0.55" strokeWidth="1.2" />

      {/* Carton faces */}
      <path d="M14 44 40 30H232L206 44Z" fill="#EFE4CF" />
      <path d="M206 44 232 30V578L206 590Z" fill={`url(#${id}-side)`} />
      <path d="M216 120 224 116V500L216 506Z" fill="#6D963F" opacity="0.5" />
      <rect x="14" y="44" width="192" height="546" rx="10" fill={`url(#${id}-front)`} />

      <g clipPath={`url(#${id}-face)`}>
        {/* Botanical accents */}
        <g transform="translate(176 52) rotate(18)">
          <Leaf d="M0 0C18 6 26 22 22 44 6 36-2 20 0 0Z" fill="#6D963F" />
          <Leaf d="M10 8C30 4 44 14 48 32 30 34 16 26 10 8Z" fill="#173F2B" />
          <Leaf d="M-6 22C8 30 12 44 6 60-8 50-12 36-6 22Z" fill="#DDA33D" vein={false} />
        </g>
        <g transform="translate(6 440) rotate(-12)">
          <Leaf d="M0 0C20 2 32 18 32 40 12 36 0 20 0 0Z" fill="#173F2B" />
          <Leaf d="M8 30C26 30 38 44 40 62 20 62 10 48 8 30Z" fill="#6D963F" />
          <Leaf d="M-4 44C12 50 16 64 12 80-2 70-8 58-4 44Z" fill="#B85D32" vein={false} />
        </g>
        <circle cx="196" cy="186" r="3" fill="#DDA33D" />
        <circle cx="26" cy="210" r="2.2" fill="#B85D32" />

        {/* Brand mark (deliberately small) */}
        <g transform="translate(62 66)">
          <path d="M8 22V12" stroke="#173F2B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8 13.5C8 9 5 6 0 6c0 4.6 3.2 7.5 8 7.5Z" fill="#6D963F" />
          <path d="M8 12c0-4.4 3-7.4 7.6-7.6.3 4.7-2.8 7.6-7.6 7.6Z" fill="#DDA33D" />
        </g>
        <text x="82" y="85" fontSize="12" fontWeight="600" letterSpacing="3.2" fill="#173F2B">
          {site.brand.name}
          <tspan fontSize="8" fill="#B5832A" letterSpacing="0.5">
            {site.brand.suffix}
          </tspan>
        </text>

        {/* Product name (dominant) */}
        <text x="110" y="134" textAnchor="middle" fontSize="38" fontWeight="800" letterSpacing="1" fill="#173F2B">
          POWER
        </text>
        <text x="110" y="170" textAnchor="middle" fontSize="38" fontWeight="800" letterSpacing="1.5" fill="#173F2B">
          BITES
        </text>
        <rect x="88" y="178" width="44" height="3" rx="1.5" fill="#DDA33D" />
        <text x="110" y="194" textAnchor="middle" fontSize="7.6" fontWeight="600" fill="#173F2B" fillOpacity="0.75">
          {site.brand.tagline}
        </text>

        {/* Transparent window with tray and three foil-wrapped bites */}
        <rect x="47" y="206" width="126" height="300" rx="63" fill={`url(#${id}-window)`} />
        <g clipPath={`url(#${id}-win)`}>
          {[256, 356, 456].map((cy) => (
            <g key={cy}>
              <circle cx="110" cy={cy} r="47" fill="#F7F3EA" />
              <circle cx="110" cy={cy} r="47" fill="none" stroke="#173F2B" strokeOpacity="0.08" strokeWidth="2" />
              <circle cx="110" cy={cy + 3} r="41" fill="#173F2B" opacity="0.12" />
              <FoilBiteShape id={id} cx={110} cy={cy} r={40} />
            </g>
          ))}
          <path d="M60 206 92 206 40 506 8 506Z" fill={`url(#${id}-glare)`} opacity="0.7" />
        </g>
        <rect x="47" y="206" width="126" height="300" rx="63" fill="none" stroke="#173F2B" strokeOpacity="0.22" strokeWidth="1.5" />

        {/* Bottom band */}
        <rect x="14" y="522" width="192" height="68" fill="#173F2B" />
        <rect x="14" y="522" width="192" height="3" fill="#DDA33D" />
        <text x="110" y="551" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="1.5" fill="#F7F1E5">
          {`${p.bitesPerPack} BITES · ${p.packSizeGrams} g`}
        </text>
        <text x="110" y="570" textAnchor="middle" fontSize="7.2" fontWeight="700" letterSpacing="1.8" fill="#DDA33D">
          ORIGINAL MIXED DRY FRUIT
        </text>
      </g>
      <rect x="14" y="44" width="192" height="546" rx="10" fill="none" stroke="#173F2B" strokeOpacity="0.1" />
    </svg>
  );
}
