"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlobeHero } from "@/CmsComponents/CmsReuseComponents/GlobeHero";

export const TOP_REGIONS_DEFAULT = [
  { region: "United States", note: "Performance, SaaS & ecommerce projects", count: "150+ Projects" },
  { region: "United Kingdom", note: "Retail, healthcare & digital platforms", count: "90+ Projects" },
  { region: "Australia", note: "Marketing, Shopify & automation systems", count: "65+ Projects" },
  { region: "India", note: "HQ + delivery teams", count: "60+ Brands" },
  { region: "Canada", note: "Lead generation & enterprise solutions", count: "30+ Projects" },
];

export function ClientFootprint({
  eyebrow = "Where We’ve Delivered",
  titlePart1 = "300+ digital engagements,",
  titlePart2 = "built across industries and growth stages.",
  description = "Our delivery footprint follows business outcomes — from ecommerce stores and performance campaigns to AI automation, mobile applications, CRM systems, and enterprise platforms.",
  captionText = "Interactive · drag to rotate",
  regions = TOP_REGIONS_DEFAULT,
}) {
  const safeRegions = Array.isArray(regions) && regions.length > 0 ? regions : TOP_REGIONS_DEFAULT;

  return (
    <section
      id="footprint"
      data-testid="client-footprint-section"
      className="relative w-full overflow-hidden py-12 md:py-16"
    >
      {/* Radial backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 65% 50%, rgba(var(--b2b-primary-rgb, 139, 92, 246), 0.12) 0%, rgba(2,3,10,0) 60%)",
        }}
      />
      <div className="absolute inset-0 grain opacity-60 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Eyebrow + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="md:max-w-4xl"
        >
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--b2b-primary)] shadow-[0_0_12px_var(--b2b-primary)]" />
            {eyebrow}
          </div>
          <h2
            className="mt-4 font-display text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight font-medium"
            data-testid="footprint-heading"
          >
            {titlePart1}{" "}
            <span className="block text-[var(--b2b-primary)] text-glow-orange">
              {titlePart2}
            </span>
          </h2>
          {description && (
            <p className="mt-3 text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        {/* Globe + regions */}
        <div className="mt-2 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1 }}
            className="relative mx-auto w-full md:max-w-[520px] hidden md:block"
            data-testid="footprint-globe"
          >
            <div className="relative aspect-square">
              <GlobeHero className="w-full h-full" />
            </div>
            {/* Caption pill */}
            {captionText && (
              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--b2b-primary)]" />
                {captionText}
              </div>
            )}
          </motion.div>

          {/* Regions list */}
          <div className="space-y-3" data-testid="footprint-regions">
            {safeRegions.map((r, i) => (
              <motion.div
                key={r.region || i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group relative flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6 rounded-lg md:rounded-2xl border border-white/10 bg-white/[0.02] px-5 sm:px-6 py-3.5 hover:border-[var(--b2b-primary)]/50 hover:bg-white/[0.04] transition-all"
                data-testid={`footprint-region-${(r.region || "").toLowerCase().replace(/\s+/g, "-")}`}
              >
                {/* Index */}
                <div className="font-mono text-xs text-neutral-500 w-6 hidden md:block">
                  0{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-white text-base md:text-lg font-medium tracking-tight">
                    {r.region}
                  </div>
                  {r.note && (
                    <div className="mt-0.5 text-xs sm:text-sm text-neutral-400 truncate">
                      {r.note}
                    </div>
                  )}
                </div>
                {r.count && (
                  <div className="shrink-0 self-start md:self-auto rounded-full border border-[var(--b2b-primary)]/40 bg-[var(--b2b-primary)]/10 px-3 py-1.5 text-xs font-mono text-[var(--b2b-primary)] uppercase tracking-wider">
                    {r.count}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientFootprint;
