import type { Metadata } from "next";

/** Give every page its own canonical URL and text when shared. */
export function pageMetadata(path: string, page: Metadata): Metadata {
  const title = typeof page.title === "string" ? `${page.title} · Mubien` : "Mubien · A calmer way to explore AI";
  const description = page.description ?? "Using AI daily, building useful things, and exploring how it works and where it reaches its limits.";
  return {
    ...page,
    alternates: { ...page.alternates, canonical: path },
    openGraph: { type: "website", siteName: "Mubien", title, description, url: path, ...page.openGraph },
    twitter: { card: "summary_large_image", title, description, ...page.twitter },
  };
}
