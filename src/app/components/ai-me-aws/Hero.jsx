"use client";

import dynamic from "next/dynamic";
import { m } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import ShiningText from "@/components/site/ShiningText";
import PauseWhenHidden from "./PauseWhenHidden";

// Code-split out of the main Hero bundle — still server-rendered for
// first paint, but its JS (plus its own framer-motion step transitions)
// hydrates as a separate chunk instead of blocking the rest of the page.
const OnboardingForm = dynamic(
  () => import("@/components/client-onboarding/OnboardingForm"),
  {
    loading: () => (
      <div className="h-[560px] w-full animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.02]" />
    ),
  }
);

export default function Hero() {
  return (
    <PauseWhenHidden
      as="section"
      id="top"
      data-testid="aime-hero"
      className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
          <div>
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
              className="mt-4 font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            >
              <span className="block">The AI Operating Layer</span>
              <span className="block bg-gradient-to-br from-[#C084FC] via-[#A855F7] to-[#6D28D9] bg-clip-text text-transparent">
                For Your Enterprise.
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

          {/* Right — client onboarding form, front and center */}
          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OnboardingForm />
          </m.div>
        </div>
      </div>
    </PauseWhenHidden>
  );
}
