import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stat } from "@/components/stat"
import { formatNumber, formatMass, formatVolume, formatTemperature, formatDuration } from "@/lib/utils"
import type { Body } from "@/lib/types"

interface BodyStatsProps {
  body: Body
}

// Earth reference values for comparisons
const EARTH_VALUES = {
  meanRadius: 6371, // km
  mass: 5.972e24, // kg
  gravity: 9.81, // m/s²
  density: 5.51, // g/cm³
  escape: 11186, // m/s
  avgTemp: 288, // K (15°C)
  sideralOrbit: 31558149.5, // seconds (365.25 days)
  sideralRotation: 86164.1, // seconds (23h 56m 4s)
  axialTilt: 23.44, // degrees
  eccentricity: 0.0167,
  semimajorAxis: 149598023, // km (1 AU)
}

function getEarthComparison(value: number | undefined, earthValue: number, unit: string = ""): string {
  if (!value || value === 0) return ""
  const ratio = value / earthValue
  if (ratio > 1) {
    return `${ratio.toFixed(1)}× Earth's ${unit}`
  } else {
    return `${(1/ratio).toFixed(1)}× smaller than Earth's ${unit}`
  }
}

function generateOverviewSection(body: Body): string {
  const name = body.englishName || body.name
  const radius = body.meanRadius || body.equaRadius
  const semimajorAxis = body.semimajorAxis
  const bodyType = body.bodyType.toLowerCase()
  
  let overview = `<strong class="underline">${name}</strong> is a fascinating ${bodyType} in our Solar System that has captured the attention of astronomers and space enthusiasts alike. `
  
  if (radius) {
    const earthRadius = getEarthComparison(radius, EARTH_VALUES.meanRadius, "size")
    overview += `With a <strong class="underline">${name} radius of ${formatNumber(radius)} km</strong>${earthRadius ? `, making it <strong class="underline">${earthRadius}</strong>` : ""}, this celestial body presents unique characteristics that distinguish it from other objects in our cosmic neighborhood. `
  }
  
  if (semimajorAxis) {
    const au = semimajorAxis / 149598023
    overview += `Positioned at an average distance of <strong class="underline">${formatNumber(semimajorAxis)} km (${au.toFixed(3)} AU)</strong> from the Sun, <strong class="underline">${name}</strong> occupies a significant place in the Solar System's architecture. `
  }
  
  // Add notable features based on body type and characteristics
  if (bodyType === "planet") {
    overview += `As a planet, <strong class="underline">${name}</strong> represents one of the major worlds in our Solar System, each with its own distinct personality and scientific mysteries waiting to be unraveled.`
  } else if (bodyType === "moon") {
    overview += `As a moon, <strong class="underline">${name}</strong> demonstrates the incredible diversity of natural satellites that orbit larger celestial bodies throughout our Solar System.`
  } else if (bodyType === "asteroid") {
    overview += `As an asteroid, <strong class="underline">${name}</strong> represents the remnants of the early Solar System, providing valuable insights into the formation and evolution of our cosmic neighborhood.`
  } else if (bodyType === "comet") {
    overview += `As a comet, <strong class="underline">${name}</strong> showcases the dynamic nature of icy bodies that journey through our Solar System, creating spectacular displays when they approach the Sun.`
  }
  
  return overview
}

