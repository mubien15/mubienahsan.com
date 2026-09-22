import type { MetadataRoute } from "next";
import { COURSES } from "@/content/courses";
import { PUBLISHED_CONTROLS } from "@/content/agents";
import { PROJECTS } from "@/content/projects";

const SITE_URL = "https://mubienahsan.com";

/**
 * Built from the real content, so new courses and lessons appear here without
 * anyone remembering to update a list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Use the date the content was actually revised. Generating a fresh timestamp
  // on every request tells crawlers that every page changed when it did not.
  const lastUpdated = new Date("2026-09-22");

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: lastUpdated, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/courses`, lastModified: lastUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/research`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/research/autonomy-governance`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/research/learning-and-self-improvement`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/agents`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/library`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/legal`, lastModified: lastUpdated, changeFrequency: "yearly", priority: 0.2 },
  ];

  const coursePages: MetadataRoute.Sitemap = COURSES.filter(
    (course) => course.status === "Available"
  ).flatMap((course) => [
    {
      url: `${SITE_URL}/courses/${course.slug}`,
      lastModified: lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...course.lessons.map((lesson) => ({
      url: `${SITE_URL}/courses/${course.slug}/${lesson.slug}`,
      lastModified: lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  const controlPages: MetadataRoute.Sitemap = PUBLISHED_CONTROLS.map((control) => ({
    url: `${SITE_URL}/agents/${control.slug}`,
    lastModified: lastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = PROJECTS.filter(
    (project) => project.caseStudy
  ).map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: lastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages, ...coursePages, ...controlPages];
}
