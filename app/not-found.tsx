import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <div className="text-6xl mb-4">🌌</div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The celestial body or page you're looking for seems to have drifted into deep space.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/" className="flex-1">
              <Button variant="default" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/browse" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <Search className="mr-2 h-4 w-4" />
                Browse All
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
