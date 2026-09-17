'use client';
import React, { useState } from "react";
import Link from "next/link";
import { CurrentLogo } from "../components/layout/CurrentLogo";
import { Linkedin, Twitter, Github, Youtube, Facebook, ChevronDown } from "lucide-react";
import NewsLetter from "@/components/ui/NewsLetter";

const OFFICES = [
  { city: "New Delhi", line: "Connaught Place · 110001 · India", role: "Global HQ" },
  { city: "Chandigarh", line: "IT Park · 160101 · India", role: "Engineering Hub" },
  { city: "Bengaluru", line: "Indiranagar · 560038 · India", role: "AI Studio" },
  { city: "Utah", line: "Salt Lake City · UT 84101 · USA", role: "Americas Delivery" },
  { city: "Toronto", line: "King Street W · M5V · Canada", role: "North America" },
  { city: "Leicester", line: "Welford Road · LE2 · United Kingdom", role: "EMEA HQ" },
  { city: "Sydney", line: "Macquarie Park · NSW 2113 · Australia", role: "APAC" },
  { city: "", line: "Victoria Island · 101241 · Nigeria", role: "Kenya" },
];

const NAV = [
  {
    title: "Services",
    links: [
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
  // {
  //   title: "Solutions",
  //   links: [
  //     { label: "Sales & Marketing", href: "/sales-marketing" },
  //     { label: "Operations", href: "/operations-excellence" },
  //     { label: "Enterprise", href: "/enterprise" },
  //     { label: "Public Sector & NGOs", href: "/public-sector-ngos" },
  //     { label: "Intelligent Solutions", href: "/intelligent-solutions" },
  //   ],
  // },
  {
    title: "Work",
    links: [
      { label: "Case Studies", href: "/case-study" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Success Stories", href: "/success-stories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Healthcare", href: "/industries/health-care" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Logistics", href: "/industries/logistics" },
      { label: "Education", href: "/industries/education" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "Government", href: "/industries/government" },
      { label: "NGOs", href: "/industries/ngo" },
    ],
  },
];

function FooterNavColumn({ col }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line/40 pb-2 sm:border-none sm:pb-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-testid={`footer-nav-toggle-${col.title.toLowerCase()}`}
        className="flex w-full items-center justify-between gap-2 text-xs font-mono-display uppercase tracking-[0.22em] text-orange-brand sm:pointer-events-none sm:cursor-default"
      >
        {col.title}
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform duration-300 sm:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        className={`mt-3 overflow-hidden transition-[max-height] duration-300 ease-out sm:max-h-none! sm:overflow-visible ${open ? "max-h-96" : "max-h-0"
          }`}
      >
        {col.links.map((l) => (
          <li key={l.label} className="pb-3 last:pb-0">
            <Link
              href={l.href}
              data-testid={`footer-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className="text-xs text-white/80 hover:text-orange-brand transition"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterOffices() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-testid="footer-offices-toggle"
        className="flex w-full items-center justify-between gap-2 text-xs font-mono-display uppercase tracking-[0.22em] text-mute md:mb-6 sm:pointer-events-none sm:cursor-default"
      >
        Where we operate
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform duration-300 sm:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid grid-cols-2 gap-6 overflow-hidden transition-[max-height] duration-300 ease-out lg:grid-cols-4 sm:max-h-none! sm:overflow-visible ${open ? "max-h-300" : "max-h-0"
          }`}
      >
        {OFFICES.map((o) => (
          <div
            key={o.city}
            data-testid={`footer-office-${o.city.toLowerCase().replace(/\s/g, "-")}`}
            className="border-l border-orange-brand/30 pl-4"
          >
            <div className="text-xs uppercase tracking-[0.22em] text-orange-brand font-mono-display">
              {o.role}
            </div>
            <div className="mt-2 font-display text-white text-base">
              {o.city}
            </div>
            <div className="mt-1 text-xs text-mute leading-relaxed">
              {o.line}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      data-testid="footer"
      data-nosnippet
      className="relative border-t border-line/50 bg-transparent pt-12 md:pt-16 pb-10 z-11"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top: brand + nav */}
        <div className="grid lg:grid-cols-[1.5fr_2fr] gap-8 pb-6">
          <div>
            <CurrentLogo />
            <p className="mt-4 text-mute max-w-md text-sm leading-relaxed">
              From base — to brand. From idea — to orbit. Base2Brand is the digital transformation, AI and enterprise software partner for organisations that build for the public good and the global stage.
            </p>

            {/* <form
              className="mt-8 max-w-md"
              onSubmit={(e) => e.preventDefault()}
              data-testid="footer-newsletter-form"
            >
              <label className="block text-xs font-mono-display uppercase tracking-[0.22em] text-mute mb-2">
                Quarterly briefing
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="work@email.com"
                  data-testid="footer-newsletter-email"
                  className="flex-1 bg-[#04061a] border border-line rounded-full px-5 py-3 text-white text-sm placeholder:text-mute/60 focus:border-orange-brand/60 focus:outline-none transition"
                />
                <button
                  type="submit"
                  data-testid="footer-newsletter-submit"
                  className="rounded-full bg-(--b2b-primary) font-semibold text-sm px-5 py-3 hover:brightness-110 transition"
                >
                  Subscribe
                </button>
              </div>
            </form> */}
            <NewsLetter lable="Quarterly briefing" />

            <div className="mt-8 flex items-center gap-2">
              {[
                { I: Facebook, label: "Facebook", href: "https://www.facebook.com/TechBase2Brand/" },
                { I: Linkedin, label: "LinkedIn", href: "https://in.linkedin.com/company/techbase2brand" },
                // { I: Twitter, label: "X" },
                // { I: Github, label: "GitHub" },
                { I: Youtube, label: "YouTube", href: "https://www.youtube.com/channel/UCEHsjR1TFlEfsbcYQPlLW4Q" },
              ].map(({ I, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  className="grid place-items-center h-10 w-10 rounded-full border border-line text-mute hover:text-orange-brand hover:border-orange-brand/40 transition"
                >
                  <I size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {NAV.map((col) => (
              <FooterNavColumn key={col.title} col={col} />
            ))}
          </div>
        </div>

        <div className="my-2 divider-line" />

        {/* Office grid */}
        <FooterOffices />

        <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-mute">
          <div>© {new Date().getFullYear()} Base2Brand Technologies. All rights reserved. <Link href="/privacy-policy" className="text-orange-brand hover:text-orange-brand/80 transition">Privacy Policy</Link></div>
          <div className="font-mono-display uppercase tracking-[0.2em]">
            Crafted in 8 cities · Delivered globally
          </div>
        </div>
      </div>
    </footer>
  );
}
