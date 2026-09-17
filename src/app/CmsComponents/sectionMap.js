import Hero1 from "@/CmsComponents/Hero1";
import Hero2 from "@/CmsComponents/Hero2";
import WhyBase2Brand from "@/CmsComponents/WhyBase2Brand";
import Narrative from "@/CmsComponents/Narrative";
import Capabilities from "@/CmsComponents/Capabilities";
import Process from "@/CmsComponents/Process";
import Hero3 from "@/CmsComponents/Hero3";
import BuildingNow from "@/CmsComponents/BuildingNow";
import MissionDossierFan from "@/CmsComponents/MissionDossierFan";
import PlatformExplorer from "@/CmsComponents/PlatformExplorer";
import ProcessSteps from "@/CmsComponents/ProcessSteps";
import VideoContainer from "@/CmsComponents/VideoContainer";
import FAQ from "@/CmsComponents/FAQ";
import UseCases from "@/CmsComponents/UseCases";
import FinalCTA from "@/CmsComponents/FinalCTA";
import CardCTA from "@/CmsComponents/CardCTA";
import GrowthStats from "@/CmsComponents/GrowthStats";
import GrowthSystem from "@/CmsComponents/GrowthSystem";
import WorkCarousel from "@/CmsComponents/WorkCarousel";
import Industries from "@/CmsComponents/Industries";
import ClientFootprint from "@/CmsComponents/ClientFootprint";

export const sectionMap = [
  { id: "hero-1", name: "Hero 1", type: "hero-1", component: Hero1 },
  { id: "hero-2", name: "Hero 2 (Software)", type: "hero-2", component: Hero2 },
  { id: "why-base2brand", name: "Why Base2Brand", type: "why-base2brand", component: WhyBase2Brand },
  { id: "narrative", name: "Narrative", type: "narrative", component: Narrative },
  { id: "capabilities", name: "Capabilities", type: "capabilities", component: Capabilities },
  { id: "process", name: "Process", type: "process", component: Process },
  { id: "hero-3", name: "Hero 3 (AI Search)", type: "hero-3", component: Hero3 },
  { id: "building-now", name: "Building Now", type: "building-now", component: BuildingNow },
  { id: "mission-dossier-fan", name: "Mission Dossier Fan", type: "mission-dossier-fan", component: MissionDossierFan },
  { id: "platform-explorer", name: "Platform Explorer", type: "platform-explorer", component: PlatformExplorer },
  { id: "process-steps", name: "Process Steps", type: "process-steps", component: ProcessSteps },
  { id: "video-container", name: "Video Container", type: "video-container", component: VideoContainer },
  { id: "faq", name: "FAQ", type: "faq", component: FAQ },
  { id: "use-cases", name: "Use Cases", type: "use-cases", component: UseCases },
  { id: "final-cta", name: "Final CTA", type: "final-cta", component: FinalCTA },
  { id: "card-cta", name: "Card CTA", type: "card-cta", component: CardCTA },
  { id: "growth-stats", name: "Growth Stats", type: "growth-stats", component: GrowthStats },
  { id: "growth-system", name: "Growth System", type: "growth-system", component: GrowthSystem },
  { id: "case-card", name: "Case Study Card", type: "case-card", component: WorkCarousel },
  { id: "industries", name: "Industries Section", type: "industries", component: Industries },
  { id: "client-footprint", name: "Client Footprint (Globe)", type: "client-footprint", component: ClientFootprint },
];

export const getSectionComponent = (type) =>
  sectionMap.find((entry) => entry.type === type)?.component;
