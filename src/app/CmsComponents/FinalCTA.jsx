"use client";

import React from "react";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import OrbitalBackground from "./CmsReuseComponents/OrbitalBackground";

export default function FinalCTA({ highlightTag, titleUpper, titleLower, description, primaryText, primaryLink, secondaryText, secondaryLink }) {
  return (
    <section
      id="final-cta"
      className="relative py-16 overflow-hidden"
      data-testid="final-cta-section"
    >
      <OrbitalBackground
        size={1100}
        rings={[260, 420, 600, 820]}
        opacity={0.6}
      />
      <div
        className="glow-orange absolute pointer-events-none"
        style={{
          width: 800,
          height: 800,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.5,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 md:px-10 text-center">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          {highlightTag}
        </m.div>

        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mt-4 font-display text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight"
        >
          {titleUpper}{' '}
          <br />
          <span className="text-orange-gradient">
            {titleLower}
          </span>
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 text-zinc-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
        >
          {description}
        </m.p>



        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-4"
        >
          <a href={primaryLink} className="btn-primary" data-testid="final-cta-primary">
            {primaryText} <ArrowRight size={16} />
          </a>
          <a
            href={secondaryLink}
            className="btn-secondary"
            data-testid="final-cta-secondary"
          >
            {secondaryText} <ArrowRight size={14} />
          </a>
        </m.div>

        {/* Trust ribbon */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 mx-auto max-w-2xl border border-white/8 rounded-2xl px-5 sm:px-7 py-5 bg-white/[0.02] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="status-pulse" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-zinc-400">
              Growth Engine
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-zinc-500">
            <span className="text-white">06 / 06</span> Systems Online
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.22em] uppercase"
            style={{ color: "var(--b2b-primary)" }}
          >
            Engaged
          </span>
        </m.div>
      </div>
    </section>
  );
}
