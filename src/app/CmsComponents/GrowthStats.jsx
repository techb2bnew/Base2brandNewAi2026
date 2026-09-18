"use client";

import React from 'react';
import { m } from 'framer-motion';

/**
 * GrowthStats — "how we measure success" intro: headline + body copy,
 * discipline tag chips, and a row of proof-pillar stat cards. All content
 * is data-driven from the registry; colors follow the shared page theme
 * (--b2b-primary*) instead of the fixed cyan/orange the source file used.
 */
export default function GrowthStats({
    eyebrow,
    titleLine1,
    titleLine2,
    bodyParagraphs = [],
    disciplinesLabel,
    disciplines = [],
    pillars = [],
}) {
    return (
        <section
            id="case-study-intro"
            data-testid="case-study-intro"
            className="relative border-t border-white/8 px-6 md:px-12 py-14 md:py-20"
        >
            <div className="max-w-[1180px] mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="section-label mb-5">{eyebrow}</div>
                        <h2 className="font-display text-white text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.035em]">
                            {titleLine1}
                            <span className="block text-white/60 mt-1">
                                {titleLine2}
                            </span>
                        </h2>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="space-y-4 text-[15px] md:text-[16px] leading-[1.65] text-white/60"
                    >
                        {bodyParagraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </m.div>
                </div>

                <m.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.65, delay: 0.15 }}
                    className="mt-6"
                >
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/45 mb-4">
                        {disciplinesLabel}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {disciplines.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] tracking-[0.12em] uppercase text-white/70"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </m.div>

                <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {pillars.map((pillar, i) => (
                        <m.article
                            key={pillar.label || i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.65, delay: i * 0.08 }}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(10,11,18,0.5)] p-6 md:p-7"
                        >
                            <div
                                className="font-display text-4xl md:text-5xl tracking-[-0.03em] leading-none"
                                style={{ color: 'var(--b2b-primary)' }}
                            >
                                {pillar.value}
                            </div>
                            <div className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/50">
                                {pillar.label}
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-white/60">
                                {pillar.desc}
                            </p>
                            <div
                                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition"
                                style={{
                                    background:
                                        'linear-gradient(160deg, rgba(var(--b2b-primary-rgb),0.08), transparent 50%)',
                                }}
                            />
                        </m.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
