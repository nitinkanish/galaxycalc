import type { Metadata } from "next"
import { EscapeVelocityCalculator } from "@/components/escape-velocity-calculator"

export const metadata: Metadata = {
  title: "Escape Velocity Calculator | Calculate Speed to Leave Planets - GalaxyInfo",
  description:
    "Calculate escape velocities for planets, moons, and stars. Discover the minimum speed needed to break free from gravitational bonds and reach space.",
  keywords:
    "escape velocity calculator, space travel, rocket science, gravitational escape, planetary physics, space exploration, launch velocity",
  openGraph: {
    title: "Escape Velocity Calculator - GalaxyInfo",
    description:
      "Interactive tool to calculate the minimum velocity needed to escape the gravitational pull of celestial bodies.",
    type: "website",
  },
}

export default function EscapeVelocityCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Escape Velocity Calculator</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Calculate the minimum speed needed to break free from any celestial body's gravitational pull. From
              launching rockets to understanding cosmic escape scenarios.
            </p>
          </div>

          <EscapeVelocityCalculator />

          <div className="mt-12 bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Breaking Free from Gravity</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Escape velocity is the minimum speed an object needs to completely escape a celestial body's
                gravitational influence without any additional propulsion. This critical velocity depends on the mass
                and radius of the body you're trying to escape from.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                This concept is fundamental to space exploration and rocket science. Every space mission must achieve
                escape velocity to leave Earth's gravitational well. Interestingly, escape velocity is independent of
                the mass of the escaping object - a feather and a rocket need the same speed!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
