"use client";

import { motion } from "framer-motion";

/**
 * ShiningText - enterprise eyebrow with neutral metallic shimmer.
 * Inspired by Anthropic / Stripe / Linear small-label aesthetics.
 * Uses a neutral grayscale gradient (no purple) so it can sit on either
 * the homepage (orange division) or the AI page (purple division).
 *
 * Props:
 *   children - text content
 *   dot      - boolean (default true). Shows a tiny accent dot to the left.
 *              Set to false for pure inline text use.
 *   tone     - "purple" (default) | "white" — color of the optional dot.
 */
const ShiningText = ({
  children,
  className = "",
  testId,
  dot = true,
  tone = "purple",
}) => {
  const dotClass =
    tone === "white"
      ? "bg-white/80 shadow-[0_0_10px_1px_rgba(255,255,255,0.4)]"
      : "bg-[var(--b2b-primary)] shadow-[0_0_10px_1px_rgba(var(--b2b-primary-rgb),0.45)]";

  return (
    <span
      data-testid={testId}
      className={`inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotClass}`}
          aria-hidden="true"
        />
      )}
      <motion.span
        initial={{ backgroundPosition: "200% 0" }}
        animate={{ backgroundPosition: "-200% 0" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(110deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.35) 35%, #ffffff 50%, rgba(255,255,255,0.35) 65%, rgba(255,255,255,0.35) 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default ShiningText;
