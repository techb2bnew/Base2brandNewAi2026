"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ShiningText from "./CmsReuseComponents/ShiningText";
import BackgroundPaths from "./CmsReuseComponents/BackgroundPaths";
import Rocket from "./CmsReuseComponents/Rocket";

const polarToXY = (angleDeg, radiusPct) => {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return {
        x: 50 + radiusPct * Math.cos(a),
        y: 50 + radiusPct * Math.sin(a),
    };
};

const Hero1 = ({
    eyebrow = "FROM AUTOMATION TO AUTONOMY",
    headlinePart1 = "We engineer AI automation systems that run workflows,",
    headlinePart2 = "not demos.",
    subheadline = "Base2Brand delivers AI automation services...",
    ctaPrimaryText = "Start An AI Transformation",
    ctaPrimaryLink = "#contact",
    ctaSecondaryText = "Explore AI Capabilities",
    ctaSecondaryLink = "#capabilities",
    badges = ["Enterprise Grade", "Workflow-Ready", "Production Deployments", "Outcome-Focused"],
    neuralNodes = [
        { label: "GPT-5", angle: 12, radius: 38, accent: true },
        { label: "Claude", angle: 70, radius: 42 },
        { label: "Gemini", angle: 125, radius: 39, accent: true },
        { label: "Llama", angle: 178, radius: 43 },
        { label: "MCP", angle: 220, radius: 36, accent: true },
        { label: "Agents", angle: 268, radius: 41 },
        { label: "Voice AI", angle: 312, radius: 37 },
        { label: "RAG", angle: 350, radius: 44, accent: true },
        { label: "Automation", angle: 50, radius: 60 },
        { label: "Knowledge", angle: 200, radius: 58 },
    ],
    neuralCoreLabelSmall = "Neural Core",
    neuralCoreLabelBig = "B2B AI",
    rocketColor = "#ffffff",
    rocketFlameColor = "#A855F7",
}) => {
    const reduce = useReducedMotion();

    return (
        <section
            data-testid="hero-section"
            className="relative pt-24 md:pt-28 pb-14 md:pb-20 overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px]"
                    style={{ background: "radial-gradient(ellipse at center, rgba(var(--b2b-primary-dark-rgb),0.18), rgba(3,3,10,0) 60%)" }}
                />
                <div
                    className="absolute top-40 left-10 w-[400px] h-[400px] rounded-full blur-[120px]"
                    style={{ backgroundColor: "rgba(var(--b2b-primary-rgb),0.06)" }}
                />
                <div
                    className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full blur-[100px]"
                    style={{ backgroundColor: "rgba(var(--b2b-primary-light-rgb),0.05)" }}
                />
                <BackgroundPaths opacity={0.55} />
                <div className="grain" />
                <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" style={{ stroke: "rgba(var(--b2b-primary-rgb),0.18)" }} strokeWidth="0.5" />
                        </pattern>
                        <radialGradient id="hero-grid-fade" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="black" stopOpacity="1" />
                            <stop offset="100%" stopColor="black" stopOpacity="0" />
                        </radialGradient>
                        <mask id="hero-grid-mask">
                            <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
                        </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#hero-grid-mask)" />
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-10">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className="lg:col-span-7">
                        <m.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                            <ShiningText testId="hero-eyebrow">{eyebrow}</ShiningText>
                        </m.div>

                        <m.h1
                            data-testid="hero-headline"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.1 }}
                            className="mt-4 font-display text-white text-3xl lg:text-5xl leading-[1.05] tracking-tight text-balance"
                        >
                            {headlinePart1}{" "}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(to bottom right, var(--b2b-primary-light), var(--b2b-primary), var(--b2b-primary-dark))" }}
                            >
                                {headlinePart2}
                            </span>
                        </m.h1>

                        <m.p
                            data-testid="hero-subheadline"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                            className="mt-4 text-base md:text-lg text-white/55 max-w-2xl"
                        >
                            {subheadline}
                        </m.p>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.3 }}
                            className="mt-6 md:mt-12 flex flex-wrap gap-4"
                        >
                            <a href={ctaPrimaryLink} data-testid="hero-cta-primary"
                                className="group inline-flex items-center gap-2 text-white px-6 py-3 md:py-4 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
                                style={{
                                    backgroundColor: "var(--b2b-primary)",
                                    boxShadow: "0 0 30px -10px rgba(var(--b2b-primary-rgb),0.55)",
                                }}
                            >
                                <Sparkles className="w-4 h-4" />
                                {ctaPrimaryText}
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <a href={ctaSecondaryLink} data-testid="hero-cta-secondary"
                                className="inline-flex items-center gap-2 border border-white/15 hover:border-white/40 hover:bg-white/[0.03] text-white px-6 py-3 md:py-4 rounded-full text-sm font-medium transition-all"
                            >
                                {ctaSecondaryText}
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </m.div>

                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.25em] font-mono text-white/35"
                        >
                            {badges.map((badge, i) => (
                                <span key={i} className="flex items-center gap-x-8">
                                    {i > 0 && <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--b2b-primary)" }} />}
                                    {badge}
                                </span>
                            ))}
                        </m.div>
                    </div>

                    <m.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, delay: 0.2 }}
                        className="lg:col-span-5 relative"
                    >
                        <div data-testid="neural-command-center" className="relative aspect-square w-full max-w-[640px] mx-auto">
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{ background: "radial-gradient(circle at center, rgba(var(--b2b-primary-rgb),0.12), rgba(3,3,10,0) 60%)" }}
                            />
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{ background: "radial-gradient(circle at center, rgba(var(--b2b-primary-light-rgb),0.05), rgba(3,3,10,0) 45%)" }}
                            />

                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
                                <defs>
                                    <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" style={{ stopColor: "var(--b2b-primary-light)" }} stopOpacity="0.95" />
                                        <stop offset="40%" style={{ stopColor: "var(--b2b-primary)" }} stopOpacity="0.8" />
                                        <stop offset="100%" style={{ stopColor: "var(--b2b-primary-dark)" }} stopOpacity="0" />
                                    </radialGradient>
                                    <linearGradient id="lineGrad" x1="0" x2="1">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
                                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="lineGradAccent" x1="0" x2="1">
                                        <stop offset="0%" style={{ stopColor: "var(--b2b-primary)" }} stopOpacity="0" />
                                        <stop offset="50%" style={{ stopColor: "var(--b2b-primary)" }} stopOpacity="0.55" />
                                        <stop offset="100%" style={{ stopColor: "var(--b2b-primary)" }} stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {neuralNodes.map((n, i) => {
                                    const { x, y } = polarToXY(n.angle, n.radius);
                                    return (
                                        <line key={`spoke-${i}`} x1="50" y1="50" x2={x} y2={y}
                                            stroke={n.accent ? "url(#lineGradAccent)" : "url(#lineGrad)"} strokeWidth="0.18" />
                                    );
                                })}

                                {neuralNodes.slice(0, 8).map((n, i) => {
                                    const next = neuralNodes[(i + 1) % 8];
                                    const a = polarToXY(n.angle, n.radius);
                                    const b = polarToXY(next.angle, next.radius);
                                    return (
                                        <line key={`arc-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                                            stroke="rgba(255,255,255,0.10)" strokeWidth="0.1" />
                                    );
                                })}

                                <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.12" strokeDasharray="0.6 0.9" />
                                <circle cx="50" cy="50" r="44" fill="none" style={{ stroke: "rgba(var(--b2b-primary-rgb),0.10)" }} strokeWidth="0.12" strokeDasharray="0.4 1.2" />
                                <circle cx="50" cy="50" r="14" fill="none" style={{ stroke: "rgba(var(--b2b-primary-light-rgb),0.28)" }} strokeWidth="0.18" />

                                <g style={{ transformOrigin: "50% 50%", animation: reduce ? "none" : "b2b-orbit-slow 80s linear infinite" }}>
                                    <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.15" strokeDasharray="1 2" />
                                </g>
                                <g style={{ transformOrigin: "50% 50%", animation: reduce ? "none" : "b2b-orbit-slow 120s linear infinite reverse" }}>
                                    <circle cx="50" cy="50" r="29" fill="none" style={{ stroke: "rgba(var(--b2b-primary-light-rgb),0.14)" }} strokeWidth="0.12" strokeDasharray="0.5 2.5" />
                                </g>

                                <circle cx="50" cy="50" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.12" />
                                <circle cx="50" cy="50" r="6" fill="url(#coreGrad)" />
                                <circle cx="50" cy="50" r="2.5" fill="#fff" opacity="0.85" style={{ filter: "drop-shadow(0 0 3px var(--b2b-primary-light))" }} />
                            </svg>

                            <div className="absolute inset-0"
                                style={{ transformOrigin: "50% 50%", animation: reduce ? "none" : "b2b-orbit-slow 45s linear infinite" }}
                            >
                                <div className="absolute" style={{ top: "0%", left: "50%", transform: "translate(-50%, -10%) rotate(90deg)" }}>
                                    <Rocket size={18} color={rocketColor} flame={rocketFlameColor} />
                                </div>
                            </div>

                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 mt-9 text-center pointer-events-none">
                                <div
                                    className="font-mono text-xs tracking-[0.3em] uppercase drop-shadow-[0_1px_4px_rgba(3,3,10,0.9)]"
                                    style={{ color: "var(--b2b-primary-light)" }}
                                >
                                    {neuralCoreLabelSmall}
                                </div>
                                <div className="font-display text-sm font-semibold text-white mt-0.5 drop-shadow-[0_2px_6px_rgba(3,3,10,0.95)]">
                                    {neuralCoreLabelBig}
                                </div>
                            </div>

                            {neuralNodes.map((n, i) => {
                                const { x, y } = polarToXY(n.angle, n.radius);
                                return (
                                    <m.div
                                        key={n.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 * i, duration: 0.6 }}
                                        style={{ left: `${x}%`, top: `${y}%` }}
                                        className="absolute -translate-x-1/2 -translate-y-1/2"
                                        data-testid={`neural-node-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    >
                                        <div
                                            className={`px-2.5 py-1 rounded-full text-xs font-mono tracking-wider whitespace-nowrap backdrop-blur-md ${n.accent
                                                    ? "border text-white"
                                                    : "bg-white/[0.04] border border-white/12 text-white/80"
                                                }`}
                                            style={n.accent ? {
                                                backgroundColor: "rgba(var(--b2b-primary-rgb),0.12)",
                                                borderColor: "rgba(var(--b2b-primary-rgb),0.35)",
                                                color: "var(--b2b-primary-light)",
                                                boxShadow: "0 0 12px -3px rgba(var(--b2b-primary-rgb),0.5)",
                                            } : undefined}
                                        >
                                            <span
                                                className="inline-block w-1 h-1 rounded-full mr-1.5 align-middle"
                                                style={{ backgroundColor: n.accent ? "var(--b2b-primary)" : "rgba(255,255,255,0.6)" }}
                                            />
                                            {n.label}
                                        </div>
                                    </m.div>
                                );
                            })}

                            {!reduce &&
                                [...Array(4)].map((_, i) => (
                                    <m.div
                                        key={`spark-${i}`}
                                        className="absolute w-1 h-1 rounded-full"
                                        style={{
                                            backgroundColor: "var(--b2b-primary-light)",
                                            boxShadow: "0 0 8px 2px rgba(var(--b2b-primary-light-rgb),0.5)",
                                        }}
                                        initial={{ x: `${20 + Math.random() * 60}%`, y: `${20 + Math.random() * 60}%`, opacity: 0 }}
                                        animate={{ opacity: [0, 0.7, 0], y: [`50%`, `${30 + Math.random() * 40}%`] }}
                                        transition={{ duration: 5 + Math.random() * 4, delay: i * 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                ))}
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
};

export default Hero1;
