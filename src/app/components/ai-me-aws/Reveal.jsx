"use client";

import { m, useReducedMotion } from "framer-motion";

// Scroll-triggered fade + slide-up, reused across every section on this page
// instead of animating on mount — keeps the layout identical, only adds a
// one-time reveal the first time an element scrolls into view.
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 16,
  duration = 0.6,
  className,
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = m[as] || m.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
