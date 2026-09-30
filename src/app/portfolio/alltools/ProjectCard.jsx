import Link from "next/link";
import VectorFlowChart from "./VectorFlowChart";
import RadarChart from "./RadarChart";
import { statusLabel } from "../data/projects";

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
  "border border-transparent px-[18px] py-[11px] transition-[transform,box-shadow,background,border-color,color] duration-200 ease-in-out";
const BTN_SOLID =
  "bg-[var(--b2b-primary)] text-[var(--b2b-on-primary)] hover:-translate-y-0.5 " +
  "hover:shadow-[0_10px_28px_-8px_color-mix(in_srgb,var(--b2b-primary)_55%,transparent)]";
const BTN_GHOST =
  "bg-transparent border-[var(--b2b-line-strong)] text-[var(--b2b-ink)] " +
  "hover:border-[var(--b2b-primary)] hover:text-[var(--b2b-primary)]";
const BTN_DISABLED = "opacity-[0.45] cursor-not-allowed pointer-events-none";

const CARD_BASE =
  "group relative bg-[var(--b2b-glass-bg)] backdrop-blur-md border-r border-b border-[var(--b2b-line)] " +
  "transition-[background,transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:bg-[color-mix(in_srgb,var(--b2b-ink)_6%,var(--b2b-glass-bg))] hover:-translate-y-1 " +
  "hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)] hover:z-[2]";

const VARIANT = {
  grid: {
    card: "flex flex-col basis-full min-[901px]:basis-[31.3333%] grow-0 shrink-0",
    preview: "",
    chart: "aspect-square h-auto border-b border-[var(--b2b-line)]",
    body: "flex-1 px-3 py-2.5",
    para: "mb-2",
    footer: "flex justify-between items-center border-t border-[var(--b2b-line)]",
  },
  list: {
    card: "flex flex-row max-[900px]:flex-col items-stretch basis-full grow-0 shrink-0",
    preview: "w-[220px] shrink-0 max-[900px]:w-full",
    chart:
      "aspect-square h-full border-r border-[var(--b2b-line)] " +
      "max-[900px]:aspect-[16/11] max-[900px]:h-auto max-[900px]:border-r-0 max-[900px]:border-b",
    body: "flex-1 flex flex-col justify-center px-6 py-4",
    para: "mb-2.5",
    footer:
      "flex flex-col items-end justify-center gap-2.5 w-[150px] shrink-0 border-l border-[var(--b2b-line)] " +
      "max-[900px]:flex-row max-[900px]:justify-between max-[900px]:items-center max-[900px]:w-full " +
      "max-[900px]:border-l-0 max-[900px]:border-t",
  },
};

export default function ProjectCard({ project, index, variant = "grid" }) {
  const status = STATUS[project.status] ?? STATUS.building;
  const v = VARIANT[variant] ?? VARIANT.grid;
  return (
    <article className={`${CARD_BASE} ${v.card}`}>
      <div className={`relative ${v.preview}`}>
        {!project.image && (
          <div
            className={`${MONO} absolute top-0 inset-x-0 z-[3] flex items-center gap-2.5 px-2.5 py-2 text-[9px] tracking-[0.04em] uppercase text-[var(--b2b-mute)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--b2b-bg)_90%,transparent),transparent)]`}
          >
            <div className="flex gap-1" aria-hidden="true">
              <span className="w-[5px] h-[5px] rounded-full bg-[var(--b2b-line-strong)]" />
              <span className="w-[5px] h-[5px] rounded-full bg-[var(--b2b-line-strong)]" />
              <span className="w-[5px] h-[5px] rounded-full bg-[var(--b2b-line-strong)]" />
            </div>
            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
              {project.code} · {project.slug}
            </span>
            <span className={`flex items-center gap-[5px] ${status.text}`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${status.dot}`} aria-hidden="true" />{" "}
              {statusLabel[project.status]}
            </span>
          </div>
        )}
        {project.image ? (
          <img
            className={`block w-full bg-[var(--b2b-glass-bg)] backdrop-blur-md object-cover ${v.chart}`}
            src={project.image}
            alt={project.name}
          />
        ) : project.chart === "line" ? (
          <VectorFlowChart compact className={v.chart} />
        ) : (
          <RadarChart compact className={v.chart} />
        )}

        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-2.5 bg-[color-mix(in_srgb,var(--b2b-bg)_85%,transparent)] opacity-0 pointer-events-none transition-opacity duration-[250ms] group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
          <Link href={`/portfolio/${project.pageSlug}`} className={`${BTN} ${BTN_SOLID}`}>
            View details
          </Link>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BTN} ${BTN_GHOST}`}
            >
              View live <span className="inline-block" aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className={`${BTN} ${BTN_GHOST} ${BTN_DISABLED}`} aria-disabled="true">
              Not live yet
            </span>
          )}
        </div>
      </div>

      <div className={v.body}>
        <div className="flex justify-between items-baseline mb-0.5">
          <h3 className="text-lg font-bold">{project.name}</h3>
          <span className={`${MONO} text-[11px] ${FAINT}`}>{project.id}</span>
        </div>
        <p className={`line-clamp-3 text-xs leading-[1.25] text-[var(--b2b-mute)] ${v.para}`}>
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-[5px] list-none m-0 p-0">
          {project.meta.map((m) => (
            <li
              key={m}
              className={`${MONO} text-[8.5px] tracking-[0.04em] uppercase text-[var(--b2b-mute)] border border-[var(--b2b-line-strong)] px-[9px] py-[3px] rounded-[30px]`}
            >
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div className={`px-[18px] py-3.5 ${v.footer}`}>
        <span className={`${MONO} flex items-center gap-1.5 text-[10px] uppercase tracking-[0.04em] ${status.text}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${status.dot}`} aria-hidden="true" />{" "}
          {statusLabel[project.status]}
        </span>
        <Link
          href={`/portfolio/${project.pageSlug}`}
          className={`${MONO} text-[11px] uppercase tracking-[0.05em] text-[var(--b2b-mute)] transition-colors duration-200 group-hover:text-[var(--b2b-primary)]`}
        >
          Open <span className="inline-block" aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
