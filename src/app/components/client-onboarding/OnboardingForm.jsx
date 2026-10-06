"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { ONBOARDING_STEPS } from "./formConfig";
import FormField from "./FormField";
import StepProgress from "./StepProgress";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DATA_STEPS = ONBOARDING_STEPS.filter((step) => step.fields.length > 0);
const CONFIRMATION_STEP = ONBOARDING_STEPS.find(
  (step) => step.id === "confirmation",
);

function validateStep(step, formData) {
  const errors = {};

  for (const field of step.fields) {
    const value = formData[field.name];
    const isEmpty =
      field.type === "checkboxGroup"
        ? !Array.isArray(value) || value.length === 0
        : field.type === "file"
          ? !value
          : !String(value ?? "").trim();

    if (field.required && isEmpty) {
      errors[field.name] = "This field is required.";
      continue;
    }

    if (field.type === "email" && value && !EMAIL_RE.test(value)) {
      errors[field.name] = "Enter a valid email address.";
    }
  }

  return errors;
}

function SummaryValue({ field, value }) {
  if (field.type === "checkboxGroup") {
    return Array.isArray(value) && value.length ? value.join(", ") : "—";
  }
  if (field.type === "file") {
    return value?.name || "—";
  }
  return value ? String(value) : "—";
}

export default function OnboardingForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [submitMessage, setSubmitMessage] = useState("");

  const totalSteps = DATA_STEPS.length + 1; // + confirmation
  const currentStep =
    stepIndex < DATA_STEPS.length ? DATA_STEPS[stepIndex] : CONFIRMATION_STEP;
  const isConfirmation = stepIndex === DATA_STEPS.length;

  const progressSteps = useMemo(
    () => [...DATA_STEPS, CONFIRMATION_STEP],
    [],
  );

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const goNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const handleSubmit = async () => {
    if (status === "submitting") return;

    setStatus("submitting");
    setSubmitMessage("");

    try {
      const payload = new FormData();

      for (const step of DATA_STEPS) {
        for (const field of step.fields) {
          const value = formData[field.name];
          if (field.type === "file") {
            if (value) payload.append(field.name, value);
          } else if (field.type === "checkboxGroup") {
            payload.append(field.name, JSON.stringify(value || []));
          } else if (value) {
            payload.append(field.name, value);
          }
        }
      }

      const response = await fetch("/api/client-onboarding", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Submission failed.");
      }

      setStatus("success");
    } catch (error) {
      console.error("Onboarding submission error:", error);
      setStatus("error");
      setSubmitMessage(
        "Something went wrong while submitting the form. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        data-testid="onboarding-success"
        className="flex flex-col items-center gap-4 rounded-[2rem] border border-white/10 bg-[#05070D]/95 px-6 py-16 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-[var(--b2b-primary)]" />
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          You&apos;re all set.
        </h2>
        <p className="max-w-md text-sm text-white/55">
          Thanks for sharing your details. Our team has received your
          onboarding brief and will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <div
      data-testid="onboarding-form"
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070D]/95 p-5 shadow-2xl sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--b2b-primary)_18%,transparent),transparent_36%)]" />

      <div className="relative mb-8">
        <StepProgress steps={progressSteps} currentIndex={stepIndex} />
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={currentStep.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {currentStep.heading}
            </h2>
            <p className="mt-1.5 text-sm text-white/50">
              {currentStep.subtitle}
            </p>

            {!isConfirmation && (
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {currentStep.fields.map((field) => (
                  <div
                    key={field.name}
                    className={
                      field.type === "textarea" ||
                      field.type === "checkboxGroup"
                        ? "sm:col-span-2"
                        : ""
                    }
                  >
                    <FormField
                      field={field}
                      value={formData[field.name]}
                      onChange={handleChange}
                      error={errors[field.name]}
                    />
                  </div>
                ))}
              </div>
            )}

            {isConfirmation && (
              <div className="mt-8 space-y-6">
                {DATA_STEPS.map((step) => (
                  <div
                    key={step.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--b2b-primary)]">
                      {step.title}
                    </p>
                    <dl className="grid gap-3 sm:grid-cols-2">
                      {step.fields.map((field) => (
                        <div key={field.name}>
                          <dt className="text-xs text-white/40">
                            {field.label}
                          </dt>
                          <dd className="mt-0.5 text-sm text-white/85">
                            <SummaryValue
                              field={field}
                              value={formData[field.name]}
                            />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      {submitMessage && (
        <div
          role="alert"
          className="relative mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
        >
          {submitMessage}
        </div>
      )}

      <div className="relative mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0 || status === "submitting"}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {isConfirmation ? (
          <m.button
            type="button"
            whileHover={status === "submitting" ? undefined : { y: -2 }}
            whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
            onClick={handleSubmit}
            disabled={status === "submitting"}
            data-testid="onboarding-submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--b2b-primary)] px-6 py-3 text-sm font-bold text-black transition-all hover:shadow-[0_0_40px_color-mix(in_srgb,var(--b2b-primary)_45%,transparent)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </m.button>
        ) : (
          <m.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={goNext}
            data-testid="onboarding-continue"
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--b2b-primary)] px-6 py-3 text-sm font-bold text-black transition-all hover:shadow-[0_0_40px_color-mix(in_srgb,var(--b2b-primary)_45%,transparent)]"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </m.button>
        )}
      </div>
    </div>
  );
}
