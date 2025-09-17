import type { Body } from "@/lib/types"

interface StructuredDataProps {
  body: Body
}

export function StructuredData({ body }: StructuredDataProps) {
  const displayName = body.englishName || body.name
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com"

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${displayName} — ${body.bodyType} Data & Calculations`,
    description: `Detailed information and calculations for ${displayName}, a ${body.bodyType.toLowerCase()} in our solar system.`,
    author: {
      "@type": "Organization",
      name: "GalaxyCalc",
    },
    publisher: {
      "@type": "Organization",
      name: "GalaxyCalc",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/celestial-bodies/${body.id}`,
    },
    about: {
      "@type": "Thing",
      name: displayName,
      description: `${body.bodyType} in our solar system`,
      additionalType: `https://schema.org/${body.bodyType}`,
      ...(body.meanRadius && {
        size: {
          "@type": "QuantitativeValue",
          value: body.meanRadius,
          unitText: "km",
        },
      }),
      ...(body.gravity && {
        gravity: {
          "@type": "QuantitativeValue",
          value: body.gravity,
          unitText: "m/s²",
        },
      }),
      ...(body.discoveredBy && {
        discoverer: {
          "@type": "Person",
          name: body.discoveredBy,
        },
      }),
      ...(body.discoveryDate && {
        dateCreated: body.discoveryDate,
      }),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
