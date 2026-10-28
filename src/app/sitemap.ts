import type { MetadataRoute } from "next";
import { seo } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: seo.siteUrl, changeFrequency: "monthly", priority: 1 }];
}
