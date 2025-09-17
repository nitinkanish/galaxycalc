import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BodyCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-16 ml-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Skeleton className="h-4 w-12 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div>
            <Skeleton className="h-4 w-12 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}
