const POINTS = [
  { x: 20, y: 150, hex: "0x200", major: false },
  { x: 70, y: 95, hex: "0x1200", major: true },
  { x: 120, y: 120, hex: "0x2200", major: false },
  { x: 155, y: 160, hex: "0x3200", major: true },
  { x: 195, y: 130, hex: "0x4200", major: false },
];

const FAINT = "color-mix(in srgb, var(--b2b-mute) 65%, transparent)";

function path(points) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
}

export default function VectorFlowChart({
  compact = false,
  className = "border border-[var(--b2b-line-strong)]",
}) {
  const h = compact ? 130 : 200;
  return (
    <>
      <style>{`
        @keyframes vfc-pulse-dot {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 0px var(--b2b-primary)); }
          50% { opacity: 0.55; filter: drop-shadow(0 0 5px var(--b2b-primary)); }
        }
        .vfc-pulse { animation: vfc-pulse-dot 2.4s ease-in-out infinite; }
      `}</style>
      <svg
        viewBox={`0 0 220 ${h}`}
        className={`block w-full h-auto bg-[var(--b2b-glass-bg)] backdrop-blur-md ${className}`}
        role="img"
        aria-label="Vector flow diagram"
      >
        <defs>
          <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="var(--b2b-line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="220" height={h} fill="url(#grid)" />
        <path
          d={path(POINTS)}
          fill="none"
          stroke={FAINT}
          strokeWidth="1"
        />
        {POINTS.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.major ? 5 : 3}
              fill={p.major ? "var(--b2b-primary)" : "none"}
              stroke={p.major ? "none" : "var(--b2b-mute)"}
              className={p.major ? "vfc-pulse" : ""}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            {!compact && (
              <text
                x={p.x}
                y={p.y - 10}
                fontSize="6"
                fill={FAINT}
                style={{ fontFamily: "var(--b2b-font-mono)" }}
              >
                {p.hex}
              </text>
            )}
          </g>
        ))}
      </svg>
    </>
  );
}
