"use client";

import React from "react";
import { m } from "framer-motion";

/**
 * ProcessSteps — vertical numbered timeline (discovery -> operate). All
 * content is data-driven from the registry (see sectionRegistry.js); no
 * step data is hardcoded here, and colors follow the shared page theme
 * (--b2b-primary*) instead of a fixed Apple blue.
 */
export default function ProcessSteps({ eyebrow, titleUpper, titleLower, steps = [] }) {
    return (
        <section className="b2b-container py-8 sm:py-12">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                <p
                    className="font-mono text-xs uppercase tracking-[0.24em]"
                    style={{ color: "var(--b2b-primary-light)" }}
                >
                    {eyebrow}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.05] tracking-tight mt-4">
                    {titleUpper}{" "}
                    <span className="text-gradient-blue-violet">{titleLower}</span>
                </h2>
            </div>

            <div className="relative">
                <div className="hidden lg:block absolute left-[60px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

                <div className="space-y-5">
                    {steps.map((s, i) => (
                        <m.div
                            key={s.n || i}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-[auto_1fr] lg:grid-cols-[120px_1fr] gap-4 sm:gap-5 lg:gap-10 items-start"
                        >
                            <div className="relative">
                                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-white/15 leading-none">{s.n}</span>
                                <span
                                    className="hidden lg:block absolute left-[60px] top-2 w-2 h-2 rounded-full"
                                    style={{ background: "var(--b2b-primary-light)", boxShadow: "0 0 10px var(--b2b-primary-light)" }}
                                />
                            </div>
                            <div className="glass rounded-2xl p-4 sm:p-6 lg:p-7">
                                <h3 className="font-display text-xl sm:text-2xl leading-tight">{s.title}</h3>
                                <p className="mt-2 text-sm sm:text-base text-white/60 leading-relaxed">{s.body}</p>
                                <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                                    {(s.artefacts || []).map((a) => (
                                        <span key={a} className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white/55 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
