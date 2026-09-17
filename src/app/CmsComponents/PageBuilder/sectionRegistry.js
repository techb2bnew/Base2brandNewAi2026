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
import FinalCTA from "../FinalCTA";
import CardCTA from "../CardCTA";
import GrowthStats from "../GrowthStats";
import GrowthSystem from "../GrowthSystem";
import WorkCarousel from "../WorkCarousel";
import Industries, { INDUSTRIES_DEFAULT } from "../Industries";
import ClientFootprint, { TOP_REGIONS_DEFAULT } from "../ClientFootprint";

/**
 * sectionRegistry — single source of truth for every section type the
 * CMS page builder can insert onto the canvas.
 *
 * Each entry:
 *   key         - unique identifier used as sectionType
 *   label       - human readable name shown in the picker/canvas/form
 *   category    - grouping used in the SectionPickerModal
 *   component   - the actual React component reference to render
 *   defaultData - dummy/default props used to seed a new instance
 *   fields      - [{ name, type, label }] describing the editable fields
 *                 shown in SectionEditForm. type: "text" | "textarea" |
 *                 "number" | "checkbox" | "array-text" | "array-object"
 *                 (array-object also needs `itemFields`: [{ name, type, label }]
 *                 for each item's own text/number/checkbox/array-text
 *                 sub-fields — array-text nests a whole editable string list
 *                 inside each item)
 *
 * To add a new section later: import its component here and push a new
 * entry — no other file needs to change.
 *
 * THEMING RULE — every section shares one page-wide accent color, set once
 * in CmsPages.jsx and cascaded down as CSS custom properties. A new section
 * component must use these instead of any hardcoded purple/brand hex:
 *   var(--b2b-primary)              base accent color
 *   var(--b2b-primary-light)        lighter tint (gradients, glows, highlights)
 *   var(--b2b-primary-dark)         darker shade (gradient depth)
 *   rgba(var(--b2b-primary-rgb), A)       same, as rgba() with alpha A
 *   rgba(var(--b2b-primary-light-rgb), A)
 *   rgba(var(--b2b-primary-dark-rgb), A)
 * In plain Tailwind classes this works directly, e.g.
 *   className="bg-[color:var(--b2b-primary)]"
 * Inside an SVG, set it via the `style` prop (style={{ stopColor: "var(--b2b-primary)" }}),
 * never as a plain attribute (stopColor="var(--b2b-primary)") — browsers don't
 * reliably resolve CSS variables in SVG presentation attributes, only in style.
 * See Hero1.jsx for a worked example of both cases.
 *
 * CANVAS-AWARENESS RULE — SectionCanvas renders every section with an extra
 * `isBuilderCanvas` prop (true only there; never set in the live Preview tab
 * or a real published page). A section that scroll-jacks the page — pins
 * itself with `position: fixed`, or sets a huge track height to drive a
 * scroll-linked animation (see BuildingNow.jsx) — MUST check this prop and
 * fall back to a normal, static, non-pinned layout when it's true. Inside the
 * builder this section is one compact card among several, not the whole
 * page; letting it hijack `window` scroll breaks the entire admin page's
 * scrolling, not just its own card. A section without this kind of behavior
 * can just ignore the prop.
 */
