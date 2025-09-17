import type { Metadata } from "next"
import { GravitationalForceCalculator } from "@/components/gravitational-force-calculator"

export const metadata: Metadata = {
  title: "Gravitational Force Calculator | Calculate Cosmic Forces - GalaxyInfo",
  description:
    "Calculate gravitational forces between celestial bodies with our interactive calculator. Explore Newton's law of universal gravitation with real cosmic examples including planets, moons, and stars.",
  keywords:
    "gravitational force calculator, Newton's law, universal gravitation, cosmic forces, physics calculator, space physics, celestial mechanics",
  openGraph: {
    title: "Gravitational Force Calculator - GalaxyInfo",
    description:
      "Interactive tool to calculate gravitational forces between celestial bodies using Newton's law of universal gravitation.",
    type: "website",
  },
}

export default function GravitationalForceCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Gravitational Force Calculator</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the invisible forces that govern our universe. Calculate the gravitational attraction between any
              two objects using Newton's law of universal gravitation.
            </p>
          </div>

          <GravitationalForceCalculator />

          <div className="mt-12 bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Gravitational Force</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Gravitational force is one of the four fundamental forces in nature, responsible for keeping planets in
                orbit, holding galaxies together, and making objects fall to Earth. This universal force acts between
                any two objects with mass, no matter how small or large.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Newton's law of universal gravitation states that every particle attracts every other particle with a
                force proportional to the product of their masses and inversely proportional to the square of the
                distance between them. Use our calculator to explore this fundamental cosmic force!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
