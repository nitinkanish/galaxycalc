import Link from "next/link"
import { Github, Calculator, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-primary rounded">
                <Calculator className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">GalaxyCalc</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced space calculations and celestial body exploration platform.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Explore</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                Browse Bodies
              </Link>
              <Link href="/calculator" className="text-muted-foreground hover:text-primary transition-colors">
                Space Calculator
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/solar-system-planets" className="text-muted-foreground hover:text-primary transition-colors">
                Solar System Planets
              </Link>
              <Link href="/moons-in-space" className="text-muted-foreground hover:text-primary transition-colors">
                Moons in Space
              </Link>
              <Link href="/asteroids-in-space" className="text-muted-foreground hover:text-primary transition-colors">
                Asteroids in Space
              </Link>
              <Link href="/comets-in-space" className="text-muted-foreground hover:text-primary transition-colors">
                Comets in Space
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="https://api.le-systeme-solaire.net/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                API Documentation
                <ExternalLink className="h-3 w-3" />
              </Link>
              <Link href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">
                Sitemap
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 GalaxyCalc. All rights reserved.</span>
          </div>
          <div className="text-sm text-muted-foreground">Data provided by Solar System OpenData</div>
        </div>
      </div>
    </footer>
  )
}
