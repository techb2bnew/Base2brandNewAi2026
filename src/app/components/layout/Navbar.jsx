'use client';
import React, { useEffect, useMemo, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Base2BrandWordmark } from "../../components/visual/Base2BrandLogo";
import { cn } from "../../lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CurrentLogo } from "./CurrentLogo";


const MENU = [
  {
    label: "Services",
    href: "#services",
    items: [
      { label: "AI & Automation", href: "/ai-automation" },
      { label: "Software Development", href: "/software-development" },
      { label: "Apple Ecosystem Development", href: "/apple-ecosystem" },
      { label: "Ecommerce Solutions", href: "/e-commerce-solution" },
      { label: "Growth & Visibility", href: "/growth-visibility" },
      { label: "Enterprise Systems", href: "/enterprise-systems" },
      { label: "Emerging Technologies", href: "/emerging-technologies" },
      { label: "Social Media Services", href: "/social-media-services" },
    ],
  },
  {
    label: "Solutions",
    href: "#solutions",
    items: [
      { label: "Sales & Marketing", href: "/sales-marketing" },
      { label: "Operations", href: "/operations-excellence" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Public Sector & NGOs", href: "/public-sector-ngos" },
      { label: "Intelligent Solutions", href: "/intelligent-solutions" },
    ],
  },
  // {
  //   label: "Industries",
  //   href: "#industries",
  //   items: [
  //     { label: "Healthcare", href: "/industries/health-care" },
  //     { label: "Manufacturing", href: "/industries/manufacturing" },
  //     { label: "Logistics", href: "/industries/logistics" },
  //     { label: "Education", href: "/industries/education" },
  //     { label: "Retail", href: "/industries/retail" },
  //     { label: "Automotive", href: "/industries/automotive" },
  //     { label: "Government", href: "/industries/government" },
  //     { label: "NGOs", href: "/industries/ngo" },
  //   ],
  // },
  {
    label: "Work",
    href: "#cases",
    items: [
      { label: "Case Studies", href: "/case-study" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Success Stories", href: "/success-stories" },
    ],
  },
  {
    label: "Resources",
    href: "#insights",
    items: [
      { label: "Blog", href: "/resources-catgeories#featured" },
      { label: "AI Insights", href: "/resources-catgeories#library" },
      { label: "Articles", href: "/resources-catgeories#geoinsights" },
      { label: "Industry Reports", href: "/resources-catgeories#industry-reports" },
      { label: "RFP & Tender Insights", href: "/resources-catgeories#mission-dossier" },
    ],
  },
  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

function smoothScrollTo(href) {
  if (!href || !href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [ctaColor, setCtaColor] = useState(null);
  const closeTimer = useRef(null);
  const currentPath = usePathname();

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenKey(null), 220);
  };
  const openMenu = (label) => {
    cancelClose();
    setOpenKey(label);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenKey(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (currentPath !== "/social-media-services") {
      setCtaColor(null);
      return;
    }
    const handler = (e) => setCtaColor(e.detail.color ?? null);
    window.addEventListener("serviceActive", handler);
    return () => window.removeEventListener("serviceActive", handler);
  }, [currentPath]);

  const handleAnchor = (e, href) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);
    }
    setOpenKey(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    setOpenKey(null);
    setMobileOpen(false);
  }, [currentPath]);

  const activeMenu = useMemo(
    () => MENU.find((m) => m.label === openKey) || null,
    [openKey]
  );

  return (
    <header
      data-testid="navbar"
      data-nosnippet
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto max-w-full md:max-w-7xl px-4 md:px-8 relative">
        <div
          className={cn(
            "flex items-center justify-between rounded-full transition-all duration-500",
            scrolled
              ? "glass px-4 sm:px-5 py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
              : "px-2 sm:px-3 py-2"
          )}
        >
          <Link
            href="/"
            data-testid="navbar-logo-link"
            className="flex items-center gap-3 group"
          >
            <CurrentLogo />
          </Link>

          {/* Desktop nav — buttons row only. Mouse leave/enter schedules close. */}
          <div
            className="hidden lg:block"
            onMouseLeave={scheduleClose}
            onMouseEnter={cancelClose}
          >
            <nav
              className="flex items-center gap-1"
              aria-label="Primary"
            >
              {MENU.map((m) =>
                m.items && m.items.length > 0 ? (
                  <button
                    key={m.label}
                    type="button"
                    onMouseEnter={() => openMenu(m.label)}
                    onFocus={() => openMenu(m.label)}
                    onClick={() =>
                      setOpenKey(openKey === m.label ? null : m.label)
                    }
                    data-testid={`nav-trigger-${m.label.toLowerCase()}`}
                    className={cn(
                      "group inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-full transition-colors duration-200",
                      openKey === m.label
                        ? "text-white bg-white/5"
                        : "text-mute hover:text-white hover:bg-white/5"
                    )}
                    aria-expanded={openKey === m.label}
                    aria-haspopup="true"
                  >
                    {m.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-300",
                        openKey === m.label ? "rotate-180 text-orange-brand" : ""
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    key={m.label}
                    href={m.href}
                    onClick={(e) => handleAnchor(e, m.href)}
                    data-testid={`nav-trigger-${m.label.toLowerCase()}`}
                    className="group inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-full transition-colors duration-200 text-mute hover:text-white hover:bg-white/5"
                  >
                    {m.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Desktop mega-dropdown — centered to the navbar container, not the nav buttons.
              Outer wrapper handles absolute + centering (translate-x), inner m.div
              handles only opacity/y animation. This avoids framer-m overriding the
              tailwind transform used for horizontal centering.
              The pt-4 bridge keeps the mouse path from button to panel continuous. */}
          <AnimatePresence>
            {activeMenu && (
              <div
                key={activeMenu.label}
                className="hidden lg:block absolute left-1/2 top-full -translate-x-1/2 pt-4 w-[min(880px,calc(100vw-2.5rem))] z-50"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <m.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  data-testid={`nav-panel-${activeMenu.label.toLowerCase()}`}
                  className="relative rounded-3xl border border-line-strong bg-[#04061a]/95 backdrop-blur-xl p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-60 bg-brand-radial-glow" />
                  <div className="relative grid grid-cols-[1fr_2fr] gap-8">
                    <div>
                      <div className="text-xs font-mono-display uppercase tracking-[0.28em] text-mute">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-brand mr-2 align-middle shadow-brand-dot" />
                        {activeMenu.label}
                      </div>
                      <h3 className="mt-3 font-display text-white text-2xl tracking-tight">
                        Explore our {activeMenu.label.toLowerCase()}.
                      </h3>
                      <p className="mt-3 text-mute text-sm leading-relaxed">
                        Hand-picked capabilities that we deploy end-to-end —
                        designed for regulated, multi-region enterprises.
                      </p>
                      {/* <a
                        href={activeMenu.href}
                        onClick={(e) => handleAnchor(e, activeMenu.href)}
                        data-testid={`nav-panel-allcta-${activeMenu.label.toLowerCase()}`}
                        className="mt-5 inline-flex items-center gap-2 text-sm text-orange-brand hover:text-white transition"
                      >
                        View all {activeMenu.label.toLowerCase()}
                        <span aria-hidden>→</span>
                      </a> */}
                    </div>
                    <ul className="grid grid-cols-2 gap-1.5">
                      {activeMenu.items.map((it) => (
                        <li key={it.label}>
                          <Link
                            href={it.href}
                            onClick={(e) => handleAnchor(e, it.href)}
                            data-testid={`nav-item-${it.label
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")}`}
                            className="group flex items-start gap-3 rounded-2xl px-2 py-1.5 hover:bg-white/[0.04] border border-transparent hover:border-line transition"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-brand/70 group-hover:bg-orange-brand transition shrink-0" />
                            <div>
                              <div className="text-white text-sm font-medium leading-tight">
                                {it.label}
                              </div>
                              <div className="mt-0.5 text-mute text-xs">
                                {captionFor(activeMenu.label, it.label)}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              </div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <Link
              href="/ai-everything-abu-dhabi"
              data-testid="navbar-cta-aime"
              className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white hover:brightness-110 transition"
              style={{ backgroundColor: ctaColor ?? "var(--b2b-primary)" }}
            >
              <Image
                src="/images/aws-ai-icon.png"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 shrink-0"
              />
              AI Everything Abu Dhabi 
            </Link>
            <a
              href="#contact"
              onClick={(e) => handleAnchor(e, "#contact")}
              data-testid="navbar-cta-proposal"
              className="hidden sm:inline-flex items-center gap-2 rounded-full font-semibold text-sm px-4 py-2 hover:brightness-110 transition group"
              style={{
                backgroundColor: ctaColor ?? "var(--b2b-primary)",
                transition: "background-color 0.5s ease",
              }}
            >
              Get Proposal
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <button
              data-testid="navbar-mobile-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden grid place-items-center h-9 w-9 rounded-full border border-line text-white"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        <AnimatePresence>
          {mobileOpen && (
            <m.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              data-testid="navbar-mobile-panel"
              className="lg:hidden mt-3 glass rounded-3xl p-3 flex flex-col gap-1 max-h-[75vh] overflow-y-auto"
            >
              {MENU.map((menuItem) => {
                const expanded = mobileExpanded === menuItem.label;
                if (!menuItem.items || menuItem.items.length === 0) {
                  return (
                    <Link
                      key={menuItem.label}
                      href={menuItem.href}
                      onClick={(e) => handleAnchor(e, menuItem.href)}
                      data-testid={`nav-mobile-trigger-${menuItem.label.toLowerCase()}`}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-white/90 hover:bg-white/5 rounded-2xl transition"
                    >
                      <span>{menuItem.label}</span>
                    </Link>
                  );
                }
                return (
                  <div key={menuItem.label} className="rounded-2xl">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(expanded ? null : menuItem.label)
                      }
                      data-testid={`nav-mobile-trigger-${menuItem.label.toLowerCase()}`}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-white/90 hover:bg-white/5 rounded-2xl transition"
                    >
                      <span>{menuItem.label}</span>
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-300 text-mute",
                          expanded ? "rotate-180 text-orange-brand" : ""
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <m.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden pl-3"
                        >
                          {menuItem.items.map((it) => (
                            <li key={it.label}>
                              <Link
                                href={it.href}
                                onClick={(e) => handleAnchor(e, it.href)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-mute hover:text-white"
                              >
                                <span className="h-1 w-1 rounded-full bg-orange-brand/70" />
                                {it.label}
                              </Link>
                            </li>
                          ))}
                        </m.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <Link
                href="/ai-everything-abu-dhabi"
                onClick={() => setMobileOpen(false)}
                data-testid="navbar-mobile-cta-aime"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-4 py-3 text-white"
                style={{ backgroundColor: ctaColor ?? "var(--b2b-primary)" }}
              >
                <Image
                  src="/images/aws-ai-icon.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0"
                />
                AI Everything Abu Dhabi
              </Link>
              <a
                href="#contact"
                onClick={(e) => handleAnchor(e, "#contact")}
                data-testid="navbar-mobile-cta"
                className="mt-2 inline-flex items-center justify-center rounded-full font-semibold text-sm px-4 py-3"
                style={{
                  backgroundColor: ctaColor ?? "var(--b2b-primary)",
                  transition: "background-color 0.5s ease",
                }}
              >
                Get Proposal →
              </a>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/** Subtle one-line caption for each mega-menu item. */
function captionFor(group, item) {
  const map = {
    "AI & Automation": "Agentic systems, ML ops, RPA at scale.",
    "Software Development": "Custom platforms, microservices, APIs.",
    "Apple Ecosystem Development": "iOS, macOS, visionOS, watchOS.",
    "Ecommerce Solutions": "Headless storefronts, OMS, payments.",
    "Growth & Visibility": "SEO, GEO, performance marketing.",
    "Enterprise Systems": "ERP, CRM, HCM, integration fabric.",
    "Emerging Technologies": "Spatial, AR/VR, IoT, edge AI.",
    "Sales & Marketing": "Revenue intelligence, CDPs, attribution.",
    "Operations": "Supply chain, finance ops, observability.",
    "Enterprise": "Modernization & platform strategy.",
    "Public Sector & NGOs": "e-Gov, mission tech, citizen services.",
    "Automotive": "Connected vehicle, dealer & aftersales tech.",
    "Healthcare": "EHR, clinical AI, payer modernization.",
    "Manufacturing": "Smart factory, MES, digital twins.",
    "Logistics": "TMS, last-mile, route intelligence.",
    "Education": "Adaptive learning, campus platforms.",
    "Retail": "Unified commerce, store ops, loyalty.",
    "Government": "Sovereign-grade digital programs.",
    "NGOs": "Impact platforms, donor & grant systems.",
    "Case Studies": "Outcomes, scale, before/after metrics.",
    "Portfolio": "Selected enterprise engagements.",
    "Success Stories": "Voices from leaders we've shipped with.",
    "Blog": "Field notes from our engineering studios.",
    "AI Insights": "Patterns, pitfalls, production-ready AI.",
    "GEO Insights": "Generative engine optimization briefs.",
    "Industry Reports": "Sector deep-dives & benchmarks.",
    "RFP & Tender Insights": "Win themes & response intelligence.",
    "Company": "Who we are, what we believe in.",
    "Leadership": "Senior partners on every engagement.",
    "Careers": "Engineers, architects, designers — wanted.",
    "Partners": "Hyperscalers, ISVs, system partners.",
  };
  return map[item] || "Learn more about our work here.";
}
