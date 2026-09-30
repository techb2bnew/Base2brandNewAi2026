import React from "react";
import ProjectDetail from "./ProjectDetail";
import { getProjectBySlug, projects } from "../data/projectsData";
import LocalProjectDetail, { getLocalProject } from "../alltools/ProjectDetail";
import { projects as localProjects } from "../data/projects";
import "../../components/Solutions/solution.css";

export function generateStaticParams() {
    return [
        ...localProjects.map((project) => ({ "portfolio-subpages": project.pageSlug })),
        ...projects.map((project) => ({ "portfolio-subpages": project.slug })),
    ];
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.["portfolio-subpages"];
    const localProject = getLocalProject(slug);

    if (localProject) {
        return {
            title: `${localProject.name} | Base2Brand Portfolio`,
            description: localProject.description,
            openGraph: {
                title: localProject.name,
                description: localProject.description,
                images: localProject.image ? [localProject.image] : [],
            },
        };
    }

    const project = getProjectBySlug(slug);

    if (!project) {
        return { title: "Project Not Found" };
    }

    return {
        title: `${project.title} | Base2Brand Portfolio`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.image ? [project.image] : [],
        },
    };
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.["portfolio-subpages"];

    // Directory projects (data/projects.js) render statically; any other slug
    // falls through to the API-backed detail page.
    if (getLocalProject(slug)) {
        return <LocalProjectDetail slug={slug} />;
    }

    return <ProjectDetail slug={slug} />;
}
