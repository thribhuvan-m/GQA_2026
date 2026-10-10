import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!site.launched) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/checkout", "/launch-checklist", "/api/"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
