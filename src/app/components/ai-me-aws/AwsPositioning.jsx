"use client";

import { Cloud, Server, Lock, Cpu } from "lucide-react";

const PILLARS = [
  { icon: Cloud, label: "Cloud storage & compute" },
  { icon: Server, label: "Managed databases" },
  { icon: Cpu, label: "AI & ML services" },
  { icon: Lock, label: "Enterprise security" },
];

export default function AwsPositioning() {
  return (
    <section data-testid="aime-aws-positioning" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="aime-eyebrow">
          <span className="aime-glow-dot" />
          AI.me &times; AWS
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
          Built for the modern cloud. Designed to work with AWS.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          AI.me can leverage cloud infrastructure, storage, databases,
          compute, AI services and enterprise security architecture to
          create scalable private AI environments &mdash; independently
          built to run well on AWS.
        </p>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {PILLARS.map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-2xl border aime-card px-3 py-5">
              <Icon className="mx-auto h-5 w-5 text-[var(--aime-accent)]" />
              <p className="mt-3 text-xs leading-snug text-white/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
