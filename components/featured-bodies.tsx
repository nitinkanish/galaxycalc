import { BodyCard } from "@/components/body-card"
import type { Body } from "@/lib/types"

interface FeaturedBodiesProps {
  bodies: Body[]
}

export function FeaturedBodies({ bodies }: FeaturedBodiesProps) {
  if (bodies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No featured bodies available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bodies.map((body) => (
        <BodyCard key={body.id} body={body} />
      ))}
    </div>
  )
}
