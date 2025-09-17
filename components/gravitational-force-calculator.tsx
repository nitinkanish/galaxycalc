"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Telescope, Calculator, Info, RotateCcw } from "lucide-react"

interface PresetBody {
  name: string
  mass: number // in kg
  radius: number // in meters
}

const celestialBodies: PresetBody[] = [
  { name: "Earth", mass: 5.972e24, radius: 6.371e6 },
  { name: "Moon", mass: 7.342e22, radius: 1.737e6 },
  { name: "Sun", mass: 1.989e30, radius: 6.96e8 },
  { name: "Mars", mass: 6.39e23, radius: 3.39e6 },
  { name: "Jupiter", mass: 1.898e27, radius: 6.99e7 },
  { name: "Saturn", mass: 5.683e26, radius: 5.82e7 },
  { name: "Venus", mass: 4.867e24, radius: 6.052e6 },
  { name: "Mercury", mass: 3.301e23, radius: 2.44e6 },
]

const GravitationalForceCalculator = () => {
  const [mass1, setMass1] = useState("")
  const [mass2, setMass2] = useState("")
  const [distance, setDistance] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [selectedBody1, setSelectedBody1] = useState<string>("")
  const [selectedBody2, setSelectedBody2] = useState<string>("")

  const G = 6.6743e-11 // Gravitational constant in m³/kg⋅s²

  const calculateGravitationalForce = () => {
    const m1 = Number.parseFloat(mass1)
    const m2 = Number.parseFloat(mass2)
    const r = Number.parseFloat(distance)

    if (isNaN(m1) || isNaN(m2) || isNaN(r) || m1 <= 0 || m2 <= 0 || r <= 0) {
      return
    }

    // F = G * (m1 * m2) / r²
    const force = (G * (m1 * m2)) / (r * r)
    setResult(force)
  }

  const handlePresetSelection = (bodyName: string, isFirst: boolean) => {
    const body = celestialBodies.find((b) => b.name === bodyName)
    if (body) {
      if (isFirst) {
        setMass1(body.mass.toExponential(3))
        setSelectedBody1(bodyName)
      } else {
        setMass2(body.mass.toExponential(3))
        setSelectedBody2(bodyName)
      }
    }
  }

  const resetCalculator = () => {
    setMass1("")
    setMass2("")
    setDistance("")
    setResult(null)
    setSelectedBody1("")
    setSelectedBody2("")
  }

  const formatResult = (force: number) => {
    if (force >= 1e24) return `${(force / 1e24).toFixed(2)} × 10²⁴ N`
    if (force >= 1e21) return `${(force / 1e21).toFixed(2)} × 10²¹ N`
    if (force >= 1e18) return `${(force / 1e18).toFixed(2)} × 10¹⁸ N`
    if (force >= 1e15) return `${(force / 1e15).toFixed(2)} × 10¹⁵ N`
    if (force >= 1e12) return `${(force / 1e12).toFixed(2)} × 10¹² N`
    if (force >= 1e9) return `${(force / 1e9).toFixed(2)} × 10⁹ N`
    if (force >= 1e6) return `${(force / 1e6).toFixed(2)} × 10⁶ N`
    if (force >= 1e3) return `${(force / 1e3).toFixed(2)} × 10³ N`
    return force.toExponential(2) + " N"
  }

  useEffect(() => {
    if (mass1 && mass2 && distance) {
      calculateGravitationalForce()
    }
  }, [mass1, mass2, distance])

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Telescope className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Gravitational Force Calculator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
          Discover the invisible forces that govern our universe. Calculate the gravitational attraction between any two
          objects using Newton's law of universal gravitation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Input Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Input Parameters
            </CardTitle>
            <CardDescription>Enter the masses and distance, or choose from preset celestial bodies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Object 1 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="mass1" className="text-sm font-medium">
                  Object 1 Mass (kg)
                </Label>
                {selectedBody1 && <Badge variant="secondary">{selectedBody1}</Badge>}
              </div>
              <Input
                id="mass1"
                type="text"
                placeholder="e.g., 5.972e24 (Earth's mass)"
                value={mass1}
                onChange={(e) => setMass1(e.target.value)}
                className="font-mono"
              />
              <Select onValueChange={(value) => handlePresetSelection(value, true)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a celestial body" />
                </SelectTrigger>
                <SelectContent>
                  {celestialBodies.map((body) => (
                    <SelectItem key={body.name} value={body.name}>
                      {body.name} ({body.mass.toExponential(2)} kg)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Object 2 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="mass2" className="text-sm font-medium">
                  Object 2 Mass (kg)
                </Label>
                {selectedBody2 && <Badge variant="secondary">{selectedBody2}</Badge>}
              </div>
              <Input
                id="mass2"
                type="text"
                placeholder="e.g., 7.342e22 (Moon's mass)"
                value={mass2}
                onChange={(e) => setMass2(e.target.value)}
                className="font-mono"
              />
              <Select onValueChange={(value) => handlePresetSelection(value, false)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a celestial body" />
                </SelectTrigger>
                <SelectContent>
                  {celestialBodies.map((body) => (
                    <SelectItem key={body.name} value={body.name}>
                      {body.name} ({body.mass.toExponential(2)} kg)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Distance */}
            <div className="space-y-3">
              <Label htmlFor="distance" className="text-sm font-medium">
                Distance Between Centers (m)
              </Label>
              <Input
                id="distance"
                type="text"
                placeholder="e.g., 3.844e8 (Earth-Moon distance)"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">💡 Earth-Moon average distance: 3.844 × 10⁸ m</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateGravitationalForce} className="flex-1" disabled={!mass1 || !mass2 || !distance}>
                Calculate Force
              </Button>
              <Button onClick={resetCalculator} variant="outline" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results and Information Section */}
        <div className="space-y-6">
          {/* Result Card */}
          <Card className={`transition-all duration-300 ${result ? "ring-2 ring-primary/20" : ""}`}>
            <CardHeader>
              <CardTitle>Gravitational Force Result</CardTitle>
              <CardDescription>The attractive force between the two objects</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="text-center p-6 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">{formatResult(result)}</div>
                    <p className="text-sm text-muted-foreground">Newtons (N)</p>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• This force acts along the line connecting the centers of both objects</p>
                    <p>• The force is always attractive, never repulsive</p>
                    <p>• Both objects experience equal and opposite forces</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter values above to calculate the gravitational force</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Newton's Law of Universal Gravitation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-center text-lg font-mono mb-2">F = G × (m₁ × m₂) / r²</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <strong>F</strong> = Gravitational force (Newtons)
                  </p>
                  <p>
                    <strong>G</strong> = Gravitational constant (6.674 × 10⁻¹¹ m³/kg⋅s²)
                  </p>
                  <p>
                    <strong>m₁, m₂</strong> = Masses of the objects (kg)
                  </p>
                  <p>
                    <strong>r</strong> = Distance between centers (m)
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Did you know?</strong> This fundamental law explains everything from why apples fall to Earth
                  to how planets orbit the Sun. The gravitational force between you and Earth right now is your weight!
                </p>
                <p>
                  <strong>Fun fact:</strong> The gravitational force between Earth and Moon creates our tides, while the
                  Sun's gravity keeps our entire solar system in perfect cosmic dance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { GravitationalForceCalculator }
export default GravitationalForceCalculator
