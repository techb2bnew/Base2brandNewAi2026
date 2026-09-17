"use client";

import { m } from "framer-motion";
import { Wrench, Cloud, Layers3, Rocket } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";


const Icons  = {
  Wrench,
  Cloud,
  Layers3,
  Rocket
}

const WhyBase2Brand = ({ hightlighttag, titleUpper, titleLower, description, cardsdata }) => {
  return (
    <section id="why" className="b2b-section relative py-12">
      <div className="b2b-container">
        <m.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto text-center"
        >
          <m.div variants={fadeUp} className="text-[color:var(--b2b-primary)] mb-2 md:mb-6 text-center">
            <span className="w-1.5 h-1.5 rounded-full text-[color:var(--b2b-primary)]" />
            {hightlighttag}
          </m.div>
          <h2 className="mt-4 font-display text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
            <span className="b2b-text-gradient"> {titleUpper}</span>
            <span className="text-[color:var(--b2b-primary)]">{titleLower ? ' ' : ''}{titleLower}</span>
          </h2>
          <p className="text-white/65 text-sm sm:text-base lg:text-lg max-w-[940px] mx-auto self-end leading-relaxed pt-3">
            {description}
          </p>
        </m.div>

        <m.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-4 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {cardsdata.map((c, idx) => {
            const Icon = Icons[c.icon];
            return (
              <m.div
                key={c.title}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="b2b-card px-0 md:px-6 lg:px-9 py-4 group"
              >
                <div className="flex items-start gap-2 md:gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl border border-[color:var(--b2b-primary)]/30 bg-[color:var(--b2b-primary)]/10 grid place-items-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-[color:var(--b2b-primary)]" />
                  </div>
                  <div>
                    <h3 className="b2b-h3">{c.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/65">{c.desc}</p>
                    {c.outcome && (
                      <p className="mt-3 text-[15px] leading-relaxed">
                        <span className="text-white/85 font-medium">Outcome: </span>
                        <span className="text-white/65">{c.outcome}</span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-2 md:mt-7 pt-2 md:pt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Principle 0{idx + 1}
                  </span>
                  <span className="text-[12px] text-[color:var(--b2b-primary)] font-medium">Engineered→</span>
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
};

export default WhyBase2Brand;
