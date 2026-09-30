"use client";

import { useEffect, useMemo, useState } from "react";
import { websites } from "../data/shopifyWebsiteData";

// Theme tokens (--b2b-*) come from the active `.theme-*` class (see lib/themes.js + globals.css).
const MONO = "font-[family-name:var(--b2b-font-mono)]";
const FAINT = "text-[color-mix(in_srgb,var(--b2b-mute)_65%,transparent)]";

const BTN_GHOST_SMALL =
  `${MONO} inline-flex items-center gap-2 text-xs font-semibold tracking-[0.05em] uppercase ` +
  "px-[18px] py-[11px] border bg-transparent border-[var(--b2b-line-strong)] text-[var(--b2b-ink)] " +
  "transition-[transform,background,border-color,color] duration-200 ease-in-out " +
  "hover:border-[var(--b2b-primary)] hover:text-[var(--b2b-primary)]";

const LABEL_OVERRIDES = {
  shopifyWebsites: "Shopify",
  shopifyPlusWebsites: "Shopify Plus",
  wordpressWebsites: "WordPress",
};

const PAGE_SIZE = 12;

function humanize(key) {
  const stripped = key.replace(/Websites?$/i, "");
  const spaced = stripped.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  const label = spaced.charAt(0).toUpperCase() + spaced.slice(1);
  return label.trim() || key;
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const CATEGORIES = websites.map((entry) => {
  const key = Object.keys(entry)[0];
  return {
    key,
    label: LABEL_OVERRIDES[key] || humanize(key),
    items: entry[key],
  };
});

export default function Websites() {
  const [active, setActive] = useState(CATEGORIES[0]?.key);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [active, query]);

  const current = CATEGORIES.find((c) => c.key === active) ?? CATEGORIES[0];

  const filtered = useMemo(() => {
    if (!current) return [];
    const q = query.trim().toLowerCase();
    if (!q) return current.items;
    return current.items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        domainOf(item.link).toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [current, query]);

  const visible = expanded || query ? filtered : filtered.slice(0, PAGE_SIZE);
  const hiddenCount = filtered.length - visible.length;
  const totalCount = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <section className="websites max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-[50px]" id="websites">
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 mb-3 border-b border-[var(--b2b-line)]">
        <p className={`${MONO} flex items-center gap-2 text-xs tracking-[0.06em] uppercase text-[var(--b2b-mute)]`}>
          <span className="text-[var(--b2b-primary)]">Ch.05</span> Client sites
        </p>
        <span className={`${MONO} text-[11px] tracking-[0.06em] uppercase ${FAINT}`}>
          {totalCount} sites shipped // grouped by platform
        </span>
      </div>

      <h2 className="flex items-center justify-between gap-5 mb-[18px] text-[clamp(34px,5vw,52px)] font-extrabold tracking-[-0.02em]">
        Storefronts we&apos;ve shipped.
      </h2>

      <div className="flex flex-wrap items-center gap-5 py-4 border-t border-[var(--b2b-line)]">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => {
            const isActive = active === c.key;
            return (
              <button
                key={c.key}
                type="button"
                className={`${MONO} inline-flex items-center gap-1.5 bg-transparent border px-3 py-[7px] text-[10.5px] uppercase tracking-[0.04em] transition-[border-color,color,box-shadow] duration-200 ease-in-out ${
                  isActive
                    ? "border-[var(--b2b-primary)] text-[var(--b2b-primary)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--b2b-primary)_25%,transparent)]"
                    : "border-[var(--b2b-line-strong)] text-[var(--b2b-mute)] hover:border-[var(--b2b-mute)]"
                }`}
                onClick={() => {
                  setActive(c.key);
                  setQuery("");
                }}
                aria-pressed={isActive}
              >
                <span
                  className={`inline-block h-1.5 rounded-full bg-[var(--b2b-primary)] shadow-[0_0_6px_var(--b2b-primary)] ${
                    isActive ? "w-1.5 opacity-100" : "w-0 opacity-0"
                  }`}
                  aria-hidden="true"
                />{" "}
                {c.label}
                <span
                  className={`${MONO} text-[9.5px] ${
                    isActive ? "text-[var(--b2b-primary)]" : FAINT
                  }`}
                >
                  {c.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* <div className="filter-bar__search">
          <span aria-hidden="true">⌕</span>
          <input
            type="text"
            placeholder="Search sites…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search sites"
          />
        </div> */}
      </div>

      <div className={`${MONO} flex justify-between pt-[18px] pb-3.5 text-[10.5px] uppercase tracking-[0.05em] ${FAINT}`}>
        <span>{String(filtered.length).padStart(2, "0")} sites</span>
        <span>Click a card to visit</span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
        {visible.map((item) => (
          <a
            className="group flex flex-col gap-2 p-2 bg-[var(--b2b-glass-bg)] backdrop-blur-md text-[var(--b2b-ink)] transition-[background,border-color,transform] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[color-mix(in_srgb,var(--b2b-ink)_6%,var(--b2b-glass-bg))] hover:-translate-y-[3px]"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={item.link}
          >
            <img className="block w-full h-auto rounded-[10px]" src={item.poster_image} alt="" loading="lazy" />
            <span className="text-[15px] font-medium tracking-[-0.01em] underline transition-colors duration-200 group-hover:text-[var(--b2b-primary)]">
              {item.name}
            </span>
          </a>
        ))}

        {filtered.length === 0 && (
          <p className={`${MONO} col-span-full px-1 py-10 text-xs uppercase tracking-[0.05em] ${FAINT} bg-[var(--b2b-glass-bg)] backdrop-blur-md`}>
            No sites match &quot;{query}&quot;.
          </p>
        )}
      </div>

      {hiddenCount > 0 && (
        <div className="flex justify-center">
          <button type="button" className={`${BTN_GHOST_SMALL} mt-[22px]`} onClick={() => setExpanded(true)}>
            Show all {filtered.length} <span className="inline-block" aria-hidden="true">↓</span>
          </button>
        </div>
      )}

      {expanded && !query && filtered.length > PAGE_SIZE && (
        <div className="flex justify-center">
          <button type="button" className={`${BTN_GHOST_SMALL} mt-[22px]`} onClick={() => setExpanded(false)}>
            Show less <span className="inline-block" aria-hidden="true">↑</span>
          </button>
        </div>
      )}
    </section>
  );
}
