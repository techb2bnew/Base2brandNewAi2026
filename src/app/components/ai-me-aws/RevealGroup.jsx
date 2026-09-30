"use client";

import { m, useReducedMotion } from "framer-motion";

// Same fade+slide-up reveal as Reveal.jsx, but for a *group* of items (a
// grid of chips/cards/tags). Uses ONE viewport observer on the parent and
// lets framer-motion's `staggerChildren` animate the children instead of
// giving every single item its own IntersectionObserver — cuts a grid of
// N items from N observers down to 1, which is what was making the page
// feel janky while scrolling through sections with lots of small cards.

const containerVariants = (stagger, delayChildren) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

const itemVariants = (y) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
});

export function RevealGroup({
  children,
  as = "div",
  stagger = 0.06,
  delayChildren = 0,
  className,
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants(stagger, delayChildren)}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, as = "div", y = 16, className, ...rest }) {
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
    <MotionTag variants={itemVariants(y)} className={className} {...rest}>
      {children}
    </MotionTag>
  );
}
