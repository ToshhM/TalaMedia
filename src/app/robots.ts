import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Brouillons partageables et back-office : jamais indexés.
      disallow: ["/preview/", "/studio", "/recherche"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
