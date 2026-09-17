"use client";

import { m } from "framer-motion";
import {
  Search,
  Microscope,
  Pencil,
  Play,
  Settings2,
  TrendingUp,
  ArrowDown,
  Rocket
} from "lucide-react";

const Icons = {
  Search,
  Microscope,
  Pencil,
  Play,
  Settings2,
  TrendingUp,
  Rocket
}

export default function Process({ highlightTag, titleUpper, titleLower, description, StepsData = [] }) {
  return (
    <section
      id="process"
      className="relative py-10 overflow-hidden"
      data-testid="process-section"
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-10">
        <div className="text-center max-w-3xl mx-auto">
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-3 font-display text-[30px] sm:text-[42px] lg:text-[52px] leading-[1.05] font-medium text-white"
          >
            {titleUpper}{" "}
            <span className="text-orange-gradient">{titleLower}</span>
          </m.h2>
          {description && (
            <m.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-sm md:text-base text-white/55"
            >
              {description}
            </m.p>
          )}
        </div>

        {/* Desktop: vertical stepper with timeline */}
        <div className="mt-10 relative">
          {/* center spine */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  transparent,
                  color-mix(in srgb, var(--b2b-primary) 45%, transparent) 12%,
                  color-mix(in srgb, var(--b2b-primary) 45%, transparent) 88%,
                  transparent
                )
              `,
            }}
          />
          <div className="flex flex-col gap-3 md:gap-6">
            {StepsData.map((s, i) => {
              const Icon = Icons[s.icon] || Search;
              const isLeft = i % 2 === 0;
              return (
                <m.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="relative md:grid md:grid-cols-2 md:gap-16 items-center"
                  data-testid={`process-step-${s.id}`}
                >
                  {/* card */}
                  <div
                    className={`glass-card p-4 sm:p-7 relative ${
                      isLeft ? "md:col-start-1" : "md:col-start-2"
                    }`}
                  >
                    <span className="card-corner-mark card-corner-mark--tl" />
                    <span className="card-corner-mark card-corner-mark--br" />
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[rgba(var(--b2b-primary-rgb),0.1)] border border-[rgba(var(--b2b-primary-rgb),0.25)] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[color:var(--b2b-primary)]" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
                          Step {s.id}
                        </p>
                        <h3 className="text-[22px] font-medium text-white mt-0.5">
                          {s.label}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* center node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                    <div className="relative">
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow: "0 0 0 6px rgba(var(--b2b-primary-rgb),0.08)",
                        }}
                      />
                      <div className="w-12 h-12 rounded-full border border-[rgba(var(--b2b-primary-rgb),0.5)] bg-[#0a0a0c] flex items-center justify-center">
                        <span className="font-mono text-[11px] text-[color:var(--b2b-primary)] tracking-wider">
                          {s.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile arrow */}
                  {i < StepsData.length - 1 && (
                    <div className="md:hidden flex justify-center mt-3">
                      <ArrowDown className="w-4 h-4 text-[rgba(var(--b2b-primary-rgb),0.6)]" />
                    </div>
                  )}
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
