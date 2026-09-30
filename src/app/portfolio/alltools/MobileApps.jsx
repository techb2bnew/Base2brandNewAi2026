import { mobileApps } from "../data/mobileApps";
import MobileAppCard from "./MobileAppCard";

// Theme tokens (--b2b-*) come from the active `.theme-*` class (see lib/themes.js + globals.css).
const MONO = "font-[family-name:var(--b2b-font-mono)]";
const FAINT = "text-[color-mix(in_srgb,var(--b2b-mute)_65%,transparent)]";

export default function MobileApps() {
  return (
    <section className="mobile-apps max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-[50px]" id="mobile-apps">
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 mb-3 border-b border-[var(--b2b-line)]">
        <p className={`${MONO} flex items-center gap-2 text-xs tracking-[0.06em] uppercase text-[var(--b2b-mute)]`}>
          <span className="text-[var(--b2b-primary)]">Ch.02</span> Mobile apps
        </p>
        <span className={`${MONO} text-[11px] tracking-[0.06em] uppercase ${FAINT}`}>
          Android + iOS // shipped to the stores
        </span>
      </div>

      <h2 className="flex items-center justify-between gap-5 mb-[18px] text-[clamp(34px,5vw,52px)] font-extrabold tracking-[-0.02em]">
        Apps in people&apos;s pockets.
      </h2>

      <div className={`${MONO} flex justify-between pt-[18px] pb-3.5 text-[10.5px] uppercase tracking-[0.05em] ${FAINT}`}>
        <span>{String(mobileApps.length).padStart(2, "0")} Apps</span>
        <span>Tap a store to download</span>
      </div>

      <div className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-3.5">
        {mobileApps.map((app, i) => (
          <MobileAppCard app={app} index={i} key={app.id} />
        ))}
      </div>
    </section>
  );
}
