import { MONO, FAINT } from "./styles";

export default function SectionHeader({ chapter, eyebrow, title, aside, lead }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 mb-3 border-b border-[var(--b2b-line)]">
        <p className={`${MONO} flex items-center gap-2 text-xs tracking-[0.06em] uppercase text-[var(--b2b-mute)]`}>
          {chapter && <span className="text-[var(--b2b-primary)]">{chapter}</span>}
          {eyebrow}
        </p>
        {aside && (
          <span className={`${MONO} text-[11px] tracking-[0.06em] uppercase ${FAINT}`}>{aside}</span>
        )}
      </div>
      {title && (
        <h2 className="mb-2.5 text-[clamp(24px,3.5vw,38px)] font-extrabold tracking-[-0.02em] text-[var(--b2b-ink)]">
          {title}
        </h2>
      )}
      {lead && (
        <p className="mb-6 max-w-[740px] text-[15px] leading-[1.6] text-[var(--b2b-mute)]">{lead}</p>
      )}
    </div>
  );
}
