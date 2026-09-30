import Link from "next/link";
import { projects, statusLabel } from "../data/projects";
import VectorFlowChart from "./VectorFlowChart";
import RadarChart from "./RadarChart";

// Theme tokens (--b2b-*) come from the active `.theme-*` class (see lib/themes.js + globals.css).
const MONO = "font-[family-name:var(--b2b-font-mono)]";
const FAINT = "text-[color-mix(in_srgb,var(--b2b-mute)_65%,transparent)]";

const STATUS = {
  live: { text: "text-[#4ade80]", dot: "bg-[#4ade80] shadow-[0_0_5px_#4ade80]" },
  building: { text: "text-[#fbbf24]", dot: "bg-[#fbbf24]" },
  prototype: { text: "text-[var(--b2b-primary-2)]", dot: "bg-[var(--b2b-primary-2)]" },
};

const BTN =
  `${MONO} inline-flex items-center gap-2 text-xs font-semibold tracking-[0.05em] uppercase ` +
  "border border-transparent px-[22px] py-[13px] transition-[transform,box-shadow,background,border-color,color] duration-200 ease-in-out";
const BTN_SOLID =
  "bg-[var(--b2b-primary)] text-[var(--b2b-on-primary)] hover:-translate-y-0.5 " +
  "hover:shadow-[0_10px_28px_-8px_color-mix(in_srgb,var(--b2b-primary)_55%,transparent)]";
const BTN_GHOST = "bg-transparent border-[var(--b2b-line-strong)] text-[var(--b2b-ink)]";
const BTN_DISABLED = "opacity-[0.45] cursor-not-allowed pointer-events-none";

const EYEBROW = `${MONO} flex items-center gap-2 text-xs tracking-[0.06em] uppercase text-[var(--b2b-mute)]`;
const CHART_BORDER = "border border-t-0 border-[var(--b2b-line-strong)]";

const SECTIONS = [
  { key: "why", title: "Why we built it" },
  { key: "problem", title: "The problem it solves" },
  { key: "benefits", title: "Benefits & impact" },
  { key: "scale", title: "Scaling it further" },
  { key: "future", title: "Future features" },
];

export function getLocalProject(slug) {
  return projects.find((p) => p.pageSlug === slug);
}

function PanelChrome({ label, status }) {
  const s = STATUS[status] ?? STATUS.building;
  return (
    <div
      className={`${MONO} flex items-center gap-2.5 px-3 py-[9px] text-[10px] tracking-[0.04em] uppercase text-[var(--b2b-mute)] bg-[var(--b2b-glass-bg)]`}
    >
      <div className="flex gap-1" aria-hidden="true">
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--b2b-line-strong)]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--b2b-line-strong)]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--b2b-line-strong)]" />
      </div>
      <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
      <span className={`flex items-center gap-[5px] ${s.text}`}>
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden="true" />{" "}
        {statusLabel[status]}
      </span>
    </div>
  );
}

export default function ProjectDetail({ slug }) {
  const project = getLocalProject(slug);

  if (!project) {
    return (
      <main className="relative z-[1] max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-[140px] text-center text-[var(--b2b-ink)]">
        <p className={`${EYEBROW} justify-center`}>
          <span className="text-[var(--b2b-primary)]">404</span> Not found
        </p>
        <h1 className="text-[clamp(28px,4vw,40px)] font-bold mt-[18px] mb-7">
          This build isn&apos;t in the directory.
        </h1>
        <Link href="/portfolio" className={`${BTN} ${BTN_SOLID}`}>
          ← Back to work
        </Link>
      </main>
    );
  }

  const status = STATUS[project.status] ?? STATUS.building;

  return (
    <main className="relative z-[1] max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-30 pb-[70px] text-[var(--b2b-ink)]">
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 mb-3 border-b border-[var(--b2b-line)]">
        <Link
          href="/portfolio"
          className={`${MONO} inline-flex items-center gap-1.5 text-xs tracking-[0.05em] uppercase text-[var(--b2b-mute)] transition-colors duration-200 hover:text-[var(--b2b-primary)]`}
        >
          <span className="inline-block" aria-hidden="true">←</span> Back to work
        </Link>
        <span className={`${MONO} text-[11px] tracking-[0.06em] uppercase ${FAINT}`}>
          {project.code} · {project.year}
        </span>
      </div>

      <div className="flex flex-col gap-9 min-[901px]:gap-14">
        <aside className={`w-full mx-auto ${project.image ? "" : "max-w-[720px]"}`}>
          {project.image ? (
            <img
              className="block w-full max-h-[700px] object-contain bg-[var(--b2b-glass-bg)] backdrop-blur-md border border-[var(--b2b-line-strong)]"
              src={project.image}
              alt={project.name}
            />
          ) : (
            <>
              <PanelChrome label={`${project.code} · ${project.slug}`} status={project.status} />
              {project.chart === "line" ? (
                <VectorFlowChart className={CHART_BORDER} />
              ) : (
                <RadarChart className={CHART_BORDER} />
              )}
              <div
                className={`${MONO} flex justify-between px-3 py-2.5 text-[10px] uppercase tracking-[0.04em] ${FAINT} border border-[var(--b2b-line-strong)] border-t-[var(--b2b-line)]`}
              >
                <span>{project.code}</span>
                <span className={`flex items-center gap-1.5 ${status.text}`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${status.dot}`} aria-hidden="true" />{" "}
                  {statusLabel[project.status]} · {project.year}
                </span>
              </div>
            </>
          )}
        </aside>

        <div>
          <p className={`${EYEBROW} mb-3.5`}>
            <span className="text-[var(--b2b-primary)]">{project.id}</span> {project.category}
          </p>
          <h1 className="text-[clamp(36px,5vw,58px)] font-black tracking-[-0.02em] mb-4">{project.name}</h1>
          <p className="max-w-[480px] mb-5 text-base leading-[1.6] text-[var(--b2b-mute)]">
            {project.description}
          </p>

          <ul className="flex flex-wrap gap-[5px] list-none p-0 mt-[18px] mb-7">
            {project.stack.map((s) => (
              <li
                key={s}
                className={`${MONO} text-[8.5px] tracking-[0.04em] uppercase text-[var(--b2b-mute)] border border-[var(--b2b-line-strong)] px-[9px] py-[3px] rounded-[30px]`}
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-[22px] mt-[26px] mb-[50px]">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN} ${BTN_SOLID}`}
              >
                View live <span className="inline-block" aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className={`${BTN} ${BTN_GHOST} ${BTN_DISABLED}`} aria-disabled="true">
                Not live yet
              </span>
            )}
            <span className={`${MONO} flex items-center gap-1.5 text-[10px] uppercase tracking-[0.04em] ${status.text}`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${status.dot}`} aria-hidden="true" />{" "}
              {statusLabel[project.status]}
            </span>
          </div>

          {SECTIONS.map(({ key, title }) => (
            <section key={key} className="py-4 border-t border-white/40">
              <h2 className="text-xl font-bold mb-2.5">{title}</h2>
              <p className="text-[14.5px] leading-[1.7] text-[var(--b2b-mute)]">
                {project[key] || "Details coming soon."}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
