"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import {
  m,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Smartphone, Tablet, Watch, Glasses, Tv, Car } from "lucide-react";
import PlatformSwitcher from "./CmsReuseComponents/PlatformSwitcher";
import { APPLE } from "@/constants/testIds";

const ICONS = { Smartphone, Tablet, Watch, Glasses, Tv, Car };

const NAV_HEIGHT = 96;
const SCROLL_PER_TAB_VH = 50;
const EASE = [0.16, 1, 0.3, 1];

const leftVariants = {
  initial: { opacity: 0, x: -24, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 18, scale: 0.98 },
};

const rightVariants = {
  initial: { opacity: 0, x: 24, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -14, scale: 0.96 },
};

function PlatformDetailCard({ platform }) {
  return (
    <div
      className="relative glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden"
      data-testid={APPLE.platformDetail}
    >
      <div
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(var(--b2b-primary-rgb),0.22) 0%, transparent 70%)" }}
      />
      <div className="relative grid lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-10 items-start">
        <div className="relative min-h-[240px] sm:min-h-[280px] lg:min-h-[300px]">
          <AnimatePresence mode="wait">
            <m.div
              key={`left-${platform.id}`}
              layout
              variants={leftVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.48, ease: EASE }}
            >
              <p
                className="font-mono text-xs uppercase tracking-[0.24em]"
                style={{ color: "var(--b2b-primary-light)" }}
              >
                {platform.label}
              </p>
              <h3 className="mt-2 font-display text-xl sm:text-2xl leading-tight max-w-2xl">
                {platform.headline}
              </h3>
              <p className="mt-3 sm:mt-5 text-sm sm:text-base text-white/65 leading-relaxed max-w-xl">
                {platform.body}
              </p>
              <m.div layout className="mt-5 sm:mt-7 flex flex-wrap gap-2">
                {(platform.tags || []).map((t) => (
                  <m.span
                    layout
                    key={t}
                    className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white/65 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
                  >
                    {t}
                  </m.span>
                ))}
              </m.div>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="relative min-h-[220px] sm:min-h-[260px]">
          <AnimatePresence mode="wait">
            <m.div
              key={`right-${platform.id}`}
              layout
              variants={rightVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.48, ease: EASE, delay: 0.07 }}
              className="glass rounded-2xl p-4 sm:p-6 lg:p-7 h-full"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">
                Engineering bar
              </p>
              <p className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-gradient-blue-violet">
                {platform.statValue}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-white/55">{platform.statLabel}</p>
              <div className="mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-white/10 space-y-2 text-[10px] sm:text-xs text-white/55">
                <p>· Native Apple frameworks only — no cross-platform shims.</p>
                <p>· TestFlight CI, App Store Connect API, automated phased releases.</p>
                <p>· Crash-free sessions tracked against an internal SLA.</p>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * PlatformExplorer — scroll-pinned Apple ecosystem platform switcher.
 * Pins itself for one scroll pass while cycling through iPhone/iPad/Watch/
 * Vision Pro/Apple TV/CarPlay, driven by scroll progress. Falls back to a
 * plain, non-pinned layout for reduced-motion users and inside the builder
 * canvas (isBuilderCanvas) per the CANVAS-AWARENESS RULE — this component
 * scroll-jacks via `position: fixed`, so it must not do that while it's just
 * one card in the admin canvas.
 */
