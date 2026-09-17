"use client";

import React, { useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// 3D tilt card — max 5° tilt, subtle enterprise feel, themed border glow on
// hover (follows the shared page theme instead of a fixed amber).
function TiltCard({ children }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");
  const [hover, setHover] = useState(false);

  const handleMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 5; // max 5°
    const ry = (x - 0.5) * 5;
    setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`);
  };

  const reset = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)");
    setHover(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      style={{
        transform,
        transition: "transform 400ms ease, box-shadow 400ms ease, border-color 400ms ease",
        transformStyle: "preserve-3d",
        backgroundColor: "rgba(var(--b2b-primary-rgb),0.04)",
        borderColor: "rgba(var(--b2b-primary-rgb),0.1)",
        boxShadow: hover
          ? "0 30px 80px -20px rgba(var(--b2b-primary-rgb),0.25), 0 0 0 1px rgba(var(--b2b-primary-rgb),0.25) inset"
          : "0 8px 30px -10px rgba(0,0,0,0.5)",
      }}
      className="relative rounded-2xl border p-4 h-full cursor-default group overflow-hidden"
    >
      {/* Subtle ambient glare */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 0%, rgba(var(--b2b-primary-rgb),0.18), transparent 50%)",
        }}
      />
      {children}
    </div>
  );
}

const container = { animate: { transition: { staggerChildren: 0.08 } } };
const item = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function UseCases({ eyebrow, title, highlightedTitle, introText, useCases = [] }) {
  return (
    <section className="relative py-4 md:py-12 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="gap-4 md:gap-12 mb-8">
          <div>
            <div
              className="text-[11px] tracking-[0.28em] uppercase mb-4"
              style={{ color: "var(--b2b-primary-light)" }}
            >
              · {eyebrow}
            </div>
            <h2 className="mt-4 font-display text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
              {title}
              <br />
              <span className="text-white/55">{highlightedTitle}</span>
            </h2>
          </div>
          <p className="text-white/65 text-base lg:text-lg max-w-[640px] self-end leading-relaxed pt-4">
            {introText}
          </p>
        </div>

        <m.div
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {useCases.map((u, i) => (
            <m.div key={u.title || i} variants={item}>
              <TiltCard>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase px-3 py-1 rounded-full border"
                    style={{
                      color: "var(--b2b-primary-light)",
                      borderColor: "rgba(var(--b2b-primary-rgb),0.2)",
                      backgroundColor: "rgba(var(--b2b-primary-rgb),0.06)",
                    }}
                  >
                    {u.tag}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-white/30 group-hover:text-[color:var(--b2b-primary-light)] transition-colors"
                  />
                </div>
                <h3 className="font-display text-2xl text-white leading-tight mb-2">
                  {u.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {u.description}
                </p>
              </TiltCard>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
