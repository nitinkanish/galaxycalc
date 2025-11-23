import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"
import { getBody, getAllBodies } from "@/lib/api"
import { categorize } from "@/lib/filters"
import { BodyHeader } from "@/components/body-header"
import { BodyStats } from "@/components/body-stats"
import { BodyRelations } from "@/components/body-relations"
import { BodyDiscovery } from "@/components/body-discovery"
import { BodyRawData } from "@/components/body-raw-data"
import { BodySeoContent } from "@/components/body-seo-content"
import { Skeleton } from "@/components/ui/skeleton"
import { parseSlug, getBodySlug, createCanonicalUrl } from "@/lib/utils"
import type { Metadata } from "next"

interface BodyPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BodyPageProps): Promise<Metadata> {
  try {
    const { id } = parseSlug(params.slug)
    const body = await getBody(id)

    if (!body) {
      return {
        title: "Celestial Body Not Found | GalaxyCalc",
        description: "The requested celestial body could not be found.",
      }
    }

    const displayName = body.englishName || body.name
    const canonicalSlug = getBodySlug(body)
    const canonicalUrl = createCanonicalUrl(`/celestial-bodies/${canonicalSlug}`)

    function formatValue(value: any, unit = "", precision = 2) {
      if (value === null || value === undefined || value === "" || Number.isNaN(value)) {
        return "unknown";
      }

      // Handle scientific notation cleanly
      if (typeof value === "number" || !isNaN(Number(value))) {
        const num = Number(value);
        return `${num.toExponential(precision)} ${unit}`.trim();
      }

      // Handle object types like { value: 2.00e+15, unit: "kg" }
      if (typeof value === "object" && value.value !== undefined) {
        return `${value.value} ${value.unit || unit}`.trim();
      }

      // Fallback to string
      return `${value} ${unit}`.trim();
    }

  const au = body.semimajorAxis ? (body.semimajorAxis / 149598023).toFixed(2) : null
  const isJupiter = (displayName.toLowerCase() === "jupiter")
  
  // Jupiter-specific keywords
  const jupiterKeywords = isJupiter ? [
    "Jupiter orbit distance",
    "Jupiter radius",
    "Jupiter distance from Earth",
    "distance from Jupiter to Earth",
    "Jupiter's orbit around the Sun",
    "Jupiter orbit distance from Sun",
    "Jupiter radius in km",
    "Jupiter distance from Earth km",
  ] : []
  
  return {
    title: isJupiter 
      ? `${displayName}: The Giant Planet — Orbit Distance, Radius & Distance from Earth | GalaxyCalc`
      : `${displayName} ${body.bodyType ? `(${body.bodyType})` : ""} — Radius, Mass, Orbital Period & Distance from Earth | GalaxyCalc`,
  
    description: `Explore comprehensive data about ${displayName}: discover the ${displayName} radius (${formatValue(body.meanRadius || body.equaRadius, "km")}), ${displayName} mass (${formatValue(body.mass, "kg")}), and ${displayName} orbital period. Learn how far ${displayName} is from Earth and explore its semi-major axis${au ? ` (${au} AU)` : ''} and orbital radius. Complete ${displayName} calculator with radius, mass in kg, and distance measurements.`,
  
    keywords: [
      ...jupiterKeywords,
      `${displayName} ${body.bodyType}`,
      `${displayName} radius`,
      `Radius of ${displayName}`,
      `${displayName} semi-major axis`,
      ...(body.semimajorAxis ? [`${displayName} semi-major axis ${(body.semimajorAxis / 149598023).toFixed(1)} AU`] : []),
      `Orbital radius of ${displayName}`,
      `${displayName} mass`,
      `Mass of ${displayName} in kg`,
      `${displayName} orbital period`,
      `How far is ${displayName} from Earth`,
      `${displayName} orbit data`,
      `${displayName} gravity`,
      `${displayName} distance from Sun`,
      `${displayName} orbital calculator`,
      "planetary data",
      "astronomy tools",
      "space calculator",
      "GalaxyCalc",
    ],
  
    openGraph: {
      title: `${displayName} ${body.bodyType ? `(${body.bodyType})` : ""} — Orbit, Radius & Space Data | GalaxyCalc`,
      description: `Discover ${displayName}’s physical and orbital characteristics — radius, mass, gravity, and orbital period — with the GalaxyCalc space data calculator.`,
      type: "article",
      url: canonicalUrl,
      siteName: "GalaxyCalc",
    },
  
    twitter: {
      card: "summary_large_image",
      title: `${displayName} ${body.bodyType ? `(${body.bodyType})` : ""} — Orbital & Physical Data`,
      description: `Explore ${displayName}’s detailed ${body.bodyType?.toLowerCase() || ""} data, including radius, mass, and orbital mechanics, using GalaxyCalc.`,
    },
  
    alternates: {
      canonical: canonicalUrl,
    },
  
    robots: {
      index: true,
      follow: true,
    },
  };

  } catch {
    return {
      title: "Celestial Body Not Found | GalaxyCalc",
      description: "The requested celestial body could not be found.",
    }
  }
}

export async function generateStaticParams() {
  try {
    const { bodies } = await getAllBodies()
    return bodies.slice(0, 200).map((body) => ({
      slug: getBodySlug(body),
    }))
  } catch {
    return []
  }
}

export default async function BodyPage({ params }: BodyPageProps) {
  try {
    const { id } = parseSlug(params.slug)
    const body = await getBody(id)

    if (!body) {
      notFound()
    }

    // Ensure we're using the canonical slug (ID)
    const canonicalSlug = getBodySlug(body)
    if (params.slug !== canonicalSlug) {
      redirect(`/celestial-bodies/${canonicalSlug}`)
    }

    // Fetch all bodies for related links
    const { bodies: allBodies } = await getAllBodies()
    const { planets } = categorize(allBodies)

    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <BodyHeader body={body} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <BodySeoContent body={body} />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <BodyStats body={body} />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-32 w-full" />}>
              <BodyDiscovery body={body} />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-48 w-full" />}>
              <BodyRawData body={body} />
            </Suspense>
          </div>

          <div className="space-y-8">
            <Suspense fallback={<Skeleton className="h-48 w-full" />}>
              <BodyRelations body={body} allBodies={allBodies} planets={planets} />
            </Suspense>
          </div>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
