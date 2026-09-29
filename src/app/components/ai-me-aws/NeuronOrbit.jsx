"use client";

// Central hub + one or more rings of orbiting icon nodes. Pure CSS animation
// (no framer-motion) — this is purely decorative and runs continuously, so
// keeping it off the JS animation thread matters more than easing control.
// Each node counter-rotates against its ring (same duration, opposite
// direction) so the icon itself stays upright while still orbiting.

function OrbitNode({ node, angle, radius, duration, ringDirection }) {
  const Icon = node.icon;
  const counterDirection = ringDirection === "reverse" ? "normal" : "reverse";

  return (
    // Anchor: sits exactly at the ring's center (no transform of its own).
    <div className="absolute left-1/2 top-1/2">
      {/* Placement: rotates around the anchor point itself (transformOrigin
          "0 0" — not the default 50/50 of this div's own box, which is what
          was throwing nodes off the circle) then walks out along that
          rotated axis by `radius`. Static — never animated. */}
      <div
        style={{
          transform: `rotate(${angle}deg) translate(${radius}px)`,
          transformOrigin: "0 0",
        }}
      >
        {/* Recenter: pulls the icon box back so its own center — not its
            top-left corner — lands on the point placed above. Also static;
            kept on its own element so it never fights the animated
            transform below (both would otherwise target the same
            `transform` property and only one can win). */}
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div
            className="aime-orbit-ring"
            style={{ animationDuration: `${duration}s`, animationDirection: counterDirection }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl border aime-card sm:h-14 sm:w-14"
              style={{ borderColor: "var(--aime-border)" }}
              title={node.label}
            >
              <Icon className="h-4.5 w-4.5 text-[var(--aime-accent)] sm:h-6 sm:w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrbitRing({ radius, duration, reverse, nodes }) {
  const direction = reverse ? "reverse" : "normal";

  return (
    <div
      className="absolute left-1/2 top-1/2 rounded-full border border-dashed"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        borderColor: "var(--aime-border)",
      }}
    >
      <div
        className="aime-orbit-ring absolute inset-0"
        style={{ animationDuration: `${duration}s`, animationDirection: direction }}
      >
        {nodes.map((node, i) => (
          <OrbitNode
            key={node.label}
            node={node}
            angle={(360 / nodes.length) * i}
            radius={radius}
            duration={duration}
            ringDirection={direction}
          />
        ))}
      </div>
    </div>
  );
}

export default function NeuronOrbit({
  centerLabel = "AI.me",
  size = 420,
  rings = [],
}) {
  const half = size / 2;

  return (
    <div
      data-testid="neuron-orbit"
      className="relative mx-auto"
      style={{ width: size, height: size }}
    >
      {/* Glow field behind everything */}
      <div
        aria-hidden
        className="aime-pulse absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--aime-accent-rgb),0.28) 0%, rgba(var(--aime-accent-2-rgb),0.12) 45%, transparent 72%)",
        }}
      />

      {rings.map((ring, i) => (
        <OrbitRing
          key={i}
          radius={ring.radius}
          duration={ring.duration}
          reverse={ring.reverse}
          nodes={ring.nodes}
        />
      ))}

      {/* Central hub */}
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border aime-card"
        style={{
          width: half * 0.62,
          height: half * 0.62,
          borderColor: "rgba(var(--aime-accent-rgb),0.4)",
          boxShadow:
            "0 0 0 1px rgba(var(--aime-accent-rgb),0.25), 0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(var(--aime-accent-rgb),0.28)",
        }}
      >
        <span className="font-display text-lg font-semibold tracking-tight text-white sm:text-2xl">
          {centerLabel}
        </span>
        <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
          Enterprise AI Brain
        </span>
      </div>
    </div>
  );
}