function generatePhysicalCharacteristicsSection(body: Body): string {
  const name = body.englishName || body.name
  const meanRadius = body.meanRadius
  const equaRadius = body.equaRadius
  const polarRadius = body.polarRadius
  const mass = body.mass ? body.mass.massValue * Math.pow(10, body.mass.massExponent) : null
  const volume = body.vol ? body.vol.volValue * Math.pow(10, body.vol.volExponent) : null
  const density = body.density
  const gravity = body.gravity

  let section = `The <strong class="underline">${name} physical characteristics</strong> reveal a world of remarkable dimensions and properties. `
  
  // First paragraph - size and shape
  if (meanRadius || equaRadius) {
    const radius = meanRadius || equaRadius
    const earthRadius = getEarthComparison(radius!, EARTH_VALUES.meanRadius, "size")
    section += `The <strong class="underline">${name} radius measures ${formatNumber(radius!)} km</strong>${earthRadius ? `, making it <strong class="underline">${earthRadius}</strong>` : ""}. `
    
    if (equaRadius && polarRadius && equaRadius !== polarRadius) {
      const flattening = ((equaRadius - polarRadius) / equaRadius) * 100
      section += `The equatorial radius of <strong class="underline">${formatNumber(equaRadius)} km</strong> and polar radius of <strong class="underline">${formatNumber(polarRadius)} km</strong> create a slight flattening of <strong class="underline">${flattening.toFixed(2)}%</strong>, indicating the planet's rotation affects its shape. `
    }
  }
  
  if (mass) {
    const earthMass = getEarthComparison(mass, EARTH_VALUES.mass, "mass")
    section += `The <strong class="underline">${name} mass of ${formatMass(body.mass)}</strong>${earthMass ? ` represents <strong class="underline">${earthMass}</strong>` : ""}, giving this world substantial gravitational influence. `
  }
  
  if (volume) {
    section += `With a volume of <strong class="underline">${formatVolume(body.vol)}</strong>, <strong class="underline">${name}</strong> occupies significant space in the Solar System. `
  }
  
  // Second paragraph - density and gravity
  if (density && gravity) {
    const earthDensity = getEarthComparison(density, EARTH_VALUES.density, "density")
    const earthGravity = getEarthComparison(gravity, EARTH_VALUES.gravity, "gravity")
    section += `The <strong class="underline">${name} density of ${formatNumber(density)} g/cm³</strong>${earthDensity ? ` (<strong class="underline">${earthDensity}</strong>)` : ""} provides clues about its internal composition, while the surface gravity of <strong class="underline">${formatNumber(gravity)} m/s²</strong>${earthGravity ? ` (<strong class="underline">${earthGravity}</strong>)` : ""} determines how objects behave on its surface. `
    
    if (density > 5) {
      section += `The <strong class="underline">high density</strong> suggests a composition rich in metals and rocky materials, typical of terrestrial worlds. `
    } else if (density < 2) {
      section += `The <strong class="underline">low density</strong> indicates a composition dominated by lighter elements, characteristic of gas giants or icy bodies. `
    } else {
      section += `The <strong class="underline">moderate density</strong> suggests a mixed composition of rocky and icy materials. `
    }
  }
  
  return section.trim()
}

