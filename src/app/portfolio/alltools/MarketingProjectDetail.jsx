import Link from "next/link";
import { marketingProjects } from "../data/marketingProjects";

import StatsDashboard from "../marketing/StatsDashboard";
import KeywordPerformanceSection from "../marketing/KeywordPerformanceSection";
import AiVisibilitySection from "../marketing/AiVisibilitySection";
import StrategySection from "../marketing/StrategySection";
import ChangesTimeline from "../marketing/ChangesTimeline";
import GrowthFlow from "../marketing/GrowthFlow";
import ServicesCloud from "../marketing/ServicesCloud";
import TakeawayCard from "../marketing/TakeawayCard";
import { MONO, FAINT, BTN, BTN_SOLID } from "../marketing/styles";

// Theme tokens (--b2b-*) come from the active `.theme-*` class (see lib/themes.js + globals.css).
const caseStudyHref = (slug) => `/portfolio/marketing/${slug}`;

function humanizeKey(key) {
  if (!key) return "";
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

// Pre-defined headings and eyebrows for known performance sections
const PERFORMANCE_CONFIG = {
  seoPerformance: {
    defaultHeading: "SEO Performance",
    eyebrow: "Search Visibility",
  },
  localSeoPerformance: {
    defaultHeading: "Local SEO Performance",
    eyebrow: "Local Search Visibility",
  },
  googleAdsPerformance: {
    defaultHeading: "Google Ads Performance",
    eyebrow: "Paid Search Performance",
  },
  leadGenerationPerformance: {
    defaultHeading: "Lead Generation Performance",
    eyebrow: "Acquisition Strategy",
  },
  metaAdsPerformance: {
    defaultHeading: "Meta Ads Performance",
    eyebrow: "Paid Social Performance",
  },
  digitalMarketingPerformance: {
    defaultHeading: "Digital Marketing Performance",
    eyebrow: "Multi-Channel Growth",
  },
};

// Known strategy keys in prioritized order
const KNOWN_STRATEGY_KEYS = [
  "paidMedia",
  "emailMarketing",
  "gmbOptimisation",
  "gmbStrategy",
  "backlinkStrategy",
  "performanceStrategy",
  "campaignStrategy",
  "channelStrategy",
  "contentSeoStrategy",
  "googleAdsStrategy",
  "paidGrowthStrategy",
];

// Base metadata keys to exclude from strategy discovery
const KNOWN_BASE_KEYS = new Set([
  "slug",
  "title",
  "subtitle",
  "description",
  "website",
  "niche",
  "seo",
  "ads",
  "overview",
  "results",
  "aiVisibility",
  "changes",
  "growthSystem",
  "services",
  "takeaway",
]);

const PAGE = "relative z-[1] max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-[var(--b2b-ink)]";
const HEAD_ROW = "flex flex-wrap items-center justify-between gap-2 py-2.5 mb-3 border-b border-[var(--b2b-line)]";
const META_LABEL = `${MONO} text-[10px] tracking-[0.06em] uppercase ${FAINT}`;
const META_VALUE = "text-[13.5px] font-semibold leading-[1.4] text-[var(--b2b-ink)]";
const META_CARD = "flex flex-col gap-1 px-[18px] py-4 bg-[var(--b2b-glass-bg)] backdrop-blur-md";
const NAV_BTN =
  "flex flex-col gap-1 px-5 py-[18px] border border-[var(--b2b-line)] bg-[var(--b2b-glass-bg)] transition-[border-color,background,transform] duration-200 ease-in-out " +
  "hover:border-[var(--b2b-primary)] hover:bg-[color-mix(in_srgb,var(--b2b-primary)_3%,var(--b2b-bg-2))] hover:-translate-y-0.5";

export default function MarketingProjectDetail({ slug }) {
  const projectIndex = marketingProjects.findIndex((p) => p.slug === slug);
  const project = marketingProjects[projectIndex];

  if (!project) {
    return (
      <main className={`${PAGE} py-[140px] text-center`}>
        <p className={`${MONO} flex items-center justify-center gap-2 text-xs tracking-[0.06em] uppercase text-[var(--b2b-mute)]`}>
          <span className="text-[var(--b2b-primary)]">404</span> Not Found
        </p>
        <h1 className="mt-[18px] mb-7 text-[clamp(28px,4vw,40px)] font-bold">
          This marketing case study isn&apos;t in the registry.
        </h1>
        <p className="mb-5 max-w-[480px] text-base leading-[1.6] text-[var(--b2b-mute)]">
          The requested marketing growth dossier could not be located.
        </p>
        <Link href="/portfolio#marketing" className={`${BTN} ${BTN_SOLID}`}>
          ← Back to marketing
        </Link>
      </main>
    );
  }

  const prevProject =
    projectIndex > 0
      ? marketingProjects[projectIndex - 1]
      : marketingProjects[marketingProjects.length - 1];
  const nextProject =
    projectIndex < marketingProjects.length - 1
      ? marketingProjects[projectIndex + 1]
      : marketingProjects[0];

  const {
    title,
    subtitle,
    website,
    overview,
    results,
    aiVisibility,
    changes,
    growthSystem,
    services,
    takeaway,
  } = project;

  // Dynamic sequential chapter counter
  let chapterCount = 0;
  const getChapter = () => {
    chapterCount += 1;
    return String(chapterCount).padStart(2, "0");
  };

  // 1. Discover all performance sections (keys containing keywords array)
  const performanceEntries = Object.entries(project).filter(
    ([_, val]) => val && Array.isArray(val.keywords) && val.keywords.length > 0
  );

  // 2. Discover all strategy sections (known strategy keys + any other strategy-like object)
  const strategyEntries = Object.entries(project).filter(([key, val]) => {
    if (!val || typeof val !== "object") return false;
    if (Array.isArray(val.keywords)) return false; // Handled by performance section
    if (KNOWN_STRATEGY_KEYS.includes(key)) return true;
    if (
      !KNOWN_BASE_KEYS.has(key) &&
      (Array.isArray(val.points) || Object.keys(val).length > 0)
    ) {
      return true;
    }
    return false;
  });

  return (
    <main className={`${PAGE} pt-[120px] pb-20`}>
      {/* ================= 1. Top Navigation & Hero Section ================= */}
      <div className={HEAD_ROW}>
        <Link
          href="/portfolio#marketing"
          className={`${MONO} inline-flex items-center gap-1.5 text-xs tracking-[0.05em] uppercase text-[var(--b2b-mute)] transition-colors duration-200 hover:text-[var(--b2b-primary)]`}
        >
          <span className="inline-block" aria-hidden="true">
            ←
          </span>{" "}
          Back to marketing
        </Link>
        <span className={`${MONO} text-[11px] tracking-[0.06em] uppercase ${FAINT}`}>
          Marketing // Case Study · {title}
        </span>
      </div>

      <section className="pt-5 pb-10 border-b border-[var(--b2b-line)]">
        <div>
          <h1 className="mb-4 text-[clamp(34px,5.5vw,62px)] font-black leading-[1.08] tracking-[-0.02em] text-[var(--b2b-ink)]">
            {title}
          </h1>
          <p className="mb-6 max-w-[820px] text-[clamp(15px,1.8vw,18px)] leading-[1.6] text-[var(--b2b-mute)]">
            {subtitle}
          </p>

          {project.description && (
            <p className={`${MONO} -mt-3 mb-6 text-[13px] tracking-[0.04em] uppercase text-[var(--b2b-primary)]`}>
              {project.description}
            </p>
          )}

          <div className="mb-[34px] flex flex-wrap items-center gap-3.5">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN} ${BTN_SOLID}`}
              >
                Visit website <span className="inline-block" aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Metadata Cards Grid - THE PROJECT */}
        {overview && (
          <div className="mb-4 grid grid-cols-4 max-[992px]:grid-cols-2 max-[640px]:grid-cols-1 gap-px border border-[var(--b2b-line)] bg-[var(--b2b-line)]">
            {overview.industry && (
              <div className={META_CARD}>
                <span className={META_LABEL}>INDUSTRY</span>
                <span className={META_VALUE}>{overview.industry}</span>
              </div>
            )}
            {overview.market && (
              <div className={META_CARD}>
                <span className={META_LABEL}>MARKET</span>
                <span className={META_VALUE}>{overview.market}</span>
              </div>
            )}
            {overview.campaign && (
              <div className={META_CARD}>
                <span className={META_LABEL}>CAMPAIGN</span>
                <span className={META_VALUE}>{overview.campaign}</span>
              </div>
            )}
            {overview.timeline && (
              <div className={META_CARD}>
                <span className={META_LABEL}>TIMELINE</span>
                <span className={META_VALUE}>{overview.timeline}</span>
              </div>
            )}
          </div>
        )}

        {overview?.focus && overview.focus.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 px-4 py-3 border border-[var(--b2b-line)] bg-[color-mix(in_srgb,var(--b2b-primary)_3%,var(--b2b-bg-2))]">
            <span className={`${MONO} whitespace-nowrap text-[10.5px] font-bold tracking-[0.06em] text-[var(--b2b-primary)]`}>
              FOCUS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {overview.focus.map((f) => (
                <span
                  key={f}
                  className={`${MONO} whitespace-nowrap px-2 py-[3px] text-[10.5px] text-[var(--b2b-mute)] border border-[var(--b2b-line)] bg-[var(--b2b-glass-bg)]`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ================= 2. THE RESULTS (Visual Donut Chart + Stat Cards) ================= */}
      {results && results.stats && results.stats.length > 0 && (
        <StatsDashboard results={results} chapter={getChapter()} />
      )}

      {/* ================= 3. PERFORMANCE TABLES (SEO / Local SEO / Google Ads / Lead Gen / Meta / Digital Marketing) ================= */}
      {performanceEntries.map(([key, perfData]) => {
        const cfg = PERFORMANCE_CONFIG[key] || {
          defaultHeading: humanizeKey(key),
          eyebrow: "Search Visibility",
        };
        return (
          <KeywordPerformanceSection
            key={key}
            data={perfData}
            defaultHeading={cfg.defaultHeading}
            eyebrow={cfg.eyebrow}
            chapter={getChapter()}
          />
        );
      })}

      {/* ================= 4. AI SEARCH VISIBILITY ================= */}
      {aiVisibility && (
        <AiVisibilitySection aiVisibility={aiVisibility} chapter={getChapter()} />
      )}

      {/* ================= 5. STRATEGY SECTIONS (Paid Media, Email, GMB, Backlinks, Campaigns, Channels, Paid Growth, etc.) ================= */}
      {strategyEntries.map(([key, stratData]) => (
        <StrategySection
          key={key}
          sectionKey={key}
          data={stratData}
          chapter={getChapter()}
        />
      ))}

      {/* ================= 6. WHAT WE CHANGED ================= */}
      {changes && <ChangesTimeline changes={changes} chapter={getChapter()} />}

      {/* ================= 7. THE GROWTH SYSTEM (Funnel Flow) ================= */}
      {growthSystem && <GrowthFlow growthSystem={growthSystem} chapter={getChapter()} />}

      {/* ================= 8. CORE SERVICES ================= */}
      {services && services.length > 0 && (
        <ServicesCloud services={services} chapter={getChapter()} />
      )}

      {/* ================= 9. THE TAKEAWAY ================= */}
      {takeaway && (
        <TakeawayCard
          takeaway={takeaway}
          website={website}
          chapter={getChapter()}
        />
      )}

      {/* ================= 10. Next / Prev Case Study Navigation ================= */}
      {marketingProjects.length > 1 && (
        <nav className="mt-12 grid grid-cols-2 max-[640px]:grid-cols-1 gap-4 border-t border-[var(--b2b-line)] pt-6">
          <Link href={caseStudyHref(prevProject.slug)} className={NAV_BTN}>
            <span className={`${MONO} text-[10px] tracking-[0.06em] text-[var(--b2b-primary)]`}>
              ← PREVIOUS CASE STUDY
            </span>
            <span className="text-[15px] font-bold text-[var(--b2b-ink)]">{prevProject.title}</span>
          </Link>
          <Link
            href={caseStudyHref(nextProject.slug)}
            className={`${NAV_BTN} items-end text-right max-[640px]:items-start max-[640px]:text-left`}
          >
            <span className={`${MONO} text-[10px] tracking-[0.06em] text-[var(--b2b-primary)]`}>
              NEXT CASE STUDY →
            </span>
            <span className="text-[15px] font-bold text-[var(--b2b-ink)]">{nextProject.title}</span>
          </Link>
        </nav>
      )}
    </main>
  );
}
