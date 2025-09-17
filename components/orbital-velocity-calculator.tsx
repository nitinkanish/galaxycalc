"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Orbit, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const celestialBodies = {
  earth: { name: "Earth", mass: 5.972e24, radius: 6.371e6 },
  moon: { name: "Moon", mass: 7.342e22, radius: 1.737e6 },
  mars: { name: "Mars", mass: 6.39e23, radius: 3.39e6 },
  jupiter: { name: "Jupiter", mass: 1.898e27, radius: 6.991e7 },
  sun: { name: "Sun", mass: 1.989e30, radius: 6.96e8 },
}

const OrbitalVelocityCalculator = () => {
  const [selectedBody, setSelectedBody] = useState<string>("")
  const [customMass, setCustomMass] = useState("")
  const [customRadius, setCustomRadius] = useState("")
  const [altitude, setAltitude] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculateOrbitalVelocity = () => {
    let mass: number
    let radius: number
    let orbitalRadius: number

    if (selectedBody && celestialBodies[selectedBody as keyof typeof celestialBodies]) {
      const body = celestialBodies[selectedBody as keyof typeof celestialBodies]
      mass = body.mass
      radius = body.radius
    } else {
      mass = Number.parseFloat(customMass)
      radius = Number.parseFloat(customRadius)
    }

    const altitudeValue = Number.parseFloat(altitude) || 0
    orbitalRadius = radius + altitudeValue * 1000 // Convert km to meters

    if (mass && orbitalRadius) {
      const G = 6.6743e-11 // Gravitational constant
      const velocity = Math.sqrt((G * mass) / orbitalRadius)
      setResult(velocity)
    }
  }

  const formatVelocity = (velocity: number) => {
    return {
      ms: velocity.toFixed(2),
      kmh: (velocity * 3.6).toFixed(2),
      mph: (velocity * 2.237).toFixed(2),
    }
  }

  return (
    <TooltipProvider>
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Orbit className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Orbital Velocity Calculator</CardTitle>
          <CardDescription className="text-base">
            Calculate the velocity needed to maintain a stable circular orbit around a celestial body
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Select Celestial Body
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose a preset celestial body or use custom values</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Select value={selectedBody} onValueChange={setSelectedBody}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a celestial body" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(celestialBodies).map(([key, body]) => (
                      <SelectItem key={key} value={key}>
                        {body.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!selectedBody && (
                <>
                  <div className="space-y-2">
                    <Label>Mass (kg)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 5.972e24"
                      value={customMass}
                      onChange={(e) => setCustomMass(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Radius (m)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 6.371e6"
                      value={customRadius}
                      onChange={(e) => setCustomRadius(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Orbital Altitude (km)
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Height above the surface (0 for surface orbit)</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 400 (ISS altitude)"
                  value={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                />
              </div>

              <Button onClick={calculateOrbitalVelocity} className="w-full" size="lg">
                Calculate Orbital Velocity
              </Button>
            </div>

            <div className="space-y-4">
              {result && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Orbital Velocity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Meters per second:</span>
                        <Badge variant="secondary" className="font-mono">
                          {formatVelocity(result).ms} m/s
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Kilometers per hour:</span>
                        <Badge variant="secondary" className="font-mono">
                          {formatVelocity(result).kmh} km/h
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Miles per hour:</span>
                        <Badge variant="secondary" className="font-mono">
                          {formatVelocity(result).mph} mph
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    About Orbital Velocity
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Orbital velocity is the speed needed to maintain a stable circular orbit around a celestial body.
                  </p>
                  <p>
                    <strong>Formula:</strong> v = √(GM/r)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Where G is the gravitational constant, M is the mass of the central body, and r is the orbital
                    radius.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export { OrbitalVelocityCalculator }
export default OrbitalVelocityCalculator
