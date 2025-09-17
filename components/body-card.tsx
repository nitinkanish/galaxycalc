import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBodyTypeColor, truncateText, getBodySlug } from "@/lib/utils"
import type { Body } from "@/lib/types"

interface BodyCardProps {
  body: Body
}

export function BodyCard({ body }: BodyCardProps) {
  const displayName = body.englishName || body.name
  const radius = body.meanRadius ? `${body.meanRadius.toLocaleString()} km` : "—"
  const gravity = body.gravity ? `${body.gravity.toFixed(2)} m/s²` : "—"
  const discoveredBy = body.discoveredBy ? truncateText(body.discoveredBy, 30) : "—"

  const bodySlug = getBodySlug(body)

  return (
    <Link
      href={`/celestial-bodies/${bodySlug}`}
      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
      aria-label={`View details for ${displayName}, a ${body.bodyType.toLowerCase()}`}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base sm:text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {displayName}
            </CardTitle>
            <Badge
              className={`shrink-0 text-xs ${getBodyTypeColor(body.bodyType)}`}
              aria-label={`Type: ${body.bodyType}`}
            >
              {body.bodyType}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-muted-foreground block font-medium">Radius</span>
              <div className="font-medium" aria-label={`Radius: ${radius}`}>
                {radius}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground block font-medium">Gravity</span>
              <div className="font-medium" aria-label={`Gravity: ${gravity}`}>
                {gravity}
              </div>
            </div>
          </div>
          {discoveredBy !== "—" && (
            <div className="text-xs sm:text-sm">
              <span className="text-muted-foreground block font-medium">Discovered by</span>
              <div className="font-medium" title={body.discoveredBy} aria-label={`Discovered by: ${body.discoveredBy}`}>
                {discoveredBy}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
