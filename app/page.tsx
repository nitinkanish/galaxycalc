import { Suspense } from "react"
import { getAllBodies } from "@/lib/api"
import { categorize } from "@/lib/filters"
import { HeroSection } from "@/components/hero-section"
import { CategoryCards } from "@/components/category-cards"
import { FeaturedBodies } from "@/components/featured-bodies"
import { BodyCardSkeleton } from "@/components/body-card-skeleton"

export default async function Home() {
  const { bodies } = await getAllBodies()
  const categories = categorize(bodies)

  // Pick 3 random featured bodies with preference for planets and moons
  const featuredCandidates = [...categories.planets, ...categories.moons, ...categories.asteroids.slice(0, 5)]
  const featured = featuredCandidates.sort(() => Math.random() - 0.5).slice(0, 3)

  const categoryCounts = {
    planets: categories.planets.length,
    moons: categories.moons.length,
    asteroids: categories.asteroids.length,
    comets: categories.comets.length,
  }

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-12 sm:pb-16 lg:pb-20">
      <HeroSection />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-balance">Explore by Category</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-pretty">
            Discover the wonders of our solar system through different types of celestial bodies
          </p>
        </div>
        <CategoryCards counts={categoryCounts} />
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-balance">Featured Today</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-pretty">
            Discover these fascinating celestial bodies from our solar system
          </p>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <BodyCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <FeaturedBodies bodies={featured} />
        </Suspense>
      </section>
    </div>
  )
}
