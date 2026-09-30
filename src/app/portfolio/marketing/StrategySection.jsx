import SectionHeader from "./SectionHeader";
import { MONO, FAINT, CARD, CARD_LIFT, SECTION, RESULT_BOX, LIVE_DOT } from "./styles";

const PPC_CARD = `${CARD} ${CARD_LIFT} flex flex-col justify-between gap-3.5 px-5 py-6`;
const STRATEGY_CARD = `${CARD} relative flex flex-col gap-3 px-5 py-6 transition-[border-color,transform,box-shadow] duration-200 ease-in-out hover:border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]`;
const PLATFORM = `${MONO} text-[11px] font-bold tracking-[0.05em] text-[var(--b2b-primary)]`;
const BADGE = `${MONO} text-[9.5px] uppercase ${FAINT} border border-[var(--b2b-line)] px-1.5 py-0.5`;
const POINT = "pl-2.5 text-[13px] leading-[1.5] text-[var(--b2b-mute)] border-l border-[var(--b2b-line)]";
const POINT_TITLE = "block mb-0.5 text-[12.5px] font-semibold text-[var(--b2b-ink)]";

function humanizeKey(key) {
  if (!key) return "";
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const SECTION_EYEBROWS = {
  paidMedia: "Performance Media",
  emailMarketing: "Email & Retention",
  gmbOptimisation: "Local Discovery",
  gmbStrategy: "Local Presence",
  backlinkStrategy: "Domain Authority",
  performanceStrategy: "Speed & Performance",
  campaignStrategy: "Lead & Campaign Strategy",
  channelStrategy: "Multi-Channel Strategy",
  contentSeoStrategy: "Content & SEO Strategy",
  googleAdsStrategy: "Paid Search Strategy",
  paidGrowthStrategy: "Paid Growth Strategy",
};

const DEFAULT_TITLES = {
  paidMedia: "PPC & Paid Media",
  emailMarketing: "Email Marketing",
  gmbOptimisation: "GMB Optimisation",
  gmbStrategy: "GMB Strategy",
  backlinkStrategy: "Backlink Strategy",
  performanceStrategy: "Performance Strategy",
  campaignStrategy: "Campaign Strategy",
  channelStrategy: "Channel Strategy",
  contentSeoStrategy: "Content & SEO Strategy",
  googleAdsStrategy: "Google Ads Strategy",
  paidGrowthStrategy: "Paid Growth Strategy",
};

const NON_CHANNEL_KEYS = new Set([
  "title",
  "description",
  "highlight",
  "summary",
  "result",
]);

export default function StrategySection({ sectionKey, data, chapter = "04" }) {
  if (!data) return null;

  const eyebrow = SECTION_EYEBROWS[sectionKey] || "Execution Strategy";
  const defaultTitle = DEFAULT_TITLES[sectionKey] || humanizeKey(sectionKey);

  // Case 1: Data is an object with a direct "points" array (e.g. emailMarketing, gmbOptimisation, backlinkStrategy, campaignStrategy, channelStrategy, contentSeoStrategy, googleAdsStrategy)
  if (Array.isArray(data.points)) {
    const title = data.title ? `${defaultTitle}: ${data.title}` : defaultTitle;

    return (
      <section className={SECTION} id={sectionKey}>
        <SectionHeader
          chapter={chapter}
          eyebrow={eyebrow}
          aside={`${data.points.length} Strategic Pillars`}
          title={title}
          lead={data.description}
        />

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-[992px]:grid-cols-1 gap-4">
          {data.points.map((pt, i) => (
            <div className={STRATEGY_CARD} key={pt.title || i}>
              <div className="flex items-center gap-3">
                <span className={`${MONO} border border-[var(--b2b-line)] bg-[var(--b2b-bg-2)] px-2 py-1 text-[11px] font-bold tracking-[0.05em] text-[var(--b2b-primary)]`}>0{i + 1}</span>
                <h3 className="m-0 text-[15px] font-semibold text-[var(--b2b-ink)]">{pt.title || `Phase 0${i + 1}`}</h3>
              </div>
              <p className="m-0 text-[13.5px] leading-[1.6] text-[var(--b2b-mute)]">{pt.description || pt}</p>
            </div>
          ))}
        </div>

        {data.result && (
          <div className={`${RESULT_BOX} mt-5`}>
            <span className={LIVE_DOT} aria-hidden="true" />
            <span>{data.result}</span>
          </div>
        )}
      </section>
    );
  }

  // Case 2: Data is an object of sub-channels (like paidMedia: { googleAds, metaAds, retargeting } or paidGrowthStrategy: { googleAds: [...], metaAds: [...] })
  const entries = Object.entries(data).filter(
    ([key, val]) => !NON_CHANNEL_KEYS.has(key) && Boolean(val)
  );

  if (entries.length === 0) return null;

  const sectionTitle = data.title
    ? `${defaultTitle}: ${data.title}`
    : defaultTitle;

  return (
    <section className={SECTION} id={sectionKey}>
      <SectionHeader
        chapter={chapter}
        eyebrow={eyebrow}
        aside="Campaign Channels"
        title={sectionTitle}
        lead={data.description}
      />

      <div className="grid grid-cols-3 max-[992px]:grid-cols-1 gap-4">
        {entries.map(([channelKey, channelData]) => {
          const channelName = humanizeKey(channelKey);

          // Sub-case A: If channelData is a simple string
          if (typeof channelData === "string") {
            return (
              <div className={PPC_CARD} key={channelKey}>
                <div className="flex items-center justify-between gap-2">
                  <span className={PLATFORM}>{channelName}</span>
                </div>
                <p className="text-[13.5px] leading-[1.6] text-[var(--b2b-mute)]">{channelData}</p>
              </div>
            );
          }

          // Sub-case B: If channelData is directly an array of items (e.g. b2b-campus: googleAds: [{ title, description }])
          if (Array.isArray(channelData)) {
            return (
              <div className={PPC_CARD} key={channelKey}>
                <div className="flex items-center justify-between gap-2">
                  <span className={PLATFORM}>{channelName}</span>
                </div>

                <div className="mt-1.5 flex flex-col gap-2.5">
                  {channelData.map((pt, i) => (
                    <div className={POINT} key={i}>
                      {pt.title && (
                        <strong className={POINT_TITLE}>{pt.title}: </strong>
                      )}
                      <span className="text-[var(--b2b-mute)]">
                        {pt.description || pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // Sub-case C: If channelData is an object with title, points, result (e.g. duracrafts-furniture)
          return (
            <div className={PPC_CARD} key={channelKey}>
              <div className="flex items-center justify-between gap-2">
                <span className={PLATFORM}>{channelName}</span>
                {channelData.title && (
                  <span className={BADGE}>{channelData.title}</span>
                )}
              </div>

              {channelData.points && channelData.points.length > 0 && (
                <div className="mt-1.5 flex flex-col gap-2.5">
                  {channelData.points.map((pt, i) => (
                    <div className={POINT} key={i}>
                      {pt.title && (
                        <strong className={POINT_TITLE}>{pt.title}: </strong>
                      )}
                      <span className="text-[var(--b2b-mute)]">
                        {pt.description || pt}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {channelData.result && (
                <div className={`${RESULT_BOX} mt-2.5`}>
                  <span className={LIVE_DOT} aria-hidden="true" />
                  <span>{channelData.result}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.result && (
        <div className={`${RESULT_BOX} mt-5`}>
          <span className={LIVE_DOT} aria-hidden="true" />
          <span>{data.result}</span>
        </div>
      )}
    </section>
  );
}
