import SolutionPage from './SolutionPage'
import { CMS_CATEGORY_BY_ROUTE } from '@/CmsComponents/cmsCategoryRoutes'

const API_BASE = process.env.NEXT_PUBLIC_LOCAL_API_URL

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
        return { title: "Page Not Found" };
    }

    try {
        const response = await fetch(
            `${API_BASE}/cms-pages/public/${encodeURIComponent(slug)}`,
            {
                cache: "no-store",
                headers: { "ngrok-skip-browser-warning": "true" },
            }
        );

        if (!response.ok) {
            return { title: "Page Not Found" };
        }

        const data = await response.json();
        const cmsPage = data?.cmsPage;

        if (!cmsPage || cmsPage.category !== CMS_CATEGORY_BY_ROUTE.solution) {
            return { title: "Page Not Found" };
        }

        return {
            title: cmsPage.metaTitle || cmsPage.name,
            description: cmsPage.metaDescription,
            alternates: {
                canonical: `https://www.base2brand.com/solution/${slug}`,
            },
            openGraph: {
                title: cmsPage.metaTitle || cmsPage.name,
                description: cmsPage.metaDescription,
                url: `https://www.base2brand.com/solution/${slug}`,
            },
        };
    } catch {
        return { title: "Page Not Found" };
    }
}

const page = () => {
    return (
        <div>
            <SolutionPage />
        </div>
    )
}

export default page
