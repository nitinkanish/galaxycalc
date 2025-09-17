import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"
import { getBody, getAllBodies, findBodyByName } from "@/lib/api"
import { BodyHeader } from "@/components/body-header"
import { BodyStats } from "@/components/body-stats"
import { BodyRelations } from "@/components/body-relations"
import { BodyDiscovery } from "@/components/body-discovery"
import { BodyRawData } from "@/components/body-raw-data"
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
    const { name, isLegacyId } = parseSlug(params.slug)
    let body

    if (isLegacyId) {
      body = await getBody(name)
    } else {
      body = await findBodyByName(name)
    }

    if (!body) {
      return {
        title: "Celestial Body Not Found | GalaxyCalc",
        description: "The requested celestial body could not be found.",
      }
    }

    const displayName = body.englishName || body.name
    const canonicalSlug = getBodySlug(body)
    const canonicalUrl = createCanonicalUrl(`/celestial-bodies/${canonicalSlug}`)

    return {
      title: `${displayName} — ${body.bodyType} Calculator & Data | GalaxyCalc`,
      description: `Calculate orbital mechanics and explore detailed data for ${displayName}, a ${body.bodyType.toLowerCase()} in our solar system. Physical properties, orbital characteristics, and space calculations.`,
      keywords: [
        displayName,
        body.bodyType.toLowerCase(),
        "orbital mechanics",
        "space calculations",
        "celestial body data",
        "astronomy calculator",
      ],
      openGraph: {
        title: `${displayName} — ${body.bodyType} Calculator & Data`,
        description: `Calculate orbital mechanics and explore detailed data for ${displayName}`,
        type: "article",
        url: canonicalUrl,
        siteName: "GalaxyCalc",
      },
      twitter: {
        card: "summary_large_image",
        title: `${displayName} — ${body.bodyType} Calculator`,
        description: `Calculate orbital mechanics and explore detailed data for ${displayName}`,
      },
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
      },
    }
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
    const { name, isLegacyId } = parseSlug(params.slug)
    let body

    if (isLegacyId) {
      // Handle legacy numeric ID - redirect to slug URL
      body = await getBody(name)
      if (body) {
        const correctSlug = getBodySlug(body)
        redirect(`/celestial-bodies/${correctSlug}`)
      }
    } else {
      body = await findBodyByName(name)
    }

    if (!body) {
      notFound()
    }

    // Ensure we're using the canonical slug
    const canonicalSlug = getBodySlug(body)
    if (params.slug !== canonicalSlug && !isLegacyId) {
      redirect(`/celestial-bodies/${canonicalSlug}`)
    }

    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <BodyHeader body={body} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
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
              <BodyRelations body={body} />
            </Suspense>
          </div>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