export const sectionRegistry = [
    {
        key: "hero-1",
        label: "Hero 1",
        category: "Hero Sections",
        default_viewimage: '/images/cmsimages/hero1view.png',
        component: Hero1,
        defaultData: {
            eyebrow: "FROM AUTOMATION TO AUTONOMY",
            headlinePart1: "We engineer AI automation systems that run workflows,",
            headlinePart2: "not demos.",
            subheadline:
                "Base2Brand delivers AI automation services that plug into your existing stack — real workflows, real outcomes, not another chatbot demo.",
            ctaPrimaryText: "Start An AI Transformation",
            ctaPrimaryLink: "#contact",
            ctaSecondaryText: "Explore AI Capabilities",
            ctaSecondaryLink: "#capabilities",
            badges: ["Enterprise Grade", "Workflow-Ready", "Production Deployments", "Outcome-Focused"],
            neuralNodes: [
                { label: "GPT-5", angle: 12, radius: 38, accent: true },
                { label: "Claude", angle: 70, radius: 42 },
                { label: "Gemini", angle: 125, radius: 39, accent: true },
                { label: "Llama", angle: 178, radius: 43 },
                { label: "MCP", angle: 220, radius: 36, accent: true },
                { label: "Agents", angle: 268, radius: 41 },
                { label: "Voice AI", angle: 312, radius: 37 },
                { label: "RAG", angle: 350, radius: 44, accent: true },
                { label: "Automation", angle: 50, radius: 60 },
                { label: "Knowledge", angle: 200, radius: 58 },
            ],
            neuralCoreLabelSmall: "Neural Core",
            neuralCoreLabelBig: "B2B AI",
            rocketColor: "#ffffff",
            rocketFlameColor: "#A855F7",
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "headlinePart1", type: "text", label: "Headline (part 1)" },
            { name: "headlinePart2", type: "text", label: "Headline (highlighted part)" },
            { name: "subheadline", type: "textarea", label: "Subheadline" },
            { name: "ctaPrimaryText", type: "text", label: "Primary CTA text" },
            { name: "ctaPrimaryLink", type: "text", label: "Primary CTA link" },
            { name: "ctaSecondaryText", type: "text", label: "Secondary CTA text" },
            { name: "ctaSecondaryLink", type: "text", label: "Secondary CTA link" },
            { name: "badges", type: "array-text", label: "Badges" },
            {
                name: "neuralNodes",
                type: "array-object",
                label: "Neural Nodes",
                itemFields: [
                    { name: "label", type: "text", label: "Label" },
                    { name: "angle", type: "number", label: "Angle (°)" },
                    { name: "radius", type: "number", label: "Radius (%)" },
                    { name: "accent", type: "checkbox", label: "Accent" },
                ],
            },
            { name: "neuralCoreLabelSmall", type: "text", label: "Neural core label (small)" },
            { name: "neuralCoreLabelBig", type: "text", label: "Neural core label (big)" },
            { name: "rocketColor", type: "text", label: "Rocket color" },
            { name: "rocketFlameColor", type: "text", label: "Rocket flame color" },
        ],
    },
    {
        key: "hero-2",
        label: "Hero 2 (Software)",
        category: "Hero Sections",
        component: Hero2,
        default_viewimage: '/images/cmsimages/hero2view.png',
        defaultData: {
            eyebrowText: "Digital Product Engineering",
            eyebrowSuffix: "— Software Division",
            headlinePart1: "Build software that ",
            headlinePart2: " that scale with your ",
            headlinePart3: " business. ",
            subheadline:
                "Base2Brand delivers software development services for businesses that need more than code. We design and engineer scalable platforms, SaaS products, mobile applications, cloud-native systems and enterprise software solutions built around measurable business outcomes.",
            ctaPrimaryText: "Start a software engagement",
            ctaPrimaryLink: "#cta",
            ctaSecondaryText: "Explore capabilities",
            ctaSecondaryLink: "#capabilities",
            supportingLabels: ["Product Engineering", "Cloud-Native", "Android Development", "Enterprise Scale"],
            metrics: [
                { value: "120+", label: "Software Projects Delivered" },
                { value: "30+", label: "Product Engineers & Architects" },
                { value: "8", label: "Industries Served" },
                { value: "24/7", label: "Product Support Mindset" },
            ],
        },
        fields: [
            { name: "eyebrowText", type: "text", label: "Eyebrow" },
            { name: "eyebrowSuffix", type: "text", label: "Eyebrow suffix" },
            { name: "headlinePart1", type: "text", label: "Headline (part 1)" },
            { name: "headlinePart2", type: "text", label: "Headline (part 2)" },
            { name: "headlinePart3", type: "text", label: "Headline (highlighted part)" },
            { name: "subheadline", type: "textarea", label: "Subheadline" },
            { name: "ctaPrimaryText", type: "text", label: "Primary CTA text" },
            { name: "ctaPrimaryLink", type: "text", label: "Primary CTA link" },
            { name: "ctaSecondaryText", type: "text", label: "Secondary CTA text" },
            { name: "ctaSecondaryLink", type: "text", label: "Secondary CTA link" },
            { name: "supportingLabels", type: "array-text", label: "Supporting labels" },
            {
                name: "metrics",
                type: "array-object",
                label: "Metrics",
                itemFields: [
                    { name: "value", type: "text", label: "Value" },
                    { name: "label", type: "text", label: "Label" },
                ],
            },
        ],
    },
    {
        key: "why-base2brand",
        label: "Why Base2Brand",
        category: "Feature Sections",
        component: WhyBase2Brand,
        default_viewimage: '/images/cmsimages/Whybase2brand.png',
        defaultData: {
            hightlighttag: 'Why Base2Brand ',
            titleUpper: 'Modern software needs more than development, It needs',
            titleLower: 'engineering discipline.',
            description: 'That is why our software development services are built around product thinking, engineering quality and long-term scalability.',
            cardsdata: [
                {
                    icon: 'Wrench',
                    title: "Production-first engineering",
                    desc: "We build software for real users, real traffic and real operational pressure — not just demo screens.",
                    outcome: "Products that are stable, scalable and ready for daily business use.",
                },
                {
                    icon: 'Cloud',
                    title: "Cloud-native from the beginning",
                    desc: "Modern software needs infrastructure that can scale. Our enterprise software solutions are designed with secure cloud architecture, continuous delivery, reliable deployments, and proactive monitoring from day one.",
                    outcome: "Faster releases, better reliability and lower operational friction.",
                },
                {
                    icon: 'Layers3',
                    title: "Cross-platform product thinking",
                    desc: "Web apps, mobile apps, APIs, dashboards and admin systems should feel like one connected product ecosystem.",
                    outcome: "Consistent UX, shared logic and stronger product control.",
                },
                {
                    icon: 'Rocket',
                    title: "Execution with accountability",
                    desc: "Ideas only matter when they ship. We move from roadmap to release with clear ownership, measurable milestones and engineering velocity.",
                    outcome: "Less confusion, faster progress and software that actually reaches users.",
                },
            ],
        },
        fields: [
            { name: "hightlighttag", type: "text", label: "Highlight tag" },
            { name: "titleUpper", type: "text", label: "Title (upper line)" },
            { name: "titleLower", type: "text", label: "Title (highlighted line)" },
            { name: "description", type: "textarea", label: "Description" },
            {
                name: "cardsdata",
                type: "array-object",
                label: "Cards",
                itemFields: [
                    { name: "icon", type: "text", label: "Icon (Wrench, Cloud, Layers3 or Rocket)" },
                    { name: "title", type: "text", label: "Title" },
                    { name: "desc", type: "textarea", label: "Description" },
                    { name: "outcome", type: "textarea", label: "Outcome" },
                ],
            },
        ],
    },
    {
        key: "narrative",
        label: "Narrative",
        category: "Feature Sections",
        component: Narrative,
        default_viewimage: '/images/cmsimages/Narrative.png',
        defaultData: {
            title: "Search has changed. <br /> Google isn't the only search engine anymore.",
            description: [
                "People are no longer only searching through blue links. They are asking AI assistants what to buy, who to trust, which agency to hire, which software to compare and which brand deserves attention.",
                "That is why AI search marketing are becoming a new growth layer built to improve AI visibility for brands across every answer engine that matters.",
            ],
            features: [
                {
                    l: "AI search is exploding",
                    d: "Conversational search is replacing traditional search journeys for high-intent questions.",
                },
                {
                    l: "Buyer behaviour is shifting",
                    d: "Customers now ask AI assistants before they open a search tab, browse a website or contact sales.",
                },
                {
                    l: "Invisibility costs revenue",
                    d: "If AI engines do not cite, explain or recommend your brand, your competitors become the answer.",
                },
            ],
            highlightTag: "",
            tagList: [],
            hideTagColumn: true,
        },
        fields: [
            { name: "title", type: "textarea", label: "Title (supports <br /> for line breaks)" },
            { name: "description", type: "array-text", label: "Description paragraphs" },
            {
                name: "features",
                type: "array-object",
                label: "Features",
                itemFields: [
                    { name: "l", type: "text", label: "Label" },
                    { name: "d", type: "textarea", label: "Description" },
                ],
            },
            { name: "hideTagColumn", type: "checkbox", label: "Hide left tag column" },
            { name: "highlightTag", type: "text", label: "Highlight tag (left column, if shown)" },
            { name: "tagList", type: "array-text", label: "Tag list (left column, if shown)" },
        ],
    },
    {
        key: "capabilities",
        label: "Capabilities",
        category: "Feature Sections",
        component: Capabilities,
        default_viewimage: '/images/cmsimages/Capabilities.png',
        defaultData: {
            title: "From search rankings to AI recommendations",
            description: "Our Growth Visibility practice combines AI SEO, AEO and GEO into one operating system for modern discovery.",
            highlightTag: "The Stack",
            capsData: [
                {
                    icon: "Network",
                    title: "Generative Engine Optimization",
                    span: "md:col-span-7",
                    items: [
                        "Make your brand readable, credible and recommendable for generative AI engines.",
                        "Entity-first content modelling",
                        "AI-readable brand graphs",
                        "Prompt-targeted authority",
                        "LLM-friendly page structure",
                        "Source and citation alignment",
                    ],
                    accent: true,
                },
                {
                    icon: "Workflow",
                    title: "Answer Engine Optimization",
                    span: "md:col-span-5",
                    items: [
                        "Structure your content so AI systems can pull clean, confident answers from your website.",
                        "Question intent mapping",
                        "Structured answer blocks",
                        "Citation-grade signals",
                        "FAQ architecture",
                        "Schema-led content design",
                    ],
                    accent: false,
                },
                {
                    icon: "AudioLines",
                    title: "AI Search Optimization",
                    span: "md:col-span-5",
                    items: [
                        "Build cross-platform visibility across ChatGPT, Gemini, Claude, Perplexity and Google AI Overviews.",
                        "Cross-platform presence",
                        "Recommendation positioning",
                        "Topical depth at scale",
                        "AI visibility tracking",
                        "Competitor answer analysis",
                    ],
                    accent: false,
                },
            ],
        },
        fields: [
            { name: "title", type: "text", label: "Title" },
            { name: "description", type: "textarea", label: "Description" },
            { name: "highlightTag", type: "text", label: "Highlight tag" },
            {
                name: "capsData",
                type: "array-object",
                label: "Capability cards",
                itemFields: [
                    { name: "icon", type: "text", label: "Icon (Network, Workflow or AudioLines)" },
                    { name: "title", type: "text", label: "Title" },
                    { name: "span", type: "text", label: "Grid span (e.g. md:col-span-7)" },
                    { name: "items", type: "array-text", label: "Lead line + bullet items (first item is the lead paragraph)" },
                    { name: "accent", type: "checkbox", label: "Accent" },
                ],
            },
        ],
    },
    {
        key: "process",
        label: "Process",
        category: "Feature Sections",
        component: Process,
        default_viewimage: '/images/cmsimages/process.png',
        defaultData: {
            highlightTag: "Process",
            titleUpper: "Six Steps.",
            titleLower: "One Growth System.",
            description: "We focus on sustainable growth, not short-term wins.",
            StepsData: [
                { id: "01", icon: "Search", label: "Understand", desc: "Map how revenue is generated today." },
                { id: "02", icon: "Microscope", label: "Research", desc: "Decode market, audience, and competition." },
                { id: "03", icon: "Pencil", label: "Strategize", desc: "Design the growth system end-to-end." },
                { id: "04", icon: "Play", label: "Execute", desc: "Deploy campaigns, content, and channels." },
                { id: "05", icon: "Settings2", label: "Optimize", desc: "Tune signals into compounding results." },
                { id: "06", icon: "TrendingUp", label: "Scale", desc: "Expand what works. Retire what doesn't." },
            ],
        },
        fields: [
            { name: "highlightTag", type: "text", label: "Highlight tag" },
            { name: "titleUpper", type: "text", label: "Title (upper line)" },
            { name: "titleLower", type: "text", label: "Title (highlighted line)" },
            { name: "description", type: "textarea", label: "Description" },
            {
                name: "StepsData",
                type: "array-object",
                label: "Steps",
                itemFields: [
                    { name: "id", type: "text", label: "Step number (e.g. 01)" },
                    { name: "icon", type: "text", label: "Icon (Search, Microscope, Pencil, Play, Settings2, TrendingUp or Rocket)" },
                    { name: "label", type: "text", label: "Label" },
                    { name: "desc", type: "textarea", label: "Description" },
                ],
            },
        ],
    },
    {
        key: "hero-3",
        label: "Hero 3 (AI Search)",
        category: "Hero Sections",
        component: Hero3,
        default_viewimage: '/images/cmsimages/hero3.png',
        defaultData: {
            highlightTag: "GEO · AEO · AI Search Optimization",
            titleUpper: "Own",
            titleMiddle: "AI Search",
            titleLower: "competitors do.",
            description:
                "Base2Brand uses AI SEO, AI search marketing, LLM SEO, Generative Engine Optimization and Answer Engine Optimization to help your brand get discovered, cited and recommended faster across ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews.",
            leftCTA: "Book Free Strategy Call",
            rightCTA: "Get AI Visibility Audit",
            floatingMetrics: [
                {
                    label: "AI visibility",
                    value: "+340%",
                    icon: "TrendingUp",
                    x: 4,
                    y: 6,
                    delay: 0.3,
                },
                {
                    label: "ChatGPT mention rate",
                    value: "8.2×",
                    icon: "Bot",
                    x: 60,
                    y: 76,
                    delay: 0.55,
                },
                {
                    label: "Brand authority",
                    value: "Enterprise",
                    icon: "ShieldCheck",
                    x: 66,
                    y: 44,
                    delay: 0.75,
                },
            ],
        },
        fields: [
            { name: "highlightTag", type: "text", label: "Highlight tag" },
            { name: "titleUpper", type: "text", label: "Title (upper line)" },
            { name: "titleMiddle", type: "text", label: "Title (highlighted middle)" },
            { name: "titleLower", type: "text", label: "Title (lower line)" },
            { name: "description", type: "textarea", label: "Description" },
            { name: "leftCTA", type: "text", label: "Primary CTA text" },
            { name: "rightCTA", type: "text", label: "Secondary CTA text" },
            {
                name: "floatingMetrics",
                type: "array-object",
                label: "Floating metrics",
                itemFields: [
                    { name: "label", type: "text", label: "Label" },
                    { name: "value", type: "text", label: "Value" },
                    { name: "icon", type: "text", label: "Icon (TrendingUp, Bot or ShieldCheck)" },
                    // Drag the card directly on the canvas to reposition it
                    // (bounded to the globe panel); these just let you nudge
                    // it numerically too. Both write the same x/y keys.
                    { name: "x", type: "number", label: "Horizontal position (%)" },
                    { name: "y", type: "number", label: "Vertical position (%)" },
                    { name: "delay", type: "number", label: "Reveal delay (seconds)" },
                ],
            },
        ],
    },
    {
        key: "building-now",
        label: "Building Now",
        category: "Scroll Animation",
        component: BuildingNow,
        default_viewimage: '/images/cmsimages/buildingNow.png',
        defaultData: {
            highlightTag: "AI SEARCH GROWTH SYSTEMS ",
            title: "What we are building for AI-first growth.",
            description:
                "Six categories of AI visibility systems, shipped into production — helping brands get discovered, cited and recommended across the new search landscape.",
            ITEMS: [
                {
                    icon: "Users",
                    title: "AI Visibility Workforce",
                    tagline: "Digital growth operators for AI-first search.",
                    desc: "A dedicated operating layer for monitoring where your brand appears, where it is missing and what AI engines currently understand about your business.",
                    metrics: ["Brand visibility checks", "Prompt testing", "AI search monitoring"],
                },
                {
                    icon: "GitBranch",
                    title: "GEO Operations",
                    tagline: "Growth workflows for generative engines.",
                    desc: "Coordinated workflows that optimize your brand for ChatGPT, Gemini, Claude, Perplexity and Google AI Overviews through structured signals, entity clarity and trusted content layers.",
                    metrics: ["GEO-ready", "Entity signals", "AI citations"],
                },
                {
                    icon: "Briefcase",
                    title: "Answer Engine Optimization",
                    tagline: "Own the answers buyers now trust.",
                    desc: "Content architecture that helps AI engines extract direct, accurate and citation-ready answers from your pages",
                    metrics: ["FAQ blocks", "Schema structure", "Answer-ready content"],
                },
                {
                    icon: "BrainCircuit",
                    title: "AI Search Intelligence",
                    tagline: "Visibility decisions backed by live signals.",
                    desc: "AI search marketing intelligence that shows how buyers ask, what engines recommend and which competitors already own the answer.",
                    metrics: ["Prompt research", "Competitor analysis", "Share-of-answer tracking"],
                },
                {
                    icon: "PhoneCall",
                    title: "AI Buyer Journey Content",
                    tagline: "Content built for how buyers now search.",
                    desc: "Content designed around real AI prompts, buyer questions, comparison searches and decision-stage queries.",
                    metrics: ["Buyer intent", "Commercial questions", "LLM SEO content"],
                },
                {
                    icon: "LayoutDashboard",
                    title: "AI Visibility Command Center",
                    tagline: "One dashboard for AI search growth.",
                    desc: "A reporting system that tracks mentions, citations, sentiment, competitor visibility and recommendation frequency across AI engines.",
                    metrics: ["AI visibility analytics ", "Brand mentions", "Recommendation tracking"],
                },
            ],
        },
        fields: [
            { name: "highlightTag", type: "text", label: "Highlight tag" },
            { name: "title", type: "textarea", label: "Title (supports basic HTML)" },
            { name: "description", type: "textarea", label: "Description (supports basic HTML)" },
            {
                name: "ITEMS",
                type: "array-object",
                label: "Programs",
                itemFields: [
                    { name: "icon", type: "text", label: "Icon (Users, GitBranch, Briefcase, BrainCircuit, PhoneCall, LayoutDashboard, Compass, Megaphone, Search, Share2 or FlaskConical)" },
                    { name: "title", type: "text", label: "Title" },
                    { name: "tagline", type: "text", label: "Tagline" },
                    { name: "desc", type: "textarea", label: "Description" },
                    { name: "metrics", type: "array-text", label: "Metric chips" },
                ],
            },
        ],
    },
    {
        key: "mission-dossier-fan",
        label: "Mission Dossier Fan",
        category: "Carousel Sections",
        component: MissionDossierFan,
        default_viewimage: '/images/cmsimages/MissionDossierCard.png',
        defaultData: {
            eyebrow: "PLAYBOOKS · MISSION DOSSIERS",
            title: "Five dossiers. One mobility mission.",
            subtitle: "How we run an automotive engagement — from connected vehicles to lifetime customer operations — as a fan of focused dossiers.",
            badgeLabel: 5,
            cards: [
                {
                    id: "dossier-01",
                    code: "DOSSIER-01",
                    title: "AI & Vehicle Automation",
                    body: "Deploy fleet intelligence, predictive service agents, OTA copilots, warranty automation and customer support AI across connected mobility workflows.",
                    accent: "MOBILITY AUTOMATION",
                    channel: "CHANNEL A · LOCKED",
                },
                {
                    id: "dossier-02",
                    code: "DOSSIER-02",
                    title: "Automotive Software Development",
                    body: "Build connected vehicle platforms, dealer portals, service apps, customer dashboards and OEM cloud experiences for software-defined mobility.",
                    accent: "CONNECTED SOFTWARE",
                    channel: "CHANNEL A · LOCKED",
                },
                {
                    id: "dossier-03",
                    code: "DOSSIER-03",
                    title: "Governance, Risk & Trust",
                    body: "Establish compliance-ready systems for OTA releases, vehicle cybersecurity, data privacy, regional safety frameworks and audit-grade software delivery.",
                    accent: "COMPLIANCE & TRUST",
                    channel: "CHANNEL A · LOCKED",
                },
                {
                    id: "dossier-04",
                    code: "DOSSIER-04",
                    title: "Shopify Automotive Commerce",
                    body: "Launch Shopify experiences for parts, accessories, service packages, dealer-led commerce and mobility brands with connected customer journeys.",
                    accent: "AUTO COMMERCE",
                    channel: "CHANNEL A · LOCKED",
                },
                {
                    id: "dossier-05",
                    code: "DOSSIER-05",
                    title: "Automotive Data & AI Intelligence",
                    body: "Unify telemetry, dealer, service, customer, finance and vehicle data into AI-powered dashboards, prediction models and decision systems.",
                    accent: "DATA INTELLIGENCE",
                    channel: "CHANNEL A · LOCKED",
                },
            ],
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "title", type: "text", label: "Title" },
            { name: "subtitle", type: "textarea", label: "Subtitle" },
            { name: "badgeLabel", type: "number", label: "Badge count (shown as \"N DOSSIERS\")" },
            {
                name: "cards",
                type: "array-object",
                label: "Dossiers",
                itemFields: [
                    { name: "id", type: "text", label: "ID" },
                    { name: "code", type: "text", label: "Code (e.g. DOSSIER-01)" },
                    { name: "title", type: "text", label: "Title" },
                    { name: "body", type: "textarea", label: "Body" },
                    { name: "accent", type: "text", label: "Accent label" },
                    { name: "channel", type: "text", label: "Channel label" },
                ],
            },
        ],
    },
    {
        key: "platform-explorer",
        label: "Platform Explorer",
        category: "Scroll Animation",
        component: PlatformExplorer,
        default_viewimage: '/images/cmsimages/PlatformExplorer.png',
        defaultData: {
            eyebrow: "Ecosystem Explorer",
            title: "Every device your users touch, engineered under one product vision",
            subtitle: "Apple products perform best when every surface feels connected. We design each device experience around its actual role — not by copying the same interface everywhere.",
            platforms: [
                {
                    id: "iphone",
                    label: "iPhone",
                    icon: "Smartphone",
                    headline: "The flagship surface and your highest-leverage customer canvas.",
                    body: "Most digital journeys start or end on iPhone. Our iPhone app development team builds native iOS apps with clean UX, strong performance, secure architecture and conversion-focused user flows.",
                    tags: ["Swift", "SwiftUI", "App Intents", "WidgetKit", "Live Activities", "UIKit"],
                    statValue: "60fps",
                    statLabel: "Native interaction floor",
                },
                {
                    id: "ipad",
                    label: "iPad",
                    icon: "Tablet",
                    headline: "Designed for productivity, content and field workflows.",
                    body: "iPad experiences need space, clarity and stronger task flows. We build iPad apps for sales teams, operations, healthcare, education, training, dashboards and assisted workflows.",
                    tags: ["iPadOS", "Split View", "Stage Manager", "Apple Pencil", "Multitasking"],
                    statValue: "12.9″",
                    statLabel: "Designed for the canvas",
                },
                {
                    id: "watch",
                    label: "Apple Watch",
                    icon: "Watch",
                    headline: "Built for instant action and glanceable value.",
                    body: "We design Apple Watch experiences that reduce friction — alerts, approvals, health signals, task updates, field notifications and companion actions.",
                    tags: ["watchOS", "HealthKit", "WidgetKit", "Complications", "Watch Connectivity"],
                    statValue: "<1s",
                    statLabel: "Glance-to-action target",
                },
                {
                    id: "vision",
                    label: "Vision Pro",
                    icon: "Glasses",
                    headline: "Spatial computing for products that need depth, training and immersion.",
                    body: "Our Vision Pro app development practice helps businesses create immersive applications for product visualization, enterprise training, medical education, simulation, collaboration and spatial dashboards.",
                    tags: ["VisionOS", "RealityKit", "ARKit", "Spatial workflows", "Reality Composer Pro"],
                    statValue: "Spatial",
                    statLabel: "First-class design language",
                },
                {
                    id: "tv",
                    label: "Apple TV",
                    icon: "Tv",
                    headline: "Large-screen experiences built for clarity and control.",
                    body: "We create Apple TV applications for content, training, enterprise dashboards, hospitality, retail experiences and internal communication systems.",
                    tags: ["tvOS", "SwiftUI", "AVKit", "TVML", "Focus Engine"],
                    statValue: "4K HDR",
                    statLabel: "Render target",
                },
                {
                    id: "carplay",
                    label: "CarPlay",
                    icon: "Car",
                    headline: "Vehicle-ready interfaces designed for safety and speed.",
                    body: "CarPlay experiences need focus, simplicity and operational reliability. We build CarPlay interfaces for mobility, logistics, transport, navigation-linked workflows and service platforms.",
                    tags: ["CarPlay", "MapKit", "SiriKit", "Core Location", "SwiftUI"],
                    statValue: "Hands-free",
                    statLabel: "Designed for safety",
                },
            ],
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "title", type: "textarea", label: "Title" },
            { name: "subtitle", type: "textarea", label: "Subtitle" },
            {
                name: "platforms",
                type: "array-object",
                label: "Platforms",
                itemFields: [
                    { name: "id", type: "text", label: "ID (e.g. iphone)" },
                    { name: "label", type: "text", label: "Label" },
                    { name: "icon", type: "text", label: "Icon (Smartphone, Tablet, Watch, Glasses, Tv or Car)" },
                    { name: "headline", type: "text", label: "Headline" },
                    { name: "body", type: "textarea", label: "Body" },
                    { name: "tags", type: "array-text", label: "Tags" },
                    { name: "statValue", type: "text", label: "Stat value (e.g. 60fps)" },
                    { name: "statLabel", type: "text", label: "Stat label" },
                ],
            },
        ],
    },
    {
        key: "process-steps",
        label: "Process Steps",
        category: "Feature Sections",
        component: ProcessSteps,
        default_viewimage: '/images/cmsimages/ProcessSteps.png',
        defaultData: {
            eyebrow: "Development Process",
            titleUpper: "From discovery to operate —",
            titleLower: "one continuous engagement.",
            steps: [
                {
                    n: "01",
                    title: "Discovery & Product Strategy",
                    body: "We start with your business model, user context, existing Apple footprint, technical needs and growth goals. Outcome: A clear point of view on what to build, which Apple surfaces matter and what should ship first.",
                    artefacts: ["Opportunity map", "Surface decision matrix", "Risk audit"],
                },
                {
                    n: "02",
                    title: "Experience Architecture",
                    body: "Design and engineering work together from week one. We define interaction models, user journeys, accessibility, motion, haptics, content structure and technical architecture before production begins.",
                    artefacts: ["UX architecture", "SwiftUI design system", "Motion & haptics spec", "Accessibility Guidelines"],
                },
                {
                    n: "03",
                    title: "Production Engineering",
                    body: "Our engineering team builds native Apple software using Swift, SwiftUI, secure APIs, App Intents, CloudKit and production-ready release pipelines. This is where iPhone app development and enterprise iOS app development move from concept to working product.",
                    artefacts: ["Swift", "SwiftUI", "Xcode Cloud", "TestFlight", "CloudKit", "App Intents"],
                },
                {
                    n: "04",
                    title: "Apple Intelligence & Ecosystem",
                    body: "We integrate intelligence as a first-class product layer — App Intents, Spotlight, Siri, widgets, Live Activities, Watch workflows and Vision Pro touchpoints.",
                    artefacts: ["App Intents", "Live Activities", "Cross-surface continuity", "Siri Integration", "WidgetKit"],
                },
                {
                    n: "05",
                    title: "Release & App Store Strategy",
                    body: "We engineer the release, not just the build. From metadata and App Store readiness to phased rollout, TestFlight, analytics, crash monitoring and post-launch optimization.",
                    artefacts: ["App Store strategy", "TestFlight", "Release roadmap", "Release Planning", "Phased Rollouts"],
                },
                {
                    n: "06",
                    title: "Operate, Scale, Evolve",
                    body: "After launch, we continue improving performance, security, compatibility, accessibility, analytics and feature roadmap alignment.",
                    artefacts: ["Performance budgets", "Version migration", "Product roadmap"],
                },
            ],
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "titleUpper", type: "text", label: "Title (upper line)" },
            { name: "titleLower", type: "text", label: "Title (highlighted line)" },
            {
                name: "steps",
                type: "array-object",
                label: "Steps",
                itemFields: [
                    { name: "n", type: "text", label: "Step number (e.g. 01)" },
                    { name: "title", type: "text", label: "Title" },
                    { name: "body", type: "textarea", label: "Body" },
                    { name: "artefacts", type: "array-text", label: "Artefact chips" },
                ],
            },
        ],
    },
    {
        key: "video-container",
        label: "Video Container",
        category: "Video Sections",
        component: VideoContainer,
        default_viewimage: '/images/cmsimages/VideoContainer.png',
        defaultData: {
            eyebrow: "COMMAND CENTER",
            title: "Every workflow. Every agent. One AI operating layer.",
            subtitle: "We engineer enterprise AI automation that orchestrates agents, workflows, business systems and real-time data from one intelligent control layer. From AI copilots and document intelligence to workflow automation and system integrations, every decision becomes faster, smarter and measurable.",
            // Always an externally-hosted (Cloudinary) URL — there's no file
            // upload step in this builder, just paste the hosted video URL.
            videoUrl: "/videos/Base2Brand_ Your Pathway to Success! A Creative Digital Marketing & Web Development Agency newCompressed.mp4",
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "title", type: "text", label: "Title" },
            { name: "subtitle", type: "textarea", label: "Subtitle" },
            { name: "videoUrl", type: "text", label: "Video URL (Cloudinary)" },
        ],
    },
    {
        key: "faq",
        label: "FAQ",
        category: "FAQ",
        component: FAQ,
        default_viewimage: '/images/cmsimages/Faq.png',
        defaultData: {
            eyebrow: "Frequently",
            title: "Asked Questions",
            faqData: [
                {
                    question: "What does Base2Brand do?",
                    answer: "Base2Brand builds connected digital growth systems for brands through performance marketing, AI automation, Shopify, CRO, mobile apps, enterprise software, branding and customer experience design.",
                },
                {
                    question: "How is Base2Brand different from a normal marketing or IT agency?",
                    answer: "Base2Brand does not work in disconnected silos. Strategy, creative, media, technology, AI, analytics and conversion optimization are connected into one system focused on measurable business growth.",
                },
                {
                    question: "Does Base2Brand provide performance marketing services?",
                    answer: "Yes. Base2Brand plans, launches and scales performance campaigns across Google Ads, Meta Ads, LinkedIn, YouTube and marketplace platforms with a focus on leads, revenue, ROAS and conversion quality.",
                },
                {
                    question: "Can Base2Brand help improve website conversions?",
                    answer: "Yes. Base2Brand provides CRO services for landing pages, Shopify stores, product pages, forms, checkout flows and lead-generation funnels to help brands convert more traffic into customers.",
                },
                {
                    question: "Does Base2Brand build Shopify and ecommerce websites?",
                    answer: "Yes. Base2Brand builds Shopify stores, Shopify Plus experiences, custom ecommerce websites, subscription commerce systems, checkout journeys and retention-focused customer experiences.",
                },
                {
                    question: "What kind of AI solutions does Base2Brand build?",
                    answer: "Base2Brand builds AI chatbots, AI sales assistants, lead scoring systems, marketing automation workflows, predictive analytics, generative AI workflows and custom AI applications for business growth.",
                },
                {
                    question: "Who does Base2Brand work with?",
                    answer: "Base2Brand works with D2C brands, ecommerce businesses, healthcare companies, education platforms, SaaS companies, real estate brands, manufacturers, professional services firms and enterprise teams.",
                },
            ],
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "title", type: "text", label: "Title" },
            {
                name: "faqData",
                type: "array-object",
                label: "FAQ Questions",
                itemFields: [
                    { name: "question", type: "text", label: "Question" },
                    { name: "answer", type: "textarea", label: "Answer" },
                ],
            },
        ],
    },
    {
        key: "use-cases",
        label: "Use Cases",
        category: "Use Cases",
        component: UseCases,
        default_viewimage: '/images/cmsimages/UseCases.png',
        defaultData: {
            eyebrow: "Use Cases",
            title: "Where emerging technology",
            highlightedTitle: "earns its place.",
            useCases: [
                {
                    tag: "AI",
                    title: "AI-Powered Business Operations",
                    description:
                        "Automate repetitive business tasks, generate insights, support teams and improve decision-making with production-ready AI systems.",
                },
                {
                    tag: "Automation",
                    title: "Smart Automation Workflows",
                    description:
                        "Connect CRM, websites, WhatsApp, email, sales tools and internal platforms so every process moves faster and cleaner.",
                },
                {
                    tag: "IoT",
                    title: "IoT Operations & Monitoring",
                    description:
                        "Track assets, devices, field activity, industrial workflows and operational performance in real time.",
                },
                {
                    tag: "Blockchain",
                    title: "Blockchain Trust Systems",
                    description:
                        "Build secure, transparent systems for ownership, transactions, verification and traceability.",
                },
                {
                    tag: "Metaverse",
                    title: "Metaverse Product Experiences",
                    description:
                        "Create immersive environments for product demos, virtual stores, training spaces and brand engagement.",
                },
                {
                    tag: "Cloud",
                    title: "Cloud & Data Infrastructure",
                    description:
                        "Modernize servers, data centres, storage, cloud systems and business-critical applications for secure scaling.",
                },
            ],
            introText: "Base2Brand applies AI technology solutions, automation technology solutions and next-gen...",
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "title", type: "text", label: "Title (first line)" },
            { name: "highlightedTitle", type: "text", label: "Title (highlighted line)" },
            { name: "introText", type: "textarea", label: "Intro text" },
            {
                name: "useCases",
                type: "array-object",
                label: "Use Cases",
                itemFields: [
                    { name: "tag", type: "text", label: "Tag" },
                    { name: "title", type: "text", label: "Title" },
                    { name: "description", type: "textarea", label: "Description" },
                ],
            },
        ],
    },
    {
        key: "final-cta",
        label: "Final CTA",
        category: "Final CTA",
        component: FinalCTA,
        default_viewimage: '/images/cmsimages/finalcta.png',
        defaultData: {
            highlightTag: "Final CTA",
            titleUpper: "Let's build something",
            titleLower: "Extraordinary together.",
            description: "Join forward-thinking brands who trust Base2Brand to blend creativity, technology, and strategy into measurable growth.",
            primaryText: "Start Growing",
            primaryLink: "#top",
            secondaryText: "Talk To A Growth Expert",
            secondaryLink: "mailto:hello@base2brand.com",
        },
        fields: [
            { name: "highlightTag", type: "text", label: "Highlight Tag" },
            { name: "titleUpper", type: "text", label: "Title Upper" },
            { name: "titleLower", type: "text", label: "Title Lower" },
            { name: "description", type: "textarea", label: "Description" },
            { name: "primaryText", type: "text", label: "Primary Text" },
            { name: "primaryLink", type: "text", label: "Primary Link" },
            { name: "secondaryText", type: "text", label: "Secondary Text" },
            { name: "secondaryLink", type: "text", label: "Secondary Link" },
        ],
    },
    {
        key: "card-cta",
        label: "Card CTA",
        category: "Final CTA",
        component: CardCTA,
        default_viewimage: '/images/cmsimages/CardCTA.png',
        defaultData: {
            eyebrow: "Start an Apple engagement",
            title: "Bring an Apple-grade product team to your roadmap.",
            description: "Whether you need iPhone app development, enterprise iOS app development or Vision Pro app development, we will help you define the right Apple surface, the right architecture and the right release path.",
            primaryCtaText: "Send a brief",
            primaryCtaLink: "mailto:apple@base2brand.com",
            secondaryCtaText: "Book a 30-min architecture call",
            secondaryCtaLink: "#",
            benefitsLabel: "What you get back",
            benefits: [
                "A scoped engagement plan with team shape & timelines",
                "A surface decision matrix for iPhone, iPad, Watch, Vision Pro, CarPlay or Mac.",
                "A point of view on Apple Intelligence integration",
                "Indicative pricing & a release milestone map",
            ],
            footnote: "Mutual NDA available on request. We respond within one business day.",
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "title", type: "text", label: "Title" },
            { name: "description", type: "textarea", label: "Description" },
            { name: "primaryCtaText", type: "text", label: "Primary CTA text" },
            { name: "primaryCtaLink", type: "text", label: "Primary CTA link" },
            { name: "secondaryCtaText", type: "text", label: "Secondary CTA text" },
            { name: "secondaryCtaLink", type: "text", label: "Secondary CTA link" },
            { name: "benefitsLabel", type: "text", label: "Benefits panel label" },
            { name: "benefits", type: "array-text", label: "Benefits" },
            { name: "footnote", type: "text", label: "Footnote" },
        ],
    },
    {
        key: "growth-stats",
        label: "Growth Stats",
        category: "Stats",
        component: GrowthStats,
        default_viewimage: '/images/cmsimages/GrowthStats.png',
        defaultData: {
            eyebrow: "How we measure success",
            titleLine1: "We do not sell activity.",
            titleLine2: "We build systems that create measurable movement.",
            bodyParagraphs: [
                "Each engagement is scoped around a business outcome — not a feature list. We instrument every deployment with telemetry so impact is visible.",
                "Briefs are anonymised where client confidentiality requires it, but the metrics, architecture patterns, and engineering decisions remain fully transparent.",
            ],
            disciplinesLabel: "Disciplines covered",
            disciplines: ["Applied AI", "Govtech", "Industry 4.0", "Ecommerce", "Healthcare CRM", "Enterprise SaaS"],
            pillars: [
                {
                    value: "61%",
                    label: "Avg. efficiency gain",
                    desc: "Turnaround, response time, and throughput improvements across engagements.",
                },
                {
                    value: "$82M+",
                    label: "Documented business lift",
                    desc: "Revenue, cost reduction, and operational savings verified post-deployment.",
                },
                {
                    value: "100%",
                    label: "Production deployments",
                    desc: "Every case study represents a live system — not a prototype or proof-of-concept.",
                },
            ],
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "titleLine1", type: "text", label: "Title (line 1)" },
            { name: "titleLine2", type: "text", label: "Title (line 2, muted)" },
            { name: "bodyParagraphs", type: "array-text", label: "Body paragraphs" },
            { name: "disciplinesLabel", type: "text", label: "Disciplines label" },
            { name: "disciplines", type: "array-text", label: "Discipline tags" },
            {
                name: "pillars",
                type: "array-object",
                label: "Proof pillars",
                itemFields: [
                    { name: "value", type: "text", label: "Value (e.g. 61%)" },
                    { name: "label", type: "text", label: "Label" },
                    { name: "desc", type: "textarea", label: "Description" },
                ],
            },
        ],
    },
    {
        key: "growth-system",
        label: "Growth System",
        category: "Image Base Section",
        component: GrowthSystem,
        default_viewimage: '/images/cmsimages/GrowthSystem.png',
        defaultData: {
            highlightTag: "SIX PRACTICES · ONE SYSTEM",
            titleUpper: "SIX PRACTICES",
            titleLower: "ONE GROWTH SYSTEM",
            description: "A connected system engineered around real business outcomes.",
            practices: [
                {
                    title: "Performance Marketing",
                    description: "Growth campaigns engineered around revenue, not reach. We plan, launch, optimize, and scale paid media campaigns across high-intent channels with clear performance accountability.",
                    points: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
                    icon: "/images/growthcard_backimagev2-1.png",
                    backgroud_gradient: "linear-gradient(280deg, rgba(113, 31, 35, 1) 0%, rgba(250, 94, 45, 1) 100%)",
                    color_card: "#fa5e2d",
                },
                {
                    title: "Shopify & Ecommerce",
                    description: "Commerce experiences designed to convert traffic into revenue. We build Shopify stores, custom ecommerce experiences, product pages, checkout journeys, and retention systems focused on higher sales and smoother buying experiences.",
                    points: ["Shopify Development", "Shopify Plus", "Custom Themes"],
                    icon: "/images/growthcard_backimagev2-2.png",
                    backgroud_gradient: "linear-gradient(280deg, #95bf47 0%, #95bf47b5 100%)",
                    color_card: "#95bf47",
                },
                {
                    title: "CRO & Growth Optimization",
                    description: "More conversions from the traffic you already have. We improve landing pages, funnels, user journeys, forms, product pages, checkout flows, and lead-generation systems using data-backed CRO strategies.",
                    points: ["Landing Page CRO", "A/B Testing", "Heatmap Analysis"],
                    icon: "/images/growthcard_backimagev2-3.png",
                    backgroud_gradient: "linear-gradient(280deg, #155dfca1 0%, #155dfc 100%)",
                    color_card: "#155dfc",
                },
                {
                    title: "AI Solutions & Automation",
                    description: "AI systems that reduce manual work and improve business efficiency. We build intelligent automations that help brands qualify leads, support customers, personalize journeys, and improve decision-making.",
                    points: ["AI Chatbots", "AI Sales Assistants", "Lead Scoring"],
                    icon: "/images/growthcard_backimagev2-4.png",
                    backgroud_gradient: "linear-gradient(280deg, #8b5cf69c 0%, #8b5cf6 100%)",
                    color_card: "#8b5cf6",
                },
                {
                    title: "Mobile Apps & Enterprise Platforms",
                    description: "Digital products customers and teams rely on every day. We design and develop mobile apps, portals, CRM systems, ERP workflows, cloud applications, and custom business platforms built for speed, scale, and usability.",
                    points: ["Android Apps", "iOS Apps", "CRM Systems"],
                    icon: "/images/growthcard_backimagev2-5.png",
                    backgroud_gradient: "linear-gradient(280deg, #0a84ffd9 0%, #0a84ff 100%)",
                    color_card: "#0a84ff",
                },
                {
                    title: "Brand, Creative & Experience",
                    description: "Brands people remember. Experiences customers trust. We create brand identities, social media systems, UI/UX experiences, campaign creatives, content frameworks, and design systems that make growth look as strong as it performs.",
                    points: ["Brand Identity", "Creative Campaigns", "UI/UX Design"],
                    icon: "/images/growthcard_backimagev2-6.png",
                    backgroud_gradient: "linear-gradient(280deg, #d946efa1 0%, #d946ef 100%)",
                    color_card: "#d946ef",
                },
            ],
        },
        fields: [
            { name: "highlightTag", type: "text", label: "Highlight tag / Eyebrow" },
            { name: "titleUpper", type: "text", label: "Title (line 1)" },
            { name: "titleLower", type: "text", label: "Title (line 2 / highlighted)" },
            { name: "description", type: "textarea", label: "Description" },
            {
                name: "practices",
                type: "array-object",
                label: "Practice Cards",
                itemFields: [
                    { name: "title", type: "text", label: "Title" },
                    { name: "description", type: "textarea", label: "Description" },
                    { name: "points", type: "array-text", label: "Key points / Tags" },
                    { name: "icon", type: "image", label: "Card image (Upload or URL)" },
                    { name: "backgroud_gradient", type: "text", label: "Card background gradient (CSS)" },
                    { name: "color_card", type: "text", label: "Title color (Hex)" },
                ],
            },
        ],
    },
    {
        key: "case-card",
        label: "Case Study Card",
        category: "Image Base Section",
        component: WorkCarousel,
        default_viewimage: '/images/cmsimages/WorkCarousel.png',
        defaultData: {
            eyebrow: "Proof",
            title: "Selected anonymised cases.",
            titleLower: "Outcomes, not optics.",
            cardsData: [
                {
                    id: "case-01",
                    slug: "enterprise-operations-dashboard",
                    n: "CASE 01",
                    tag: "Enterprise SaaS · Operations Dashboard",
                    title: "A centralized operations dashboard for real-time business intelligence.",
                    url: "operations-dashboard.demo",
                    ctaText: "View case study",
                    ctaLink: "/case-study/enterprise-operations-dashboard",
                    metric1Value: "61%",
                    metric1Label: "faster reporting",
                    metric2Value: "+240%",
                    metric2Label: "operational efficiency",
                    screenshots: [
                        "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540684/gwoth_card1.1.png",
                        "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540684/gwoth_card1.2.png",
                        "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540684/gwoth_card1.3.png",
                        "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540684/gwoth_card1.4.png",
                    ],
                },
                {
                    id: "case-02",
                    slug: "modern-ecommerce-website",
                    n: "CASE 02",
                    tag: "Website Design · E-commerce",
                    title: "A conversion-focused eCommerce experience designed for modern shoppers.",
                    url: "ecommerce.demo",
                    ctaText: "View case study",
                    ctaLink: "/case-study/modern-ecommerce-website",
                    metric1Value: "+138%",
                    metric1Label: "conversion growth",
                    metric2Value: "-42%",
                    metric2Label: "bounce rate",
                    screenshots: [
                        "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540686/gwoth_card2.1.png",
                        "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540686/gwoth_card2.2.png",
                        "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540686/gwoth_card2.3.png",
                        "https://res.cloudinary.com/htkvsu4t/image/upload/v1789540686/gwoth_card2.4.png",
                    ],
                },
            ],
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "title", type: "text", label: "Title" },
            { name: "titleLower", type: "text", label: "Title (lower / muted)" },
            {
                name: "cardsData",
                type: "array-object",
                label: "Case Study Cards",
                itemFields: [
                    { name: "n", type: "text", label: "Case Number (e.g. CASE 01)" },
                    { name: "tag", type: "text", label: "Tag / Category" },
                    { name: "title", type: "textarea", label: "Title" },
                    { name: "url", type: "text", label: "URL bar text" },
                    { name: "ctaText", type: "text", label: "CTA Button Text" },
                    { name: "ctaLink", type: "text", label: "CTA Button Link" },
                    { name: "metric1Value", type: "text", label: "Metric 1 Value (e.g. 61%)" },
                    { name: "metric1Label", type: "text", label: "Metric 1 Label (e.g. faster reporting)" },
                    { name: "metric2Value", type: "text", label: "Metric 2 Value (e.g. +240%)" },
                    { name: "metric2Label", type: "text", label: "Metric 2 Label (e.g. operational efficiency)" },
                    {
                        name: "screenshots",
                        type: "array-image",
                        label: "Screenshots / Images (Upload or Cloudinary URLs)",
                    },
                ],
            },
        ],
    },
    {
        key: "industries",
        label: "Industries Section",
        category: "Image Base Section",
        component: Industries,
        default_viewimage: "/images/cmsimages/Industries.png",
        defaultData: {
            eyebrow: "INDUSTRIES",
            title: "Deployed across growth-heavy and operations-heavy environments.",
            description:
                "Base2Brand builds AI automation services and enterprise AI solutions for industries where speed, accuracy and conversion matter.",
            ctaLabel: "Use case",
            industriesData: INDUSTRIES_DEFAULT,
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "title", type: "textarea", label: "Title" },
            { name: "description", type: "textarea", label: "Description" },
            { name: "ctaLabel", type: "text", label: "CTA Button Label" },
            {
                name: "industriesData",
                type: "array-object",
                label: "Industries List & Photos",
                itemFields: [
                    { name: "id", type: "text", label: "Industry ID / Key" },
                    { name: "name", type: "text", label: "Industry Name" },
                    { name: "use", type: "textarea", label: "Use Case / Description" },
                    {
                        name: "image",
                        type: "image",
                        label: "Industry Photo (Upload or URL)",
                    },
                ],
            },
        ],
    },
    {
        key: "client-footprint",
        label: "Client Footprint (Globe)",
        category: "Stats",
        component: ClientFootprint,
        default_viewimage: "/images/cmsimages/ClientFootprint.png",
        defaultData: {
            eyebrow: "Where We’ve Delivered",
            titlePart1: "300+ digital engagements,",
            titlePart2: "built across industries and growth stages.",
            description:
                "Our delivery footprint follows business outcomes — from ecommerce stores and performance campaigns to AI automation, mobile applications, CRM systems, and enterprise platforms.",
            captionText: "Interactive · drag to rotate",
            regions: TOP_REGIONS_DEFAULT,
        },
        fields: [
            { name: "eyebrow", type: "text", label: "Eyebrow" },
            { name: "titlePart1", type: "text", label: "Title (Part 1)" },
            { name: "titlePart2", type: "text", label: "Title (Part 2 / Highlighted)" },
            { name: "description", type: "textarea", label: "Description" },
            { name: "captionText", type: "text", label: "Globe Caption Text" },
            {
                name: "regions",
                type: "array-object",
                label: "Delivered Regions",
                itemFields: [
                    { name: "region", type: "text", label: "Region / Country Name" },
                    { name: "note", type: "textarea", label: "Note / Work Summary" },
                    { name: "count", type: "text", label: "Count Badge (e.g. 150+ Projects)" },
                ],
            },
        ],
    },
];

export const getSectionByKey = (key) =>
    sectionRegistry.find((entry) => entry.key === key);


export const singletonCategories = new Set(["Hero Sections"]);

// A section whose registry category is a "singleton" one (currently only
// "Hero Sections") is locked in place — it's the anchor of the page, so it
// never enters the drag-and-drop system (not draggable, not a drop target,
// not shown in the Sequence popup). Single source of truth for this check —
// SectionCanvas, CmsPages and SequenceModal all import it instead of each
// keeping their own copy.
export const isSectionLocked = (section) => {
    const entry = getSectionByKey(section.sectionType);
    return entry ? singletonCategories.has(entry.category) : false;
};

export const getSectionsByCategory = () => {
    const grouped = {};
    for (const entry of sectionRegistry) {
        if (!grouped[entry.category]) grouped[entry.category] = [];
        grouped[entry.category].push(entry);
    }
    return grouped;
};
