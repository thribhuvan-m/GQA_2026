import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

const routes = ["", "/shop", "/our-story", "/ingredients", "/faq", "/contact", "/policies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl()}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path === "/shop" ? 0.9 : 0.6,
  }));
}
