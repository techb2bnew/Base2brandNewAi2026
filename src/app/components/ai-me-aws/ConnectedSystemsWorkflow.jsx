"use client";

import { useState, useEffect, useRef } from "react";
import {
  Building2,
  Users,
  BrainCircuit,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Bell,
  Zap,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Reveal from "./Reveal";

const STEPS = [
  {
    id: "whatsapp-inbound",
    step: "01",
    label: "WhatsApp Query",
    system: "WhatsApp Business",
    icon: SiWhatsapp,
    accent: "#25D366",
    title: "Customer Inquires About Late Order",
    desc: "Customer asks about delayed order #AE-9821 on WhatsApp.",
    log: "INBOUND_WEBHOOK: WhatsApp message received from +971-50-xxx-9821",
  },
  {
    id: "erp-check",
    step: "02",
    label: "ERP Status Check",
    system: "SAP / Oracle ERP",
    icon: Building2,
    accent: "#38BDF8",
    title: "AI.me Checks Live ERP Telemetry",
    desc: "Identifies customs hold delay at Abu Dhabi Hub in real time.",
    log: "ERP_QUERY: GET /shipments/AE-9821 -> DELAYED (Hold cleared, ETA: Tomorrow 11:30 AM)",
  },
  {
    id: "crm-context",
    step: "03",
    label: "CRM Context",
    system: "Salesforce / HubSpot",
    icon: Users,
    accent: "#818CF8",
    title: "Pulls Account History from CRM",
    desc: "Identifies VIP Enterprise client ($140k ARR), AM: Sarah K.",
    log: "CRM_ENRICH: GET /accounts/cust_9821 -> Tier: VIP Enterprise | AM: Sarah K.",
  },
  {
    id: "whatsapp-reply",
    step: "04",
    label: "Automated Reply",
    system: "AI.me Generator",
    icon: BrainCircuit,
    accent: "#A855F7",
    title: "Dispatches Empathetic WhatsApp Reply",
    desc: "Replies with revised ETA (Tomorrow 11:30 AM) & courtesy credit.",
    log: "OUTBOUND_DISPATCH: WhatsApp reply sent with revised ETA & courtesy credit",
  },
  {
    id: "am-alert",
    step: "05",
    label: "Team Alert",
    system: "Slack & Internal CRM",
    icon: Bell,
    accent: "#EC4899",
    title: "Alerts Account Manager Automatically",
    desc: "Sends full context summary to Sarah K. with zero manual effort.",
    log: "INTERNAL_PING: Alert sent to Sarah K. (AM) & logged to CRM ticket #TCK-4921",
  },
];

export default function ConnectedSystemsWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);

  // Without this, the 3s auto-advance timer keeps firing for as long as the
  // page stays open, even long after the user has scrolled past this
  // section — pure wasted work on mobile.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying || !isVisible) return;

    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isVisible]);

  const handleStepClick = (index) => {
    setIsPlaying(false);
    setActiveStep(index);
  };

  const handleRestart = () => {
    setActiveStep(0);
    setIsPlaying(true);
  };

  const current = STEPS[activeStep];
  const StepIcon = current.icon;

  return (
    <section
      ref={sectionRef}
      id="connected-systems-example"
      data-testid="connected-systems-workflow"
      className="relative overflow-hidden py-8 sm:py-10 md:py-12 border-t border-white/10 bg-linear-to-b from-transparent via-purple-950/20 to-transparent"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="aime-eyebrow mb-2">
            <span className="aime-glow-dot" />
            Cross-System Orchestration
          </span>
          <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-white">
            When Your Systems Talk To Each Other,{" "}
            <span className="bg-linear-to-r from-purple-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
              No One Has To Lift A Finger.
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/60 leading-relaxed">
            AI.me synchronizes WhatsApp, ERP, CRM, and team alerts into one autonomous execution.
          </p>
        </Reveal>

        {/* 5 Connected Nodes Visual Timeline (Compact) */}
        <div className="mt-4 sm:mt-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;

              return (
                <button
                  key={s.id}
                  onClick={() => handleStepClick(idx)}
                  className={`group relative text-left rounded-xl border p-2 sm:p-2.5 transition-all duration-300 ${
                    isActive
                      ? "bg-purple-950/50 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                      : isPast
                        ? "bg-white/[0.03] border-white/15 hover:border-white/25"
                        : "bg-white/[0.015] border-white/8 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg border text-xs"
                      style={{
                        borderColor: isActive ? s.accent : "rgba(255,255,255,0.1)",
                        backgroundColor: isActive
                          ? `${s.accent}20`
                          : "rgba(255,255,255,0.04)",
                        color: s.accent,
                      }}
                    >
                      <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-white/40">
                      Step {s.step}
                    </span>
                  </div>

                  <div className="mt-1.5">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-white/40 truncate">
                      {s.system}
                    </span>
                    <h4
                      className={`text-xs sm:text-sm font-medium leading-tight truncate ${
                        isActive ? "text-white font-semibold" : "text-white/70"
                      }`}
                    >
                      {s.label}
                    </h4>
                  </div>

                  <div
                    className={`mt-1.5 h-0.5 w-full rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-linear-to-r from-purple-500 to-indigo-400"
                        : isPast
                          ? "bg-purple-500/30"
                          : "bg-white/5"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual-Pane Live Execution Simulation (Compressed & Tight) */}
        <div className="mt-4 sm:mt-5 grid gap-3.5 sm:gap-4 lg:grid-cols-12 items-stretch">
          {/* Left: Customer WhatsApp Experience */}
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#0c0d14]/90 p-3.5 sm:p-4 md:p-4.5 relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[70px] pointer-events-none" />

            <div>
              {/* WhatsApp Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                    <SiWhatsapp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-semibold text-white">Brand Enterprise Hub</span>
                      <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AI.me Live Automated
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/40">10:14 AM</span>
              </div>

              {/* Message Thread */}
              <div className="mt-2.5 sm:mt-3 space-y-2 sm:space-y-2.5">
                {/* Inbound Customer */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-xl rounded-tr-xs bg-purple-900/30 border border-purple-500/30 px-3 py-2 text-xs text-white/90">
                    <p className="leading-relaxed">
                      &ldquo;Hi, where is my order <span className="font-mono font-semibold text-purple-300">#AE-9821</span>? It was supposed to arrive today.&rdquo;
                    </p>
                    <span className="mt-0.5 block text-right font-mono text-[9px] text-white/40">10:14 AM</span>
                  </div>
                </div>

                {/* AI.me Automated Resolution */}
                <div className="flex justify-start">
                  <div className="max-w-[92%] rounded-xl rounded-tl-xs bg-[#171822] border border-white/10 p-3 text-xs text-white/90 shadow-md">
                    <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-mono text-purple-400">
                      <BrainCircuit className="h-3 w-3" />
                      <span>AI.me Autonomous Resolution</span>
                      <span className="text-white/30">•</span>
                      <span className="text-emerald-400">1.8s response</span>
                    </div>
                    <p className="leading-relaxed text-white/85">
                      Order <span className="font-mono font-semibold text-white">#AE-9821</span> cleared customs hold at Abu Dhabi hub. Loaded onto delivery vehicle #4 and arriving <strong className="text-emerald-300">tomorrow by 11:30 AM</strong>.
                    </p>
                    <div className="mt-2 rounded-lg bg-purple-950/40 border border-purple-500/30 px-2 py-1.5 text-[11px] text-purple-200">
                      ✨ <span className="font-semibold">VIP Account:</span> 10% courtesy credit applied to next invoice. Account manager Sarah K. alerted.
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-white/40">
                      <span>ERP & CRM Verified</span>
                      <span className="text-emerald-400 font-semibold">Delivered ✓✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Zero human intervention required
              </span>
              <span className="text-[10px] font-mono text-white/40">WhatsApp Business API</span>
            </div>
          </div>

          {/* Right: Internal System Trace & AM Alert */}
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#08090f]/95 p-3.5 sm:p-4 md:p-4.5 relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 blur-[70px] pointer-events-none" />

            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-1.5 font-mono text-[11px] text-white/60">
                    ai.me-orchestrator :: live-trace
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                  <span className="text-[10px] font-mono text-purple-400">LIVE MESH</span>
                </div>
              </div>

              {/* Step Detail Highlight */}
              <div className="mt-2.5 rounded-lg border border-purple-500/30 bg-purple-950/20 p-2.5">
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  <StepIcon className="h-3.5 w-3.5" />
                  <span>Step {current.step}: {current.title}</span>
                </div>
                <p className="mt-0.5 text-xs text-white/80 leading-snug">
                  {current.desc}
                </p>
                <div className="mt-1.5 rounded bg-black/50 px-2 py-1 font-mono text-[10px] text-purple-300/90 truncate">
                  <code>{current.log}</code>
                </div>
              </div>

              {/* Account Manager Alert */}
              <div className="mt-2.5 rounded-lg border border-violet-500/30 bg-violet-950/20 p-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-300">
                    <Bell className="h-3.5 w-3.5" />
                    <span>Account Manager Auto-Dispatch</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    Auto-Dispatched
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/75 leading-snug">
                  <strong className="text-white">To Sarah K. (VIP Lead):</strong> Client Ahmed Al-Mansoor query on #AE-9821 resolved via WhatsApp with updated ETA & courtesy credit. Logged in CRM.
                </p>
                <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>Target: Sarah K. (Slack & CRM)</span>
                  <span className="text-violet-300 font-semibold">Zero action required</span>
                </div>
              </div>
            </div>

            {/* Bottom Trace Stats & Flow Control */}
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-[11px] font-mono text-white/60">
                <span className="flex items-center gap-1 text-purple-300">
                  <Zap className="h-3 w-3" /> 1.8s Response
                </span>
                <span>•</span>
                <span>4 Systems Synced</span>
              </div>

              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                {isPlaying ? "Pause" : "Auto-Play"}
              </button>
            </div>
          </div>
        </div>

        {/* Compact Integrated Impact Strip */}
        <div className="mt-3.5 sm:mt-4 rounded-xl border border-white/10 bg-linear-to-r from-purple-950/40 via-violet-900/20 to-purple-950/40 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
            <span>&ldquo;A customer asks on WhatsApp about a late order. AI.me checks ERP, pulls CRM history, replies with new ETA & alerts the account manager. <strong className="text-purple-300">No one had to lift a finger.</strong>&rdquo;</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 font-mono text-[11px] text-white/60 shrink-0 mx-auto sm:mx-0">
            <div>
              <span className="text-xs sm:text-sm font-bold text-emerald-400">1.8s</span> Resolution
            </div>
            <div className="h-3 w-px bg-white/15" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-purple-300">4</span> Systems Synced
            </div>
            <div className="h-3 w-px bg-white/15" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-white">0 min</span> Wait Time
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
