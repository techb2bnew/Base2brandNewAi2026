"use client";

import Capabilities from "@/components/ai/Capabilities";
import ConnectedSystemsWorkflow from "./ConnectedSystemsWorkflow";
import {
  Building2,
  Users,
  Mail,
  Database,
  FileText,
  Braces,
  Network,
  BrainCircuit,
  GitBranch,
} from "lucide-react";
import { SiShopify, SiWhatsapp } from "react-icons/si";

const SYSTEMS_CAPS = [
  {
    icon: Building2,
    title: "ERP",
    tagline: "Operations that think ahead",
    desc: "AI.me reads your ERP in real time and turns operational data into decisions.",
    accent: true,
    items: [
      "Predicts stock-outs and drafts reorder requests",
      "Flags delayed shipments and cost overruns instantly",
      "Answers finance and inventory questions in plain language",
    ],
    cta: "Explore ERP integration",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: Users,
    title: "CRM",
    tagline: "Every customer, fully understood",
    desc: "AI.me connects to your CRM to give every team the full customer picture.",
    items: [
      "Identifies at-risk deals and customers before they churn",
      "Writes personalized follow-ups for account managers",
      "Auto-updates records after every call, email and chat",
    ],
    cta: "Explore CRM integration",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: SiShopify,
    title: "Shopify",
    tagline: "Your store, on autopilot",
    desc: "AI.me monitors your store and acts on what it finds.",
    accent: true,
    items: [
      "Tracks orders, returns and refunds as they happen",
      "Finds why sales dipped or refunds spiked",
      "Sends order updates to customers automatically",
    ],
    cta: "Explore Shopify integration",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: SiWhatsapp,
    title: "WhatsApp",
    tagline: "Replies where your customers are",
    desc: "AI.me handles customer conversations on the channel they already use.",
    accent: true,
    items: [
      "Answers order, product and support queries 24/7",
      "Pulls live data from ERP and CRM for every reply",
      "Supports English and Arabic",
    ],
    cta: "Explore WhatsApp integration",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: Mail,
    title: "Email",
    tagline: "Inbox into action",
    desc: "AI.me reads, understands and acts on your business email.",
    items: [
      "Summarizes urgent threads every morning",
      "Drafts context-aware replies for review",
      "Logs key updates to CRM automatically",
    ],
    cta: "Explore Email integration",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: Database,
    title: "Databases",
    tagline: "Ask your data in English",
    desc: "AI.me turns plain questions into accurate, instant answers.",
    items: [
      "No SQL or dashboards needed",
      "Generates reports and charts on demand",
      "Keeps access secure and role-based",
    ],
    cta: "Explore Database integration",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: FileText,
    title: "Documents",
    tagline: "Your knowledge, instantly searchable",
    desc: "AI.me turns contracts, SOPs and policies into a private memory.",
    accent: true,
    items: [
      "Finds exact clauses, terms and answers in seconds",
      "Cites the source document for every answer",
      "Keeps knowledge current as documents change",
    ],
    cta: "Explore Document memory",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: Braces,
    title: "Internal APIs",
    tagline: "Your systems, AI-ready",
    desc: "AI.me connects to the custom tools only your company has.",
    items: [
      "Calls internal APIs securely to fetch or update data",
      "Turns legacy systems into AI-usable tools",
      "Works within your existing permissions",
    ],
    cta: "Explore API integration",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: Network,
    title: "MCP Tools",
    tagline: "Plug in any tool",
    desc: "AI.me uses the Model Context Protocol to connect tools in minutes.",
    accent: true,
    items: [
      "Adds new tools without custom integration work",
      "Combines data from multiple tools in one answer",
      "Scales as your tool stack grows",
    ],
    cta: "Explore MCP connectivity",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: BrainCircuit,
    title: "AI Agents",
    tagline: "A specialist for every team",
    desc: "AI.me powers dedicated agents for Sales, HR, Finance and Ops.",
    accent: true,
    items: [
      "Each agent knows its team's data and workflows",
      "Agents collaborate across departments",
      "Every action is logged and reviewable",
    ],
    cta: "Explore AI Agents",
    ctaHref: "#connected-systems-example",
  },
  {
    icon: GitBranch,
    title: "Business Workflows",
    tagline: "Processes that run themselves",
    desc: "AI.me automates multi-step work across every connected system.",
    accent: true,
    items: [
      "Runs onboarding, approvals and escalations end-to-end",
      "Triggers actions based on real-time events",
      "Keeps humans in the loop where it matters",
    ],
    cta: "See Cross-System Workflow ↓",
    ctaHref: "#connected-systems-example",
  },
];

export default function CoreIdea() {
  return (
    <div id="core-idea-wrapper" className="relative">
      <Capabilities
        id="core-idea"
        highlightTag="THE CORE IDEA"
        title="Your Enterprise. One AI Brain."
        description="AI.me sits at the center of your organization and connects every system, tool and workflow you already run on — retrieving context, reasoning over live data, and executing actions."
        capsData={SYSTEMS_CAPS}
      />
      <ConnectedSystemsWorkflow />
    </div>
  );
}
