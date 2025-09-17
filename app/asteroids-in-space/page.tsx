import { Suspense } from "react"
import type { Metadata } from "next"
import { getAllBodies } from "@/lib/api"
import { categorize, searchFilter, sortBodies } from "@/lib/filters"
import { BrowseResults } from "@/components/browse-results"
import { BodyCardSkeleton } from "@/components/body-card-skeleton"
import { SearchInput } from "@/components/search-input"
import type { Body } from "@/lib/types"

export const metadata: Metadata = {
  title: "Asteroids in Space - Complete Database | GalaxyInfo",
  description:
    "Explore comprehensive information about asteroids in our solar system. Discover orbital characteristics, composition, and fascinating facts about these rocky remnants.",
  keywords:
    "asteroids, space, solar system, celestial bodies, astronomy, asteroid belt, near-earth objects, rocky bodies",
  openGraph: {
    title: "Asteroids in Space - Complete Database",
    description: "Explore comprehensive information about asteroids in our solar system",
    type: "website",
  },
}

interface AsteroidsPageProps {
  searchParams: {
    q?: string
    sort?: "name" | "radius" | "gravity"
    page?: string
  }
}

export default async function AsteroidsPage({ searchParams }: AsteroidsPageProps) {
  const { bodies } = await getAllBodies()
  const categories = categorize(bodies)

  let filteredBodies: Body[] = categories.asteroids

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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">Asteroids in Space</h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-6 text-pretty max-w-3xl">
          Discover the rocky remnants of planetary formation - asteroids that populate our solar system from the main
          belt to near-Earth orbits. Explore {categories.asteroids.length} asteroids with detailed orbital data,
          composition analysis, and discovery information.
        </p>

        {/* Search */}
        <div className="max-w-md">
          <SearchInput placeholder="Search asteroids..." />
        </div>
      </div>

      {/* Educational Content */}
      <div className="mb-8 sm:mb-12 bg-muted/30 rounded-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">About Asteroids</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm sm:text-base">
          <div>
            <h3 className="font-medium mb-2">Composition</h3>
            <p className="text-muted-foreground mb-4">
              Asteroids are rocky and metallic objects ranging from small boulders to bodies hundreds of kilometers
              across, composed of materials from the early solar system.
            </p>
            <h3 className="font-medium mb-2">Main Asteroid Belt</h3>
            <p className="text-muted-foreground">
              Most asteroids orbit in the main belt between Mars and Jupiter, prevented from forming a planet by
              Jupiter's gravitational influence.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Near-Earth Objects</h3>
            <p className="text-muted-foreground mb-4">
              Some asteroids have orbits that bring them close to Earth, making them important targets for both
              scientific study and planetary defense.
            </p>
            <h3 className="font-medium mb-2">Scientific Value</h3>
            <p className="text-muted-foreground">
              Asteroids preserve pristine materials from the early solar system, offering insights into planetary
              formation and the origin of life.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <main>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">All Asteroids ({totalItems.toLocaleString()})</h2>
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
