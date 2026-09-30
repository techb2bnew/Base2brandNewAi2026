"use client";

import { useEffect, useRef } from "react";

// Wraps a section and exposes a `--aime-anim-play-state` CSS custom property
// (running/paused) based on whether it's actually on screen. Every
// continuous CSS `@keyframes` loop in this theme reads that variable for its
// `animation-play-state`, so wrapping a section here pauses all of its
// decorative animations the moment it scrolls out of view — one observer
// per section instead of hand-wiring each animated element individually.
export default function PauseWhenHidden({ children, as: Tag = "section", className, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        node.style.setProperty(
          "--aime-anim-play-state",
          entry.isIntersecting ? "running" : "paused"
        );
      },
      { threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