export default function PlatformExplorer({
  eyebrow,
  title,
  subtitle,
  platforms = [],
  isBuilderCanvas = false,
}) {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const reduce =
    isBuilderCanvas || prefersReduced || (typeof window !== "undefined" && window.innerWidth < 1024);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinPhase, setPinPhase] = useState("before");

  // PlatformSwitcher expects `platform.icon` to be an actual component
  // reference; the registry/content data stores it as a lucide icon name
  // string, so resolve it here before handing platforms down.
  const resolvedPlatforms = platforms.map((p) => ({ ...p, icon: ICONS[p.icon] || Smartphone }));
  const platform = platforms[Math.min(activeIndex, platforms.length - 1)] || platforms[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${NAV_HEIGHT}px`, "end end"],
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });

  const progressWidth = useTransform(smoothed, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(smoothed, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6]);

  useMotionValueEvent(smoothed, "change", (v) => {
    if (reduce) return;
    const next = Math.min(
      resolvedPlatforms.length - 1,
      Math.max(0, Math.floor(v * resolvedPlatforms.length))
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  useLayoutEffect(() => {
    if (reduce) return;

    const section = sectionRef.current;
    if (!section) return;

    const updatePin = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top > NAV_HEIGHT) {
        setPinPhase("before");
      } else if (rect.bottom <= viewportHeight) {
        setPinPhase("after");
      } else {
        setPinPhase("pinned");
      }
    };

    updatePin();
    window.addEventListener("scroll", updatePin, { passive: true });
    window.addEventListener("resize", updatePin);
    return () => {
      window.removeEventListener("scroll", updatePin);
      window.removeEventListener("resize", updatePin);
    };
  }, [reduce]);

  const jumpTo = (index) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const target =
      window.scrollY +
      rect.top -
      NAV_HEIGHT +
      ((index + 0.5) / resolvedPlatforms.length) * (rect.height - window.innerHeight);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const handlePlatformChange = (id) => {
    const index = resolvedPlatforms.findIndex((p) => p.id === id);
    if (index < 0) return;

    if (reduce) {
      setActiveIndex(index);
      return;
    }
    jumpTo(index);
  };

  if (!platforms.length) return null;

  const scrollTrackHeight = `${resolvedPlatforms.length * SCROLL_PER_TAB_VH}vh`;
  const panelHeight = `calc(100vh - ${NAV_HEIGHT}px)`;

  const panelClass =
    pinPhase === "pinned"
      ? "fixed left-0 right-0 z-20"
      : pinPhase === "after"
        ? "absolute left-0 right-0 bottom-0 z-10"
        : "relative z-10";

  const panelStyle =
    pinPhase === "pinned"
      ? { top: "10px", height: panelHeight }
      : { height: panelHeight };

  if (reduce) {
    return (
      <section className="b2b-container py-8 sm:py-12">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <p
            className="font-mono text-xs uppercase tracking-[0.24em]"
            style={{ color: "var(--b2b-primary-light)" }}
          >
            {eyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.05] tracking-tight mt-4 max-w-4xl">
            {title}
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/60 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto px-2">
          <PlatformSwitcher
            platforms={resolvedPlatforms}
            value={platform.id}
            onChange={handlePlatformChange}
            testId={APPLE.platformSwitcher}
          />
        </div>

        <PlatformDetailCard platform={platform} />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: scrollTrackHeight }}
      aria-label="Apple platform explorer"
    >
      <m.div
        className={`${panelClass} flex items-center overflow-hidden`}
        style={panelStyle}
      >
        <m.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: glowOpacity }}
        >
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(var(--b2b-primary-rgb),0.08) 0%, transparent 70%)",
            }}
          />
        </m.div>

        <div className="relative w-full b2b-container py-6 sm:py-8 md:py-10 cursor-grab">
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10">
            <p
              className="font-mono text-xs uppercase tracking-[0.24em]"
              style={{ color: "var(--b2b-primary-light)" }}
            >
              {eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.05] tracking-tight mt-4 max-w-4xl">
              {title}
            </h2>
            <p className="mt-3 sm:mt-4 md:mt-5 text-white/60 max-w-2xl leading-relaxed text-xs sm:text-sm md:text-base">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
            <div className="flex justify-center overflow-x-auto px-2 max-w-full">
              <PlatformSwitcher
                platforms={resolvedPlatforms}
                value={platform.id}
                onChange={handlePlatformChange}
                testId={APPLE.platformSwitcher}
              />
            </div>

            <div className="w-full max-w-md h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
              <m.div
                className="h-full rounded-full"
                style={{
                  width: progressWidth,
                  background:
                    "linear-gradient(90deg, rgba(var(--b2b-primary-rgb),0.5), rgba(var(--b2b-primary-light-rgb),0.9))",
                }}
              />
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/35">
              {String(activeIndex + 1).padStart(2, "0")} / {String(resolvedPlatforms.length).padStart(2, "0")}
            </p>
          </div>

          <PlatformDetailCard platform={platform} />
        </div>
      </m.div>
    </section>
  );
}
