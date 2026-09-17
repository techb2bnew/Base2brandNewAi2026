"use client";

import { useRef, useState } from "react";
import { m } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Bot,
} from "lucide-react";
import RotatingEarth from "./CmsReuseComponents/RotatingEarth";

const Icons = {
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Bot,
};

const platforms = [
  "ChatGPT",
  "Gemini",
  "Claude",
  "Perplexity",
  "Google AI",
  "Bing Copilot",
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function Hero3({
  highlightTag,
  titleUpper,
  titleMiddle,
  titleLower,
  description,
  leftCTA,
  rightCTA,
  // Optional explicit override for the globe's dot color — leave unset to
  // let it follow the page's shared theme (--b2b-primary) like everything else.
  primaryColor,
  floatingMetrics,
  // Only set inside the builder canvas (SectionCanvas) — enables dragging
  // the floating metric cards and reports the new position back up via
  // onContentChange("floatingMetrics", nextArray), the same field-update
  // channel SectionEditForm already uses (see CmsPages' handleFieldChange /
  // handleContentFieldChange) — no separate persistence path.
  isBuilderCanvas = false,
  onContentChange,
}) {
  // The card being dragged right now (if any) — index into floatingMetrics.
  // Purely a transient UI flag (pauses the float-bob animation on that one
  // card while it's being dragged); the actual position lives in
  // floatingMetrics[i].x/y, which is real content data.
  const [draggingIndex, setDraggingIndex] = useState(null);
  const visualRef = useRef(null);
  const dragRef = useRef(null); // { index, grabOffsetXPercent, grabOffsetYPercent }

  const handlePointerDown = (e, index) => {
    if (!isBuilderCanvas) return;
    const container = visualRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      index,
      // Where inside the card the pointer grabbed it, as a % of the
      // container — keeps the card from "jumping" so its grabbed point
      // snaps under the cursor.
      grabOffsetXPercent: ((e.clientX - cardRect.left) / containerRect.width) * 100,
      grabOffsetYPercent: ((e.clientY - cardRect.top) / containerRect.height) * 100,
    };
    setDraggingIndex(index);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    e.stopPropagation();
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    const container = visualRef.current;
    if (!drag || !container || !isBuilderCanvas) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = e.currentTarget.getBoundingClientRect();
    const cardWidthPercent = (cardRect.width / containerRect.width) * 100;
    const cardHeightPercent = (cardRect.height / containerRect.height) * 100;

    // Bounded to the right-side visual container only — the card can never
    // be dragged outside its parent box, per the CANVAS-AWARENESS-style
    // constraint requested for this drag.
    let x = ((e.clientX - containerRect.left) / containerRect.width) * 100 - drag.grabOffsetXPercent;
    let y = ((e.clientY - containerRect.top) / containerRect.height) * 100 - drag.grabOffsetYPercent;
    x = clamp(x, 0, 100 - cardWidthPercent);
    y = clamp(y, 0, 100 - cardHeightPercent);

    const next = (floatingMetrics || []).slice();
    next[drag.index] = { ...next[drag.index], x, y };
    onContentChange?.("floatingMetrics", next);
  };

  const handlePointerUp = (e) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDraggingIndex(null);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-22 lg:pt-28  md:pb-12 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(var(--b2b-primary-rgb),0.2), rgba(var(--b2b-primary-light-rgb),0.1) 55%, transparent 75%)" }}
      />
      <div className="absolute inset-0 noise pointer-events-none mix-blend-overlay" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid lg:grid-cols-12 gap-2 md:gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs md:text-sm"
              data-testid="hero-eyebrow"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--b2b-primary)" }} />
              <span className="label-mono">{highlightTag}</span>
            </m.div>

            <h1 className="font-display text-white text-4xl lg:text-5xl leading-[1.05] tracking-tight mt-4 max-w-5xl">
              {titleUpper}{" "}
              <span className="text-gradient-blue-violet font-medium">
                {titleMiddle}{" "}
              </span>
              <br />
              <span className="text-zinc-400 font-light">before your{' '}</span>
              <br />
              {titleLower}
            </h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-2 md:mt-8 max-w-xl text-base md:text-lg text-zinc-400 leading-relaxed"
              data-testid="hero-subhead"
            >
              {description}
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <a
                href="#final-cta"
                data-testid="hero-primary-cta"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-white text-sm md:text-base font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:shadow-[0_0_40px_-8px_rgba(var(--b2b-primary-rgb),0.7)] transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--b2b-primary)" }}
              >
                {leftCTA}
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </a>
              <a
                href="#final-cta"
                data-testid="hero-secondary-cta"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass text-white text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" style={{ color: "var(--b2b-primary)" }} />
                {rightCTA}
              </a>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-zinc-500"
            >
              <span className="label-mono !text-zinc-500">Optimizing for</span>
              {platforms.map((p) => (
                <span
                  key={p}
                  className="text-zinc-300/80 text-sm font-medium tracking-tight"
                >
                  {p}
                </span>
              ))}
            </m.div>
          </div>

          {/* Right - Rotating Earth. This is the drag boundary: floating
              metric cards below are clamped to stay inside it. */}
          <div ref={visualRef} className="lg:col-span-5 relative h-[440px] md:h-[560px]">
            <m.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute inset-0"
            >
              {/* Glow ring behind globe */}
              <div className="absolute inset-8 rounded-full conic-ring blur-3xl opacity-50 animate-pulse-glow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <RotatingEarth
                  width={560}
                  height={560}
                  autoRotate={true}
                  interactive={true}
                  primaryColor={primaryColor}
                />
              </div>
              {floatingMetrics &&
                floatingMetrics.map((metric, i) => {
                  const Icon = Icons[metric.icon] || Sparkles;
                  const isDragging = draggingIndex === i;
                  return (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: metric.delay }}
                      className={`absolute z-10 ${isDragging ? "" : "animate-float-slow"} ${isBuilderCanvas ? "pointer-events-auto touch-none" : ""} ${isBuilderCanvas ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
                      style={{
                        left: `${metric.x ?? 50}%`,
                        top: `${metric.y ?? 50}%`,
                        animationDelay: `${i * 1.2}s`,
                        zIndex: isDragging ? 20 : 10,
                      }}
                      onPointerDown={(e) => handlePointerDown(e, i)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                    >
                      <div
                        className={`glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[170px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow ${isDragging ? "ring-2" : ""}`}
                        style={isDragging ? { boxShadow: "0 0 0 2px var(--b2b-primary)" } : undefined}
                      >
                        <div
                          className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center"
                          style={{ background: "linear-gradient(to bottom right, rgba(var(--b2b-primary-rgb),0.3), rgba(var(--b2b-primary-dark-rgb),0.3))" }}
                        >
                          <Icon className="w-4 h-4" style={{ color: "var(--b2b-primary-light)" }} />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                            {metric.label}
                          </div>
                          <div className="font-display text-lg font-medium text-white">
                            {metric.value}
                          </div>
                        </div>
                      </div>
                    </m.div>
                  );
                })}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
