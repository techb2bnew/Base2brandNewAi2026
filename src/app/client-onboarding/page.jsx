import OnboardingForm from "@/components/client-onboarding/OnboardingForm";

export const metadata = {
  title: "Client Onboarding | Base2Brand",
  description:
    "Tell us about your business, goals and project requirements so our team can get started.",
  robots: { index: false, follow: false },
};

export default function ClientOnboardingPage() {
  return (
    <main
      data-testid="client-onboarding-page"
      className="relative overflow-hidden py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--b2b-primary)_20%,transparent)] blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-white/55">
            Client Onboarding
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Let&apos;s get started.
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/55 sm:text-base">
            Tell us about your business and what you need help with — it
            takes about five minutes.
          </p>
        </div>

        <OnboardingForm />
      </div>
    </main>
  );
}
