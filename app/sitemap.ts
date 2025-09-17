import { getAllBodies } from "@/lib/api"
import { getBodySlug } from "@/lib/utils"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com"

  try {
    const { bodies } = await getAllBodies()

    const bodyUrls = bodies.slice(0, 200).map((body) => ({
      url: `${baseUrl}/celestial-bodies/${getBodySlug(body)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/browse`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/calculator`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      ...bodyUrls,
    ]
  } catch {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/browse`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/calculator`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
    ]
  }
}
