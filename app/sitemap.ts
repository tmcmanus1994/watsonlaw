import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { attorneys } from "@/content/attorneys";
import { practiceAreas } from "@/content/practice-areas";
import { getAllPosts } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/firm", "/attorneys", "/practice", "/news", "/contact"];
  return [
    ...staticRoutes.map((route) => ({ url: `${site.url}${route}` })),
    ...practiceAreas.map((p) => ({ url: `${site.url}/practice/${p.slug}` })),
    ...attorneys.map((a) => ({ url: `${site.url}/attorneys/${a.slug}` })),
    ...getAllPosts().map((post) => ({
      url: `${site.url}/news/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
