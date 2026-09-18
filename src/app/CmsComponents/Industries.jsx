"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import Reveal from "@/CmsComponents/CmsReuseComponents/Reveal";
import ShiningText from "@/CmsComponents/CmsReuseComponents/ShiningText";
import { ArrowUpRight } from "lucide-react";

export const INDUSTRIES_DEFAULT = [
  {
    id: "automotive",
    name: "Automotive",
    use: "Dealer operations copilots, inventory intelligence, lead qualification and voice-based customer follow-up.",
    image:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    use: "Predictive workflows, quality checks, document automation, supplier coordination and operational reporting.",
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    use: "Patient intake automation, appointment workflows, knowledge retrieval, compliance-friendly support and CRM-connected follow-up.",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "logistics",
    name: "Logistics",
    use: "Shipment updates, dispatch workflows, exception handling, customer communication and operational intelligence.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "retail",
    name: "Retail & Ecommerce",
    use: "Conversational commerce, Shopify automation, product recommendation systems, support agents, CRO insights and retention workflows.",
    image:
      "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "finserv",
    name: "Financial Services",
    use: "Lead qualification, document intelligence, KYC workflow support, advisor copilots and risk-aware automation.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "government",
    name: "Government",
    use: "Citizen services, document intelligence, policy retrieval.",
    image:
      "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "education",
    name: "Education",
    use: "Student inquiry automation, course recommendation, admission workflows, learning support and CRM follow-up systems.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=70",
  },
];

