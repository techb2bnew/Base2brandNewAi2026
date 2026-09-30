"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { marketingProjects } from "../data/marketingProjects";

// Theme tokens (--b2b-*) come from the active `.theme-*` class (see lib/themes.js + globals.css).
const MONO = "font-[family-name:var(--b2b-font-mono)]";
const FAINT = "text-[color-mix(in_srgb,var(--b2b-mute)_65%,transparent)]";

// Case study pages live under the portfolio route: /portfolio/marketing/:slug
const caseStudyHref = (slug) => `/portfolio/marketing/${slug}`;

const SEO_LABEL = {
  full: "SEO",
  local: "Local SEO",
  none: "—",
};

const PROJECT_LOGOS = {
  "vip-number-shop": { src: "/logos/vipnumber.png", theme: "light" },
  "duracrafts-furniture": { src: "/logos/DuraCrafts Furniture.png", theme: "light" },
  "rolly-receipts": { src: "/logos/Rolly Receipts.png", theme: "light" },
  "barbell-2-0": { src: "/logos/Barbell 2.0.png", theme: "dark" },
  "ehis-school": { src: "/logos/EHIS School.png", theme: "dark" },
  "warley-store": { src: "/logos/Warley Store.png", theme: "light" },
  "techcity": { src: "/logos/TechCity.png", theme: "light" },
  "metal-press": { src: "/logos/Metal Press.png", theme: "light" },
  "beta-die-casting": { src: "/logos/Beta Die Casting.png", theme: "light" },
  "vis-learning": { src: "/logos/VIS Learning.png", theme: "light" },
  "loria-medical": { src: "/logos/Loria Medical.png", theme: "light" },
  "siena-home": { src: "/logos/Siena Home.png", theme: "light" },
  "healthy-bedroom": { src: "/logos/Healthy Bedroom.png", theme: "light" },
  "b2b-campus": { src: "/logos/B2B Campus.png", theme: "light" },
};

const ROW_GRID =
  "grid items-center gap-3 grid-cols-[36px_1.6fr_1fr_100px_140px_170px] " +
  "max-[1100px]:grid-cols-[32px_1.5fr_1fr_90px_1fr_150px] " +
  "max-[900px]:grid-cols-[28px_1.4fr_1fr_90px_1fr] " +
  "max-[760px]:grid-cols-1";

const TAG =
  `${MONO} inline-flex items-center gap-[5px] px-2 py-1 text-[10px] uppercase tracking-[0.04em] whitespace-nowrap border`;
const TAG_DEFAULT = "border-[var(--b2b-line-strong)] text-[var(--b2b-mute)]";
const TAG_MUTED = `border-[var(--b2b-line)] ${FAINT}`;
const TAG_SEO = "border-[#4ade80] text-[#4ade80]";
const TAG_LOCAL = "border-[var(--b2b-primary-2)] text-[var(--b2b-primary-2)]";
const TAG_LINK =
  "border-[var(--b2b-line)] text-[var(--b2b-mute)] transition-[border-color,background,color] duration-200 ease-in-out " +
  "hover:border-[var(--b2b-ink)] hover:text-[var(--b2b-ink)] hover:bg-[color-mix(in_srgb,var(--b2b-line-strong)_15%,transparent)]";
const TAG_STUDY =
  "text-[var(--b2b-primary)] border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--b2b-primary)_8%,transparent)] " +
  "transition-[border-color,background,transform] duration-150 ease-in-out " +
  "hover:border-[var(--b2b-primary)] hover:bg-[color-mix(in_srgb,var(--b2b-primary)_18%,transparent)] hover:-translate-y-px";