function generateOrbitalPropertiesSection(body: Body): string {
  const name = body.englishName || body.name
  const semimajorAxis = body.semimajorAxis
  const perihelion = body.perihelion
  const aphelion = body.aphelion
  const eccentricity = body.eccentricity
  const inclination = body.inclination
  const orbitPeriod = body.sideralOrbit

  let section = `The <strong class="underline">${name} orbit</strong> reveals fascinating details about its journey around the Sun and its relationship to other Solar System objects. `
  
  // First paragraph - distance and orbit shape
  if (semimajorAxis) {
    const au = semimajorAxis / 149598023
    const earthDistance = getEarthComparison(semimajorAxis, EARTH_VALUES.semimajorAxis, "distance from the Sun")
    section += `The <strong class="underline">${name} orbit has a semimajor axis of ${formatNumber(semimajorAxis)} km (${au.toFixed(3)} AU)</strong>${earthDistance ? `, placing it <strong class="underline">${earthDistance}</strong>` : ""}. `
    
    if (perihelion && aphelion) {
      const distanceVariation = ((aphelion - perihelion) / semimajorAxis) * 100
      section += `At its closest approach (perihelion), <strong class="underline">${name} comes within ${formatNumber(perihelion)} km</strong> of the Sun, while at its farthest point (aphelion), it reaches <strong class="underline">${formatNumber(aphelion)} km</strong>, creating a <strong class="underline">${distanceVariation.toFixed(1)}% variation</strong> in solar distance. `
    }
  }
  
  if (eccentricity !== undefined) {
    const earthEccentricity = getEarthComparison(eccentricity, EARTH_VALUES.eccentricity, "orbital eccentricity")
    if (eccentricity < 0.1) {
      section += `The <strong class="underline">${name} orbit is nearly circular</strong> with an eccentricity of <strong class="underline">${formatNumber(eccentricity)}</strong>${earthEccentricity ? ` (<strong class="underline">${earthEccentricity}</strong>)` : ""}, resulting in relatively stable solar heating throughout its year. `
    } else if (eccentricity < 0.5) {
      section += `The <strong class="underline">${name} orbit is moderately elliptical</strong> with an eccentricity of <strong class="underline">${formatNumber(eccentricity)}</strong>${earthEccentricity ? ` (<strong class="underline">${earthEccentricity}</strong>)` : ""}, creating noticeable seasonal variations in solar radiation. `
    } else {
      section += `The <strong class="underline">${name} orbit is highly elliptical</strong> with an eccentricity of <strong class="underline">${formatNumber(eccentricity)}</strong>${earthEccentricity ? ` (<strong class="underline">${earthEccentricity}</strong>)` : ""}, leading to extreme variations in temperature and solar exposure. `
    }
  }
  
  // Second paragraph - orbital period and inclination
  if (orbitPeriod) {
    const earthOrbit = getEarthComparison(orbitPeriod, EARTH_VALUES.sideralOrbit, "orbital period")
    section += `The <strong class="underline">${name} orbit takes ${formatDuration(orbitPeriod)} to complete</strong>${earthOrbit ? ` (<strong class="underline">${earthOrbit}</strong>)` : ""}, defining the length of its year. `
  }
  
  if (inclination !== undefined) {
    section += `The orbital inclination of <strong class="underline">${formatNumber(inclination)}°</strong> indicates how much the <strong class="underline">${name} orbit</strong> is tilted relative to the Solar System's ecliptic plane. `
    if (inclination < 5) {
      section += `This <strong class="underline">low inclination</strong> means <strong class="underline">${name}</strong> follows a path very close to the plane where most planets orbit, suggesting a stable formation history. `
    } else if (inclination > 30) {
      section += `This <strong class="underline">high inclination</strong> suggests <strong class="underline">${name}</strong> may have experienced significant gravitational perturbations or formed in a different region of the Solar System. `
    } else {
      section += `This <strong class="underline">moderate inclination</strong> indicates a typical orbital evolution for objects in this region of the Solar System. `
    }
  }
  
  return section.trim()
}

