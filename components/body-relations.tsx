import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Globe, Moon, Star } from "lucide-react"
import { getBodySlug } from "@/lib/utils"
import type { Body } from "@/lib/types"

interface BodyRelationsProps {
  body: Body
  allBodies?: Body[]
  planets?: Body[]
}

// Standard 8 planets in order from the Sun
const PLANET_ORDER = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
]

export function BodyRelations({ body, allBodies = [], planets = [] }: BodyRelationsProps) {
  const hasMoons = body.moons && body.moons.length > 0
  const hasParent = body.aroundPlanet

  // Get related bodies (same type, excluding current body)
  const relatedBodies = allBodies
    .filter((b) => b.bodyType === body.bodyType && b.id !== body.id)
    .slice(0, 8)

  // Get solar system planets (sorted by order from Sun)
  const solarSystemPlanets = planets
    .filter((p) => PLANET_ORDER.includes(p.englishName || p.name))
    .sort((a, b) => {
      const aIndex = PLANET_ORDER.indexOf(a.englishName || a.name)
      const bIndex = PLANET_ORDER.indexOf(b.englishName || b.name)
      return aIndex - bIndex
    })

  return (
    <div className="lg:sticky lg:top-8 space-y-6 h-fit">
      {/* Solar System Planets */}
      {solarSystemPlanets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-4 w-4" />
              Solar System Planets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {solarSystemPlanets.map((planet) => {
                const slug = getBodySlug(planet)
                const displayName = planet.englishName || planet.name
                const isCurrent = planet.id === body.id
                
                return (
                  <Link
                    key={planet.id}
                    href={`/celestial-bodies/${slug}`}
                    className={`block p-2 rounded-lg transition-colors ${
                      isCurrent
                        ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{displayName}</span>
                      {isCurrent && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Bodies */}
      {relatedBodies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-4 w-4" />
              Related {body.bodyType}s
              <Badge variant="outline">{relatedBodies.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {relatedBodies.map((relatedBody) => {
                const slug = getBodySlug(relatedBody)
                const displayName = relatedBody.englishName || relatedBody.name
                
                return (
                  <Link
                    key={relatedBody.id}
                    href={`/celestial-bodies/${slug}`}
                    className="block p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <span className="text-sm font-medium">{displayName}</span>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Parent Body */}
      {hasParent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Moon className="h-4 w-4" />
              Orbits Around
              <Badge variant="outline">Parent Body</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{body.aroundPlanet?.planet}</p>
              {body.aroundPlanet?.rel && (
                <Link href={body.aroundPlanet.rel} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    View External Details
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Moons */}
      {hasMoons && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Moon className="h-4 w-4" />
              Moons
              <Badge variant="outline">{body.moons?.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {body.moons?.map((moon, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                >
                  <span className="text-sm font-medium">{moon.moon}</span>
                  {moon.rel && (
                    <Link href={moon.rel} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Quick Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Link
              href="/browse"
              className="block p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
            >
              Browse All Bodies
            </Link>
            <Link
              href="/solar-system-planets"
              className="block p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
            >
              All Planets
            </Link>
            <Link
              href="/moons-in-space"
              className="block p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
            >
              All Moons
            </Link>
            <Link
              href="/asteroids-in-space"
              className="block p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
            >
              All Asteroids
            </Link>
            <Link
              href="/comets-in-space"
              className="block p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
            >
              All Comets
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
