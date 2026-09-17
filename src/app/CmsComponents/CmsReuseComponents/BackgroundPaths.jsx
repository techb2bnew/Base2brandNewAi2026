"use client";

import { m, useReducedMotion } from "framer-motion";

/**
 * BackgroundPaths — atmospheric pathways layer.
 * Faithfully adapted from the supplied 21st.dev component:
 *  - 36 paths × 2 mirrored fields (position 1 / -1)
 *  - PathLength + pathOffset infinite animation
 *  - Recolored for the Intelligence Division (desaturated white tinted
 *    with electric violet via a linear gradient stroke)
 *  - Performance: pauses animation under prefers-reduced-m, opacity
 *    capped to keep paths sub-attentional.
 */

const FloatingPaths = ({ position, reduce }) => {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.4 + i * 0.025,
  }));

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <title>Enterprise pathways</title>
      {paths.map((path) => (
        <m.path
          key={path.id}
          d={path.d}
          stroke={`url(#bp-stroke-${position > 0 ? "a" : "b"})`}
          strokeWidth={path.width}
          strokeOpacity={0.05 + path.id * 0.015}
          initial={{ pathLength: 0.3, opacity: 0.45 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 0.35 }
              : {
                  pathLength: 1,
                  opacity: [0.2, 0.5, 0.2],
                  pathOffset: [0, 1, 0],
                }
          }
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <defs>
        <linearGradient id="bp-stroke-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" style={{ stopColor: "var(--b2b-primary)" }} stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="bp-stroke-b" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "var(--b2b-primary-light)" }} stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" style={{ stopColor: "var(--b2b-primary-dark)" }} stopOpacity="0.25" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const BackgroundPaths = ({ className = "", opacity = 0.55 }) => {
  const reduce = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <FloatingPaths position={1} reduce={reduce} />
      <FloatingPaths position={-1} reduce={reduce} />
    </div>
  );
};

export default BackgroundPaths;