function generateRotationAndTiltSection(body: Body): string {
  const name = body.englishName || body.name
  const rotationPeriod = body.sideralRotation
  const axialTilt = body.axialTilt
  const meanAnomaly = body.mainAnomaly
  const argPeriapsis = body.argPeriapsis
  const longAscNode = body.longAscNode

  let section = `The <strong class="underline">${name} rotation and axial orientation</strong> provide crucial insights into its daily and seasonal cycles, as well as its orbital dynamics. `
  
  // First paragraph - rotation and day length
  if (rotationPeriod) {
    const earthRotation = getEarthComparison(rotationPeriod, EARTH_VALUES.sideralRotation, "rotation period")
    section += `The <strong class="underline">${name} rotation period of ${formatDuration(rotationPeriod)}</strong>${earthRotation ? ` (<strong class="underline">${earthRotation}</strong>)` : ""} determines the length of its day. `
    
    if (rotationPeriod < 3600) { // Less than 1 hour
      section += `This <strong class="underline">extremely fast rotation</strong> creates intense centrifugal forces and may contribute to the planet's flattened shape. `
    } else if (rotationPeriod > 86400 * 10) { // More than 10 Earth days
      section += `This <strong class="underline">slow rotation</strong> results in extremely long days and nights, creating dramatic temperature variations between the day and night sides. `
    } else {
      section += `This rotation rate creates a day-night cycle that influences atmospheric circulation and surface temperature patterns. `
    }
  }
  
  if (axialTilt !== undefined) {
    const earthTilt = getEarthComparison(axialTilt, EARTH_VALUES.axialTilt, "axial tilt")
    section += `The <strong class="underline">${name} axial tilt of ${formatNumber(axialTilt)}°</strong>${earthTilt ? ` (<strong class="underline">${earthTilt}</strong>)` : ""} determines the intensity and nature of seasonal variations. `
    
    if (axialTilt < 5) {
      section += `With <strong class="underline">minimal axial tilt</strong>, <strong class="underline">${name}</strong> experiences virtually no seasonal changes, maintaining relatively constant temperatures throughout its year. `
    } else if (axialTilt > 60) {
      section += `This <strong class="underline">extreme axial tilt</strong> creates dramatic seasonal variations, with polar regions experiencing months of continuous daylight or darkness. `
    } else {
      section += `This <strong class="underline">moderate tilt</strong> produces seasonal variations similar to Earth, with changing day lengths and temperature patterns throughout the year. `
    }
  }
  
  // Second paragraph - orbital parameters
  if (meanAnomaly !== undefined || argPeriapsis !== undefined || longAscNode !== undefined) {
    section += `The orbital orientation parameters reveal additional details about <strong class="underline">${name}'s position in space</strong>. `
    
    if (meanAnomaly !== undefined) {
      section += `The mean anomaly of <strong class="underline">${formatNumber(meanAnomaly)}°</strong> indicates the planet's current position in its orbit relative to its perihelion. `
    }
    
    if (argPeriapsis !== undefined) {
      section += `The argument of periapsis of <strong class="underline">${formatNumber(argPeriapsis)}°</strong> shows how the orbit's orientation changes over time due to gravitational perturbations. `
    }
    
    if (longAscNode !== undefined) {
      section += `The longitude of ascending node of <strong class="underline">${formatNumber(longAscNode)}°</strong> defines the reference point where the orbit crosses the ecliptic plane. `
    }
  }
  
  return section.trim()
}

function generateTemperatureAndAtmosphereSection(body: Body): string {
  const name = body.englishName || body.name
  const avgTemp = body.avgTemp
  const semimajorAxis = body.semimajorAxis
  const eccentricity = body.eccentricity

  let section = `The <strong class="underline">${name} temperature and atmospheric conditions</strong> are fundamental to understanding its habitability and environmental characteristics. `
  
  // First paragraph - temperature analysis
  if (avgTemp !== undefined) {
    const celsius = avgTemp - 273.15
    const fahrenheit = (celsius * 9/5) + 32
    section += `The <strong class="underline">${name} average temperature of ${formatTemperature(avgTemp)} (${fahrenheit.toFixed(1)}°F)</strong> provides the baseline for understanding its climate. `
    
    if (celsius < -100) {
      section += `These <strong class="underline">extremely cold temperatures</strong> make <strong class="underline">${name}</strong> inhospitable to life as we know it, with any atmosphere likely frozen solid on the surface. `
    } else if (celsius < -50) {
      section += `These <strong class="underline">frigid temperatures</strong> create a harsh environment where only the most extreme forms of life could potentially survive. `
    } else if (celsius < 0) {
      section += `These <strong class="underline">cold temperatures</strong> suggest a world where water would exist primarily as ice, limiting the potential for liquid water-based life. `
    } else if (celsius < 50) {
      section += `These <strong class="underline">moderate temperatures</strong> fall within a range that could potentially support life, depending on atmospheric composition and pressure. `
    } else if (celsius < 100) {
      section += `These <strong class="underline">warm temperatures</strong> create conditions that could support life, though atmospheric pressure and composition would be crucial factors. `
    } else {
      section += `These <strong class="underline">hot temperatures</strong> create an extreme environment where only specialized extremophiles could potentially survive. `
    }
  }
  
  // Second paragraph - habitability and comparison to Earth
  if (semimajorAxis && avgTemp !== undefined) {
    const au = semimajorAxis / 149598023
    const earthTemp = 288 // Earth's average temperature in Kelvin
    const tempDifference = Math.abs(avgTemp - earthTemp)
    
    section += `Compared to Earth's average temperature of <strong class="underline">15°C (59°F)</strong>, <strong class="underline">${name}</strong> presents a <strong class="underline">${tempDifference > 50 ? 'dramatically different' : 'moderately different'} thermal environment</strong>. `
    
    if (au < 0.5) {
      section += `Being closer to the Sun than Earth, <strong class="underline">${name}</strong> receives more intense solar radiation, contributing to its temperature profile. `
    } else if (au > 2) {
      section += `Being farther from the Sun than Earth, <strong class="underline">${name}</strong> receives less solar radiation, resulting in cooler conditions. `
    } else {
      section += `At a similar distance to Earth from the Sun, <strong class="underline">${name}'s temperature</strong> is primarily influenced by its atmospheric composition and albedo. `
    }
    
    if (eccentricity !== undefined && eccentricity > 0.1) {
      section += `The <strong class="underline">elliptical orbit</strong> creates significant temperature variations throughout the year, with extreme seasonal changes. `
    }
  }
  
  return section.trim()
}

