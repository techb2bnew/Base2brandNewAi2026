"use client";

import { useInView, usePrefersReducedMotion } from "@/lib/useInView";

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const DURATION = 0.7;

const Reveal = ({ children, delay = 0, className = "", asChild = false }) => {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ once: true, amount: 0, margin: "-80px 0px" });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity ${DURATION}s ${EASE} ${delay}s, transform ${DURATION}s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
