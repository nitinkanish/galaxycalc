import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber, formatMass, formatDuration } from "@/lib/utils"
import type { Body } from "@/lib/types"

interface BodySeoContentProps {
  body: Body
}

// Earth reference values
const EARTH_VALUES = {
  meanRadius: 6371, // km
  mass: 5.972e24, // kg
  semimajorAxis: 149598023, // km (1 AU)
  sideralOrbit: 31558149.5, // seconds (365.25 days)
}

function calculateDistanceFromEarth(body: Body): { km: number; au: number } | null {
  if (!body.semimajorAxis) return null
  
  const earthDistance = Math.abs(body.semimajorAxis - EARTH_VALUES.semimajorAxis)
  const au = earthDistance / EARTH_VALUES.semimajorAxis
  return { km: earthDistance, au }
}

export function BodySeoContent({ body }: BodySeoContentProps) {
  const name = body.englishName || body.name
  const meanRadius = body.meanRadius || body.equaRadius
  const mass = body.mass ? body.mass.massValue * Math.pow(10, body.mass.massExponent) : null
  const semimajorAxis = body.semimajorAxis
  const orbitalPeriod = body.sideralOrbit
  const distanceFromEarth = calculateDistanceFromEarth(body)
  
  const au = semimajorAxis ? semimajorAxis / EARTH_VALUES.semimajorAxis : null
  const massInKg = mass ? `${mass.toExponential(2)} kg` : null

  return (
    <div className="space-y-8">
      {/* Radius Section */}
      {meanRadius && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {name} Radius
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">Radius of {name}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>radius of {name}</strong> is one of its most fundamental physical characteristics. 
              The <strong>{name} radius</strong> measures approximately <strong>{formatNumber(meanRadius)} km</strong>, 
              making it {meanRadius > EARTH_VALUES.meanRadius 
                ? `${(meanRadius / EARTH_VALUES.meanRadius).toFixed(2)}× larger than Earth`
                : `${(EARTH_VALUES.meanRadius / meanRadius).toFixed(2)}× smaller than Earth`}. 
              This measurement represents the average distance from the center of {name} to its surface, 
              providing crucial information about the celestial body's size and volume.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Understanding the <strong>{name} radius</strong> is essential for calculating other important 
              properties such as surface area, volume, and gravitational characteristics. The radius directly 
              influences how we perceive and study this fascinating object in our Solar System.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Semi-Major Axis / Orbital Radius Section */}
      {semimajorAxis && au && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {name} Semi-Major Axis
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">Orbital Radius of {name}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>{name} semi-major axis</strong> is a critical orbital parameter that defines 
              the average distance from the Sun. The <strong>{name} semi-major axis</strong> measures 
              <strong> {au.toFixed(2)} AU</strong> (approximately <strong>{formatNumber(semimajorAxis)} km</strong>), 
              which represents the average orbital radius of {name}. This measurement is fundamental to 
              understanding {name}'s position in the Solar System and its relationship with other celestial bodies.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>orbital radius of {name}</strong> determines how much solar radiation the planet receives, 
              which directly influences its temperature, climate, and overall environmental conditions. 
              This distance places {name} in a specific region of the Solar System, each with unique 
              characteristics and scientific significance.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When we examine the <strong>{name} semi-major axis {au.toFixed(2)} AU</strong>, we gain 
              insights into the planet's orbital mechanics, including its orbital period, velocity, and 
              the gravitational forces at play. This parameter is essential for space mission planning 
              and understanding the dynamics of our Solar System.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Mass Section */}
      {mass && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {name} Mass
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">Mass of {name} in kg</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>{name} mass</strong> is a fundamental property that determines many of the planet's 
              physical characteristics. The <strong>mass of {name} in kg</strong> is approximately 
              <strong> {massInKg}</strong>, which is {mass > EARTH_VALUES.mass 
                ? `${(mass / EARTH_VALUES.mass).toFixed(2)}× greater than Earth's mass`
                : `${(EARTH_VALUES.mass / mass).toFixed(2)}× less than Earth's mass`}. 
              This substantial mass creates a significant gravitational field that influences everything 
              from atmospheric retention to orbital dynamics.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Understanding the <strong>{name} mass</strong> allows scientists to calculate other critical 
              properties such as surface gravity, escape velocity, and the planet's ability to retain an 
              atmosphere. The mass also plays a crucial role in determining how {name} interacts with other 
              celestial bodies through gravitational forces.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The precise measurement of the <strong>mass of {name} in kg</strong> is essential for 
              space exploration missions, as it affects spacecraft trajectories, landing procedures, 
              and the design of scientific instruments. This fundamental property helps us understand 
              {name}'s formation history and its place in the evolution of our Solar System.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Orbital Period Section */}
      {orbitalPeriod && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {name} Orbital Period
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">How Long is a Year on {name}?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>{name} orbital period</strong> defines the length of one complete revolution 
              around the Sun. The <strong>{name} orbital period</strong> is <strong>{formatDuration(orbitalPeriod)}</strong>, 
              which is {orbitalPeriod > EARTH_VALUES.sideralOrbit 
                ? `${(orbitalPeriod / EARTH_VALUES.sideralOrbit).toFixed(2)}× longer than Earth's year`
                : `${(EARTH_VALUES.sideralOrbit / orbitalPeriod).toFixed(2)}× shorter than Earth's year`}. 
              This orbital period determines the length of {name}'s year and directly influences seasonal 
              patterns, climate cycles, and temperature variations.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>{name} orbital period</strong> is directly related to its distance from the Sun, 
              following Kepler's laws of planetary motion. Planets farther from the Sun have longer orbital 
              periods, while those closer complete their orbits more quickly. This relationship helps explain 
              why {name} takes the time it does to complete one full orbit.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Understanding the <strong>{name} orbital period</strong> is crucial for space mission planning, 
              as it affects launch windows, travel times, and the timing of scientific observations. 
              This fundamental orbital parameter also provides insights into the planet's formation history 
              and its current position in the Solar System's dynamic structure.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Distance from Earth Section */}
      {distanceFromEarth && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              How Far is {name} from Earth?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">Distance Between {name} and Earth</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>How far is {name} from Earth?</strong> This is a question that fascinates both 
              astronomers and space enthusiasts. The distance between {name} and Earth varies throughout 
              their orbital cycles, but on average, {name} is approximately <strong>{formatNumber(distanceFromEarth.km)} km</strong> 
              ({distanceFromEarth.au.toFixed(3)} AU) away from Earth. This distance changes as both planets 
              orbit the Sun, with the closest approach (opposition) and farthest separation (conjunction) 
              creating significant variations.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The question "<strong>How far is {name} from Earth?</strong>" has practical implications 
              for space exploration. This distance determines travel time for spacecraft, communication 
              delays for mission control, and the amount of fuel required for interplanetary missions. 
              Understanding this distance is essential for planning future missions to {name}.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The distance between {name} and Earth is not constant due to the elliptical nature of both 
              planets' orbits. When {name} and Earth are on the same side of the Sun (opposition), they 
              are at their closest, making this the optimal time for observations and potential missions. 
              Conversely, when they are on opposite sides of the Sun (conjunction), they are at their 
              farthest separation, which can exceed the average distance significantly.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