function generateEscapeVelocityAndFlatteningSection(body: Body): string {
  const name = body.englishName || body.name
  const escape = body.escape
  const flattening = body.flattening
  const equaRadius = body.equaRadius
  const polarRadius = body.polarRadius

  let section = `The <strong class="underline">${name} escape velocity and shape characteristics</strong> reveal important details about its gravitational field and rotational dynamics. `
  
  // First paragraph - escape velocity
  if (escape !== undefined) {
    const earthEscape = getEarthComparison(escape, EARTH_VALUES.escape, "escape velocity")
    section += `The <strong class="underline">${name} escape velocity of ${formatNumber(escape)} m/s</strong>${earthEscape ? ` (<strong class="underline">${earthEscape}</strong>)` : ""} determines how easily objects can break free from its gravitational pull. `
    
    if (escape < 5000) {
      section += `This <strong class="underline">relatively low escape velocity</strong> means that gases and light molecules can easily escape into space, making it difficult for <strong class="underline">${name}</strong> to retain a substantial atmosphere. `
    } else if (escape < 10000) {
      section += `This <strong class="underline">moderate escape velocity</strong> allows <strong class="underline">${name}</strong> to retain some atmospheric gases while lighter elements may still escape over time. `
    } else {
      section += `This <strong class="underline">high escape velocity</strong> enables <strong class="underline">${name}</strong> to maintain a substantial atmosphere, as most gases cannot achieve the speed needed to escape. `
    }
  }
  
  // Second paragraph - flattening and shape
  if (flattening !== undefined || (equaRadius && polarRadius)) {
    let actualFlattening = flattening
    if (!actualFlattening && equaRadius && polarRadius) {
      actualFlattening = (equaRadius - polarRadius) / equaRadius
    }
    
    if (actualFlattening !== undefined) {
      const flatteningPercent = actualFlattening * 100
      section += `The <strong class="underline">${name} flattening of ${flatteningPercent.toFixed(4)}%</strong> indicates how much the planet's rotation affects its shape. `
      
      if (flatteningPercent < 0.1) {
        section += `This <strong class="underline">minimal flattening</strong> suggests a nearly spherical shape, indicating either slow rotation or a very rigid internal structure. `
      } else if (flatteningPercent < 1) {
        section += `This <strong class="underline">moderate flattening</strong> shows that rotation has created a slight bulge at the equator, typical of most rotating celestial bodies. `
      } else {
        section += `This <strong class="underline">significant flattening</strong> indicates rapid rotation that has substantially deformed the planet's shape, creating a pronounced equatorial bulge. `
      }
      
      if (equaRadius && polarRadius) {
        section += `The equatorial radius of <strong class="underline">${formatNumber(equaRadius)} km</strong> compared to the polar radius of <strong class="underline">${formatNumber(polarRadius)} km</strong> demonstrates this rotational deformation. `
      }
    }
  }
  
  return section.trim()
}

