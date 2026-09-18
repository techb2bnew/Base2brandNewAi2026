"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { getSectionComponent } from "@/CmsComponents/sectionMap";
import { hexToRgbString, lightenHex, darkenHex } from "@/lib/utils";
import { getCategoryForRoute } from "@/CmsComponents/cmsCategoryRoutes";
import "@/CmsComponents/cms-components.css";

const API_BASE =
    process.env.NEXT_PUBLIC_LOCAL_API_URL

const DEFAULT_PRIMARY_COLOR = "#ff6a00";

const CmsCategoryPage = () => {
    const params = useParams();
    const pathname = usePathname();
    const slug = Object.values(params ?? {})[0];
    const routeSegment = pathname?.split("/").filter(Boolean)[0];
    const category = getCategoryForRoute(routeSegment);
    const [cmsPage, setCmsPage] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) return;

        const fetchCmsPage = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/cms-pages/public/${encodeURIComponent(slug)}`,
                    {
                        cache: "no-store",
                        headers: { "ngrok-skip-browser-warning": "true" },
                    }
                );

                const data = await response.json();
                // console.log('Cms page', data);

                if (!response.ok || !data?.success || !data?.cmsPage) {
                    setNotFound(true);
                    setCmsPage(null);
                    return;
                }

                setCmsPage(data.cmsPage);
            } catch (error) {
                console.error("Cms page fetch error:", error);
                setNotFound(true);
            }
        };

        fetchCmsPage();
    }, [slug]);

    useEffect(() => {
        if (!cmsPage) return;

        const targets = [document.documentElement, document.body];
        const primaryColor = cmsPage.theme?.primaryColor || DEFAULT_PRIMARY_COLOR;
        const lightColor = lightenHex(primaryColor, 0.35);
        const darkColor = darkenHex(primaryColor, 0.25);

        const vars = {
            "--b2b-primary": primaryColor,
            "--b2b-primary-rgb": cmsPage.theme?.primaryColorRgb || hexToRgbString(primaryColor),
            "--b2b-primary-light": lightColor,
            "--b2b-primary-light-rgb": hexToRgbString(lightColor),
            "--b2b-primary-dark": darkColor,
            "--b2b-primary-dark-rgb": hexToRgbString(darkColor),
        };

        targets.forEach((el) => {
            Object.entries(vars).forEach(([key, value]) => {
                el.style.setProperty(key, value);
            });
        });

        return () => {
            targets.forEach((el) => {
                Object.keys(vars).forEach((key) => {
                    el.style.removeProperty(key);
                });
            });
        };
    }, [cmsPage]);

    if (notFound) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#02030a] px-6 text-center text-white/60">
                This page is not published.
            </div>
        );
    }

    if (!cmsPage) {
        return (
            <div className="relative min-h-screen overflow-hidden bg-[#02030a]">
                <div className="mx-auto max-w-[1180px] px-6 pt-32 pb-20 md:px-12">
                    <div className="mx-auto h-4 w-40 animate-pulse rounded-full bg-white/10" />

                    <div className="mx-auto mt-8 h-12 w-full max-w-3xl animate-pulse rounded-xl bg-white/10 md:h-16" />
                    <div className="mx-auto mt-4 h-12 w-full max-w-2xl animate-pulse rounded-xl bg-white/10 md:h-16" />

                    <div className="mx-auto mt-6 h-4 w-full max-w-xl animate-pulse rounded bg-white/10" />
                    <div className="mx-auto mt-3 h-4 w-full max-w-lg animate-pulse rounded bg-white/10" />

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <div className="h-12 w-48 animate-pulse rounded-full bg-white/10" />
                        <div className="h-12 w-48 animate-pulse rounded-full bg-white/5" />
                    </div>

                    <div className="mt-16 grid gap-4 sm:grid-cols-3">
                        {[0, 1, 2].map((item) => (
                            <div
                                key={item}
                                className="h-24 animate-pulse rounded-2xl bg-white/5"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (cmsPage.category !== category) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#02030a] px-6 text-center text-white/60">
                Page Not Found
            </div>
        );
    }

    if (cmsPage.status !== true) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#02030a] px-6 text-center text-white/60">
                This page is not published.
            </div>
        );
    }

    const sections = Array.isArray(cmsPage.sections) ? cmsPage.sections : [];
    const primaryColor = cmsPage.theme?.primaryColor || DEFAULT_PRIMARY_COLOR;
    const lightColor = lightenHex(primaryColor, 0.35);
    const darkColor = darkenHex(primaryColor, 0.25);

    const themeVars = {
        "--b2b-primary": primaryColor,
        "--b2b-primary-rgb": cmsPage.theme?.primaryColorRgb || hexToRgbString(primaryColor),
        "--b2b-primary-light": lightColor,
        "--b2b-primary-light-rgb": hexToRgbString(lightColor),
        "--b2b-primary-dark": darkColor,
        "--b2b-primary-dark-rgb": hexToRgbString(darkColor),
    };

    return (
        <div className="cms-page-shell" style={themeVars}>
            {sections
                .filter((section) => !section.hidden)
                .sort((a, b) => a.order - b.order)
                .map((section) => {
                    const Component = getSectionComponent(section.sectionType);

                    if (!Component) return null;

                    return <Component key={section.id} {...section.content} />;
                })}
        </div>
    );
};

export default CmsCategoryPage;
