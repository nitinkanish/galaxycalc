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

// Jupiter-specific constants
const JUPITER_CONSTANTS = {
  meanRadius: 69911, // km
  radiusMiles: 43441, // miles
  semimajorAxis: 778500000, // km (~5.2 AU)
  semimajorAxisAU: 5.2,
  mass: 1.898e27, // kg
  massEarthMultiplier: 318,
  closestDistance: 588000000, // km (at opposition)
  farthestDistance: 968000000, // km (at conjunction)
  orbitalPeriod: 12, // Earth years
  rotationPeriod: 9.9, // hours
  moons: 95,
  magneticFieldStrength: 14, // to 54 times Earth's
}

function calculateDistanceFromEarth(body: Body): { km: number; au: number; closest: number; farthest: number } | null {
  if (!body.semimajorAxis) return null
  
  const earthDistance = Math.abs(body.semimajorAxis - EARTH_VALUES.semimajorAxis)
  const au = earthDistance / EARTH_VALUES.semimajorAxis
  
  // For Jupiter, use specific values; for others, estimate based on orbital positions
  const name = (body.englishName || body.name).toLowerCase()
  if (name === "jupiter") {
    return {
      km: earthDistance,
      au,
      closest: JUPITER_CONSTANTS.closestDistance,
      farthest: JUPITER_CONSTANTS.farthestDistance,
    }
  }
  
  // Estimate closest and farthest based on perihelion/aphelion
  const closest = body.perihelion ? Math.abs(body.perihelion - EARTH_VALUES.semimajorAxis) : earthDistance
  const farthest = body.aphelion ? body.aphelion + EARTH_VALUES.semimajorAxis : earthDistance * 1.5
  
  return { km: earthDistance, au, closest, farthest }
}

function isJupiter(body: Body): boolean {
  const name = (body.englishName || body.name).toLowerCase()
  return name === "jupiter"
}

