"use client";

import {
  Building2,
  Users,
  Mail,
  Database,
  FileText,
  Braces,
  Network,
  BrainCircuit,
  GitBranch,
} from "lucide-react";
import { SiShopify, SiWhatsapp } from "react-icons/si";
import Reveal from "./Reveal";
import { RevealGroup, RevealItem } from "./RevealGroup";
import Atmosphere from "@/components/site/Atmosphere";
import SmokeBackground from "@/components/site/SmokeBackground";
const SYSTEMS = [
  { label: "ERP", icon: Building2 },
  { label: "CRM", icon: Users },
  { label: "Shopify", icon: SiShopify },
  { label: "WhatsApp", icon: SiWhatsapp },
  { label: "Email", icon: Mail },
  { label: "Databases", icon: Database },
  { label: "Documents", icon: FileText },
  { label: "Internal APIs", icon: Braces },
  { label: "MCP Tools", icon: Network },
  { label: "AI Agents", icon: BrainCircuit },
  { label: "Business Workflows", icon: GitBranch },
];

export default function CoreIdea() {
  return (
    <section id="core-idea" data-testid="aime-core-idea" className="relative py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SmokeBackground smokeColor="#7C3AED" opacity={0.14} />
                <Atmosphere intensity={0.25} />
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="aime-eyebrow">
              <span className="aime-glow-dot" />
              The Core Idea
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              Your Enterprise. One AI Brain.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              AI.me sits at the center of your organization and connects
              every system, tool and workflow you already run on.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
              The AI doesn&rsquo;t just answer questions. It retrieves
              context, reasons over your enterprise data, calls tools, and
              executes actions.
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.04}>
            {SYSTEMS.map(({ label, icon: Icon }) => (
              <RevealItem
                key={label}
                y={12}
                data-testid={`aime-system-chip-${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex flex-col items-start gap-3 rounded-2xl border aime-card px-4 py-4"
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl border"
                  style={{ borderColor: "var(--aime-border)" }}
                >
                  <Icon className="h-4 w-4 text-[var(--aime-accent)]" />
                </div>
                <span className="text-sm font-medium text-white/85">
                  {label}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
