import type { Metadata } from "next"
import { Calculator, Orbit, Zap, Telescope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import GravitationalForceCalculator from "@/components/gravitational-force-calculator"
import OrbitalVelocityCalculator from "@/components/orbital-velocity-calculator"
import EscapeVelocityCalculator from "@/components/escape-velocity-calculator"

export const metadata: Metadata = {
  title: "Space Calculator — Orbital Mechanics & Celestial Calculations | GalaxyCalc",
  description:
    "Calculate orbital velocities, escape velocities, gravitational forces, and other space mechanics. Advanced tools for astronomy and space exploration calculations.",
  keywords: [
    "orbital mechanics calculator",
    "space calculations",
    "escape velocity",
    "orbital velocity",
    "gravitational force",
    "astronomy calculator",
  ],
  openGraph: {
    title: "Space Calculator — Orbital Mechanics & Celestial Calculations",
    description:
      "Calculate orbital velocities, escape velocities, and gravitational forces with advanced space mechanics tools.",
    type: "website",
  },
}

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Calculator className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Space Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
          Advanced tools for orbital mechanics and celestial body calculations. Explore the physics that govern our
          universe.
        </p>
      </div>

      <Tabs defaultValue="gravitational" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="gravitational" className="flex items-center gap-2">
            <Telescope className="h-4 w-4" />
            Gravitational Force
          </TabsTrigger>
          <TabsTrigger value="orbital" className="flex items-center gap-2">
            <Orbit className="h-4 w-4" />
            Orbital Velocity
          </TabsTrigger>
          <TabsTrigger value="escape" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Escape Velocity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gravitational">
          <GravitationalForceCalculator />
        </TabsContent>

        <TabsContent value="orbital">
          <OrbitalVelocityCalculator />
        </TabsContent>

        <TabsContent value="escape">
          <EscapeVelocityCalculator />
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Discover the mathematical beauty of space mechanics. Each calculation reveals the elegant physics governing
          celestial motion.
        </p>
        <Link href="/browse">
          <Button size="lg">Browse Celestial Bodies</Button>
        </Link>
      </div>
    </div>
  )
}