export function BodySeoContent({ body }: BodySeoContentProps) {
  const name = body.englishName || body.name
  const meanRadius = body.meanRadius || body.equaRadius
  const mass = body.mass ? body.mass.massValue * Math.pow(10, body.mass.massExponent) : null
  const semimajorAxis = body.semimajorAxis
  const orbitalPeriod = body.sideralOrbit
  const distanceFromEarth = calculateDistanceFromEarth(body)
  const isJupiterPlanet = isJupiter(body)
  
  const au = semimajorAxis ? semimajorAxis / EARTH_VALUES.semimajorAxis : null
  const massInKg = mass ? `${mass.toExponential(2)} kg` : null
  const radiusKm = meanRadius || (isJupiterPlanet ? JUPITER_CONSTANTS.meanRadius : null)
  const radiusMiles = radiusKm ? (radiusKm * 0.621371).toFixed(0) : null
  const earthRadiusMultiplier = radiusKm ? (radiusKm / EARTH_VALUES.meanRadius).toFixed(1) : null

  // If it's Jupiter, show comprehensive SEO content
  if (isJupiterPlanet) {
    return (
      <div className="space-y-8">
        {/* H1 Title - Introduction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {name}: The Giant Planet - Orbit, Size & Facts
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {name} is the largest planet in our Solar System, earning its title as the "King of Planets." 
              Named after the Roman king of the gods, {name} has fascinated astronomers for millennia. 
              Ancient civilizations could observe {name} with the naked eye, and in 1610, Galileo Galilei 
              made the first telescopic observations of its four largest moons, revolutionizing our understanding 
              of the cosmos. Today, {name} continues to captivate scientists and space enthusiasts alike with 
              its massive size, swirling storms, and extensive moon system.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This gas giant plays a crucial role in shaping our Solar System, from protecting inner planets 
              from comets and asteroids to influencing the orbits of other celestial bodies. Let's explore 
              the fascinating details about {name}'s orbit distance, radius, and distance from Earth.
            </p>
          </CardContent>
        </Card>

        {/* H2: Jupiter's Orbit and Distance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {name}'s Orbit and Distance
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3 mt-0">Orbit Around the Sun</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {name} orbits the Sun at an average distance of approximately <strong>5.2 astronomical units (AU)</strong>, 
              which equals roughly <strong>778 million kilometers</strong>. An astronomical unit (AU) is the average 
              distance between Earth and the Sun, about 149.6 million kilometers. The <strong>{name} orbit distance</strong> 
              from the Sun places it as the fifth planet in our Solar System. This substantial <strong>{name} orbit distance</strong> 
              means that {name} takes about <strong>12 Earth years</strong> to complete one full orbit around the Sun, 
              known as a Jovian year.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>{name} orbit distance</strong> of 5.2 AU means {name} receives significantly less solar 
              radiation than the inner planets. Despite this distance, {name} generates its own internal heat 
              through gravitational compression, making it warmer than it would be from solar heating alone. 
              The planet's elliptical orbit means its distance from the Sun varies slightly throughout its 
              orbital period.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Distance from Earth</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>{name} distance from Earth</strong> constantly changes as both planets orbit the Sun. 
              At its closest approach (opposition), when {name} and Earth are on the same side of the Sun, 
              the <strong>{name} distance from Earth</strong> is approximately <strong>588 to 629 million kilometers</strong>. 
              At its farthest point (conjunction), when the planets are on opposite sides of the Sun, 
              the <strong>distance from {name} to Earth</strong> can reach <strong>928 to 968 million kilometers</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This variation in the <strong>{name} distance from Earth</strong> occurs because both planets 
              follow elliptical orbits at different speeds. When {name} is at perihelion (closest to the Sun) 
              and Earth is at aphelion (farthest from the Sun), they can be even closer. Conversely, when 
              {name} is at aphelion and Earth is at perihelion, they reach their maximum separation. 
              Understanding these orbital mechanics helps astronomers plan optimal observation windows and 
              space missions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The changing <strong>{name} distance from Earth</strong> affects how bright {name} appears 
              in our night sky. During opposition, {name} is often the third-brightest object after the 
              Moon and Venus, making it easily visible to the naked eye. This variation in distance also 
              impacts communication delays for spacecraft missions, which can range from about 33 minutes 
              to over 53 minutes for radio signals traveling at the speed of light.
            </p>
          </CardContent>
        </Card>

        {/* H2: Jupiter's Size and Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {name}'s Size and Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3 mt-0">Radius and Mass</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>{name} radius</strong> is approximately <strong>69,911 kilometers (43,441 miles)</strong>, 
              making it roughly <strong>11 times larger than Earth's radius</strong>. The <strong>{name} radius</strong> 
              gives the planet a diameter of about 142,984 kilometers. To put this in perspective, if Earth 
              were the size of a grape, {name} would be the size of a basketball. The massive <strong>{name} radius</strong> 
              means {name} has a volume over 1,300 times greater than Earth's.
            </p>
            
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Property</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">{name}</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Earth</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Radius</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">69,911 km</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">6,371 km</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">11×</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Mass</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1.898 × 10²⁷ kg</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">5.972 × 10²⁴ kg</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">318×</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Volume</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1.431 × 10¹⁵ km³</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1.083 × 10¹² km³</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1,321×</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Orbital Period</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">12 years</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 year</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">12×</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {name}'s mass is equally impressive, weighing in at approximately <strong>1.898 × 10²⁷ kilograms</strong>, 
              which is <strong>318 times Earth's mass</strong>. In fact, {name} is more massive than all other 
              planets in our Solar System combined. This enormous mass creates a powerful gravitational field 
              that influences the orbits of asteroids, comets, and even other planets.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Composition and Core</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {name} is a gas giant composed primarily of <strong>hydrogen (about 90%) and helium (about 10%)</strong>, 
              with trace amounts of other elements. Unlike rocky planets like Earth, {name} doesn't have a 
              solid surface. Instead, its structure consists of several distinct layers: a deep atmosphere 
              of gas, a possible ocean of liquid metallic hydrogen, and a central core.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Recent findings from NASA's Juno mission suggest that {name}'s core may be "fuzzy" rather than 
              solid, meaning it might be partially dissolved or mixed with the surrounding material. This 
              discovery challenges previous models of gas giant formation and provides new insights into 
              how planets like {name} evolved.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {name} generates an incredibly powerful magnetic field, <strong>14 to 54 times stronger than Earth's</strong>. 
              This magnetosphere extends millions of kilometers into space, creating intense radiation belts 
              that would be deadly to unprotected spacecraft. The magnetic field is generated by the motion 
              of electrically conducting liquid metallic hydrogen deep within the planet.
            </p>
          </CardContent>
        </Card>

        {/* H2: Atmosphere and Weather */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Atmosphere and Weather
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {name}'s atmosphere is one of the most dynamic and visually striking in the Solar System. 
              The planet's distinctive appearance comes from its colorful cloud bands, known as belts 
              (dark regions) and zones (light regions), which are created by powerful jet streams flowing 
              in opposite directions. These cloud layers, composed primarily of ammonia, water, and other 
              compounds, create a beautiful striped pattern that makes {name} instantly recognizable.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The most famous feature of {name}'s atmosphere is the <strong>Great Red Spot</strong>, a 
              massive storm larger than Earth that has been raging for at least <strong>300 years</strong>. 
              This giant anticyclonic storm, twice Earth's diameter, rotates counterclockwise and has winds 
              reaching speeds of up to 430 kilometers per hour (270 miles per hour). While the Great Red 
              Spot has been shrinking in recent decades, it remains one of the most iconic features in 
              our Solar System.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {name}'s atmosphere experiences extreme weather conditions, with wind speeds reaching up to 
              <strong> 160 meters per second (360 miles per hour)</strong> in the jet streams. The planet's 
              rapid rotation—completing a full spin in just <strong>9.9 hours</strong>—creates powerful 
              atmospheric dynamics. NASA's Juno mission has also discovered persistent cyclonic storms 
              arranged in geometric patterns at {name}'s poles, including a central cyclone surrounded by 
              eight smaller cyclones at the north pole.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The atmospheric layers of {name} can be thought of like an onion, with different cloud decks 
              at various altitudes. The uppermost clouds are composed of ammonia ice, while deeper layers 
              contain ammonium hydrosulfide and water ice. These different cloud layers create the planet's 
              characteristic banded appearance and contribute to its complex weather systems.
            </p>
          </CardContent>
        </Card>

        {/* H2: Moons and Rings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Moons and Rings
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {name} has an extensive moon system with <strong>95 officially recognized moons</strong>, 
              making it second only to Saturn in the number of known satellites. The four largest moons, 
              discovered by Galileo Galilei in 1610, are called the Galilean moons: <strong>Io, Europa, 
              Ganymede, and Callisto</strong>. These moons are among the most fascinating objects in the 
              Solar System, each with unique characteristics that make them targets for future exploration.
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4 ml-4">
              <li><strong>Io</strong>: The most volcanically active body in the Solar System, with hundreds 
              of active volcanoes spewing sulfur compounds into space.</li>
              <li><strong>Europa</strong>: An ice-covered moon with a subsurface ocean that may contain 
              twice as much water as Earth's oceans, making it a prime target in the search for 
              extraterrestrial life.</li>
              <li><strong>Ganymede</strong>: The largest moon in the Solar System, even bigger than Mercury, 
              with its own magnetic field and a subsurface ocean.</li>
              <li><strong>Callisto</strong>: The most heavily cratered object in the Solar System, 
              providing a record of impacts throughout Solar System history.</li>
            </ul>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In addition to its moons, {name} has a faint ring system discovered by the Voyager 1 
              spacecraft in 1979. Unlike Saturn's prominent rings, {name}'s rings are composed primarily 
              of dust particles created by micrometeorite impacts on the planet's small inner moons. 
              These rings are so faint that they remained undetected until spacecraft visited the planet.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The diverse moon system around {name} provides scientists with a natural laboratory for 
              studying planetary formation, tidal heating, and the potential for life in subsurface 
              oceans. Several upcoming missions, including NASA's Europa Clipper and ESA's JUICE 
              (JUpiter ICy moons Explorer), will explore these fascinating worlds in detail.
            </p>
          </CardContent>
        </Card>

        {/* H2: Exploration and Missions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Exploration and Missions
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Human exploration of {name} began in the 1970s with flyby missions that provided our first 
              close-up views of the giant planet. The <strong>Pioneer 10 and 11</strong> spacecraft 
              (1973-1974) were the first to visit {name}, followed by the <strong>Voyager 1 and 2</strong> 
              missions (1979), which revealed the planet's complex atmosphere, discovered its ring system, 
              and provided detailed images of the Galilean moons.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>Galileo orbiter</strong> (1995-2003) was the first spacecraft to orbit {name}, 
              providing years of detailed observations. Galileo's most dramatic achievement was dropping 
              a probe into {name}'s atmosphere, which transmitted data for about 58 minutes before being 
              crushed by atmospheric pressure. The <strong>Cassini</strong> spacecraft (2000) and 
              <strong> New Horizons</strong> (2007) also conducted flybys of {name} on their way to 
              other destinations.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Currently, <strong>NASA's Juno mission</strong> (arrived 2016) is in orbit around {name}, 
              studying the planet's gravity field, magnetic field, and atmospheric composition. Juno's 
              polar orbit provides unique perspectives of {name}'s poles and has revealed stunning details 
              about the planet's interior structure, weather patterns, and magnetic field.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Future missions are planned to explore {name}'s intriguing moons. The <strong>European 
              Space Agency's JUICE mission</strong> (launched 2023) will study Ganymede, Callisto, and 
              Europa. <strong>NASA's Europa Clipper</strong> (planned for mid-2020s) will focus specifically 
              on Europa, investigating its subsurface ocean and potential habitability. These missions 
              represent the next chapter in our exploration of the {name} system.
            </p>
          </CardContent>
        </Card>

        {/* H2: Jupiter in the Solar System */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {name} in the Solar System: Role and Importance
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {name} truly deserves its title as the "King of the Planets." With a mass <strong>318 times 
              greater than Earth's</strong>, {name} is the most massive planet in our Solar System. This 
              enormous mass means {name}'s gravity has played a crucial role in shaping the Solar System's 
              formation and evolution. During the early Solar System, {name}'s gravity helped clear debris 
              and influenced where other planets could form.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {name} controls two groups of asteroids called Trojan asteroids, which share its orbit 
              around the Sun. These asteroids are located at the L4 and L5 Lagrange points, leading and 
              trailing {name} by about 60 degrees in its orbit. There are thousands of these Trojan 
              asteroids, providing insights into the early Solar System.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Some scientists propose that {name} acts as a "cosmic vacuum cleaner" or shield, deflecting 
              comets and asteroids away from the inner planets, including Earth. While this "Jupiter shield" 
              theory is debated, {name}'s massive gravity certainly influences the orbits of many small 
              bodies in the Solar System. However, {name} can also redirect objects toward the inner 
              planets, so its role is complex.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {name}'s presence has likely influenced Earth's development in significant ways. By helping 
              to stabilize the orbits of other planets and potentially protecting Earth from frequent 
              catastrophic impacts, {name} may have contributed to creating the relatively stable cosmic 
              environment that allowed life to develop and thrive on our planet. Understanding {name}'s 
              role helps us appreciate the interconnected nature of our Solar System.
            </p>
          </CardContent>
        </Card>

        {/* H2: Interesting Facts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Interesting Facts About {name}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 ml-4">
              <li><strong>Shortest day:</strong> {name} has the shortest day of any planet in our Solar 
              System, rotating once every approximately <strong>9.9 hours</strong>, despite being the 
              largest planet.</li>
              <li><strong>Long year:</strong> While {name}'s day is short, its year is long—taking about 
              <strong> 12 Earth years</strong> to complete one orbit around the Sun due to its great 
              distance from the Sun.</li>
              <li><strong>Massive size:</strong> {name} is <strong>11 times wider than Earth</strong> 
              and contains <strong>2.5 times more mass than all other planets combined</strong>.</li>
              <li><strong>Powerful magnetic field:</strong> {name}'s magnetic field is <strong>14 to 54 
              times stronger than Earth's</strong>, creating intense radiation belts that would be 
              dangerous for astronauts.</li>
              <li><strong>Ancient storm:</strong> The Great Red Spot has been observed for over 
              <strong> 300 years</strong>, making it one of the longest-lasting storms in the Solar System.</li>
              <li><strong>Bright object:</strong> {name} is often the <strong>third-brightest object</strong> 
              in the night sky (after the Moon and Venus), visible to the naked eye even from light-polluted 
              cities.</li>
              <li><strong>Liquid hydrogen ocean:</strong> Deep within {name}, pressures are so extreme 
              that hydrogen exists as a liquid metal, creating a vast ocean that generates the planet's 
              powerful magnetic field.</li>
              <li><strong>Many moons:</strong> With <strong>95 known moons</strong>, {name} has the 
              second-largest moon system in the Solar System, with new moons still being discovered.</li>
            </ul>
          </CardContent>
        </Card>

        {/* H2: FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Frequently Asked Questions About {name}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Q: How far is {name} from Earth?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  A: The <strong>{name} distance from Earth</strong> varies as both planets orbit the Sun. 
                  At closest approach (opposition), {name} is approximately <strong>588 to 629 million 
                  kilometers</strong> away. At its farthest point (conjunction), the distance can reach 
                  <strong> 928 to 968 million kilometers</strong>. This variation occurs because both 
                  planets follow elliptical orbits at different speeds.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Q: What is {name}'s radius?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  A: The <strong>{name} radius</strong> is approximately <strong>69,911 kilometers 
                  (43,441 miles)</strong>, making it roughly <strong>11 times larger than Earth's radius</strong>. 
                  This massive size gives {name} a diameter of about 142,984 kilometers and makes it 
                  the largest planet in our Solar System.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Q: How far does {name} orbit from the Sun?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  A: The <strong>{name} orbit distance</strong> from the Sun is approximately 
                  <strong> 778 million kilometers (5.2 astronomical units)</strong>. This places {name} 
                  as the fifth planet from the Sun. Due to this great <strong>{name} orbit distance</strong>, 
                  it takes about <strong>12 Earth years</strong> for {name} to complete one full orbit 
                  around the Sun.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Q: How long is a day and year on {name}?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  A: {name} has the shortest day of any planet, rotating once every approximately 
                  <strong> 9.9 hours</strong>. However, a year on {name} (one complete orbit around 
                  the Sun) lasts about <strong>12 Earth years</strong>. This combination of a fast 
                  rotation and slow orbit creates {name}'s distinctive flattened shape and powerful 
                  atmospheric dynamics.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Q: Why is {name} important to the Solar System?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  A: {name} is the most massive planet in our Solar System, with a mass 318 times 
                  greater than Earth's. Its enormous gravity has shaped the Solar System's formation, 
                  influences the orbits of asteroids and comets, and may help protect inner planets 
                  from frequent impacts. {name} also controls thousands of Trojan asteroids and has 
                  an extensive moon system that provides insights into planetary formation and the 
                  potential for life beyond Earth.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // For non-Jupiter planets, show the standard content
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