function generateComprehensiveFAQs(body: Body): Array<{question: string, answer: string}> {
  const name = body.englishName || body.name
  const faqs = []
  
  // Required FAQs as specified
  // 1. Gravity FAQ
  if (body.gravity) {
    const earthGravity = getEarthComparison(body.gravity, EARTH_VALUES.gravity, "gravity")
    faqs.push({
      question: `What is the gravity on <strong class="underline">${name}</strong>?`,
      answer: `The gravity on <strong class="underline">${name}</strong> is <strong class="underline">${formatNumber(body.gravity)} m/s²</strong>${earthGravity ? ` (<strong class="underline">${earthGravity}</strong>)` : ""}. This gravitational force determines how objects behave on the surface, affects atmospheric retention, and influences the planet's ability to hold onto gases and particles. A person weighing 70 kg on Earth would weigh <strong class="underline">${((body.gravity / EARTH_VALUES.gravity) * 70).toFixed(1)} kg</strong> on <strong class="underline">${name}</strong>.`
    })
  }
  
  // 2. Size comparison FAQ
  if (body.meanRadius || body.equaRadius) {
    const radius = body.meanRadius || body.equaRadius
    const earthRadius = getEarthComparison(radius!, EARTH_VALUES.meanRadius, "size")
    const volumeRatio = Math.pow(radius! / EARTH_VALUES.meanRadius, 3)
    faqs.push({
      question: `How big is <strong class="underline">${name}</strong> compared to Earth?`,
      answer: `<strong class="underline">${name}</strong> has a radius of <strong class="underline">${formatNumber(radius!)} km</strong>${earthRadius ? `, making it <strong class="underline">${earthRadius}</strong>` : ""}. In terms of volume, <strong class="underline">${name}</strong> is <strong class="underline">${volumeRatio.toFixed(1)}× the size of Earth</strong>. This size difference significantly impacts the planet's gravity, atmospheric retention, geological processes, and overall planetary characteristics.`
    })
  }
  
  // 3. Temperature FAQ
  if (body.avgTemp) {
    const celsius = body.avgTemp - 273.15
    const fahrenheit = (celsius * 9/5) + 32
    faqs.push({
      question: `What is the average temperature of <strong class="underline">${name}</strong>?`,
      answer: `The average temperature of <strong class="underline">${name}</strong> is <strong class="underline">${formatTemperature(body.avgTemp)} (${fahrenheit.toFixed(1)}°F)</strong>. This temperature is influenced by factors such as distance from the Sun, atmospheric composition, albedo (reflectivity), and orbital eccentricity. ${celsius < 0 ? 'The <strong class="underline">sub-zero temperatures</strong> mean water would exist primarily as ice.' : celsius > 100 ? 'The <strong class="underline">high temperatures</strong> create an extreme environment.' : 'These temperatures fall within a range that could potentially support life, depending on other factors.'}`
    })
  }
  
  // Additional relevant FAQs based on available data
  if (body.semimajorAxis) {
    const au = body.semimajorAxis / 149598023
    const earthDistance = getEarthComparison(body.semimajorAxis, EARTH_VALUES.semimajorAxis, "distance from the Sun")
    faqs.push({
      question: `How far is <strong class="underline">${name}</strong> from the Sun?`,
      answer: `<strong class="underline">${name}</strong> orbits at an average distance of <strong class="underline">${formatNumber(body.semimajorAxis)} km (${au.toFixed(3)} AU)</strong> from the Sun${earthDistance ? `, placing it <strong class="underline">${earthDistance}</strong>` : ""}. This distance determines the amount of solar radiation the planet receives and significantly influences its temperature and climate.`
    })
  }
  
  if (body.sideralOrbit) {
    const earthOrbit = getEarthComparison(body.sideralOrbit, EARTH_VALUES.sideralOrbit, "orbital period")
    faqs.push({
      question: `How long is a year on <strong class="underline">${name}</strong>?`,
      answer: `A year on <strong class="underline">${name}</strong> lasts <strong class="underline">${formatDuration(body.sideralOrbit)}</strong>${earthOrbit ? ` (<strong class="underline">${earthOrbit}</strong>)` : ""}. This orbital period defines the length of the planet's year and affects seasonal patterns, temperature variations, and the overall climate cycle.`
    })
  }
  
  if (body.escape) {
    const earthEscape = getEarthComparison(body.escape, EARTH_VALUES.escape, "escape velocity")
    faqs.push({
      question: `What is the escape velocity of <strong class="underline">${name}</strong>?`,
      answer: `The escape velocity of <strong class="underline">${name}</strong> is <strong class="underline">${formatNumber(body.escape)} m/s</strong>${earthEscape ? ` (<strong class="underline">${earthEscape}</strong>)` : ""}. This is the minimum speed required for an object to break free from the planet's gravitational pull and enter space. ${body.escape < 5000 ? 'The <strong class="underline">low escape velocity</strong> makes it difficult for the planet to retain an atmosphere.' : body.escape > 10000 ? 'The <strong class="underline">high escape velocity</strong> allows the planet to maintain a substantial atmosphere.' : 'The <strong class="underline">moderate escape velocity</strong> allows some atmospheric retention.'}`
    })
  }
  
  if (body.density) {
    const earthDensity = getEarthComparison(body.density, EARTH_VALUES.density, "density")
    faqs.push({
      question: `What is <strong class="underline">${name}</strong> made of?`,
      answer: `<strong class="underline">${name}</strong> has a density of <strong class="underline">${formatNumber(body.density)} g/cm³</strong>${earthDensity ? ` (<strong class="underline">${earthDensity}</strong>)` : ""}. This density provides important clues about the planet's internal composition. ${body.density > 5 ? 'The <strong class="underline">high density</strong> suggests a composition rich in metals and rocky materials, typical of terrestrial worlds.' : body.density < 2 ? 'The <strong class="underline">low density</strong> indicates a composition dominated by lighter elements, characteristic of gas giants or icy bodies.' : 'The <strong class="underline">moderate density</strong> suggests a mixed composition of rocky and icy materials.'}`
    })
  }
  
  if (body.axialTilt !== undefined) {
    const earthTilt = getEarthComparison(body.axialTilt, EARTH_VALUES.axialTilt, "axial tilt")
    faqs.push({
      question: `Does <strong class="underline">${name}</strong> have seasons?`,
      answer: `<strong class="underline">${name}</strong> has an axial tilt of <strong class="underline">${formatNumber(body.axialTilt)}°</strong>${earthTilt ? ` (<strong class="underline">${earthTilt}</strong>)` : ""}. ${body.axialTilt < 5 ? 'With <strong class="underline">minimal axial tilt</strong>, the planet experiences virtually no seasonal changes, maintaining relatively constant temperatures throughout its year.' : body.axialTilt > 60 ? 'The <strong class="underline">extreme axial tilt</strong> creates dramatic seasonal variations, with polar regions experiencing months of continuous daylight or darkness.' : 'This <strong class="underline">moderate tilt</strong> produces seasonal variations similar to Earth, with changing day lengths and temperature patterns throughout the year.'}`
    })
  }
  
  return faqs
}

