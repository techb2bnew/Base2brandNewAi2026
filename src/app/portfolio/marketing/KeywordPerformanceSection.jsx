import { KeywordIntentPieChart, getIntentColorMap } from "../MarketingCharts";
import SectionHeader from "./SectionHeader";
import { MONO, SECTION } from "./styles";

export default function KeywordPerformanceSection({
  data,
  defaultHeading = "SEO Performance",
  eyebrow = "Search Visibility",
  chapter = "02",
}) {
  if (!data || !data.keywords || data.keywords.length === 0) return null;

  const intentColors = getIntentColorMap(data.keywords);

  // Group keywords under their intent (order of first appearance), keeping each
  // keyword's original position for its index number.
  const intentGroups = Object.keys(intentColors).map((intent) => ({
    intent,
    color: intentColors[intent],
    items: data.keywords
      .map((kw, idx) => ({ ...kw, idx }))
      .filter((kw) => (kw.intent || "Commercial") === intent),
  }));

  const sectionTitle = data.title
    ? `${defaultHeading}: ${data.title}`
    : defaultHeading;

  return (
    <section className={SECTION} id="performance-table">
      <SectionHeader
        chapter={chapter}
        eyebrow={eyebrow}
        aside={`${data.keywords.length} Target Keywords`}
        title={sectionTitle}
        lead={data.description}
      />

      <div className="mb-5">
        <KeywordIntentPieChart keywords={data.keywords} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-[640px]:grid-cols-1 items-start gap-4">
        {intentGroups.map((group) => (
          <div
            className="min-w-0 border border-[var(--b2b-line)] border-t-2 border-t-[var(--intent-color)] bg-[var(--b2b-glass-bg)]"
            key={group.intent}
            style={{ "--intent-color": group.color }}
          >
            <div
              className={`flex items-center justify-between gap-3 px-5 max-[640px]:px-[18px] py-3.5 border-b border-[var(--b2b-line)] bg-[color-mix(in_srgb,var(--intent-color)_5%,transparent)]`}
            >
              <span
                className={`${MONO} [--intent-color:var(--b2b-mute)] inline-flex items-center gap-1.5 max-w-full px-[9px] py-[5px] text-[9.5px] leading-[1.3] tracking-[0.05em] uppercase text-[var(--intent-color)] border border-[color-mix(in_srgb,var(--intent-color)_45%,transparent)] bg-[color-mix(in_srgb,var(--intent-color)_8%,transparent)] [overflow-wrap:anywhere] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--intent-color)] before:shrink-0`}
              >
                {group.intent}
              </span>
              <span className={`${MONO} shrink-0 text-lg font-bold leading-none text-[var(--intent-color)]`}>
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>

            <ul className="list-none m-0 p-0">
              {group.items.map((kw) => (
                <li
                  className={`flex gap-3.5 px-5 max-[640px]:px-[18px] py-2 border-b border-[var(--b2b-line)] last:border-b-0 transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--intent-color)_5%,transparent)]`}
                  key={kw.keyword || kw.idx}
                >
                  <span className={`${MONO} shrink-0 text-[10.5px] leading-[1.9] text-[var(--intent-color)]`}>
                    {String(kw.idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-[14.5px] font-bold tracking-[-0.01em] leading-[1.4] text-[var(--b2b-ink)] [overflow-wrap:anywhere]">
                      {kw.keyword}
                    </h3>
                    {kw.focus && (
                      <p className="text-[12.5px] leading-[1.6] text-[var(--b2b-mute)] [overflow-wrap:anywhere]">
                        {kw.focus}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
