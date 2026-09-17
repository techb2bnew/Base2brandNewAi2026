"use client";

import React from "react";
import { m } from "framer-motion";

const defaultPractices = [
  {
    title: "Performance Marketing",
    description:
      "Growth campaigns engineered around revenue, not reach. We plan, launch, optimize, and scale paid media campaigns across high-intent channels with clear performance accountability.",
    points: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
    icon: "/images/growthcard_backimagev2-1.png",
    backgroud_gradient:
      "linear-gradient(280deg, rgba(113, 31, 35, 1) 0%, rgba(250, 94, 45, 1) 100%)",
    color_card: "#fa5e2d",
  },
  {
    title: "Shopify & Ecommerce",
    description:
      "Commerce experiences designed to convert traffic into revenue. We build Shopify stores, custom ecommerce experiences, product pages, checkout journeys, and retention systems focused on higher sales and smoother buying experiences.",
    points: ["Shopify Development", "Shopify Plus", "Custom Themes"],
    icon: "/images/growthcard_backimagev2-2.png",
    backgroud_gradient:
      "linear-gradient(280deg, #95bf47 0%, #95bf47b5 100%)",
    color_card: "#95bf47",
  },
  {
    title: "CRO & Growth Optimization",
    description:
      "More conversions from the traffic you already have. We improve landing pages, funnels, user journeys, forms, product pages, checkout flows, and lead-generation systems using data-backed CRO strategies.",
    points: ["Landing Page CRO", "A/B Testing", "Heatmap Analysis"],
    icon: "/images/growthcard_backimagev2-3.png",
    backgroud_gradient:
      "linear-gradient(280deg, #155dfca1 0%, #155dfc 100%)",
    color_card: "#155dfc",
  },
  {
    title: "AI Solutions & Automation",
    description:
      "AI systems that reduce manual work and improve business efficiency. We build intelligent automations that help brands qualify leads, support customers, personalize journeys, and improve decision-making.",
    points: ["AI Chatbots", "AI Sales Assistants", "Lead Scoring"],
    icon: "/images/growthcard_backimagev2-4.png",
    backgroud_gradient:
      "linear-gradient(280deg, #8b5cf69c 0%, #8b5cf6 100%)",
    color_card: "#8b5cf6",
  },
  {
    title: "Mobile Apps & Enterprise Platforms",
    description:
      "Digital products customers and teams rely on every day. We design and develop mobile apps, portals, CRM systems, ERP workflows, cloud applications, and custom business platforms built for speed, scale, and usability.",
    points: ["Android Apps", "iOS Apps", "CRM Systems"],
    icon: "/images/growthcard_backimagev2-5.png",
    backgroud_gradient:
      "linear-gradient(280deg, #0a84ffd9 0%, #0a84ff 100%)",
    color_card: "#0a84ff",
  },
  {
    title: "Brand, Creative & Experience",
    description:
      "Brands people remember. Experiences customers trust. We create brand identities, social media systems, UI/UX experiences, campaign creatives, content frameworks, and design systems that make growth look as strong as it performs.",
    points: ["Brand Identity", "Creative Campaigns", "UI/UX Design"],
    icon: "/images/growthcard_backimagev2-6.png",
    backgroud_gradient:
      "linear-gradient(280deg, #d946efa1 0%, #d946ef 100%)",
    color_card: "#d946ef",
  },
];

const GrowthSystem = ({
  highlightTag,
  titleUpper = "SIX PRACTICES",
  titleLower = "ONE GROWTH SYSTEM",
  description,
  practices = defaultPractices,
}) => {
  const practiceList = Array.isArray(practices) && practices.length > 0 ? practices : defaultPractices;

  return (
    <section id="growth-system" className="py-16 xl:py-20 px-5 sm:px-8 bg-[#02030a] relative">
      <div className="max-w-[1440px] mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {highlightTag && (
            <div className="inline-flex items-center gap-2 mb-3" style={{ color: "var(--b2b-primary, #fa5e2d)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--b2b-primary, #fa5e2d)" }} />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">{highlightTag}</span>
            </div>
          )}
          <h2 className="mt-2 font-display text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.10] uppercase tracking-tight">
            {titleUpper}
            {titleLower && (
              <span
                className="block mt-1"
                style={{ color: "var(--b2b-primary, #fa5e2d)" }}
              >
                {titleLower}
              </span>
            )}
          </h2>
          {description && (
            <p className="mt-4 text-sm md:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {practiceList.map((practice, index) => {
            const points = Array.isArray(practice.points) ? practice.points : [];
            const cardColor = practice.color_card || "var(--b2b-primary, #ffffff)";
            const bgGradient =
              practice.backgroud_gradient ||
              "linear-gradient(280deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)";

            return (
              <m.div
                key={practice.title || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="border-2 border-white/10 rounded-t-4xl rounded-b-[45px] p-3 min-h-[360px] flex flex-col transition-all duration-300 hover:border-white/20"
              >
                <div
                  className="bg-cover bg-center bg-no-repeat rounded-t-3xl rounded-b-[45px] relative flex flex-col justify-end flex-1 min-h-[330px] overflow-hidden"
                  style={{ background: bgGradient }}
                >
                  {practice.icon && (
                    <div className="absolute top-4 right-2 pointer-events-none z-0">
                      <img
                        src={practice.icon}
                        alt={practice.title || "Card preview"}
                        className="object-contain max-w-[280px] max-h-[160px] opacity-90"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="relative w-full z-10 pt-16">
                    <div className="relative z-20 py-5 px-6">
                      <h3
                        className="text-lg xl:text-[22px] 2xl:text-[23px] leading-[1.1] font-semibold max-w-[220px]"
                        style={{ color: cardColor }}
                      >
                        {practice.title}
                      </h3>
                      <p className="text-[13px] 2xl:text-[14px] text-white/85 pt-1 leading-relaxed">
                        {practice.description}
                      </p>

                      {points.length > 0 && (
                        <div className="pt-2">
                          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            {points.map((item, pointIndex) => (
                              <li
                                key={pointIndex}
                                className="text-white/90 text-[11px] 2xl:text-[12px] list-disc list-inside"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <img
                      src="https://res.cloudinary.com/htkvsu4t/image/upload/v1789537572/growthCard_poligunv2.webp"
                      alt=""
                      className="object-cover absolute bottom-0 right-0 max-w-[98%] mx-auto z-10 pointer-events-none"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { GrowthSystem };
export default GrowthSystem;