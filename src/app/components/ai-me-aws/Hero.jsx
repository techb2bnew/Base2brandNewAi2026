"use client";

import { m } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import ShiningText from "@/components/site/ShiningText";
import BackgroundPaths from "@/components/site/BackgroundPaths";
import NeuralCommandCenter from "@/components/ai/NeuralCommandCenter";
import PauseWhenHidden from "./PauseWhenHidden";

export default function Hero() {
  return (
    <PauseWhenHidden
      as="section"
      id="top"
      data-testid="aime-hero"
      className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
    >
      {/* Background field — same treatment as the /ai-automation hero:
          radial accent blobs, atmospheric paths, and a masked grid. */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(var(--aime-accent-rgb),0.18),rgba(3,3,10,0)_60%)]" />
        <div className="aime-aurora absolute top-40 left-10 w-[400px] h-[400px] rounded-full bg-[rgba(var(--aime-accent-rgb),0.06)] blur-[120px]" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full bg-[rgba(var(--aime-accent-2-rgb),0.05)] blur-[100px]" />
        <BackgroundPaths opacity={0.55} />
        <div className="grain" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.12]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="aime-hero-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(var(--aime-accent-rgb),0.18)"
                strokeWidth="0.5"
              />
            </pattern>
            <radialGradient id="aime-hero-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="black" stopOpacity="1" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>
            <mask id="aime-hero-grid-mask">
              <rect width="100%" height="100%" fill="url(#aime-hero-grid-fade)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#aime-hero-grid)"
            mask="url(#aime-hero-grid-mask)"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <ShiningText testId="aime-hero-eyebrow">AI.ME</ShiningText>
            </m.div>

            <m.h1
              data-testid="aime-hero-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-4 font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] text-balance"
            >
              The AI Operating Layer
              <br />
              <span className="bg-gradient-to-br from-[#C084FC] via-[#A855F7] to-[#6D28D9] bg-clip-text text-transparent">
                for Your Enterprise.
              </span>
            </m.h1>

            <m.p
              data-testid="aime-hero-subheadline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-4 text-base md:text-lg text-white/55 max-w-xl"
            >
              Connect your company&rsquo;s data, systems, apps, and AI agents
              through one intelligent workspace.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border aime-card px-4 py-2 text-xs text-white/70 sm:text-sm"
            >
              <CalendarDays className="h-4 w-4 text-[var(--aime-accent)]" />
              Meet us at AI Everything Abu Dhabi &bull; 6&ndash;7 Oct 2026
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-6 md:mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#book-a-meeting"
                data-testid="aime-hero-primary-cta"
                className="group inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#A855F7] text-white px-6 py-3 md:py-4 rounded-full text-sm font-medium transition-all shadow-[0_0_30px_-10px_rgba(139,92,246,0.55)]"
              >
                <Sparkles className="w-4 h-4" />
                Book a Meeting
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#core-idea"
                data-testid="aime-hero-secondary-cta"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-white/40 hover:bg-white/[0.03] text-white px-6 py-3 md:py-4 rounded-full text-sm font-medium transition-all"
              >
                Explore AI.me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.25em] font-mono text-white/35"
            >
              <span>Enterprise Grade</span>
              <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
              <span>Agent-Ready</span>
              <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
              <span>Live At AI Everything</span>
              <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
              <span>Outcome-Focused</span>
            </m.div>
          </div>

          {/* Right — neural command center visual (same one used on
              /ai-automation's hero) */}
          <m.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <NeuralCommandCenter />
          </m.div>
        </div>
      </div>
    </PauseWhenHidden>
  );
}
