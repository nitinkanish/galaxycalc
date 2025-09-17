import { Suspense } from "react"
import type { Metadata } from "next"
import { getAllBodies } from "@/lib/api"
import { categorize, searchFilter, sortBodies } from "@/lib/filters"
import { BrowseResults } from "@/components/browse-results"
import { BodyCardSkeleton } from "@/components/body-card-skeleton"
import { SearchInput } from "@/components/search-input"
import type { Body } from "@/lib/types"

export const metadata: Metadata = {
  title: "Solar System Planets - Complete Database | GalaxyInfo",
  description:
    "Explore comprehensive information about planets in our solar system. Discover orbital mechanics, atmospheric composition, and fascinating facts about the eight planets.",
  keywords:
    "planets, solar system, space, celestial bodies, astronomy, planetary science, orbital mechanics, atmospheres",
  openGraph: {
    title: "Solar System Planets - Complete Database",
    description: "Explore comprehensive information about planets in our solar system",
    type: "website",
  },
}

interface PlanetsPageProps {
  searchParams: {
    q?: string
    sort?: "name" | "radius" | "gravity"
    page?: string
  }
}

export default async function PlanetsPage({ searchParams }: PlanetsPageProps) {
  const { bodies } = await getAllBodies()
  const categories = categorize(bodies)

  let filteredBodies: Body[] = categories.planets

  // Apply search filter
  if (searchParams.q) {
    filteredBodies = filteredBodies.filter(searchFilter(searchParams.q))
  }

  // Apply sorting
  const sortBy = searchParams.sort || "name"
  const sortedBodies = sortBodies(filteredBodies, sortBy)

  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const itemsPerPage = 24
  const totalItems = sortedBodies.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBodies = sortedBodies.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Hero Section */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">Solar System Planets</h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-6 text-pretty max-w-3xl">
          Explore the eight magnificent planets of our solar system - from the scorching surface of Mercury to the icy
          winds of Neptune. Discover detailed information about all {categories.planets.length} planets including
          orbital mechanics, atmospheric composition, and unique characteristics.
        </p>

        {/* Search */}
        <div className="max-w-md">
          <SearchInput placeholder="Search planets..." />
        </div>
      </div>

      {/* Educational Content */}
      <div className="mb-8 sm:mb-12 bg-muted/30 rounded-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">About Planets</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm sm:text-base">
          <div>
            <h3 className="font-medium mb-2">Terrestrial Planets</h3>
            <p className="text-muted-foreground mb-4">
              Mercury, Venus, Earth, and Mars are rocky planets with solid surfaces, formed closer to the Sun where
              temperatures were too high for ice to condense.
            </p>
            <h3 className="font-medium mb-2">Gas Giants</h3>
            <p className="text-muted-foreground">
              Jupiter and Saturn are massive planets composed primarily of hydrogen and helium, with extensive moon
              systems and ring structures.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Ice Giants</h3>
            <p className="text-muted-foreground mb-4">
              Uranus and Neptune contain significant amounts of water, methane, and ammonia ices, giving them their
              distinctive blue-green colors.
            </p>
            <h3 className="font-medium mb-2">Planetary Formation</h3>
            <p className="text-muted-foreground">
              Planets formed from the solar nebula through accretion, with their composition and characteristics
              determined by their distance from the Sun.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <main>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">All Planets ({totalItems.toLocaleString()})</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
          </div>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <BodyCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <BrowseResults
            bodies={paginatedBodies}
            searchParams={searchParams}
            totalItems={totalItems}
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
          />
        </Suspense>
      </main>
    </div>
  )
}
