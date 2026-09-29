"use client";

import {
  Building2,
  Users,
  Mail,
  Database,
  FileText,
  Braces,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import { SiShopify, SiWhatsapp } from "react-icons/si";
import NeuronOrbit from "./NeuronOrbit";

const ORBIT_NODES = [
  { label: "ERP", icon: Building2 },
  { label: "CRM", icon: Users },
  { label: "Shopify", icon: SiShopify },
  { label: "WhatsApp", icon: SiWhatsapp },
  { label: "Email", icon: Mail },
  { label: "Databases", icon: Database },
  { label: "Documents", icon: FileText },
  { label: "Internal APIs", icon: Braces },
];

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="aime-hero"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      <div className="aime-grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(var(--aime-accent-rgb),0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <span className="aime-eyebrow">
              <span className="aime-glow-dot" />
              AI.me
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              The AI Operating Layer
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--aime-accent), var(--aime-accent-2))",
                }}
              >
                for Your Enterprise.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0">
              Connect your company&rsquo;s data, systems, apps, and AI agents
              through one intelligent workspace.
            </p>

            <div className="mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border aime-card px-4 py-2 text-xs text-white/70 sm:text-sm lg:mx-0">
              <CalendarDays className="h-4 w-4 text-[var(--aime-accent)]" />
              Meet us at AI Everything Abu Dhabi &bull; 6&ndash;7 Oct 2026
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#book-a-meeting"
                data-testid="aime-hero-primary-cta"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
                style={{ background: "var(--aime-accent)" }}
              >
                Book a Meeting
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#core-idea"
                data-testid="aime-hero-secondary-cta"
                className="inline-flex items-center justify-center gap-2 rounded-full border aime-card px-7 py-3.5 text-sm font-medium text-white transition-all hover:border-white/25"
              >
                Explore AI.me
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right — neuron visual */}
          <div className="flex justify-center">
            <NeuronOrbit
              size={420}
              rings={[{ radius: 168, duration: 34, nodes: ORBIT_NODES }]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
