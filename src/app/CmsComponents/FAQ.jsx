"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function FAQ({
  eyebrow,
  title,
  faqData
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-10 px-5 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-white font-semibold tracking-tight leading-[1.1] text-[clamp(2rem,5vw,3.5rem)] mb-8">
          {eyebrow}
          <br />
          {title}
        </h2>

        <div className="border-t border-white/25">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="border-b border-white/15">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-4 text-left group"
                >
                  <span className="text-white font-semibold text-[15px] sm:text-[17px] leading-snug pr-2">
                    {item.question}
                  </span>
                  <Plus
                    aria-hidden
                    className={`mt-0.5 size-5 sm:size-[22px] shrink-0 text-(--b2b-primary) transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    strokeWidth={2.25}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-white/65 text-[14px] sm:text-[15px] leading-relaxed max-w-[52rem]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
