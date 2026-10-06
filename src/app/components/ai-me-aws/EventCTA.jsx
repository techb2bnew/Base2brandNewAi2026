import Image from "next/image";
import dynamic from "next/dynamic";
import { CalendarDays } from "lucide-react";
import { StarsBackground } from "@/components/visual/StarsBackground";
import Reveal from "./Reveal";
import PauseWhenHidden from "./PauseWhenHidden";

// Code-split out of this page's main bundle — it's the heaviest interactive
// piece on the page (multi-step form + its own framer-motion transitions)
// and sits below the fold, so there's no reason to ship/parse it before
// someone actually scrolls down to it.
const OnboardingForm = dynamic(
  () => import("@/components/client-onboarding/OnboardingForm"),
  {
    loading: () => (
      <div className="h-[560px] w-full animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.02]" />
    ),
  }
);

export default function EventCTA() {
  return (
    <PauseWhenHidden
      as="section"
      id="book-a-meeting"
      data-testid="aime-event-cta"
      className="relative overflow-hidden py-6 sm:py-10"
    >
      {/* Same starfield backdrop used behind /ai-automation's "Start An AI
          Transformation" CTA. */}
      <StarsBackground
        data-testid="aime-event-cta-stars"
        className="absolute inset-0"
        starColor="#ffffff"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — pitch + event info + QR shortcut */}
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="aime-eyebrow">
                <span className="aime-glow-dot" />
                Meet Us At The Event
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                Building AI Inside Your Organization?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
                Let&rsquo;s talk about what AI.me could automate, connect, and
                execute for your business. Fill out the form and our team
                will reach out.
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-2xl border aime-card px-4 py-3 text-sm text-white/75 lg:mx-0"
            >
              <CalendarDays className="h-4 w-4 shrink-0 text-[var(--aime-accent)]" />
              Meet Aaryan at AI Everything Abu Dhabi &bull;{" "}
              <span className="aime-shimmer-text font-semibold">6&ndash;7 Oct 2026</span>
            </Reveal>

            <Reveal
              delay={0.2}
              className="mx-auto mt-8 flex w-fit items-center gap-5 rounded-2xl border aime-card p-5 text-left lg:mx-0"
            >
              <div className="shrink-0 overflow-hidden rounded-xl bg-white p-2">
                <Image
                  src="/images/ai-me-aws-qr.png"
                  alt="Scan to open the client onboarding form"
                  width={104}
                  height={104}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Scan to open on your phone
                </p>
                <p className="mt-1 text-xs text-white/45">
                  Prefer your own phone? Scan this instead of the form below.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — the onboarding form itself */}
          <Reveal delay={0.15}>
            <OnboardingForm />
          </Reveal>
        </div>
      </div>
    </PauseWhenHidden>
  );
}
