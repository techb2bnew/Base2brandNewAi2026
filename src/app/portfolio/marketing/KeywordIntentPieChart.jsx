"use client";

import { useState } from "react";
import { getIntentColorMap } from "../MarketingCharts";
import { MONO, FAINT } from "./styles";

// SVG donut geometry (viewBox units; the chart scales with its container)
const CX = 100;
const CY = 100;
const R = 80;
const STROKE = 26;
const C = 2 * Math.PI * R;

// Donut + legend for the keyword intent split, generated from the keywords data
// (e.g. Local 67% / Commercial 33%). Colors come from getIntentColorMap.
export default function KeywordIntentPieChart({ keywords = [] }) {
  const [hovered, setHovered] = useState(null);

  if (!keywords.length) return null;

  const colors = getIntentColorMap(keywords);
  const total = keywords.length;
  const rows = Object.keys(colors).map((intent) => {
    const count = keywords.filter((kw) => (kw.intent || "Commercial") === intent).length;
    return { intent, count, color: colors[intent], pct: (count / total) * 100 };
  });

  const top = rows.reduce((a, b) => (b.count > a.count ? b : a), rows[0]);

  let offset = 0;
  const segments = rows.map((row) => {
    const len = (row.pct / 100) * C;
    const seg = { ...row, len, offset };
    offset += len;
    return seg;
  });

  return (
    <div className="flex flex-col min-w-0 border border-[var(--b2b-line)] bg-[var(--b2b-bg)]">
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-2 max-[640px]:px-[18px] max-[640px]:py-4 border-b border-[var(--b2b-line)] bg-[color-mix(in_srgb,var(--b2b-line)_35%,transparent)]">
        <div>
          <span className={`${MONO} block mb-1.5 text-[9.5px] tracking-[0.08em] uppercase text-[var(--b2b-primary)]`}>
            Keyword Intent
          </span>
          <h3 className="text-base font-bold tracking-[-0.01em] leading-[1.3] text-[var(--b2b-ink)]">
            Search Intent Breakdown
          </h3>
        </div>
        <span
          className={`${MONO} inline-flex items-center gap-1.5 whitespace-nowrap text-[10px] tracking-[0.05em] uppercase text-[var(--b2b-mute)]`}
        >
          {total} keywords
        </span>
      </div>

      <div className="flex flex-1 flex-row max-[760px]:flex-col items-center gap-10 max-[760px]:gap-6 px-8 py-7 max-[760px]:px-[18px] max-[760px]:py-6">
        <div className="w-[230px] max-w-[250px] shrink-0 aspect-square max-[760px]:w-full max-[760px]:max-w-[210px] max-[760px]:mx-auto">
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label={`Search intent breakdown: ${rows
              .map((r) => `${r.intent} ${Math.round(r.pct)}%`)
              .join(", ")}`}
          >
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke="var(--b2b-line)"
              strokeWidth={STROKE}
            />
            {segments.map((seg) => (
              <circle
                key={seg.intent}
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke={seg.color}
                strokeWidth={STROKE}
                strokeDasharray={`${seg.len} ${C - seg.len}`}
                strokeDashoffset={-seg.offset}
                transform={`rotate(-90 ${CX} ${CY})`}
                style={{
                  opacity: hovered && hovered !== seg.intent ? 0.35 : 1,
                  transition: "opacity 0.15s ease",
                }}
                onMouseEnter={() => setHovered(seg.intent)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
            <text
              x={CX}
              y={CY + 4}
              textAnchor="middle"
              fill="var(--b2b-ink)"
              style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em" }}
            >
              {Math.round(top.pct)}%
            </text>
            <text
              x={CX}
              y={CY + 20}
              textAnchor="middle"
              fill="var(--b2b-mute)"
              style={{
                fontSize: 8.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "var(--b2b-font-mono)",
              }}
            >
              {top.intent}
            </text>
          </svg>
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col border-t border-[var(--b2b-line)]">
          {rows.map((row) => (
            <div
              key={row.intent}
              className={`flex cursor-default flex-col gap-1 px-1 py-2 border-b border-[var(--b2b-line)] transition-colors duration-150 ${
                hovered === row.intent ? "bg-[color-mix(in_srgb,var(--b2b-primary)_4%,transparent)]" : ""
              }`}
              onMouseEnter={() => setHovered(row.intent)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex min-w-0 items-center justify-between gap-3">
                <span className="flex min-w-0 items-center text-[13px] font-medium leading-[1.35] text-[var(--b2b-ink)] [overflow-wrap:anywhere]">
                  <span
                    className="mr-2.5 inline-block h-[7px] w-[7px] shrink-0 rounded-full"
                    style={{ background: row.color }}
                  />
                  {row.intent}
                </span>
                <span className="flex shrink-0 items-baseline gap-2.5 whitespace-nowrap">
                  <span className={`${MONO} text-[10px] opacity-75 text-[var(--b2b-mute)]`}>
                    {String(row.count).padStart(2, "0")}
                  </span>
                  <span className={`${MONO} min-w-[38px] text-right text-xs font-bold text-[var(--b2b-ink)]`}>
                    {Math.round(row.pct)}%
                  </span>
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden bg-[var(--b2b-line)]">
                <div
                  className="h-full transition-[width] duration-[400ms] ease-in-out"
                  style={{ width: `${row.pct}%`, background: row.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
