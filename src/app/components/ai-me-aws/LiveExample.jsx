"use client";

import { Search, BarChart3, BrainCircuit, Zap, ArrowRight, Bot, User } from "lucide-react";

const PIPELINE = [
  { label: "Retrieve", icon: Search },
  { label: "Analyze", icon: BarChart3 },
  { label: "Reason", icon: BrainCircuit },
  { label: "Take Action", icon: Zap },
];

export default function LiveExample() {
  return (
    <section data-testid="aime-live-example" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <span className="aime-eyebrow">
            <span className="aime-glow-dot" />
            Example
          </span>
          <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Ask AI.me anything about your business.
          </h2>
        </div>

        <div className="rounded-[1.75rem] border aime-card p-5 sm:p-8">
          {/* User query */}
          <div className="flex items-start justify-end gap-3">
            <div
              className="max-w-md rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white sm:text-base"
              style={{ background: "rgba(var(--aime-accent-rgb),0.16)" }}
            >
              &ldquo;Show me all delayed orders from the last 7 days and
              identify the customers most at risk.&rdquo;
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: "var(--aime-border)" }}>
              <User className="h-4 w-4 text-white/60" />
            </div>
          </div>

          {/* Pipeline */}
          <div className="my-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {PIPELINE.map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 rounded-full border aime-card px-3 py-1.5 sm:px-4 sm:py-2">
                  <stage.icon className="h-3.5 w-3.5 text-[var(--aime-accent)] sm:h-4 sm:w-4" />
                  <span className="text-xs font-medium text-white/75 sm:text-sm">
                    {stage.label}
                  </span>
                </div>
                {i < PIPELINE.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-white/25" />
                )}
              </div>
            ))}
          </div>

          {/* AI.me response */}
          <div className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: "rgba(var(--aime-accent-rgb),0.4)" }}
            >
              <Bot className="h-4 w-4 text-[var(--aime-accent)]" />
            </div>
            <div className="max-w-md rounded-2xl rounded-tl-sm border aime-card px-4 py-3 text-sm text-white/85 sm:text-base">
              There are 17 delayed orders. 5 are high priority. I&rsquo;ve
              prepared follow-up messages for the account managers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
