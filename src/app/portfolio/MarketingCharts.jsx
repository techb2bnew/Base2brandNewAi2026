// PLACEHOLDER — the original MarketingCharts.jsx was not copied over from the old React project.
// Replace this file with the original (StatsBarChart, KeywordIntentPieChart, GrowthFunnelVisual,
// getIntentColorMap). StatsBarChart and GrowthFunnelVisual are still stubs (render nothing); KeywordIntentPieChart is rebuilt from the old CSS; the rest of the case study works.

const INTENT_COLORS = [
  "var(--b2b-primary)",
  "var(--b2b-primary-2)",
  "#4ade80",
  "#fbbf24",
  "#a78bfa",
  "#38bdf8",
];

// { [intent]: color } in order of first appearance — used to group keywords by intent.
export function getIntentColorMap(keywords = []) {
  const map = {};
  keywords.forEach((kw) => {
    const intent = kw.intent || "Commercial";
    if (!(intent in map)) map[intent] = INTENT_COLORS[Object.keys(map).length % INTENT_COLORS.length];
  });
  return map;
}

export function StatsBarChart() {
  return null;
}

// Client component (hover state) — lives in its own file so this module stays server-safe.
export { default as KeywordIntentPieChart } from "./marketing/KeywordIntentPieChart";

export function GrowthFunnelVisual() {
  return null;
}
