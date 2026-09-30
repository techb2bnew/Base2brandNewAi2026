import { GrowthFunnelVisual } from "../MarketingCharts";
import SectionHeader from "./SectionHeader";
import { SECTION } from "./styles";

export default function GrowthFlow({ growthSystem, chapter = "06" }) {
  if (!growthSystem || !Array.isArray(growthSystem.steps) || growthSystem.steps.length === 0) {
    return null;
  }

  return (
    <section className={SECTION} id="funnel">
      <SectionHeader
        chapter={chapter}
        eyebrow="Conversion Funnel"
        aside="Visual Growth Flow"
        title="The Growth System"
        lead={growthSystem.description}
      />

      <GrowthFunnelVisual steps={growthSystem.steps} />
    </section>
  );
}
