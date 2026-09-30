import Link from "next/link";
import { MONO, FAINT, BTN, BTN_SOLID, BTN_GHOST } from "./styles";

export default function TakeawayCard({ takeaway, website, chapter = "08" }) {
  if (!takeaway) return null;

  return (
    <section className="pt-11 pb-5 border-t border-[var(--b2b-line)]">
      <div className="border border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--b2b-primary)_3%,var(--b2b-bg-2))] px-[30px] py-9">
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <p className={`${MONO} flex items-center gap-2 text-xs tracking-[0.06em] uppercase text-[var(--b2b-mute)]`}>
            {chapter && <span className="text-[var(--b2b-primary)]">{chapter}</span>}
            Conclusion
          </p>
          <span className={`${MONO} text-[11px] tracking-[0.06em] uppercase ${FAINT}`}>Executive Summary</span>
        </div>

        <h2 className="mb-3 text-[clamp(22px,3.5vw,34px)] font-extrabold tracking-[-0.02em] text-[var(--b2b-ink)]">
          The Takeaway
        </h2>

        {takeaway.points && takeaway.points.length > 0 && (
          <div className="flex flex-col gap-3.5 mb-3">
            {takeaway.points.map((pt, i) => (
              <div className="flex items-start gap-3.5" key={i}>
                <span
                  className={`${MONO} mt-[3px] px-1.5 py-0.5 text-[11px] font-bold leading-none text-[var(--b2b-primary)] border border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)]`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[14.5px] leading-[1.6] text-[var(--b2b-ink)]">{pt}</p>
              </div>
            ))}
          </div>
        )}

        {(takeaway.result || takeaway.summary) && (
          <div className="mb-[26px] border-t border-[var(--b2b-line)] pt-4 text-sm leading-[1.65] text-[var(--b2b-mute)]">
            <strong className="text-[var(--b2b-primary)]">{takeaway.result || takeaway.summary}</strong>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3.5">
          <Link href="/portfolio#marketing" className={`${BTN} ${BTN_SOLID}`}>
            ← Back to marketing
          </Link>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BTN} ${BTN_GHOST}`}
            >
              Visit website <span className="inline-block">↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