function generateTableOfContents(body: Body) {
  const name = body.englishName || body.name
  const sections = [
    { id: 'physical-properties', title: 'Physical Properties', hasContent: true },
    { id: 'overview', title: `Overview of ${name}`, hasContent: true },
    { id: 'physical-characteristics', title: 'Physical Characteristics', hasContent: true },
    { id: 'orbital-properties', title: 'Orbital Properties', hasContent: true },
    { id: 'rotation-and-tilt', title: 'Rotation and Tilt', hasContent: true },
    { id: 'temperature-and-atmosphere', title: 'Temperature and Atmosphere', hasContent: true },
    { id: 'escape-velocity-flattening', title: 'Escape Velocity & Flattening', hasContent: true },
    { id: 'faqs', title: `FAQs About ${name}`, hasContent: true }
  ]

  return sections
}

export function BodyStats({ body }: BodyStatsProps) {
  const name = body.englishName || body.name
  
  // Generate all content sections
  const overview = generateOverviewSection(body)
  const physicalCharacteristics = generatePhysicalCharacteristicsSection(body)
  const orbitalProperties = generateOrbitalPropertiesSection(body)
  const rotationAndTilt = generateRotationAndTiltSection(body)
  const temperatureAndAtmosphere = generateTemperatureAndAtmosphereSection(body)
  const escapeVelocityAndFlattening = generateEscapeVelocityAndFlatteningSection(body)
  const faqs = generateComprehensiveFAQs(body)
  const tocSections = generateTableOfContents(body)

  return (
    <div className="space-y-8">
      {/* Table of Contents */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="space-y-2">
            {tocSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block py-2 px-3 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 border-l-2 border-transparent hover:border-blue-400 dark:hover:border-blue-500"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Physical Properties Stats */}
      <section id="physical-properties">
        <Card>
          <CardHeader>
            <CardTitle>Physical Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Stat label="Mean Radius" value={formatNumber(body.meanRadius)} unit="km" />
              <Stat label="Equatorial Radius" value={formatNumber(body.equaRadius)} unit="km" />
              <Stat label="Polar Radius" value={formatNumber(body.polarRadius)} unit="km" />
              <Stat label="Mass" value={formatMass(body.mass)} />
              <Stat label="Volume" value={formatVolume(body.vol)} />
              <Stat label="Density" value={formatNumber(body.density)} unit="g/cm³" />
              <Stat label="Gravity" value={formatNumber(body.gravity)} unit="m/s²" />
              <Stat label="Escape Velocity" value={formatNumber(body.escape)} unit="m/s" />
              <Stat label="Flattening" value={formatNumber(body.flattening)} />
              <Stat label="Average Temperature" value={formatTemperature(body.avgTemp)} />
              <Stat label="Axial Tilt" value={formatNumber(body.axialTilt)} unit="°" />
              <Stat label="Semimajor Axis" value={formatNumber(body.semimajorAxis)} unit="km" />
              <Stat label="Perihelion" value={formatNumber(body.perihelion)} unit="km" />
              <Stat label="Aphelion" value={formatNumber(body.aphelion)} unit="km" />
              <Stat label="Eccentricity" value={formatNumber(body.eccentricity)} />
              <Stat label="Inclination" value={formatNumber(body.inclination)} unit="°" />
              <Stat label="Sidereal Orbit" value={formatDuration(body.sideralOrbit)} />
              <Stat label="Sidereal Rotation" value={formatDuration(body.sideralRotation)} />
              <Stat label="Mean Anomaly" value={formatNumber(body.mainAnomaly)} unit="°" />
              <Stat label="Argument of Periapsis" value={formatNumber(body.argPeriapsis)} unit="°" />
              <Stat label="Longitude of Ascending Node" value={formatNumber(body.longAscNode)} unit="°" />
            </dl>
          </CardContent>
        </Card>
      </section>

      {/* Overview Section */}
      <section id="overview" className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Overview of {name}</h2>
        <div 
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: overview }}
        />
      </section>

      {/* Physical Characteristics Section */}
      <section id="physical-characteristics" className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Physical Characteristics</h2>
        <div 
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: physicalCharacteristics }}
        />
      </section>

      {/* Orbital Properties Section */}
      <section id="orbital-properties" className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Orbital Properties</h2>
        <div 
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: orbitalProperties }}
        />
      </section>

      {/* Rotation and Tilt Section */}
      <section id="rotation-and-tilt" className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Rotation and Tilt</h2>
        <div 
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: rotationAndTilt }}
        />
      </section>

      {/* Temperature and Atmosphere Section */}
      <section id="temperature-and-atmosphere" className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Temperature and Atmosphere</h2>
        <div 
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: temperatureAndAtmosphere }}
        />
      </section>

      {/* Escape Velocity & Flattening Section */}
      <section id="escape-velocity-flattening" className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Escape Velocity & Flattening</h2>
        <div 
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: escapeVelocityAndFlattening }}
        />
      </section>

      {/* Frequently Asked Questions */}
      {faqs.length > 0 && (
        <section id="faqs" className="prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6">FAQs About {name}</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 
                  className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: faq.question }}
                />
                <div 
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
