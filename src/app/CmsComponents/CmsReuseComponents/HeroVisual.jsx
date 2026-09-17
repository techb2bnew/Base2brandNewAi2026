import React from "react";
import {
  Database,
  Cloud,
  Smartphone,
  Layers,
  Cpu,
  GitBranch,
  Activity,
  Zap,
} from "lucide-react";

/**
 * Engineering visualization — connected service nodes, API map, microservice cluster.
 * Pure SVG/Tailwind so it stays performant and on-brand.
 */
const Node = ({ icon: Icon, label, x, y, accent }) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <div
      className={`relative inline-flex items-center gap-2 rounded-full border ${
        accent
          ? "border-[color:var(--b2b-primary)]/50 bg-[color:var(--b2b-primary)]/10 text-white"
          : "border-white/10 bg-white/[0.03] text-white/85"
      } px-3 py-1.5 text-[8px] md:text-[11.5px] font-medium`}
    >
      <Icon className={`w-3.5 h-3.5 ${accent ? "text-[color:var(--b2b-primary)]" : "text-white/70"}`} />
      {label}
    </div>
  </div>
);

const HeroVisual = () => {
  return (
    <div className="relative aspect-square w-full max-w-[300px] md:max-w-[520px] mx-auto">
      {/* Glow */}
      <div className="absolute inset-10 b2b-glow-red opacity-70" />

      {/* Outer ring */}
      <div className="absolute inset-2 rounded-full border border-white/[0.05]" />
      <div className="absolute inset-12 rounded-full border border-white/[0.07]" />
      <div className="absolute inset-24 rounded-full border border-[color:var(--b2b-primary)]/15" />

      {/* SVG connectors */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
            {/* SVG presentation attributes don't reliably resolve CSS
                variables — set via style, per the THEMING RULE. */}
            <stop offset="0%" style={{ stopColor: "rgba(var(--b2b-primary-rgb),0.6)" }} />
            <stop offset="100%" style={{ stopColor: "rgba(var(--b2b-primary-rgb),0)" }} />
          </linearGradient>
          <linearGradient id="lineW" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* connectors from center */}
        <g stroke="url(#line)" strokeWidth="1" fill="none">
          <path d="M200 200 L60 70" />
          <path d="M200 200 L340 80" />
          <path d="M200 200 L50 320" />
          <path d="M200 200 L350 330" />
          <path d="M200 200 L200 30" />
          <path d="M200 200 L200 370" />
        </g>
        <g stroke="url(#lineW)" strokeWidth="0.8" fill="none" strokeDasharray="2 4">
          <path d="M60 70 L340 80" />
          <path d="M50 320 L350 330" />
          <path d="M60 70 L50 320" />
          <path d="M340 80 L350 330" />
        </g>
      </svg>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 flex justify-center items-center">
        <div
          className="relative w-18 md:w-24 h-18 md:h-24 rounded-2xl grid place-items-center"
          style={{
            background: "linear-gradient(135deg, var(--b2b-primary-light), var(--b2b-primary))",
            boxShadow: "0 30px 60px -20px rgba(var(--b2b-primary-rgb),0.5)",
          }}
        >
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30" />
          <Layers className="w-9 h-9 text-white" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-5 whitespace-nowrap text-center pointer-events-none">
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/55">Engineering</div>
          <div className="text-[12px] font-medium text-white/90 mt-0.5">Core Platform</div>
        </div>
      </div>

      {/* Surrounding nodes */}
      <Node icon={Cloud} label="Cloud Infra" x={15} y={18} accent />
      <Node icon={Database} label="Data Layer" x={84} y={20} />
      <Node icon={Smartphone} label="Android" x={12} y={80} />
      <Node icon={Cpu} label="Microservices" x={87} y={82} accent />
      <Node icon={GitBranch} label="CI / CD" x={50} y={8} />
      <Node icon={Activity} label="Observability" x={50} y={92} />
      <Node icon={Zap} label="API Gateway" x={94} y={50} />
      <Node icon={Layers} label="Web App" x={6} y={50} />
    </div>
  );
};

export default HeroVisual;
