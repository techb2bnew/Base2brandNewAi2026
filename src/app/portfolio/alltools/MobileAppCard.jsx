"use client";

import { useEffect, useRef, useState } from "react";

// Theme tokens (--b2b-*) come from the active `.theme-*` class (see lib/themes.js + globals.css).
const MONO = "font-[family-name:var(--b2b-font-mono)]";
const ACCENT_DIM = "color-mix(in srgb, var(--b2b-primary) 40%, transparent)";
const ZONE = "p-3 max-[640px]:px-4";

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="w-full h-full">
    <path
      fill="currentColor"
      d="M17.52 15.34a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-11.04 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2m11.4-6.02 2-3.46a.42.42 0 0 0-.72-.42l-2.02 3.5A12.5 12.5 0 0 0 12 7.9c-1.85 0-3.6.38-5.14 1.05L4.84 5.45a.42.42 0 0 0-.72.41l2 3.46C2.69 11.19.34 14.66 0 18.76h24c-.34-4.1-2.69-7.57-6.12-9.44"
    />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="w-full h-full">
    <path
      fill="currentColor"
      d="M16.37 1.43c0 1.14-.5 2.27-1.18 3.08-.74.9-1.99 1.57-2.99 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.57-2.27 1.2-2.98.81-.94 2.15-1.64 3.25-1.68.03.13.06.28.06.43zm4.56 15.71c-.03.07-.46 1.58-1.52 3.12-.94 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8C4 18.38 2.96 15.57 2.96 12.92c0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.68.95 3.6.95.87 0 2.23-1.01 3.9-1.01.62 0 2.89.06 4.38 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.95 4.45z"
    />
  </svg>
);

const PLATFORMS = [
  { key: "android", label: "Android", store: "Google Play", Icon: AndroidIcon },
  { key: "ios", label: "iOS", store: "App Store", Icon: AppleIcon },
];

// Screenshots live in public/mobileAppimage, named after the app title.
const screenshotFor = (app) => app.image ?? `/mobileAppimage/${encodeURIComponent(app.name)}.png`;

const STORE_BASE =
  "flex items-center gap-2 min-w-0 px-2.5 py-1 rounded-[10px] border transition-[border-color,color,background] duration-200 ease-in-out";
const STORE_LIVE =
  "group/store border-[var(--b2b-line-strong)] text-[var(--b2b-ink)] " +
  "hover:border-[var(--b2b-primary)] hover:text-[var(--b2b-primary)] " +
  "hover:bg-[color-mix(in_srgb,var(--b2b-primary)_6%,transparent)]";
const STORE_OFF =
  "border-dashed border-[var(--b2b-line)] text-[var(--b2b-mute)] opacity-55 cursor-not-allowed";

function StoreInner({ label, sub, Icon, arrow }) {
  return (
    <>
      <span className="inline-flex w-[18px] h-[18px] shrink-0">
        <Icon />
      </span>
      <span className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className={`${MONO} text-[10px] font-bold tracking-[0.05em] uppercase`}>{label}</span>
        <span className={`${MONO} text-[7.5px] tracking-[0.05em] uppercase text-[var(--b2b-mute)] opacity-75 [overflow-wrap:anywhere]`}>
          {sub}
        </span>
      </span>
      {arrow && (
        <span
          className={`${MONO} inline-block text-[13px] shrink-0 transition-transform duration-200 group-hover/store:translate-x-0.5 group-hover/store:-translate-y-0.5`}
          aria-hidden="true"
        >
          ↗
        </span>
      )}
    </>
  );
}

