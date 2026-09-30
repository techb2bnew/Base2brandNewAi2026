"use client";

import AnimatedCounter from "../../components/Industries/shared/AnimatedCounter";
import { StatsBarChart } from "../MarketingCharts";
import SectionHeader from "./SectionHeader";
import { MONO, FAINT, CARD, SECTION } from "./styles";

export default function StatsDashboard({ results, chapter = "01" }) {
  if (!results || !results.stats || results.stats.length === 0) return null;

  return (
    <section className={SECTION} id="results">
      <SectionHeader
        chapter={chapter}
        eyebrow="Performance Metrics"
        aside={results.highlight}
        title="The Results"
      />

      <div className="grid grid-cols-[1.15fr_1fr] max-[992px]:grid-cols-1 items-stretch gap-4">
        <StatsBarChart stats={results.stats} />

        <div className="grid grid-cols-1 gap-2">
          {results.stats.map((stat, i) => (
            <div
              className={`${CARD} flex flex-col justify-center min-w-0 px-5 py-3 transition-[border-color,transform] duration-200 ease-in-out hover:border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)] hover:-translate-y-0.5`}
              key={stat.label || i}
            >
              <div className="text-[clamp(20px,2vw,26px)] font-black tracking-[-0.02em] leading-[1.2] text-[var(--b2b-primary)] [overflow-wrap:anywhere]">
                {/* AnimatedCounter's duration is in seconds */}
                <AnimatedCounter value={stat.value} duration={1.2} />
              </div>
              <div className={`${MONO} text-[10.5px] uppercase tracking-[0.05em] ${FAINT}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
