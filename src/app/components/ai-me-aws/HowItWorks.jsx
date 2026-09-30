"use client";

import { Plug, BrainCircuit, Rocket, Zap } from "lucide-react";
import Reveal from "./Reveal";
import { RevealGroup, RevealItem } from "./RevealGroup";
import PauseWhenHidden from "./PauseWhenHidden";

const STEPS = [
  {
    n: "01",
    title: "Connect",
    body: "Bring your enterprise systems and data into AI.me.",
    icon: Plug,
  },
  {
    n: "02",
    title: "Understand",
    body: "AI.me organizes and indexes your information into a private enterprise knowledge layer.",
    icon: BrainCircuit,
  },
  {
    n: "03",
    title: "Deploy",
    body: "Create specialized AI agents for different teams and workflows.",
    icon: Rocket,
  },
  {
    n: "04",
    title: "Execute",
    body: "Agents can use connected tools and systems to perform real business actions.",
    icon: Zap,
  },
];

export default function HowItWorks() {
  return (
    <PauseWhenHidden as="section" data-testid="aime-how-it-works" className="relative py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal as="div" className="mb-6 text-center">
          <span className="aime-eyebrow">
            <span className="aime-glow-dot" />
            How AI.me Works
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            From Connected Data To Executed Action.
          </h2>
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {STEPS.map((step, i) => (
            <RevealItem
              key={step.n}
              data-testid={`aime-step-${step.n}`}
              className="aime-card-glow relative rounded-2xl border aime-card p-6"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <span className="font-mono text-xs tracking-[0.2em] text-white/35">
                {step.n}
              </span>
              <div
                className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl border"
                style={{ borderColor: "var(--aime-border)" }}
              >
                <step.icon className="h-5 w-5 text-[var(--aime-accent)]" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {step.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </PauseWhenHidden>
  );
}
