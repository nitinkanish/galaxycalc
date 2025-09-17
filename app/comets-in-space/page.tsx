import { Suspense } from "react"
import type { Metadata } from "next"
import { getAllBodies } from "@/lib/api"
import { categorize, searchFilter, sortBodies } from "@/lib/filters"
import { BrowseResults } from "@/components/browse-results"
import { BodyCardSkeleton } from "@/components/body-card-skeleton"
import { SearchInput } from "@/components/search-input"
import type { Body } from "@/lib/types"

export const metadata: Metadata = {
  title: "Comets in Space - Complete Database | GalaxyInfo",
  description:
    "Explore comprehensive information about comets in our solar system. Discover orbital characteristics, composition, and fascinating facts about these icy celestial wanderers.",
  keywords: "comets, space, solar system, celestial bodies, astronomy, orbital mechanics, comet tails, nucleus",
  openGraph: {
    title: "Comets in Space - Complete Database",
    description: "Explore comprehensive information about comets in our solar system",
    type: "website",
  },
}

interface CometsPageProps {
  searchParams: {
    q?: string
    sort?: "name" | "radius" | "gravity"
    page?: string
  }
}

export default async function CometsPage({ searchParams }: CometsPageProps) {
  const { bodies } = await getAllBodies()
  const categories = categorize(bodies)

  let filteredBodies: Body[] = categories.comets

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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">Comets in Space</h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-6 text-pretty max-w-3xl">
          Discover the fascinating world of comets - icy remnants from the early solar system that develop spectacular
          tails when approaching the Sun. Explore {categories.comets.length} comets with detailed orbital data,
          composition information, and discovery history.
        </p>

        {/* Search */}
        <div className="max-w-md">
          <SearchInput placeholder="Search comets..." />
        </div>
      </div>

      {/* Educational Content */}
      <div className="mb-8 sm:mb-12 bg-muted/30 rounded-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">About Comets</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm sm:text-base">
          <div>
            <h3 className="font-medium mb-2">Composition</h3>
            <p className="text-muted-foreground mb-4">
              Comets are composed of ice, dust, and rocky material. Often called "dirty snowballs," they originate from
              the outer regions of the solar system.
            </p>
            <h3 className="font-medium mb-2">Orbital Characteristics</h3>
            <p className="text-muted-foreground">
              Most comets have highly elliptical orbits that take them far from the Sun and then back again, creating
              their distinctive tails during close approaches.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Formation of Tails</h3>
            <p className="text-muted-foreground mb-4">
              As comets approach the Sun, solar radiation causes ice to sublimate, creating a glowing coma and
              spectacular tails that can extend millions of kilometers.
            </p>
            <h3 className="font-medium mb-2">Origin Regions</h3>
            <p className="text-muted-foreground">
              Comets originate from the Kuiper Belt and Oort Cloud, preserving materials from the early formation of our
              solar system.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <main>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">All Comets ({totalItems.toLocaleString()})</h2>
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
