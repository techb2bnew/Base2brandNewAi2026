"use client";

import React, { useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

const DEFAULT_CASES = [
  {
    id: "case-01",
    slug: "enterprise-operations-dashboard",
    n: "CASE 01",
    tag: "Enterprise SaaS · Operations Dashboard",
    title: "A centralized operations dashboard for real-time business intelligence.",
    url: "operations-dashboard.demo",
    ctaText: "View case study",
    ctaLink: "/case-study/enterprise-operations-dashboard",
    metric1Value: "61%",
    metric1Label: "faster reporting",
    metric2Value: "+240%",
    metric2Label: "operational efficiency",
    screenshots: [
      "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540684/gwoth_card1.1.png",
      "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540684/gwoth_card1.2.png",
      "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540684/gwoth_card1.3.png",
      "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540684/gwoth_card1.4.png",
    ],
  },
  {
    id: "case-02",
    slug: "modern-ecommerce-website",
    n: "CASE 02",
    tag: "Website Design · E-commerce",
    title: "A conversion-focused eCommerce experience designed for modern shoppers.",
    url: "ecommerce.demo",
    ctaText: "View case study",
    ctaLink: "/case-study/modern-ecommerce-website",
    metric1Value: "+138%",
    metric1Label: "conversion growth",
    metric2Value: "-42%",
    metric2Label: "bounce rate",
    screenshots: [
      "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540686/gwoth_card2.1.png",
      "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540686/gwoth_card2.2.png",
      "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540686/gwoth_card2.3.png",
      "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540686/gwoth_card2.4.png",
    ],
  },
];

function getMetrics(project) {
  if (Array.isArray(project.metrics) && project.metrics.length > 0) {
    return project.metrics.map((m) => ({ v: m.v ?? m.value ?? "", l: m.l ?? m.label ?? "" }));
  }
  const res = [];
  if (project.metric1Value || project.metric1Label) {
    res.push({ v: project.metric1Value || "", l: project.metric1Label || "" });
  }
  if (project.metric2Value || project.metric2Label) {
    res.push({ v: project.metric2Value || "", l: project.metric2Label || "" });
  }
  return res;
}

function getScreenshots(project) {
  if (Array.isArray(project.screenshots) && project.screenshots.length > 0) {
    return project.screenshots;
  }
  if (Array.isArray(project.preview?.screenshots) && project.preview.screenshots.length > 0) {
    return project.preview.screenshots;
  }
  if (project.preview?.screenshot) {
    return [project.preview.screenshot];
  }
  if (Array.isArray(project.images) && project.images.length > 0) {
    return project.images;
  }
  return [];
}

function ProjectCase({ project, index, imageBorderColor, wide_container }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glow = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const metrics = getMetrics(project);

  return (
    <div
      ref={ref}
      className="relative flex items-center px-4 md:px-12 py-6 md:py-10"
    >
      <div
        className={`md:max-w-[1180px] mx-auto w-full grid ${wide_container
          ? index % 2 === 1
            ? "lg:grid-cols-[4fr_2fr]"
            : "lg:grid-cols-[2fr_4fr]"
          : index % 2 === 1
            ? "lg:grid-cols-[3fr_2fr]"
            : "lg:grid-cols-[2fr_3fr]"
          } gap-4 md:gap-8 items-center`}
      >
        {/* Copy side */}
        <div className={index % 2 === 1 ? "md:order-2" : ""}>
          <div className="flex items-center gap-3 mb-3 md:mb-6">
            <span
              className="font-mono text-[11px] tracking-[0.22em]"
              style={{ color: "var(--b2b-primary, #fa5e2d)" }}
            >
              {project.n || `CASE 0${index + 1}`}
            </span>
            <span
              className="h-px w-8"
              style={{ backgroundColor: "rgba(var(--b2b-primary-rgb, 250, 94, 45), 0.5)" }}
            />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/50">
              {project.tag}
            </span>
          </div>

          <h3 className="font-display text-white text-[22px] md:text-[28px] xl:text-[32px] 2xl:text-[38px] leading-[1.05] tracking-[-0.03em] max-w-[520px]">
            {project.title}
          </h3>

          {metrics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4 md:gap-8">
              {metrics.map((m, idx) => (
                <div key={m.l || idx} className="flex flex-col gap-1">
                  <div
                    className="font-display text-2xl md:text-4xl tracking-[-0.03em]"
                    style={{ color: "var(--b2b-primary, #fa5e2d)" }}
                  >
                    {m.v}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/50">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          )}

          {(project.ctaText || project.slug || project.id) && (
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={project.ctaLink || `/case-study/${project.slug || project.id}`}
                className="inline-flex items-center gap-2 rounded-full font-semibold text-sm px-5 py-2.5 hover:brightness-110 transition group text-white shadow-lg"
                style={{ backgroundColor: "var(--b2b-primary, #fa5e2d)" }}
              >
                {project.ctaText || "View case study"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Browser side */}
        <m.div
          className={`relative min-w-0 ${index % 2 === 1 ? "md:order-1" : ""}`}
        >
          <m.div
            aria-hidden
            style={{ opacity: glow }}
            className="absolute -inset-6 rounded-[28px] pointer-events-none"
          >
            <div
              className="absolute inset-0 rounded-[28px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(var(--b2b-primary-rgb, 244, 123, 82), 0.35), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </m.div>

          <BrowserWindow project={project} imageBorderColor={imageBorderColor} />
        </m.div>
      </div>
    </div>
  );
}

function BrowserWindow({ project, imageBorderColor }) {
  const images = getScreenshots(project);
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;

  const goPrev = (event) => {
    event.stopPropagation();
    swiperRef.current?.slidePrev();
  };

  const goNext = (event) => {
    event.stopPropagation();
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/12 bg-gradient-to-br from-[#0E1018] to-[#080910] shadow-[0_40px_120px_-40px_rgba(var(--b2b-primary-rgb,0,0,0),0.35)]">
      <div className="flex items-center gap-3 border-b border-white/8 bg-[rgba(255,255,255,0.02)] px-4 py-3">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A45]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A45]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A45]" />
        </div>

        <div className="mx-4 min-w-0 flex-1">
          <div className="mx-auto flex h-6 max-w-[280px] min-w-0 items-center justify-center gap-2 rounded-full bg-white/5 px-3">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="shrink-0"
            >
              <rect
                x="2"
                y="4.5"
                width="6"
                height="4"
                rx="1"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.8"
              />
              <path
                d="M3.5 4.5V3.2a1.5 1.5 0 013 0v1.3"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.8"
              />
            </svg>

            <span className="min-w-0 truncate font-mono text-[10px] text-white/50">
              {project.url || project.slug || "live-preview"}
            </span>
          </div>
        </div>

        <span
          className="shrink-0 font-mono text-[10px]"
          style={{ color: "var(--b2b-primary, #fa5e2d)" }}
        >
          ● live
        </span>
      </div>

      {/* Screenshot carousel */}
      <div className="relative">
        {images.length > 0 ? (
          <div className="relative overflow-hidden rounded-b-3xl bg-[#0c101a]">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActive(swiper.realIndex)}
              loop={hasMultiple}
              speed={500}
              slidesPerView={1}
              autoHeight
              className="w-full"
            >
              {images.map((src, i) => (
                <SwiperSlide key={src + i}>
                  <img
                    src={src}
                    alt={`${project.title || "Case preview"} ${i + 1}`}
                    className="block w-full aspect-[16/10] object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {hasMultiple && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={goPrev}
                  className="absolute z-10 cursor-pointer left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  aria-label="Next image"
                  onClick={goNext}
                  className="absolute z-10 cursor-pointer right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 z-10">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-white" : "w-1.5 bg-white/40"
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="aspect-[16/10] rounded-b-xl bg-[#0c101a] border border-dashed border-white/20 border-t-0 flex items-center justify-center text-center px-6">
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/45">
              Add screenshot URLs in the editor
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WorkCarousel({
  eyebrow = "Proof",
  title = "Selected anonymised cases.",
  titleLower = "Outcomes, not optics.",
  cardsData = DEFAULT_CASES,
  imageBorderColor,
}) {
  const caseList = Array.isArray(cardsData) && cardsData.length > 0 ? cardsData : DEFAULT_CASES;

  return (
    <section id="work" className="relative py-12 md:py-16">
      <div className="px-6 pb-4 pt-6 md:px-12">
        <div className="mx-auto max-w-[1180px]">
          {eyebrow && (
            <div
              className="font-mono text-xs uppercase tracking-[0.25em] mb-4"
              style={{ color: "var(--b2b-primary, #fa5e2d)" }}
            >
              {eyebrow}
            </div>
          )}

          <h2 className="max-w-[820px] font-display text-[24px] lg:text-[32px] xl:text-[38px] 2xl:text-[44px] leading-[1.02] tracking-[-0.035em] text-white">
            {title}
            {titleLower && (
              <>
                <br />
                <span className="text-white/50">{titleLower}</span>
              </>
            )}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {caseList.map((p, i) => (
          <ProjectCase
            key={p.id || p.slug || i}
            project={p}
            index={i}
            imageBorderColor={imageBorderColor}
          />
        ))}
      </div>
    </section>
  );
}

export { WorkCarousel };
