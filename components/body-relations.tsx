import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import type { Body } from "@/lib/types"

interface BodyRelationsProps {
  body: Body
}

export function BodyRelations({ body }: BodyRelationsProps) {
  const hasMoons = body.moons && body.moons.length > 0
  const hasParent = body.aroundPlanet

  if (!hasMoons && !hasParent) {
    return null
  }

  return (
    <div className="space-y-6">
      {hasParent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Orbits Around
              <Badge variant="outline">Parent Body</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{body.aroundPlanet?.planet}</p>
              {body.aroundPlanet?.rel && (
                <Link href={body.aroundPlanet.rel} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View Details
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {hasMoons && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Moons
              <Badge variant="outline">{body.moons?.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {body.moons?.map((moon, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{moon.moon}</span>
                  {moon.rel && (
                    <Link href={moon.rel} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm">
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
    </div>
  )
}
