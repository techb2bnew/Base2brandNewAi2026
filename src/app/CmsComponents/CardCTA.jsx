"use client";

import React from "react";
import { m } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

function Bullet() {
  return (
    <span
      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
      style={{ background: "var(--b2b-primary-light)", boxShadow: "0 0 8px var(--b2b-primary-light)" }}
    />
  );
}

/**
 * CardCTA — glassmorphic two-column contact/CTA card (headline + CTAs on
 * the left, a "what you get back" benefits panel on the right). All content
 * is data-driven from the registry; colors follow the shared page theme.
 */
export default function CardCTA({
  eyebrow,
  title,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  benefitsLabel,
  benefits = [],
  footnote,
}) {
  return (
    <section id="contact" className="relative b2b-container py-8 sm:py-12">
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl sm:rounded-[40px] glass-strong p-6 sm:p-10 lg:p-16"
      >
        <div
          className="absolute -top-24 sm:-top-32 -right-24 sm:-right-32 w-[400px] sm:w-[520px] h-[400px] sm:h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(var(--b2b-primary-rgb),0.28) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 sm:-bottom-40 -left-24 sm:-left-32 w-[400px] sm:w-[520px] h-[400px] sm:h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(var(--b2b-primary-light-rgb),0.18) 0%, transparent 70%)" }}
        />

        <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-6 sm:gap-10 items-center">
          <div>
            <p
              className="font-mono text-xs uppercase tracking-[0.24em]"
              style={{ color: "var(--b2b-primary-light)" }}
            >
              {eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.04] tracking-tight mt-4 max-w-2xl">
              {title}
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/65 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="mt-6 sm:mt-9 flex flex-wrap items-center gap-3">
              <a
                href={primaryCtaLink}
                className="inline-flex items-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-full text-sm font-semibold text-white transition"
                style={{
                  background: "var(--b2b-primary)",
                  boxShadow: "0 12px 36px -10px rgba(var(--b2b-primary-rgb),0.7)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--b2b-primary-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--b2b-primary)")}
              >
                {primaryCtaText} <ArrowUpRight size={16} />
              </a>
              <a
                href={secondaryCtaLink}
                className="inline-flex items-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-full text-sm font-semibold text-white/85 hover:text-white border border-white/15 hover:border-white/30 transition"
              >
                <Calendar size={16} /> {secondaryCtaText}
              </a>
            </div>
          </div>

          <div className="glass rounded-2xl p-5 sm:p-6 lg:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">
              {benefitsLabel}
            </p>
            <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-white/75">
              {benefits.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <Bullet /> {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-white/45">
              {footnote}
            </p>
          </div>
        </div>
      </m.div>
    </section>
  );
}
