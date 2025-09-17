import type { Metadata } from "next"
import { OrbitalVelocityCalculator } from "@/components/orbital-velocity-calculator"

export const metadata: Metadata = {
  title: "Orbital Velocity Calculator | Calculate Satellite & Planet Speeds - GalaxyInfo",
  description:
    "Calculate orbital velocities for satellites, planets, and moons. Understand the precise speeds needed to maintain stable orbits around celestial bodies.",
  keywords:
    "orbital velocity calculator, satellite speed, planetary motion, orbital mechanics, space physics, circular orbit, orbital period",
  openGraph: {
    title: "Orbital Velocity Calculator - GalaxyInfo",
    description:
      "Interactive tool to calculate the velocity needed for stable orbits around planets, moons, and other celestial bodies.",
    type: "website",
  },
}

export default function OrbitalVelocityCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Orbital Velocity Calculator</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Calculate the precise speed needed to maintain a stable orbit around any celestial body. From satellites
              around Earth to planets around the Sun.
            </p>
          </div>

          <OrbitalVelocityCalculator />

          <div className="mt-12 bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Science of Orbital Motion</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Orbital velocity is the speed an object needs to maintain a stable circular orbit around a larger body.
                This velocity creates a perfect balance where the gravitational pull inward equals the centrifugal force
                outward, keeping the orbiting object at a constant distance.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Understanding orbital velocity is crucial for space missions, satellite deployment, and comprehending
                how natural celestial bodies like moons and planets maintain their orbits. The closer to the central
                body, the faster the orbital velocity required!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
