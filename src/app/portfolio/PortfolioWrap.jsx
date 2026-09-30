'use client';
import React, { useRef } from 'react';
import PortfolioSection from './PortfolioSection';
import "../components/Solutions/solution.css";
import './alltools/tools.css'
import Hero from "@/components/Solutions/Hero";
import Narrative from "@/components/ai/Narrative";
import FinalCTA from "@/components/ai/FinalCTA";
import StarsBackground from "@/components/erp/StarsBackground";
import Work from '@/components/portfolio-animation/sections/Work';
import Directory from './alltools/Directory';
import MobileApps from './alltools/MobileApps';
import Websites from './alltools/Websites';
import Marketing from './alltools/Marketing';
import VideoShowcase from './alltools/VideoShowcase';
// import RocketNavigator from '@/components/portfolio/RocketNavigator';
// import Work from '@/components/portfolio/Work';

const features = [
    { l: "Strategic", d: "Purpose-built solutions" },
    { l: "Scalable", d: "Engineered for growth" },
    { l: "Impactful", d: "Measured by results" },
];
const PROJECTS = [
  {
    id: "portfolio-01",
    n: "PROJECT 01",
    tag: "Luxury Furniture Brand · Shopify",
    title:
      "Premium Shopify storefront for luxury furniture brands.",
    metrics: [
      { v: "+38%", l: "conversion rate" },
      { v: "97+", l: "Lighthouse score" },
    ],
    url: "luxuryfurniture.com",
    preview: {
      accent: "#F47B52",
      title: "Luxury Furniture Store",
      screenshot: "/images/portfolio_work1.png",
      lines: [
        { label: "Collections", value: "24+" },
        { label: "Products", value: "850+" },
        { label: "PageSpeed Score", value: "97+" },
      ],
      chart: [18, 24, 28, 35, 42, 48, 55, 61, 68, 74, 82, 90],
    },
  },

  {
    id: "portfolio-02",
    n: "PROJECT 02",
    tag: "Multi-Vendor Commerce · Mobile App",
    title:
      "Mobile commerce app built for seamless shopping.",
    metrics: [
      { v: "120K+", l: "app downloads" },
      { v: "4.8★", l: "user rating" },
    ],
    url: "commerce-app.com",
    preview: {
      accent: "#7BC5D9",
      title: "Mobile Commerce Platform",
      screenshot: "/images/portfolio_work2.png",
      lines: [
        { label: "Downloads", value: "120K+" },
        { label: "Active Users", value: "42K+" },
        { label: "App Rating", value: "4.8★" },
      ],
      chart: [28, 34, 39, 45, 49, 55, 60, 66, 72, 79, 84, 91],
    },
  },

  {
    id: "portfolio-03",
    n: "PROJECT 03",
    tag: "Fleet Management · Enterprise SaaS",
    title:
      "Fleet management platform with real-time insights.",
    metrics: [
      { v: "3,500+", l: "vehicles managed" },
      { v: "-52%", l: "manual workload" },
    ],
    url: "fleetcloud.io",
    preview: {
      accent: "#F47B52",
      title: "Fleet Management Dashboard",
      screenshot: "/images/portfolio_work3.png",
      lines: [
        { label: "Fleet Size", value: "3,500+" },
        { label: "Active Drivers", value: "1,200+" },
        { label: "Live Tracking", value: "24/7" },
      ],
      chart: [22, 29, 34, 40, 46, 53, 59, 67, 73, 81, 87, 94],
    },
  },
];

const PortfolioWrap = () => {
    // const isMobile = useMedia("(max-width: 768px)");
    const containerRef = useRef(null);
    return (
        <div className="relative md:min-h-screen overflow-x-hidden" ref={containerRef}>

            {/* <RocketNavigator containerRef={containerRef} mobile={false} /> */}

            <StarsBackground
                className="!fixed inset-0 z-0 pointer-events-none"
                starColor="#00e6ff"
            />

            <div className='relative z-[1]'>
                <Hero
                    Starlayer={false}
                    highlightTag="OUR WORK"
                    titleupper="Projects That Drive Meaningful"
                    titlelower="Business Results."
                    description="Explore Base2Brand’s portfolio of websites, web apps, eCommerce solutions, and digital campaigns built to improve visibility, engagement, and growth. Every project is designed with strategy, performance, and user experience in mind."
                    buttonLeft="View Projects"
                    buttonRight="Talk to Us"
                />
                <Narrative
                    title={"Building digital products that deliver real business impact."}
                    description={[
                        "Explore our portfolio of AI solutions, enterprise platforms, and web experiences designed to solve complex challenges and accelerate growth.",
                        "Every project combines strategy, technology, and measurable outcomes."
                    ]}
                    features={features}
                    highlightTag={"OUR WORK IN ACTION"}
                    tagList={["01 — Portfolio"]}
                />
                <PortfolioSection />
                <Work cardsData={PROJECTS} />
                <Directory />
                <MobileApps />
                <Websites />
                <Marketing />
                <VideoShowcase />
                <FinalCTA
                    highlightTag={"LET'S BUILD SOMETHING IMPACTFUL"}
                    titleUpper={"Have a project in mind?"}
                    titleLower={"Let's create it together."}
                    description={
                        "Whether you're exploring AI, building a digital platform, or modernizing enterprise systems, we're ready to turn ambitious ideas into measurable results."
                    }
                    CTALeft={"Start Your Project"}
                    CTARight={"Discuss Your Requirements"}
                    features={[
                        "Strategy-led",
                        "Scalable solutions",
                        "Cross-industry expertise",
                        "Outcome-driven",
                    ]}
                />
            </div>
        </div>
    )
}

export default PortfolioWrap
