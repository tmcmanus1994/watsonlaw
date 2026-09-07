import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Only the production deployment invites crawlers.
 *
 * Client review happens on preview URLs with Vercel's deployment protection
 * turned off, so anyone holding the link can open them — including a
 * crawler that finds it. Those builds carry an unregistered firm name,
 * placeholder copy and sample posts, none of which should ever appear in a
 * search result. VERCEL_ENV is "production" only on the production
 * deployment; previews and local dev get a blanket disallow, backed by a
 * noindex header in app/layout.tsx (robots.txt is a request, not a
 * guarantee).
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/keystatic", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
