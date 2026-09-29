import "./ai-me-aws.css";
import Hero from "@/components/ai-me-aws/Hero";
import CoreIdea from "@/components/ai-me-aws/CoreIdea";
import HowItWorks from "@/components/ai-me-aws/HowItWorks";
import LiveExample from "@/components/ai-me-aws/LiveExample";
import AgentEcosystem from "@/components/ai-me-aws/AgentEcosystem";
import ArchitectureDiagram from "@/components/ai-me-aws/ArchitectureDiagram";
import AwsPositioning from "@/components/ai-me-aws/AwsPositioning";
import EventCTA from "@/components/ai-me-aws/EventCTA";

export const metadata = {
  title: "AI.me — The AI Operating Layer for Your Enterprise | Base2Brand",
  description:
    "AI.me connects your company's data, systems, apps and AI agents through one intelligent workspace. Meet us at AI Everything Abu Dhabi, 6–7 Oct 2026.",
  alternates: {
    canonical: "https://www.base2brand.com/ai-everything-abu-dhabi",
  },
};

export default function AiMeAwsPage() {
  return (
    <main
      data-testid="ai-me-aws-page"
      className="theme-ai-me-aws relative overflow-x-hidden text-white"
    >
      <Hero />
      <CoreIdea />
      <HowItWorks />
      <LiveExample />
      <AgentEcosystem />
      <ArchitectureDiagram />
      <AwsPositioning />
      <EventCTA />
    </main>
  );
}
