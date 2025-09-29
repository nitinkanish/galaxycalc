import Link from "next/link"
import Image from "next/image"
import Logo from "@/public/galaxy-calc.png"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { ArrowRight, Calculator, Telescope, Orbit, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="p-4">
              <Image src={Logo} className="w-24" alt="Galaxy Calculator Logo" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">Galaxy Calculator</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Advanced Space Calculations & Celestial Explorer
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Calculate orbital mechanics, explore celestial bodies, and discover detailed astronomical data. From
              planetary orbits to asteroid trajectories, unlock the mathematics of space exploration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <SearchInput placeholder="Search celestial bodies..." className="flex-1" />
            <Link href="/browse">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-muted-foreground pt-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Telescope className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">8</div>
              <div>Planets</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Orbit className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">200+</div>
              <div>Moons</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">1000+</div>
              <div>Asteroids</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">∞</div>
              <div>Calculations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
