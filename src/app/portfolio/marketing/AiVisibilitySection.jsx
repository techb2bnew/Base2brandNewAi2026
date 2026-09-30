import SectionHeader from "./SectionHeader";
import { MONO, FAINT, CARD, CARD_LIFT, SECTION } from "./styles";

const AI_CARD = `${CARD} ${CARD_LIFT} flex flex-col justify-between gap-4 px-5 py-6`;
const AI_CARD_HIGHLIGHT =
  "!border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--b2b-primary)_3%,var(--b2b-bg-2))]";
const DOT = "w-1.5 h-1.5 rounded-full bg-[var(--b2b-primary-2)] shadow-[0_0_6px_var(--b2b-primary-2)]";
const DOT_ACCENT = "w-1.5 h-1.5 rounded-full bg-[var(--b2b-primary)] shadow-[0_0_6px_var(--b2b-primary)]";
const TOP = "flex flex-wrap items-center justify-between gap-2";
const ICON_BOX = `${MONO} flex items-center gap-1.5 text-[11px] font-semibold uppercase text-[var(--b2b-ink)]`;
const INDICATOR = `${MONO} text-[9.5px] uppercase ${FAINT} border border-[var(--b2b-line)] px-1.5 py-0.5`;
const DESC = "text-[13.5px] leading-[1.6] text-[var(--b2b-mute)]";

export default function AiVisibilitySection({ aiVisibility, chapter = "03" }) {
  if (
    !aiVisibility ||
    (!aiVisibility.chatgpt && !aiVisibility.googleAI && !aiVisibility.gemini)
  ) {
    return null;
  }

  return (
    <section className={SECTION} id="ai-visibility">
      <SectionHeader
        chapter={chapter}
        eyebrow="AI Optimization"
        aside="AEO / Generative Engine Discovery"
        title="AI Search Visibility"
      />

      <div className="grid grid-cols-3 max-[992px]:grid-cols-1 gap-4">
        {aiVisibility.chatgpt && (
          <div className={AI_CARD}>
            <div className={TOP}>
              <div className={ICON_BOX}>
                <span className={DOT} />
                <span>ChatGPT</span>
              </div>
              <span className={INDICATOR}>Active</span>
            </div>
            <p className={DESC}>{aiVisibility.chatgpt}</p>
          </div>
        )}

        {aiVisibility.googleAI && (
          <div className={`${AI_CARD} ${AI_CARD_HIGHLIGHT}`}>
            <div className={TOP}>
              <div className={ICON_BOX}>
                <span className={DOT_ACCENT} />
                <span>Google AI Overviews</span>
              </div>
              <span className={INDICATOR}>Active</span>
            </div>
            <p className={DESC}>{aiVisibility.googleAI}</p>
          </div>
        )}

        {aiVisibility.gemini && (
          <div className={AI_CARD}>
            <div className={TOP}>
              <div className={ICON_BOX}>
                <span className={DOT} />
                <span>Google Gemini</span>
              </div>
              <span className={INDICATOR}>Active</span>
            </div>
            <p className={DESC}>{aiVisibility.gemini}</p>
          </div>
        )}
      </div>
    </section>
  );
}
