"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { OfficialLogo } from "@/components/visual/OfficialLogo";

const DEFAULT_LOGO = "/images/homelogov2.png";

const logosList = [
  { slug: "/", logourl: DEFAULT_LOGO },
  { slug: "/ai-automation", logourl: "/images/aiLogo.png" },
  { slug: "/apple-ecosystem", logourl: "/images/applelogo.png" },
  { slug: "/enterprise", logourl: "/images/applelogo.png" },
  { slug: "/growth-visibility", logourl: "/images/growth-visibility.png" },
  { slug: "/social-media-services", logourl: "/images/socialmedialogo.png" },
  { slug: "/emerging-technologies", logourl: "/images/emerging-technologiesLOGO.png" },
  { slug: "/operations-excellence", logourl: "/images/aiLogo.png" },
  { slug: "/enterprise-systems", logourl: "/images/enterprise-logonew.png" },
  { slug: "/e-commerce-solution", logourl: "/images/shopify-page.png" },
  { slug: "/industries/health-care", logourl: "/images/health-carelogo.png" },
  { slug: "/industries/manufacturing", logourl: "/images/manufacturing-logo.png" },
  { slug: "/industries/logistics", logourl: "/images/logistics-logo.png" },
  { slug: "/industries/education", logourl: "/images/education-logo.png" },
  { slug: "/industries/retail", logourl: "/images/retail-logo.png" },
  { slug: "/industries/automotive", logourl: "/images/automotive-logo.png" },
  { slug: "/industries/government", logourl: "/images/governments-logo233.png" },
  { slug: "/industries/ngo", logourl: "/images/ngos-logo.png" },
  { slug: "/portfolio", logourl: "/images/portfolio-logo.png" },
  { slug: "/intelligent-solutions", logourl: "/images/intelligent-solutionslogo.png" },
  { slug: "/software-development", logourl: "/images/software-developmentLogo.png" },
  { slug: "/resources-catgeories", logourl: "/images/resources-logo.png"},
  { slug: "/blog", logourl: "/images/resources-logo.png"},
  { slug: "/about-us", logourl: "/images/aboutus-logo.png"},
];

function getMatchedLogo(pathname) {
  if (!pathname) return { slug: "/", logourl: DEFAULT_LOGO };

  const exactMatch = logosList.find((logo) => logo.slug === pathname);
  if (exactMatch) return exactMatch;

  const prefixMatch = logosList
    .filter((logo) => logo.slug !== "/")
    .sort((a, b) => b.slug.length - a.slug.length)
    .find((logo) => pathname.startsWith(`${logo.slug}/`));

  return prefixMatch ?? logosList.find((logo) => logo.slug === "/") ?? { slug: "/", logourl: DEFAULT_LOGO };
}

export function CurrentLogo({ className = "max-w-46" }) {
  const currentPath = usePathname();

  const matched = useMemo(() => getMatchedLogo(currentPath), [currentPath]);
  const [src, setSrc] = useState(DEFAULT_LOGO);

  useEffect(() => {
    setSrc(matched?.logourl ?? DEFAULT_LOGO);
  }, [matched]);

  useEffect(() => {
    if (currentPath !== "/social-media-services") return;

    const handler = (e) => {
      const nextLogo = e?.detail?.logoUrl;
      if (nextLogo) setSrc(nextLogo);
    };

    window.addEventListener("serviceActive", handler);
    return () => window.removeEventListener("serviceActive", handler);
  }, [currentPath]);

  // CMS pages (/service/*, /solution/*, /industry/*) have a runtime theme
  // color from the database, so a pre-baked PNG (with the accent color
  // already burned into the pixels, like every other route in logosList)
  // can't follow it. Render the SVG wordmark instead, with its "2" tied to
  // the live --b2b-primary variable.
  const isCmsRoute = ["/service/", "/solution/", "/industry/"].some((prefix) =>
    currentPath?.startsWith(prefix)
  );

  if (isCmsRoute) {
    return (
      <OfficialLogo
        accent="var(--b2b-primary)"
        className={`${className} h-8 sm:h-9 w-auto transition-all duration-500`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt="Base2Brand"
      width={200}
      height={100}
      className={`${className} transition-all duration-500`}
      onError={() => setSrc(matched?.logourl ?? DEFAULT_LOGO)}
      priority
    />
  );
}