import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

export default function EventCTA() {
  return (
    <section
      id="book-a-meeting"
      data-testid="aime-event-cta"
      className="relative py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(var(--aime-accent-2-rgb),0.16) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <span className="aime-eyebrow">
          <span className="aime-glow-dot" />
          Meet Us At The Event
        </span>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
          Building AI inside your organization?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
          Let&rsquo;s talk about what AI.me could automate, connect, and
          execute for your business.
        </p>

        <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-2xl border aime-card px-4 py-3 text-sm text-white/75">
          <CalendarDays className="h-4 w-4 shrink-0 text-[var(--aime-accent)]" />
          Meet Aaryan at AI Everything Abu Dhabi &bull; 6&ndash;7 Oct 2026
        </div>

        <Link
          href="/client-onboarding"
          data-testid="aime-onboarding-cta"
          className="group mx-auto mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
          style={{ background: "var(--aime-accent)" }}
        >
          Start Your Onboarding
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="mx-auto mt-8 flex w-fit items-center gap-5 rounded-2xl border aime-card p-5 text-left">
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
              Takes you straight to the onboarding form.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
