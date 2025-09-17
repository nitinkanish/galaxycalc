import { Suspense } from "react"
import type { Metadata } from "next"
import { getAllBodies } from "@/lib/api"
import { categorize, searchFilter, sortBodies } from "@/lib/filters"
import { BrowseResults } from "@/components/browse-results"
import { BodyCardSkeleton } from "@/components/body-card-skeleton"
import { SearchInput } from "@/components/search-input"
import type { Body } from "@/lib/types"

export const metadata: Metadata = {
  title: "Moons in Space - Complete Database | GalaxyInfo",
  description:
    "Explore comprehensive information about moons in our solar system. Discover orbital mechanics, surface features, and fascinating facts about planetary satellites.",
  keywords:
    "moons, satellites, space, solar system, celestial bodies, astronomy, planetary science, lunar, orbital mechanics",
  openGraph: {
    title: "Moons in Space - Complete Database",
    description: "Explore comprehensive information about moons in our solar system",
    type: "website",
  },
}

interface MoonsPageProps {
  searchParams: {
    q?: string
    sort?: "name" | "radius" | "gravity"
    page?: string
  }
}

export default async function MoonsPage({ searchParams }: MoonsPageProps) {
  const { bodies } = await getAllBodies()
  const categories = categorize(bodies)

  let filteredBodies: Body[] = categories.moons

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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">Moons in Space</h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-6 text-pretty max-w-3xl">
          Explore the diverse world of planetary satellites - from Earth's familiar Moon to the exotic moons of the
          outer planets. Discover {categories.moons.length} moons with detailed orbital data, surface characteristics,
          and unique features.
        </p>

        {/* Search */}
        <div className="max-w-md">
          <SearchInput placeholder="Search moons..." />
        </div>
      </div>

      {/* Educational Content */}
      <div className="mb-8 sm:mb-12 bg-muted/30 rounded-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">About Moons</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm sm:text-base">
          <div>
            <h3 className="font-medium mb-2">Formation</h3>
            <p className="text-muted-foreground mb-4">
              Moons form through various processes including capture, co-formation with their parent planet, or impact
              events that eject material into orbit.
            </p>
            <h3 className="font-medium mb-2">Orbital Dynamics</h3>
            <p className="text-muted-foreground">
              Moons exhibit complex orbital relationships, including tidal locking, resonances, and gravitational
              interactions that shape their evolution.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Surface Features</h3>
            <p className="text-muted-foreground mb-4">
              From cratered landscapes to active volcanism and subsurface oceans, moons display incredible geological
              diversity across the solar system.
            </p>
            <h3 className="font-medium mb-2">Exploration Targets</h3>
            <p className="text-muted-foreground">
              Many moons are prime targets for exploration due to potential subsurface oceans, unique geology, and clues
              about planetary formation.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <main>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">All Moons ({totalItems.toLocaleString()})</h2>
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