/* Photo card — duotone styling using page theme */
const PhotoCard = ({ industry, isActive, isDimmed, onHover, size, index }) => {
  const ref = useRef(null);

  return (
    <motion.button
      ref={ref}
      type="button"
      data-testid={`industry-photo-${industry.id || index}`}
      onMouseEnter={() => onHover(industry.id)}
      onFocus={() => onHover(industry.id)}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      onViewportEnter={() => industry.id && onHover(industry.id)}
      className={`relative overflow-hidden rounded-xl flex-shrink-0 cursor-pointer ${size}`}
    >
      <motion.img
        src={industry.image}
        alt={industry.name || "Industry photo"}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src =
            "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=70";
        }}
        animate={{
          filter: isActive
            ? "brightness(1) saturate(1.05) contrast(1.05)"
            : "brightness(0.6) saturate(0.4) contrast(1.1)",
          scale: isActive ? 1.06 : 1,
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Duotone wash — strong on inactive, soft on active */}
      <motion.div
        animate={{
          opacity: isActive ? 0.12 : 0.55,
        }}
        transition={{ duration: 0.55 }}
        className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--b2b-primary)_20%,transparent)] via-[color-mix(in_srgb,var(--b2b-primary)_30%,transparent)] to-[color-mix(in_srgb,var(--b2b-primary)_10%,transparent)] mix-blend-color"
      />

      {/* Top vignette */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.65 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-t from-[#03030A]/85 via-transparent to-transparent"
      />

      {/* Dim layer for non-hovered when something else is hovered */}
      <motion.div
        animate={{ opacity: isDimmed ? 0.55 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-[#03030A]"
      />

      {/* Glow ring on active */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-xl ring-1 ring-[var(--b2b-primary)]/70 shadow-[0_0_30px_-4px_rgba(var(--b2b-primary-rgb),0.55)]"
      />

      {/* Corner accent dot */}
      <motion.span
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[var(--b2b-primary-light,#C084FC)] shadow-[0_0_10px_2px_rgba(var(--b2b-primary-rgb),0.7)]"
      />

      {/* Industry label */}
      <motion.div
        animate={{
          y: isActive ? 0 : 8,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-2.5 left-2.5 right-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white"
      >
        {industry.name}
      </motion.div>
    </motion.button>
  );
};

const Row = ({ industry, idx, isActive, isDimmed, onHover, ctaLabel = "Use case" }) => (
  <motion.button
    type="button"
    data-testid={`industry-card-${idx}`}
    onMouseEnter={() => onHover(industry.id)}
    onFocus={() => onHover(industry.id)}
    initial={{ opacity: 0, x: 24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{
      duration: 0.55,
      delay: idx * 0.05,
      ease: [0.16, 1, 0.3, 1],
    }}
    onViewportEnter={() => industry.id && onHover(industry.id)}
    className="text-left group block w-full py-3 cursor-pointer"
  >
    <motion.div
      animate={{ opacity: isDimmed ? 0.4 : 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3"
    >
      <motion.span
        animate={{
          width: isActive ? 26 : 16,
          backgroundColor: isActive
            ? "var(--b2b-primary)"
            : "rgba(255,255,255,0.25)",
          boxShadow: isActive
            ? "0 0 14px 2px var(--b2b-primary)"
            : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35 }}
        className="flex-shrink-0 h-2.5 rounded-[3px]"
      />
      <span
        className={`font-display text-lg md:text-xl font-medium tracking-tight transition-colors duration-300 ${
          isActive ? "text-white" : "text-white/60"
        }`}
      >
        {industry.name}
      </span>
      <motion.span
        animate={{
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : -8,
        }}
        transition={{ duration: 0.3 }}
        className="ml-auto hidden sm:inline-flex items-center gap-1 font-mono text-xs tracking-[0.2em] uppercase text-[var(--b2b-primary)]"
      >
        {ctaLabel} <ArrowUpRight className="w-3 h-3" />
      </motion.span>
    </motion.div>
    {industry.use && (
      <motion.p
        animate={{ opacity: isDimmed ? 0.3 : 1 }}
        className={`mt-1.5 pl-9 text-xs md:text-sm transition-colors duration-300 ${
          isActive ? "text-white/70" : "text-white/35"
        }`}
      >
        {industry.use}
      </motion.p>
    )}
  </motion.button>
);

const Industries = ({
  eyebrow = "INDUSTRIES",
  title = "Deployed across growth-heavy and operations-heavy environments.",
  description = "Base2Brand builds AI automation services and enterprise AI solutions for industries where speed, accuracy and conversion matter.",
  industriesData = INDUSTRIES_DEFAULT,
  ctaLabel = "Use case",
}) => {
  const safeList = Array.isArray(industriesData) && industriesData.length > 0 ? industriesData : INDUSTRIES_DEFAULT;
  const [hovered, setHovered] = useState(safeList[0]?.id || "automotive");

  useEffect(() => {
    if (safeList.length > 0 && (!hovered || !safeList.some((ind) => ind.id === hovered))) {
      setHovered(safeList[0].id);
    }
  }, [safeList, hovered]);

  const cols = [
    safeList.filter((_, i) => i % 3 === 0),
    safeList.filter((_, i) => i % 3 === 1),
    safeList.filter((_, i) => i % 3 === 2),
  ];

  return (
    <section
      id="industries"
      data-testid="industries-section"
      className="relative py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <Reveal>
            <ShiningText testId="industries-eyebrow">{eyebrow}</ShiningText>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-[-0.035em] font-medium max-w-2xl text-balance text-white">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-white/50 leading-relaxed">
              {description} 
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-10 lg:gap-16">
          {/* Mobile-only: right-to-left auto-sliding image marquee */}
          <div className="md:hidden -mx-5 sm:-mx-6 w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)]">
            <Marquee gap={14} speed={42} direction="left" autoFill pauseOnClick>
              {safeList.map((ind, i) => (
                <div
                  key={ind.id || i}
                  data-testid={`industry-mobile-slide-${ind.id || i}`}
                  className="relative w-[220px] h-[260px] rounded-2xl overflow-hidden mx-1.5"
                >
                  <img
                    src={ind.image}
                    alt={ind.name || "Industry"}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=70";
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03030A]/90 via-[#03030A]/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 font-mono text-xs uppercase tracking-[0.2em] text-white">
                    {ind.name}
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Photo grid */}
          <div className="hidden md:flex gap-2.5 md:gap-3 flex-shrink-0 overflow-x-auto pb-2 lg:pb-0 max-w-full">
            <div className="flex flex-col gap-2.5 md:gap-3">
              {cols[0].map((ind, i) => (
                <PhotoCard
                  key={ind.id || `col0-${i}`}
                  industry={ind}
                  index={i * 3}
                  isActive={hovered === ind.id}
                  isDimmed={hovered !== null && hovered !== ind.id}
                  onHover={setHovered}
                  size="w-[120px] h-[130px] sm:w-[140px] sm:h-[150px] md:w-[160px] md:h-[170px]"
                />
              ))}
            </div>
            <div className="flex flex-col gap-2.5 md:gap-3 mt-12 md:mt-16">
              {cols[1].map((ind, i) => (
                <PhotoCard
                  key={ind.id || `col1-${i}`}
                  industry={ind}
                  index={i * 3 + 1}
                  isActive={hovered === ind.id}
                  isDimmed={hovered !== null && hovered !== ind.id}
                  onHover={setHovered}
                  size="w-[130px] h-[140px] sm:w-[152px] sm:h-[162px] md:w-[176px] md:h-[186px]"
                />
              ))}
            </div>
            <div className="flex flex-col gap-2.5 md:gap-3 mt-6 md:mt-8">
              {cols[2].map((ind, i) => (
                <PhotoCard
                  key={ind.id || `col2-${i}`}
                  industry={ind}
                  index={i * 3 + 2}
                  isActive={hovered === ind.id}
                  isDimmed={hovered !== null && hovered !== ind.id}
                  onHover={setHovered}
                  size="w-[124px] h-[134px] sm:w-[144px] sm:h-[154px] md:w-[168px] md:h-[178px]"
                />
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 w-full divide-y divide-white/5 border-y border-white/5">
            {safeList.map((ind, i) => (
              <Row
                key={ind.id || `row-${i}`}
                industry={ind}
                idx={i}
                isActive={hovered === ind.id}
                isDimmed={hovered !== null && hovered !== ind.id}
                onHover={setHovered}
                ctaLabel={ctaLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
