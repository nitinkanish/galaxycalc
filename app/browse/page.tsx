import { Suspense } from "react"
import { getAllBodies } from "@/lib/api"
import { categorize, searchFilter, sortBodies } from "@/lib/filters"
import { BrowseFilters } from "@/components/browse-filters"
import { BrowseResults } from "@/components/browse-results"
import { BodyCardSkeleton } from "@/components/body-card-skeleton"
import type { Body } from "@/lib/types"

interface BrowsePageProps {
  searchParams: {
    q?: string
    category?: string
    sort?: "name" | "radius" | "gravity"
    minRadius?: string
    maxRadius?: string
    minGravity?: string
    maxGravity?: string
    discoveredBy?: string
    hasMoons?: string
    page?: string
  }
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const { bodies } = await getAllBodies()
  const categories = categorize(bodies)

  // Apply filters
  let filteredBodies: Body[] = bodies

  // Search filter
  if (searchParams.q) {
    filteredBodies = filteredBodies.filter(searchFilter(searchParams.q))
  }

  // Category filter
  if (searchParams.category) {
    switch (searchParams.category) {
      case "planets":
        filteredBodies = categories.planets
        break
      case "moons":
        filteredBodies = categories.moons
        break
      case "asteroids":
        filteredBodies = categories.asteroids
        break
      case "comets":
        filteredBodies = categories.comets
        break
    }

    // Apply search to filtered category
    if (searchParams.q) {
      filteredBodies = filteredBodies.filter(searchFilter(searchParams.q))
    }
  }

  // Radius filter
  if (searchParams.minRadius || searchParams.maxRadius) {
    const minRadius = searchParams.minRadius ? Number.parseFloat(searchParams.minRadius) : 0
    const maxRadius = searchParams.maxRadius ? Number.parseFloat(searchParams.maxRadius) : Number.POSITIVE_INFINITY

    filteredBodies = filteredBodies.filter((body) => {
      const radius = body.meanRadius || 0
      return radius >= minRadius && radius <= maxRadius
    })
  }

  // Gravity filter
  if (searchParams.minGravity || searchParams.maxGravity) {
    const minGravity = searchParams.minGravity ? Number.parseFloat(searchParams.minGravity) : 0
    const maxGravity = searchParams.maxGravity ? Number.parseFloat(searchParams.maxGravity) : Number.POSITIVE_INFINITY

    filteredBodies = filteredBodies.filter((body) => {
      const gravity = body.gravity || 0
      return gravity >= minGravity && gravity <= maxGravity
    })
  }

  // Discovered by filter
  if (searchParams.discoveredBy) {
    const discoverer = searchParams.discoveredBy.toLowerCase()
    filteredBodies = filteredBodies.filter((body) => body.discoveredBy?.toLowerCase().includes(discoverer))
  }

  // Has moons filter
  if (searchParams.hasMoons === "true") {
    filteredBodies = filteredBodies.filter((body) => body.moons && body.moons.length > 0)
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

  const categoryCounts = {
    planets: categories.planets.length,
    moons: categories.moons.length,
    asteroids: categories.asteroids.length,
    comets: categories.comets.length,
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Browse Celestial Bodies</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Explore and filter through {bodies.length.toLocaleString()} celestial bodies in our solar system
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
        <aside className="xl:w-80 xl:shrink-0">
          <div className="sticky top-20 space-y-6">
            <BrowseFilters categoryCounts={categoryCounts} />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
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
    </div>
  )
}
