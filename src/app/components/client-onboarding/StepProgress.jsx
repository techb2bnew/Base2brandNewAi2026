"use client";

import { Check } from "lucide-react";

export default function StepProgress({ steps, currentIndex }) {
  return (
    <div
      data-testid="onboarding-step-progress"
      className="flex items-center justify-between gap-1 sm:gap-2"
    >
      {steps.map((step, index) => {
        const isDone = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={step.id} className="flex flex-1 items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all ${
                  isDone
                    ? "border-[var(--b2b-primary)] bg-[var(--b2b-primary)] text-black"
                    : isActive
                      ? "border-[var(--b2b-primary)] bg-transparent text-[var(--b2b-primary)]"
                      : "border-white/15 bg-white/[0.03] text-white/35"
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={`hidden text-center text-[10px] uppercase tracking-[0.14em] sm:block ${
                  isActive ? "text-white/80" : "text-white/35"
                }`}
              >
                {step.title}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-px flex-1 transition-all ${
                  isDone ? "bg-[var(--b2b-primary)]" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
