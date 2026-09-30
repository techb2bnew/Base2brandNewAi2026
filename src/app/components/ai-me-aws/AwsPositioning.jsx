"use client";

import { Cloud, Server, Lock, Cpu } from "lucide-react";
import Reveal from "./Reveal";
import { RevealGroup, RevealItem } from "./RevealGroup";

const PILLARS = [
  { icon: Cloud, label: "Cloud storage & compute" },
  { icon: Server, label: "Managed databases" },
  { icon: Cpu, label: "AI & ML services" },
  { icon: Lock, label: "Enterprise security" },
];

// Cursor-follow spotlight — only listens on pointer-fine devices. Touch
// devices get a static glow instead (added via the `aime-spotlight-touch`
// class) rather than tracking a touch position.
function handlePointerMove(e) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  target.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}

export default function AwsPositioning() {
  return (
    <section data-testid="aime-aws-positioning" className="relative py-6 sm:py-10">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="aime-eyebrow">
            <span className="aime-glow-dot" />
            AI.me &times; AWS
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Built For The Modern Cloud. Designed To Work With AWS.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            AI.me can leverage cloud infrastructure, storage, databases,
            compute, AI services and enterprise security architecture to
            create scalable private AI environments &mdash; independently
            built to run well on AWS.
          </p>
        </Reveal>

        <RevealGroup className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4" stagger={0.06}>
          {PILLARS.map(({ icon: Icon, label }) => (
            <RevealItem
              key={label}
              y={12}
              className="aime-spotlight rounded-2xl border aime-card px-3 py-5"
              onMouseMove={handlePointerMove}
            >
              <Icon className="mx-auto h-5 w-5 text-[var(--aime-accent)]" />
              <p className="mt-3 text-xs leading-snug text-white/60">
                {label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
