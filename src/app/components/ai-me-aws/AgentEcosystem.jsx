"use client";

import {
  TrendingUp,
  Landmark,
  UserCog,
  Settings2,
  LifeBuoy,
  Megaphone,
  LineChart,
  Sparkles,
} from "lucide-react";
import NeuronOrbit from "./NeuronOrbit";

const AGENTS = [
  { label: "Sales Agent", icon: TrendingUp },
  { label: "Finance Agent", icon: Landmark },
  { label: "HR Agent", icon: UserCog },
  { label: "Operations Agent", icon: Settings2 },
  { label: "Customer Support Agent", icon: LifeBuoy },
  { label: "Marketing Agent", icon: Megaphone },
  { label: "Data Analyst", icon: LineChart },
  { label: "Custom Enterprise Agents", icon: Sparkles },
];

const FOUNDATION_TAGS = [
  "MCP",
  "RAG",
  "APIs",
  "Automations",
  "Enterprise Data",
];

export default function AgentEcosystem() {
  return (
    <section data-testid="aime-agent-ecosystem" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <span className="aime-eyebrow">
            <span className="aime-glow-dot" />
            Agent Ecosystem
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            One brain. Many specialized agents.
          </h2>
        </div>

        <NeuronOrbit
          size={480}
          rings={[{ radius: 200, duration: 40, reverse: true, nodes: AGENTS }]}
        />

        <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t pt-6" style={{ borderColor: "var(--aime-border)" }}>
          {FOUNDATION_TAGS.map((tag, i) => (
            <span key={tag} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
              {tag}
              {i < FOUNDATION_TAGS.length - 1 && <span className="text-white/20">&bull;</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
