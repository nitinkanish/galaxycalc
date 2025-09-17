import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getBodyTypeColor } from "@/lib/utils"
import type { Body } from "@/lib/types"

interface BodyHeaderProps {
  body: Body
}

export function BodyHeader({ body }: BodyHeaderProps) {
  const displayName = body.englishName || body.name

  return (
    <div className="space-y-4">
      <nav aria-label="Breadcrumb">
        <Link href="/browse">
          <Button variant="ghost" className="mb-4" aria-label="Go back to browse celestial bodies">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Browse
          </Button>
        </Link>
      </nav>

      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2 flex-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance leading-tight">{displayName}</h1>
          {body.alternativeName && (
            <p
              className="text-base sm:text-lg text-muted-foreground"
              aria-label={`Also known as ${body.alternativeName}`}
            >
              <span className="sr-only">Alternative name: </span>
              Also known as: {body.alternativeName}
            </p>
          )}
        </div>
        <Badge
          variant="secondary"
          className={`text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 w-fit shrink-0 ${getBodyTypeColor(body.bodyType)}`}
          aria-label={`Body type: ${body.bodyType}`}
        >
          {body.bodyType}
        </Badge>
      </header>

      {body.dimension && (
        <div className="text-sm sm:text-base text-muted-foreground">
          <span className="font-medium">Dimensions:</span>
          <span className="ml-1">{body.dimension}</span>
        </div>
      )}
    </div>
  )
}
