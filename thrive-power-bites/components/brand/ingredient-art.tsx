type ArtProps = { className?: string };

function Frame({ children, className }: ArtProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export function CashewArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path
        d="M22 22c10-10 30-8 38 6 6 11 2 26-9 31-6 3-11 0-10-6 1-5 6-6 7-12 1-6-5-11-12-9-6 2-8 7-13 9-6 2-9-4-1-19Z"
        fill="#EBCB92"
      />
      <path d="M30 22c9-5 21-3 27 6" stroke="#FFF2D6" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M50 50c4-3 7-8 6-14" stroke="#C99A55" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

export function AlmondArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path d="M40 8c16 10 24 28 20 44-3 13-12 20-20 20s-17-7-20-20C16 36 24 18 40 8Z" fill="#B0703A" />
      <g stroke="#7E4A1F" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M40 14c-4 16-4 36 0 54" />
        <path d="M33 20c-5 12-6 28-3 42" />
        <path d="M47 20c5 12 6 28 3 42" />
      </g>
      <path d="M33 18c-6 8-9 18-8 28" stroke="#E3A96E" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.7" />
    </Frame>
  );
}

export function RaisinArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path d="M24 26c6-12 26-14 34-2 7 10 4 26-6 32-10 7-26 4-31-7-3-7-1-15 3-23Z" fill="#5B2A2E" />
      <g stroke="#2F1215" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M30 30c6 4 14 4 20-2" />
        <path d="M27 44c8 4 18 4 26-2" />
        <path d="M38 22c-2 8 0 16 4 24" />
      </g>
      <path d="M30 26c4-4 10-6 16-5" stroke="#9A5A5F" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />
    </Frame>
  );
}

export function DateArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path d="M20 54C10 40 18 18 36 12c16-5 30 6 28 22-2 18-22 32-36 28-3-1-6-4-8-8Z" fill="#6A2E16" />
      <g stroke="#3F170A" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M24 46c8-2 16-10 20-20" />
        <path d="M30 54c10-4 20-14 24-26" />
      </g>
      <path d="M30 20c8-5 18-5 25 1" stroke="#B5643C" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.75" />
      <path d="M58 22c2-3 5-4 8-3" stroke="#C9A06A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

export const ingredientArt: Record<string, (props: ArtProps) => React.JSX.Element> = {
  Cashews: CashewArt,
  Almonds: AlmondArt,
  Raisins: RaisinArt,
  "Seedless dates": DateArt,
  "Dry dates": DateArt,
};
