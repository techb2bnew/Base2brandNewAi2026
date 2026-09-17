"use client";

import { m } from "framer-motion";
import { ArrowUpRight, Sparkles, Cloud, Smartphone, Building2 } from "lucide-react";
import WarpBackground from "./CmsReuseComponents/WarpBackgroundSD";
import HeroVisual from "./CmsReuseComponents/HeroVisual";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

// SUPPORTING_LABELS pairs an icon with text; only the text is exposed as an
// editable field (icons cycle through this fixed list by index).
const SUPPORTING_ICONS = [Sparkles, Cloud, Smartphone, Building2];

const Hero2 = ({
    eyebrowText = "Digital Product Engineering",
    eyebrowSuffix = "— Software Division",
    headlinePart1 = "Build software that ",
    headlinePart2 = " that scale with your ",
    headlinePart3 = " business. ",
    subheadline = "Base2Brand delivers software development services for businesses that need more than code. We design and engineer scalable platforms, SaaS products, mobile applications, cloud-native systems and enterprise software solutions built around measurable business outcomes.",
    ctaPrimaryText = "Start a software engagement",
    ctaPrimaryLink = "#cta",
    ctaSecondaryText = "Explore capabilities",
    ctaSecondaryLink = "#capabilities",
    supportingLabels = ["Product Engineering", "Cloud-Native", "Android Development", "Enterprise Scale"],
    metrics = [
        { value: "120+", label: "Software Projects Delivered" },
        { value: "30+", label: "Product Engineers & Architects" },
        { value: "8", label: "Industries Served" },
        { value: "24/7", label: "Product Support Mindset" },
    ],
}) => {
    // Accent color comes from the page-wide theme (--b2b-primary, set once
    // in CmsPages) so every section on the page shares the same color —
    // no per-section override here.
    return (
        <section
            id="top"
            className="relative isolate pb-[4.5rem] pt-24 md:pt-24 overflow-hidden"
        >
            <WarpBackground opacity={0.15} />
            {/* Subtle grid overlay */}
            <div className="pointer-events-none absolute inset-0 -z-10 b2b-section-grid opacity-40" />

            <div className="b2b-container">
                <m.div
                    variants={stagger(0.08)}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-12 gap-6 md:gap-10 items-center"
                >
                    {/* Left: copy */}
                    <div className="col-span-12 lg:col-span-7">
                        <m.div variants={fadeUp} className="hidden md:inline-flex items-center gap-2 mb-7">
                            <span className="relative inline-flex w-2 h-2">
                                <span className="absolute inset-0 rounded-full bg-[color:var(--b2b-primary)] animate-pulse" />
                                <span className="absolute inset-0 rounded-full bg-[color:var(--b2b-primary)] opacity-40" />
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.28em] text-white/70">
                                {eyebrowText}
                            </span>
                            <span className="text-[11px] text-white/35">{eyebrowSuffix}</span>
                        </m.div>

                        <m.h1 variants={fadeUp} className="font-display font-medium text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                            <span className="b2b-text-gradient">{headlinePart1}</span>
                            <span className="b2b-text-gradient">{headlinePart2}</span>
                            <span className="text-[color:var(--b2b-primary)]">{headlinePart3}</span>
                        </m.h1>

                        <m.p variants={fadeUp} className="b2b-lead mt-5 sm:mt-7 text-sm md:text-base">
                            {subheadline}
                        </m.p>

                        <m.div variants={fadeUp} className="mt-6 sm:mt-9 flex flex-wrap items-center gap-3">
                            <a
                                href={ctaPrimaryLink}
                                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300"
                                style={{
                                    background: "linear-gradient(180deg, var(--b2b-primary-light), var(--b2b-primary))",
                                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 18px 40px -16px rgba(var(--b2b-primary-rgb),0.7)",
                                }}
                                data-testid="hero-cta-primary"
                            >
                                {ctaPrimaryText}
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                            <a
                                href={ctaSecondaryLink}
                                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 bg-white/4 border border-white/12 text-[color:var(--b2b-fg)]"
                                data-testid="hero-cta-secondary"
                            >
                                {ctaSecondaryText}
                            </a>
                        </m.div>

                        <m.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2">
                            {supportingLabels.map((text, i) => {
                                const Icon = SUPPORTING_ICONS[i % SUPPORTING_ICONS.length];
                                return (
                                    <div
                                        key={`${text}-${i}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2 md:px-3 py-1 text-[9px] md:text-[11px] font-medium uppercase tracking-[0.18em] text-white/70"
                                    >
                                        <Icon className="w-3.5 h-3.5 text-[color:var(--b2b-primary)]" />
                                        {text}
                                    </div>
                                );
                            })}
                        </m.div>
                    </div>

                    {/* Right: visual */}
                    <m.div variants={fadeUp} className="col-span-12 lg:col-span-5 relative">
                        <HeroVisual />
                    </m.div>
                </m.div>

                {/* Metrics row */}
                <m.div
                    variants={stagger(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08]"
                    data-testid="hero-metrics"
                >
                    {metrics.map((metric, i) => (
                        <m.div
                            key={`${metric.label}-${i}`}
                            variants={fadeUp}
                            className="bg-[#070b1c] py-3 md:py-7 px-4 md:px-7 lg:px-8 hover:bg-[#0b1024] transition-colors group"
                        >
                            <div className="b2b-number text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                                {metric.value}
                            </div>
                            <div className="mt-2 text-[8px] md:text-[12px] uppercase tracking-[0.18em] text-white/55 group-hover:text-white/80 transition-colors">
                                {metric.label}
                            </div>
                        </m.div>
                    ))}
                </m.div>
            </div>
        </section>
    );
};

export default Hero2;
