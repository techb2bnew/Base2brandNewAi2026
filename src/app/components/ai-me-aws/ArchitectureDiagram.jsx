"use client";

import { BookOpen, Braces, Workflow } from "lucide-react";

const LINE_COLOR = "rgba(255,255,255,0.18)";

function TreeConnector({ direction }) {
  return (
    <svg
      viewBox="0 0 300 56"
      className="mx-auto h-10 w-full max-w-sm sm:max-w-md"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g stroke={LINE_COLOR} strokeWidth="1.5" fill="none">
        {direction === "down" ? (
          <>
            <line x1="150" y1="0" x2="150" y2="18" />
            <line x1="30" y1="18" x2="270" y2="18" />
            <line x1="30" y1="18" x2="30" y2="56" />
            <line x1="150" y1="18" x2="150" y2="56" />
            <line x1="270" y1="18" x2="270" y2="56" />
          </>
        ) : (
          <>
            <line x1="30" y1="0" x2="30" y2="38" />
            <line x1="150" y1="0" x2="150" y2="38" />
            <line x1="270" y1="0" x2="270" y2="38" />
            <line x1="30" y1="38" x2="270" y2="38" />
            <line x1="150" y1="38" x2="150" y2="56" />
          </>
        )}
      </g>
    </svg>
  );
}

function DiagramBox({ title, subtitle, accent, className = "" }) {
  return (
    <div
      className={`rounded-2xl border px-5 py-3.5 text-center ${accent ? "" : "aime-card"} ${className}`}
      style={
        accent
          ? {
              borderColor: "rgba(var(--aime-accent-rgb),0.5)",
              background: "rgba(var(--aime-accent-rgb),0.1)",
              boxShadow: "0 0 40px -8px rgba(var(--aime-accent-rgb),0.4)",
            }
          : { borderColor: "var(--aime-border)" }
      }
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
        {title}
      </p>
      {subtitle && (
        <p className="mt-1 text-[11px] text-white/45">{subtitle}</p>
      )}
    </div>
  );
}

const BRANCHES = [
  { icon: BookOpen, title: "RAG", sub: "Enterprise Memory" },
  { icon: Braces, title: "MCP / API", sub: "Business Tools" },
  { icon: Workflow, title: "Automation", sub: "Workflows" },
];

export default function ArchitectureDiagram() {
  return (
    <section data-testid="aime-architecture" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <span className="aime-eyebrow">
            <span className="aime-glow-dot" />
            Enterprise Architecture
          </span>
          <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            One connected system, top to bottom.
          </h2>
        </div>

        <div className="rounded-[1.75rem] border aime-card px-4 py-10 sm:px-10">
          <div className="flex flex-col items-center">
            <DiagramBox title="AI Agents" subtitle="Sales &bull; HR &bull; Finance &bull; Ops" />
            <TreeConnector direction="down" />
            <DiagramBox title="AI.me" subtitle="Enterprise AI Brain" accent className="px-8 py-4" />
            <TreeConnector direction="down" />

            <div className="grid w-full max-w-sm grid-cols-3 gap-2 sm:max-w-md sm:gap-4">
              {BRANCHES.map((branch) => (
                <div key={branch.title} className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl border"
                    style={{ borderColor: "var(--aime-border)" }}
                  >
                    <branch.icon className="h-4 w-4 text-[var(--aime-accent)]" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:text-xs">
                    {branch.title}
                  </p>
                  <p className="text-[10px] text-white/40 sm:text-[11px]">{branch.sub}</p>
                </div>
              ))}
            </div>

            <TreeConnector direction="up" />
            <DiagramBox
              title="Enterprise Systems"
              subtitle="ERP &bull; CRM &bull; Shopify &bull; Email &bull; WhatsApp &bull; DB &bull; Documents"
              className="max-w-md px-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
