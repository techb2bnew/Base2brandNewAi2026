"use client";

import { useMemo, useState } from "react";
import { projects, statusOrder } from "../data/projects";
import ProjectCard from "./ProjectCard";

const CATEGORY_FILTERS = [
  { label: "All", value: "all" },
  { label: "AI Systems", value: "AI Systems" },
  { label: "Civic Tech", value: "Civic Technology" },
  { label: "Hardware + Software", value: "Hardware + Software" },
  { label: "Automation", value: "Conversion Engine" },
];

const STATUS_FILTERS = ["any", "live", "building", "prototype"];

const SORT_OPTIONS = [
  { label: "Index", value: "index", compare: (a, b) => a.id.localeCompare(b.id) },
  { label: "Newest", value: "newest", compare: (a, b) => b.year.localeCompare(a.year) },
  { label: "Status", value: "status", compare: (a, b) => statusOrder[a.status] - statusOrder[b.status] },
];

export default function Directory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("any");
  const [sort, setSort] = useState("index");
  const [view, setView] = useState("grid");
  const filtered = useMemo(() => {
    const sortFn = SORT_OPTIONS.find((s) => s.value === sort).compare;
    return projects
      .filter((p) => {
        const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "all" || p.category === category;
        const matchesStatus = status === "any" || p.status === status;
        return matchesQuery && matchesCategory && matchesStatus;
      })
      .sort(sortFn);
  }, [query, category, status, sort]);
  return (
    <section className="directory max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-[90px] pb-10" id="directory">
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 mb-3 border-b border-[var(--b2b-line)]">
        <p className="font-[family-name:var(--b2b-font-mono)] flex items-center gap-2 text-xs tracking-[0.06em] uppercase text-[var(--b2b-mute)]">
          <span className="text-[var(--b2b-primary)]">Ch.01</span> The directory
        </p>
        <span className="font-[family-name:var(--b2b-font-mono)] text-[11px] tracking-[0.06em] uppercase text-[color-mix(in_srgb,var(--b2b-mute)_65%,transparent)]">Live inventory // scroll to inspect</span>
      </div>

      <h2 className="flex items-center justify-between gap-5 mb-[18px] text-[clamp(34px,5vw,52px)] font-extrabold tracking-[-0.02em]">
        All work.
        {/* <button
          type="button"
          className="view-toggle"
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          aria-pressed={view === "list"}
          aria-label={`Switch to ${view === "grid" ? "list" : "grid"} view`}
        >
          <span className={view === "grid" ? "is-active" : ""}>▦ Grid</span>
          <span className={view === "list" ? "is-active" : ""}>≡ List</span>
        </button> */}
      </h2>

      {/* <div className="filter-bar" data-reveal>
        <div className="filter-bar__search">
          <span aria-hidden="true">⌕</span>
          <input
            type="text"
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search projects"
          />
        </div>

        <div className="filter-bar__chips">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`chip ${category === f.value ? "is-active" : ""}`}
              onClick={() => setCategory(f.value)}
              aria-pressed={category === f.value}
            >
              <span className="dot dot--live" aria-hidden="true" /> {f.label}
            </button>
          ))}
        </div>

        <div className="filter-bar__sort">
          <span>Sort //</span>
          {SORT_OPTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              className={`chip ${sort === s.value ? "is-active" : ""}`}
              onClick={() => setSort(s.value)}
              aria-pressed={sort === s.value}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-bar filter-bar--status" data-reveal>
        <span>Status //</span>
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            type="button"
            className={`chip ${status === s ? "is-active" : ""}`}
            onClick={() => setStatus(s)}
            aria-pressed={status === s}
          >
            <span className="dot dot--live" aria-hidden="true" /> {s}
          </button>
        ))}
      </div> */}

      <div className="font-[family-name:var(--b2b-font-mono)] flex justify-between pt-[18px] pb-3.5 text-[10.5px] uppercase tracking-[0.05em] text-[color-mix(in_srgb,var(--b2b-mute)_65%,transparent)]">
        <span>{String(filtered.length).padStart(2, "0")} Projects</span>
        <span>Hover a tile — click to open</span>
      </div>

      <div
        className={`flex flex-wrap gap-[2%] border-t border-l border-[var(--b2b-line)] ${view === "list" ? "flex-col" : ""}`}
      >
        {filtered.map((p, i) => (
          <ProjectCard project={p} key={p.id} index={i} variant={view} />
        ))}
      </div>
    </section>
  );
}
