import { notFound } from "next/navigation";
import MarketingProjectDetail from "../../alltools/MarketingProjectDetail";
import { marketingProjects, getMarketingProject } from "../../data/marketingProjects";

export function generateStaticParams() {
  return marketingProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getMarketingProject(slug);

  if (!project) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: `${project.title} | Marketing Case Study | Base2Brand`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} | Marketing Case Study`,
      description: project.subtitle,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  if (!getMarketingProject(slug)) {
    notFound();
  }

  return <MarketingProjectDetail slug={slug} />;
}