export default function MobileAppCard({ app, index = 0 }) {
  const [hasShot, setHasShot] = useState(true);
  const imgRef = useRef(null);

  // The image can fail before hydration attaches onError — catch that case too.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setHasShot(false);
  }, []);

  return (
    <article
      className={`group grid min-w-0 rounded-2xl border border-[var(--b2b-line)] bg-[var(--b2b-glass-bg)] backdrop-blur-md text-[var(--b2b-ink)] transition-[background,border-color] duration-[250ms] ease-in-out hover:bg-[color-mix(in_srgb,var(--b2b-ink)_6%,var(--b2b-glass-bg))] hover:border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)] ${
        hasShot ? "grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] max-[640px]:grid-cols-[minmax(0,1fr)]" : "grid-cols-[minmax(0,1fr)]"
      }`}
    >
      <div className="flex flex-col min-w-0">
        <header className={`${ZONE} flex flex-col gap-[3px]`}>
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <span className={`${MONO} text-[10.5px] tracking-[0.06em] text-[var(--b2b-primary)]`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex gap-1.5">
              {PLATFORMS.map(({ key, label }) => (
                <span
                  key={key}
                  className={`${MONO} inline-flex items-center gap-1.5 px-2 py-[3px] text-[9.5px] tracking-[0.06em] uppercase border before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current ${
                    app[key]
                      ? "text-[var(--b2b-primary)] opacity-100 border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)]"
                      : "text-[var(--b2b-mute)] opacity-50 border-[var(--b2b-line)]"
                  }`}
                  title={app[key] ? `${label} — live` : `${label} — currently not live`}
                >
                  {label}
                </span>
              ))}
            </span>
          </div>

          <h3 className="text-[clamp(18px,1.7vw,21px)] font-extrabold tracking-[-0.02em] leading-[1.15] [overflow-wrap:anywhere]">
            {app.name}
          </h3>
          {app.tagline && (
            <p className="text-[12.5px] leading-[1.4] text-[var(--b2b-mute)] [overflow-wrap:anywhere]">
              {app.tagline}
            </p>
          )}
        </header>

        <div className={`${ZONE} flex flex-col gap-1.5 border-t border-[var(--b2b-line)]`}>
          <span className={`${MONO} text-[9.5px] tracking-[0.08em] uppercase text-[var(--b2b-mute)] opacity-70`}>
            Stack
          </span>
          <ul className="flex flex-wrap gap-[5px] list-none m-0 p-0">
            {app.stack.map((s) => (
              <li
                key={s}
                className={`${MONO} text-[8.5px] tracking-[0.04em] uppercase text-[var(--b2b-mute)] border border-[var(--b2b-line-strong)] px-[9px] py-[3px] rounded-[30px]`}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <ul className={`${ZONE} flex flex-col gap-1.5 flex-1 list-none m-0 border-t border-[var(--b2b-line)]`}>
          {app.description.map((line) => (
            <li
              key={line}
              className="relative pl-4 text-[12.5px] leading-[1.5] text-[var(--b2b-mute)] [overflow-wrap:anywhere] before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-[5px] before:h-[5px] before:bg-[var(--b2b-primary)]"
            >
              {line}
            </li>
          ))}
        </ul>

        <div className={`${ZONE} grid grid-cols-2 max-[380px]:grid-cols-1 gap-1.5 border-t border-[var(--b2b-line)]`}>
          {PLATFORMS.map(({ key, label, store, Icon }) =>
            app[key] ? (
              <a
                key={key}
                href={app[key]}
                target="_blank"
                rel="noopener noreferrer"
                className={`${STORE_BASE} ${STORE_LIVE}`}
                aria-label={`${app.name} on ${store} (${label})`}
              >
                <StoreInner label={label} sub={store} Icon={Icon} arrow />
              </a>
            ) : (
              <span key={key} className={`${STORE_BASE} ${STORE_OFF}`} aria-disabled="true">
                <StoreInner label={label} sub="Currently not live" Icon={Icon} />
              </span>
            )
          )}
        </div>
      </div>

      {hasShot && (
        <div
          className="flex items-center justify-center min-w-0 px-2 py-3 border-l border-[var(--b2b-line)] bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--b2b-primary)_7%,transparent),transparent_65%)] max-[640px]:border-l-0 max-[640px]:border-t max-[640px]:px-4 max-[640px]:pt-[22px] max-[640px]:pb-[26px]"
        >
          <div
            className="relative w-full max-w-[200px] max-[640px]:max-w-[210px] aspect-[230/498] p-1.5 rounded-[28px] bg-[#0b0b0c] border border-[var(--b2b-line-strong)] shadow-[0_18px_40px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-[transform,border-color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)] before:content-[''] before:absolute before:top-[11px] before:left-1/2 before:w-[30%] before:h-3 before:-translate-x-1/2 before:rounded-full before:bg-[#0b0b0c] before:z-[1]"
          >
            <img
              ref={imgRef}
              className="block w-full h-full object-cover object-top rounded-[22px]"
              src={screenshotFor(app)}
              alt={`${app.name} app screenshot`}
              loading="lazy"
              onError={() => setHasShot(false)}
            />
          </div>
        </div>
      )}
    </article>
  );
}
