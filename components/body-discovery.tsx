import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stat } from "@/components/stat"
import type { Body } from "@/lib/types"

interface BodyDiscoveryProps {
  body: Body
}

export function BodyDiscovery({ body }: BodyDiscoveryProps) {
  const hasDiscoveryInfo = body.discoveredBy || body.discoveryDate

  if (!hasDiscoveryInfo) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discovery Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Stat label="Discovered By" value={body.discoveredBy || "Unknown"} />
          <Stat label="Discovery Date" value={body.discoveryDate || "Unknown"} />
        </dl>
      </CardContent>
    </Card>
  )
}