function Logo({ src, alt, dark }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  // The image can fail before hydration attaches onError — catch that case too.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return null;

  return (
    <div
      className={`flex items-center justify-center shrink-0 overflow-hidden rounded-md h-[50px] w-[90px] px-2.5 py-1.5 max-[1100px]:h-12 max-[1100px]:w-20 max-[1100px]:px-1.5 max-[1100px]:py-[5px] max-[760px]:h-[47px] max-[760px]:w-[85px] transition-[border-color,transform,box-shadow,background] duration-200 ease-in-out group-hover:-translate-y-0.5 group-hover:border-[var(--b2b-primary)] ${
        dark
          ? "bg-[#0f1115] border border-white/[0.16] shadow-[0_2px_10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] group-hover:shadow-[0_4px_14px_color-mix(in_srgb,var(--b2b-primary)_25%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--b2b-primary)_12%,transparent)]"
          : "bg-white border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.35)] group-hover:shadow-[0_4px_14px_color-mix(in_srgb,var(--b2b-primary)_30%,transparent)]"
      }`}
    >
      <img
        ref={imgRef}
        src={encodeURI(src)}
        alt={alt}
        className="block h-auto w-auto max-h-[42px] max-w-[74px] object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function Marketing() {
  const router = useRouter();

  const handleRowClick = (slug) => {
    router.push(caseStudyHref(slug));
  };

  return (
    <section className="marketing max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-[50px]" id="marketing">
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 mb-3 border-b border-[var(--b2b-line)]">
        <p className={`${MONO} flex items-center gap-2 text-xs tracking-[0.06em] uppercase text-[var(--b2b-mute)]`}>
          <span className="text-[var(--b2b-primary)]">Ch.06</span> Marketing
        </p>
        <span className={`${MONO} text-[11px] tracking-[0.06em] uppercase ${FAINT}`}>
          {marketingProjects.length} accounts // click any project to view case study
        </span>
      </div>

      <h2 className="flex items-center justify-between gap-5 mb-[18px] text-[clamp(34px,5vw,52px)] font-extrabold tracking-[-0.02em]">
        Growth we&apos;re running.
      </h2>

      <div className="border-t border-[var(--b2b-line)]">
        <div
          className={`${ROW_GRID} ${MONO} px-1.5 pt-2.5 pb-3 border-b border-[var(--b2b-line)] text-[10px] uppercase tracking-[0.05em] ${FAINT} max-[760px]:hidden`}
          aria-hidden="true"
        >
          <span className="col-span-2">Project</span>
          <span>Niche</span>
          <span>SEO</span>
          <span>Ads</span>
          <span>Case Study / Link</span>
        </div>

        {marketingProjects.map((c, i) => {
          const config = PROJECT_LOGOS[c.slug];
          const logoSrc =
            typeof c.logo === "string"
              ? c.logo
              : c.logo?.src || (typeof config === "string" ? config : config?.src);
          const isDarkTheme =
            c.slug === "ehis-school" ||
            c.slug === "barbell-2-0" ||
            c.logo?.theme === "dark" ||
            config?.theme === "dark";

          return (
            <div
              className={`${ROW_GRID} group px-1.5 py-2.5 max-[760px]:px-3 max-[760px]:py-4 border-b border-[var(--b2b-line)] cursor-pointer select-none transition-[background,border-color] duration-200 ease-in-out hover:bg-[color-mix(in_srgb,var(--b2b-primary)_4%,transparent)] hover:border-b-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)]`}
              key={c.slug}
              onClick={() => handleRowClick(c.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleRowClick(c.slug);
                }
              }}
              aria-label={`View marketing case study for ${c.title}`}
            >
              <span className={`${MONO} text-[11px] ${FAINT} max-[760px]:hidden`}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-3.5 min-w-0">
                {logoSrc && <Logo src={logoSrc} alt={`${c.title} logo`} dark={isDarkTheme} />}
                <div className="flex flex-col items-start gap-[3px] min-w-0">
                  <span className="text-[14.5px] font-semibold transition-colors duration-200 group-hover:text-[var(--b2b-primary)]">
                    {c.title}
                  </span>
                  <span
                    className={`${MONO} text-[10px] whitespace-nowrap text-[var(--b2b-primary)] opacity-0 -translate-x-1 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-x-0 max-[760px]:opacity-100 max-[760px]:translate-x-0`}
                  >
                    Case Study <span className="inline-block" aria-hidden="true">→</span>
                  </span>
                </div>
              </div>

              <span className="text-[13px] text-[var(--b2b-mute)]">{c.niche}</span>

              <span>
                {c.seo === "none" ? (
                  <span className={`${TAG} ${TAG_MUTED}`}>—</span>
                ) : (
                  <span className={`${TAG} ${c.seo === "full" ? TAG_SEO : TAG_LOCAL}`}>
                    {c.seo === "full" && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--b2b-primary)] shadow-[0_0_6px_var(--b2b-primary)]"
                        aria-hidden="true"
                      />
                    )}
                    {SEO_LABEL[c.seo] || c.seo}
                  </span>
                )}
              </span>

              <span className="flex flex-wrap gap-1.5">
                {!c.ads || c.ads.length === 0 ? (
                  <span className={`${TAG} ${TAG_MUTED}`}>—</span>
                ) : (
                  c.ads.map((channel) => (
                    <span className={`${TAG} ${TAG_DEFAULT}`} key={channel}>
                      {channel}
                    </span>
                  ))
                )}
              </span>

              <span className="flex items-center gap-2">
                <Link
                  href={caseStudyHref(c.slug)}
                  className={`${TAG} ${TAG_STUDY}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Case Study <span className="inline-block" aria-hidden="true">↗</span>
                </Link>
                {c.website && (
                  <a
                    className={`${TAG} ${TAG_LINK}`}
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Visit live client website"
                  >
                    Visit <span className="inline-block" aria-hidden="true">↗</span>
                  </a>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
