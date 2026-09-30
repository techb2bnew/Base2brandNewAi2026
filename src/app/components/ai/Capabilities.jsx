"use client";
import Reveal from "@/components/site/Reveal";
import ShiningText from "@/components/site/ShiningText";
import {
  Network,
  Workflow,
  AudioLines,
  ServerCog,
  Bot,
  Microscope,
  ArrowUpRight,
  Shield,
  Target,
  Building2,
  Users,
  Mail,
  Database,
  FileText,
  Braces,
  BrainCircuit,
  GitBranch,
} from "lucide-react";  

const icons = {
  Network,
  Workflow,
  AudioLines,
  ServerCog,
  Bot,
  Microscope,
  Shield,
  Target,
  Building2,
  Users,
  Mail,
  Database,
  FileText,
  Braces,
  BrainCircuit,
  GitBranch,
};

const resolveIcon = (icon) => {
  if (!icon) return Target;
  if (typeof icon === "function" || typeof icon === "object") return icon;
  return icons[icon] || Target;
};

const CapCard = ({cap, idx }) => {
  const Icon = resolveIcon(cap.icon);
  const primaryStroke = "rgba(var(--b2b-primary-rgb),0.4)";
  const secondaryStroke = "rgba(var(--b2b-primary-2-rgb),0.25)";
  return (
    <Reveal delay={idx * 0.04} className={` group relative`}>
      <div
        data-testid={`capability-card-${idx}`}
        className="relative h-full b2b-card p-5 overflow-hidden transition-all duration-500 hover:border-[rgba(var(--b2b-primary-rgb),0.4)]"
      >
        {/* Hover glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[rgba(var(--b2b-primary-rgb),0)] group-hover:bg-[rgba(var(--b2b-primary-rgb),0.15)] blur-[80px] transition-all duration-700" />

        {/* Mini orbital deco */}
        {cap.accent && (
          <svg
            className="absolute top-4 right-4 w-24 h-24 opacity-40"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke={primaryStroke}
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke={secondaryStroke}
              strokeWidth="0.5"
              strokeDasharray="1 4"
            />
            <circle cx="50" cy="50" r="3" fill="var(--b2b-primary-2)" />
          </svg>
        )}

        <div className="relative flex items-start justify-between">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(var(--b2b-primary-rgb,139,92,246),0.12)] border border-[rgba(var(--b2b-primary-rgb,139,92,246),0.25)] text-[var(--b2b-primary-2,#c084fc)]">
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/30">
            {String(idx + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-4 md:mt-6 font-display text-lg sm:text-xl md:text-2xl font-medium tracking-tight">
          {cap.title}
        </h3>

        {cap.tagline && (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[var(--b2b-primary-2,#c084fc)]">
            {cap.tagline}
          </p>
        )}

        {cap.desc && (
          <p className="mt-2 md:mt-3 text-sm text-white/55 leading-relaxed">
            {cap.desc}
          </p>
        )}

        <ul className="mt-4 md:mt-6 space-y-1.5 md:space-y-2.5">
          {cap.items?.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-white/65"
            >
              <span className="w-3 h-px bg-[rgba(var(--b2b-primary-rgb,139,92,246),0.6)]" />
              {item}
            </li>
          ))}
        </ul>

        {cap.cta !== false && (
          <a
            href={cap.ctaHref || "#contact"}
            data-testid={`capability-link-${idx}`}
            className="mt-4 md:mt-8 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-mono text-[rgba(var(--b2b-primary-2-rgb,192,132,252),0.9)] hover:text-white transition-colors"
          >
            {cap.cta || "Discuss this practice"} <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </Reveal>
  );
};

const Capabilities = ({
  id = "capabilities",
  title,
  description,
  highlightTag,
  capsData,
}) => {

  return (
    <section
      id={id}
      data-testid="capabilities-section"
      className="relative pt-4 pb-12 md:pt-16 md:pb-16"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-14">
          <Reveal>
            <ShiningText testId="capabilities-eyebrow">
              {highlightTag}
            </ShiningText>
            <h2
              className="mt-3 md:mt-6 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-[-0.035em] font-medium max-w-2xl text-balance"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-white/50 leading-relaxed text-sm md:text-lg" >
              {description}
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {capsData.map((cap, idx) => (
            <CapCard key={cap.title} cap={cap} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
