const leaves = [
  { left: "6%", size: 22, color: "#6D963F", dur: "19s", delay: "-2s", sway: "60px", alpha: 0.45 },
  { left: "18%", size: 14, color: "#DDA33D", dur: "23s", delay: "-11s", sway: "-40px", alpha: 0.5 },
  { left: "38%", size: 18, color: "#173F2B", dur: "26s", delay: "-6s", sway: "50px", alpha: 0.25 },
  { left: "58%", size: 12, color: "#B85D32", dur: "21s", delay: "-15s", sway: "-55px", alpha: 0.35 },
  { left: "72%", size: 20, color: "#6D963F", dur: "24s", delay: "-9s", sway: "45px", alpha: 0.4 },
  { left: "88%", size: 15, color: "#DDA33D", dur: "20s", delay: "-4s", sway: "-35px", alpha: 0.45 },
];

export function DriftingLeaves() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="drift-leaf absolute -top-8"
          width={l.size}
          height={l.size}
          style={
            {
              left: l.left,
              "--dur": l.dur,
              "--delay": l.delay,
              "--sway": l.sway,
              "--alpha": l.alpha,
            } as React.CSSProperties
          }
        >
          <path d="M3 21C3 10 9 3 21 3c0 12-7 18-18 18Z" fill={l.color} />
          <path d="M4 20C9 15 13 11 18 6" stroke="#F7F1E5" strokeWidth="0.8" fill="none" opacity="0.6" />
        </svg>
      ))}
    </div>
  );
}
