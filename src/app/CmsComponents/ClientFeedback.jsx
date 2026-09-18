"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Scrollbar } from "swiper/modules";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import "swiper/css";
import "swiper/css/scrollbar";

function loopDistance(index, activeIndex, total) {
  const diff = Math.abs(index - activeIndex);
  return Math.min(diff, total - diff);
}

// Swiper's `loop: true` (combined with `centeredSlides` + variable-width
// slides) needs a decent number of slides to build its loop correctly —
// too few and both initial centering and next/prev break. Padding the
// *rendered* list (never the actual `testimonials` content) keeps the
// editable data clean while still giving Swiper enough slides whenever a
// page only has a handful of testimonials.
const MIN_LOOP_SLIDES = 8;

function FeedbackCard({ card, index, isActive, distance, isInView, onSelect }) {
  const videoRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldLoadVideo = distance <= 2;
  const shouldPlay = isActive && isInView;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (shouldPlay) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  }, [shouldPlay]);

  useEffect(() => {
    if (!isActive) setHovering(false);
  }, [isActive]);

  const handleSelect = () => onSelect(index);

  const handleManualPlay = (event) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`Show testimonial from ${card.name}`}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleSelect();
        }
      }}
      onMouseEnter={() => !isActive && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`client-feedback-card group relative h-full w-full cursor-pointer overflow-hidden rounded-[22px] bg-[#0b0b12] outline-none transition-[transform,box-shadow,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isActive
          ? "client-feedback-card--active scale-100 opacity-100"
          : distance === 1
            ? "scale-[0.93] opacity-90 shadow-xl shadow-black/40"
            : "scale-[0.87] opacity-70 shadow-lg shadow-black/30"
      }`}
      data-testid={`client-feedback-card-${card.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {shouldLoadVideo && card.video && (
        <video
          ref={videoRef}
          src={card.video}
          muted
          loop={isActive}
          playsInline
          preload={isActive ? "auto" : "metadata"}
          controls={false}
          controlsList="nodownload noplaybackrate nofullscreen"
          disablePictureInPicture
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
          data-testid="client-feedback-video"
        />
      )}

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10 transition-opacity duration-400 ${
          isActive || hovering ? "opacity-100" : "opacity-0"
        }`}
      />

      {!isActive && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 text-black" fill="currentColor" />
          </span>
        </div>
      )}

      {isActive && shouldLoadVideo && card.video && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            aria-label={`Play video for ${card.name}`}
            onClick={handleManualPlay}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform duration-300 hover:scale-110"
          >
            <Play className="ml-0.5 h-5 w-5 text-black" fill="currentColor" />
          </button>
        </div>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 flex max-h-full flex-col px-6 pb-5 pt-12 transition-all duration-500 ease-out ${
          isActive || hovering
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <p className="shrink-0 text-base sm:text-lg font-display font-semibold text-white">
          {card.name}
        </p>

        <p className="mt-1 shrink-0 text-xs leading-snug text-white/70">
          {card.role}
          {card.company ? ` · ${card.company}` : ""}
        </p>

        {!isActive && (
          <p className="client-feedback-quote-scroll mt-2 min-h-0 flex-1 overflow-y-auto pr-1 text-xs leading-relaxed text-white/70">
            {card.quote}
          </p>
        )}
      </div>
    </div>
  );
}

const ClientFeedback = ({
  eyebrow,
  titlePart1,
  titleHighlight1,
  titlePart2,
  titleHighlight2,
  titlePart3,
  testimonials = [],
}) => {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);

  const [scrollbarEl, setScrollbarEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const total = testimonials.length;
  const renderTestimonials =
    total > 0 && total < MIN_LOOP_SLIDES
      ? Array.from({ length: MIN_LOOP_SLIDES }, (_, i) => testimonials[i % total])
      : testimonials;
  const renderTotal = renderTestimonials.length;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleSelect = useCallback((index) => {
    swiperRef.current?.slideToLoop(index, 600);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="voices"
      data-testid="client-feedback-section"
      className="relative w-full overflow-x-clip py-16 sm:py-20 bg-[#02030a]"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-xs sm:text-sm font-mono-display text-[color:var(--b2b-primary)] uppercase tracking-[0.25em]">
              {eyebrow}
            </div>

            <h2
              className="mt-4 font-display text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.10] uppercase tracking-tight"
              data-testid="client-feedback-heading"
            >
              {titlePart1}
              <span className="text-[color:var(--b2b-primary)]">{titleHighlight1}</span>
              {titlePart2}
              <span className="text-[color:var(--b2b-primary)]">{titleHighlight2}</span>
              {titlePart3}
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-[color:var(--b2b-primary)] hover:text-[color:var(--b2b-primary)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-[color:var(--b2b-primary)] hover:text-[color:var(--b2b-primary)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-10 xl:mt-14 client-feedback-swiper w-full px-5 sm:px-8">
        {scrollbarEl && (
          <Swiper
            modules={[Scrollbar, Keyboard, Mousewheel]}
            initialSlide={0}
            centeredSlides
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            spaceBetween={20}
            slidesPerView="auto"
            grabCursor
            loop={renderTotal > 1}
            speed={600}
            keyboard={{ enabled: true, onlyInViewport: true }}
            mousewheel={{ forceToAxis: true, sensitivity: 0.5, thresholdDelta: 20 }}
            scrollbar={{
              el: scrollbarEl,
              draggable: true,
              hide: false,
            }}
            className="client-feedback-swiper-track !overflow-visible"
            aria-roledescription="carousel"
            aria-label="Client video testimonials"
          >
            {renderTestimonials.map((card, index) => (
              <SwiperSlide key={index} className="client-feedback-slide">
                <FeedbackCard
                  card={card}
                  index={index}
                  isActive={index === activeIndex}
                  distance={loopDistance(index, activeIndex, renderTotal)}
                  isInView={isInView}
                  onSelect={handleSelect}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="mx-auto max-w-[1440px]">
          <div
            ref={setScrollbarEl}
            className="mt-10 sm:mt-12 h-[2px] w-full bg-white/20"
          />
        </div>
      </div>

      <style>{`
        .client-feedback-quote-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
        }

        .client-feedback-quote-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .client-feedback-quote-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.35);
          border-radius: 4px;
        }

        .client-feedback-swiper .swiper-scrollbar-drag {
          height: 100%;
          background: #fff;
          border-radius: 0;
        }

        .client-feedback-swiper {
          overflow: visible;
        }

        .client-feedback-swiper-track {
          overflow: visible !important;
          padding: 24px 0;
        }

        .client-feedback-swiper-track .swiper-wrapper {
          align-items: center;
        }

        .client-feedback-swiper-track .client-feedback-slide {
          width: 280px !important;
          height: 400px !important;
        }

        .client-feedback-card--active {
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--b2b-primary) 55%, transparent),
            0 25px 60px -20px color-mix(in srgb, var(--b2b-primary) 55%, transparent);
          z-index: 3;
        }

        @media (min-width: 640px) {
          .client-feedback-swiper-track .client-feedback-slide {
            width: 320px !important;
            height: 440px !important;
          }
        }

        @media (min-width: 1024px) {
          .client-feedback-swiper-track .client-feedback-slide {
            width: 360px !important;
            height: 470px !important;
          }
        }

        @media (min-width: 1280px) {
          .client-feedback-swiper-track .client-feedback-slide {
            width: 390px !important;
            height: 500px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientFeedback;
