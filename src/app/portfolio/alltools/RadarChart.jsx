const BLIPS = [
  { angle: 40, r: 55, major: true },
  { angle: 120, r: 40, major: false },
  { angle: 160, r: 65, major: true },
  { angle: 250, r: 30, major: false },
  { angle: 300, r: 58, major: false },
];

function toXY(cx, cy, angleDeg, r) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function RadarChart({
  compact = false,
  className = "border border-[var(--b2b-line-strong)]",
}) {
  const size = compact ? 130 : 200;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 12;

  return (
    <>
      <style>{`
        @keyframes radar-pulse-dot {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 0px var(--b2b-primary)); }
          50% { opacity: 0.55; filter: drop-shadow(0 0 5px var(--b2b-primary)); }
        }
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .radar-pulse { animation: radar-pulse-dot 2.4s ease-in-out infinite; }
        .radar-sweep { animation: radar-spin 4s linear infinite; }
      `}</style>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={`block w-full h-auto bg-[var(--b2b-glass-bg)] backdrop-blur-md ${className}`}
        role="img"
        aria-label="Radar sweep diagram"
      >
        {[0.33, 0.66, 1].map((f) => (
          <circle
            key={f}
            cx={cx}
            cy={cy}
            r={maxR * f}
            fill="none"
            stroke="var(--b2b-line)"
            strokeWidth="1"
          />
        ))}
        <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="var(--b2b-line)" strokeWidth="1" />
        <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="var(--b2b-line)" strokeWidth="1" />

        <g className="radar-sweep" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <line x1={cx} y1={cy} x2={cx} y2={cy - maxR} stroke="var(--b2b-primary)" strokeWidth="1.5" />
        </g>

        {BLIPS.map((b, i) => {
          const { x, y } = toXY(cx, cy, b.angle, b.r);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={b.major ? 4.5 : 2.5}
              fill={b.major ? "var(--b2b-primary)" : "var(--b2b-mute)"}
              className={b.major ? "radar-pulse" : ""}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          );
        })}
      </svg>
    </>
  );
}
