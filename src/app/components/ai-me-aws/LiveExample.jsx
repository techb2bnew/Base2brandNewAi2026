"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Search,
  BarChart3,
  BrainCircuit,
  Zap,
  ArrowRight,
  Bot,
  User,
  Check,
  RotateCcw,
} from "lucide-react";
import { m, useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const PIPELINE = [
  { label: "Retrieve", icon: Search },
  { label: "Analyze", icon: BarChart3 },
  { label: "Reason", icon: BrainCircuit },
  { label: "Take Action", icon: Zap },
];

const QUERY =
  "Show me all delayed orders from the last 7 days and identify the customers most at risk.";

const RESPONSE =
  "There are 17 delayed orders. 5 are high priority. I've prepared follow-up messages for the account managers.";
const RESPONSE_WORDS = RESPONSE.split(" ");

// Phases: "idle" -> "query" -> "pipeline" (n steps ticking) -> "response" -> "done"
const STEP_MS = 550;
const PIPELINE_START_DELAY = 350;
const RESPONSE_START_DELAY = 450;

export default function LiveExample() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: "-100px", amount: 0.4 });
  const reduce = useReducedMotion();

  const [phase, setPhase] = useState("idle");
  const [tickedCount, setTickedCount] = useState(0);
  const hasPlayedRef = useRef(false);
  const timeoutsRef = useRef([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const play = useCallback(() => {
    clearTimers();
    setTickedCount(0);

    if (reduce) {
      setPhase("done");
      setTickedCount(PIPELINE.length);
      return;
    }

    setPhase("query");
    timeoutsRef.current.push(
      setTimeout(() => setPhase("pipeline"), PIPELINE_START_DELAY)
    );

    PIPELINE.forEach((_, i) => {
      timeoutsRef.current.push(
        setTimeout(
          () => setTickedCount(i + 1),
          PIPELINE_START_DELAY + STEP_MS * (i + 1)
        )
      );
    });

    const pipelineDoneAt = PIPELINE_START_DELAY + STEP_MS * PIPELINE.length;
    timeoutsRef.current.push(
      setTimeout(
        () => setPhase("response"),
        pipelineDoneAt + RESPONSE_START_DELAY
      )
    );
    timeoutsRef.current.push(
      setTimeout(
        () => setPhase("done"),
        pipelineDoneAt + RESPONSE_START_DELAY + RESPONSE_WORDS.length * 60 + 200
      )
    );
  }, [reduce]);

  useEffect(() => {
    if (inView && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      play();
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const queryVisible = phase !== "idle";
  const pipelineVisible = phase === "pipeline" || phase === "response" || phase === "done";
  const responseVisible = phase === "response" || phase === "done";

  return (
    <section
      ref={sectionRef}
      data-testid="aime-live-example"
      className="relative py-6 sm:py-10"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal as="div" className="mb-6 text-center">
          <span className="aime-eyebrow">
            <span className="aime-glow-dot" />
            Example
          </span>
          <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Ask AI.me Anything About Your Business.
          </h2>
        </Reveal>

        <div className="rounded-[1.75rem] border aime-card aime-card-glass p-5 sm:p-8">
          {/* User query */}
          <m.div
            className="flex items-start justify-end gap-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={queryVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div
              className="max-w-md rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white sm:text-base"
              style={{ background: "rgba(var(--aime-accent-rgb),0.16)" }}
            >
              &ldquo;{QUERY}&rdquo;
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: "var(--aime-border)" }}>
              <User className="h-4 w-4 text-white/60" />
            </div>
          </m.div>

          {/* Pipeline */}
          <m.div
            className="my-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            initial={reduce ? false : { opacity: 0 }}
            animate={pipelineVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
          >
            {PIPELINE.map((stage, i) => {
              const ticked = tickedCount > i;
              return (
                <div key={stage.label} className="flex items-center gap-2 sm:gap-3">
                  <m.div
                    className="flex items-center gap-2 rounded-full border px-3 py-1.5 sm:px-4 sm:py-2"
                    style={{
                      background: ticked
                        ? "rgba(var(--aime-accent-rgb),0.14)"
                        : "rgba(255,255,255,0.03)",
                      borderColor: ticked
                        ? "rgba(var(--aime-accent-rgb),0.5)"
                        : "var(--aime-border)",
                    }}
                    animate={reduce ? {} : { scale: ticked ? [1, 1.06, 1] : 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    {ticked ? (
                      <Check className="h-3.5 w-3.5 text-[var(--aime-accent)] sm:h-4 sm:w-4" />
                    ) : (
                      <stage.icon className="h-3.5 w-3.5 text-[var(--aime-accent)] sm:h-4 sm:w-4" />
                    )}
                    <span className="text-xs font-medium text-white/75 sm:text-sm">
                      {stage.label}
                    </span>
                  </m.div>
                  {i < PIPELINE.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-white/25" />
                  )}
                </div>
              );
            })}
          </m.div>

          {/* AI.me response */}
          <m.div
            className="flex items-start gap-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={responseVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: "rgba(var(--aime-accent-rgb),0.4)" }}
            >
              <Bot className="h-4 w-4 text-[var(--aime-accent)]" />
            </div>
            <div className="max-w-md rounded-2xl rounded-tl-sm border aime-card px-4 py-3 text-sm text-white/85 sm:text-base">
              {reduce ? (
                RESPONSE
              ) : (
                <m.span
                  initial="hidden"
                  animate={responseVisible ? "visible" : "hidden"}
                  variants={{
                    visible: { transition: { staggerChildren: 0.06 } },
                  }}
                >
                  {RESPONSE_WORDS.map((word, i) => (
                    <m.span
                      key={i}
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 4 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {word}&nbsp;
                    </m.span>
                  ))}
                </m.span>
              )}
            </div>
          </m.div>

          {/* Replay */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={play}
              data-testid="aime-live-example-replay"
              className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium text-white/55 transition-colors hover:text-white"
              style={{ borderColor: "var(--aime-border)" }}
            >
              <RotateCcw className="h-3 w-3" />
              Replay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
