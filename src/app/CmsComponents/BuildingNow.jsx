"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { m } from "framer-motion";
import Reveal from "./CmsReuseComponents/Reveal";
import ShiningText from "./CmsReuseComponents/ShiningText";
import {
  Users,
  GitBranch,
  Briefcase,
  BrainCircuit,
  PhoneCall,
  LayoutDashboard,
  Compass,
  Megaphone,
  Search,
  Share2,
  FlaskConical,
} from "lucide-react";

const NAV_HEIGHT = 96;

const icons = {
  Users,
  GitBranch,
  Briefcase,
  BrainCircuit,
  PhoneCall,
  LayoutDashboard,
  Compass,
  Megaphone,
  Search,
  Share2,
  FlaskConical,
};

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const BuildingNow = ({ title, description, highlightTag, ITEMS, isBuilderCanvas = false }) => {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  const [active, setActive] = useState(0);
  const [pinPhase, setPinPhase] = useState("before");
  const [isScrollMode, setIsScrollMode] = useState(false);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    // Inside the page builder's edit canvas this section is one compact
    // card among several, not the whole page — pinning it with
    // position:fixed and a 600vh+ track height would hijack the admin
    // page's own scroll. Stay in the component's normal static layout
    // there; the full scroll-jacking behavior still runs on the real
    // page and in the Preview tab (isBuilderCanvas is never passed there).
    if (isBuilderCanvas) {
      setIsScrollMode(false);
      return;
    }

    const mq = window.matchMedia("(min-width: 1024px)");

    const updateScrollMode = () => {
      setIsScrollMode(mq.matches);
    };

    updateScrollMode();
    mq.addEventListener("change", updateScrollMode);

    return () => {
      mq.removeEventListener("change", updateScrollMode);
    };
  }, [isBuilderCanvas]);

  useLayoutEffect(() => {
    if (!isScrollMode) {
      setPinPhase("before");
      setProgress(0);
      setActive(0);
      return;
    }

    const updateScroll = () => {
      const section = sectionRef.current;
      if (!section || !ITEMS?.length) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      const start = sectionTop - NAV_HEIGHT;
      const end = sectionTop + sectionHeight - viewportHeight;

      const total = Math.max(end - start, 1);
      const current = clamp((window.scrollY - start) / total, 0, 1);

      if (window.scrollY < start) {
        setPinPhase("before");
      } else if (window.scrollY >= end) {
        setPinPhase("after");
      } else {
        setPinPhase("pinned");
      }

      setProgress(current);

      const next = Math.min(
        ITEMS.length - 1,
        Math.max(0, Math.floor(current * ITEMS.length))
      );

      setActive((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        updateScroll();
        rafRef.current = null;
      });
    };

    updateScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScroll);

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isScrollMode, ITEMS]);

  if (!ITEMS?.length) return null;

  const jumpTo = (i) => {
    if (!isScrollMode) {
      setActive(i);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    const start = sectionTop - NAV_HEIGHT;
    const end = sectionTop + sectionHeight - viewportHeight;
    const total = Math.max(end - start, 1);

    const targetProgress = (i + 0.5) / ITEMS.length;
    const target = start + targetProgress * total;

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  const it = ITEMS[active];
  const Icon = icons[it.icon] || LayoutDashboard;
  const primaryStroke = "var(--b2b-primary)";
  const secondaryStroke = "var(--b2b-primary)";
  const progressWidth = `${progress * 100}%`;

  const detailCard = (
    <m.div
      key={active}
      initial={{ opacity: 0, y: 18, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="b2b-card p-5 sm:p-7 md:p-10 h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[color:var(--b2b-primary)]/20 blur-[100px] pointer-events-none" />

      <svg
        className="absolute -top-8 -right-8 w-44 h-44 opacity-50 pointer-events-none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="32"
          fill="none"
          style={{ stroke: primaryStroke }}
          strokeWidth="0.4"
          strokeDasharray="1.5 2.5"
        />
        <circle
          cx="50"
          cy="50"
          r="22"
          fill="none"
          style={{ stroke: secondaryStroke }}
          strokeWidth="0.3"
        />
        <circle cx="50" cy="50" r="3" style={{ fill: "var(--b2b-primary)" }} />
      </svg>

      <div className="relative flex items-center gap-3">
        <span className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[color:var(--b2b-primary)]/20 border border-[color:var(--b2b-primary)] text-[color:var(--b2b-primary)] shrink-0">
          <Icon className="w-5 h-5" />
        </span>

        <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/40 leading-snug">
          {it.tagline}
        </span>
      </div>

      <m.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45 }}
        className="relative mt-5 sm:mt-7 font-display text-xl sm:text-2xl lg:text-5xl tracking-[-0.03em] font-medium leading-[1.05]"
      >
        {it.title}
      </m.h3>

      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.16, duration: 0.45 }}
        className="relative mt-4 sm:mt-5 text-sm sm:text-base text-white/55 leading-relaxed max-w-xl"
      >
        {it.desc}
      </m.p>

      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.45 }}
        className="relative mt-6 sm:mt-8 flex flex-wrap gap-2"
      >
        {it.metrics?.map((metric) => (
          <span
            key={metric}
            className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/4 border border-white/10 text-white/70"
          >
            {metric}
          </span>
        ))}
      </m.div>

      <div className="relative mt-6 sm:mt-9 pt-4 sm:pt-5 border-t border-white/5 flex items-center justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/35">
          Program {String(active + 1).padStart(2, "0")} / {ITEMS.length}
        </span>

        <a
          href="#contact"
          data-testid={`building-now-cta-${active}`}
          className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--b2b-primary)] hover:text-white transition-colors shrink-0"
        >
          Engage →
        </a>
      </div>
    </m.div>
  );

  const tabList = (
    <div className="lg:col-span-5 space-y-1 sm:space-y-1.5">
      {ITEMS.map((item, i) => {
        const ItemIcon = icons[item.icon] || LayoutDashboard;
        const isActive = i === active;

        return (
          <button
            key={item.title}
            onClick={() => jumpTo(i)}
            data-testid={`building-now-tab-${i}`}
            className={`group w-full text-left flex items-center gap-3 sm:gap-4 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border transition-all duration-500 ${
              isActive
                ? "bg-[color:var(--b2b-primary)] border-[color:var(--b2b-primary)]"
                : "bg-transparent border-transparent hover:border-white/10 hover:bg-white/2"
            }`}
          >
            <m.span
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ duration: 0.35 }}
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg shrink-0 border ${
                isActive
                  ? "bg-white/15 border-white/20 text-white"
                  : "bg-white/4 border-white/8 text-white/40"
              }`}
            >
              <ItemIcon className="w-4 h-4" />
            </m.span>

            <span className="flex-1 min-w-0">
              <span
                className={`block font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase ${
                  isActive ? "text-white/80" : "text-white/30"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className={`block font-display font-medium text-sm sm:text-base md:text-lg truncate ${
                  isActive ? "text-white" : "text-white/55"
                }`}
              >
                {item.title}
              </span>
            </span>

            <m.span
              animate={{
                height: isActive ? 32 : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.35 }}
              className="hidden md:block w-1 rounded-full bg-white/70"
            />
          </button>
        );
      })}

      {isScrollMode && (
        <div className="mt-4 sm:mt-6 relative h-0.5 rounded-full bg-white/8 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[color:var(--b2b-primary)] via-[rgba(var(--b2b-primary-rgb),0.8)] to-[color:var(--b2b-primary)]"
            style={{ width: progressWidth }}
          />
        </div>
      )}
    </div>
  );

  const sectionHeader = (
    <Reveal>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 sm:gap-6 mb-4 md:mb-10">
        <div>
          <ShiningText testId="building-now-eyebrow">
            {highlightTag}
          </ShiningText>

          <h2
            className="mt-2 sm:mt-4 font-display text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight max-w-3xl text-balance"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>

        <p
          className="max-w-md text-sm sm:text-base text-white/50 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </Reveal>
  );

  if (!isScrollMode) {
    return (
      <section
        ref={sectionRef}
        id="building-now-section"
        className="relative border-y border-white/5 bg-[color:var(--b2b-bg)] py-12 md:py-16"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[rgba(var(--b2b-primary-rgb),0.12)] blur-[120px]" />
          <div className="grain" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
          {sectionHeader}

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10 items-start">
            {tabList}

            <div className="lg:col-span-7 relative">
              {detailCard}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const scrollTrackHeight = `${ITEMS.length * 110}vh`;
  const panelHeight = `calc(100vh - ${NAV_HEIGHT}px)`;

  const panelClass =
    pinPhase === "pinned"
      ? "fixed left-0 right-0 z-20"
      : pinPhase === "after"
        ? "absolute left-0 right-0 bottom-0 z-10"
        : "relative z-10";

  const panelStyle =
    pinPhase === "pinned"
      ? {
          top: `${NAV_HEIGHT}px`,
          height: panelHeight,
        }
      : {
          height: panelHeight,
        };

  return (
    <section
      ref={sectionRef}
      id="building-now-section"
      className="relative border-y border-white/5 bg-[color:var(--b2b-bg)]"
      style={{ height: scrollTrackHeight }}
    >
      <div
        className={`${panelClass} flex items-center overflow-hidden bg-[color:var(--b2b-bg)]`}
        style={panelStyle}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[rgba(var(--b2b-primary-rgb),0.12)] blur-[120px]" />
          <div className="grain" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-6 lg:py-0">
          {sectionHeader}

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {tabList}

            <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]">
              {detailCard}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingNow;