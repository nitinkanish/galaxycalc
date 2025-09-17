import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Database, Code, Telescope } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Telescope className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">About GalaxyInfo</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Your comprehensive guide to exploring celestial bodies in our solar system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="p-2 bg-primary/10 rounded-lg w-fit">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Rich Data Source</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Powered by the Solar System OpenData API, providing comprehensive information about planets, moons,
              asteroids, and comets in our solar system.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="p-2 bg-primary/10 rounded-lg w-fit">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Modern Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Built with Next.js 14+, TypeScript, and Tailwind CSS for a fast, responsive, and accessible user
              experience across all devices.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="p-2 bg-primary/10 rounded-lg w-fit">
              <Telescope className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Educational Purpose</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Designed to make space exploration accessible to everyone, from students and educators to astronomy
              enthusiasts and researchers.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Browse & Search</h3>
              <p className="text-sm text-muted-foreground">
                Explore over 1,000 celestial bodies with advanced filtering and search capabilities.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Detailed Information</h3>
              <p className="text-sm text-muted-foreground">
                Access comprehensive data including physical properties, orbital characteristics, and discovery
                information.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Responsive Design</h3>
              <p className="text-sm text-muted-foreground">
                Optimized for all devices with a mobile-first approach and dark/light theme support.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Built with WCAG AA compliance in mind, ensuring the app is usable by everyone.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Attribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            All celestial body data is provided by the Solar System OpenData API, a comprehensive database of
            astronomical information maintained by the scientific community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="https://api.le-systeme-solaire.net/en/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="bg-transparent">
                <ExternalLink className="mr-2 h-4 w-4" />
                API Documentation
              </Button>
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="bg-transparent">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Source Code
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="text-center pt-8">
        <p className="text-muted-foreground">Built with ❤️ for space exploration enthusiasts everywhere</p>
      </div>
    </div>
  )
}
