import type { Body } from "./types"

export const categorize = (bodies: Body[]) => ({
  planets: bodies.filter((b) => b.isPlanet || b.bodyType === "Planet"),
  moons: bodies.filter((b) => b.bodyType === "Moon"),
  asteroids: bodies.filter((b) => b.bodyType === "Asteroid"),
  comets: bodies.filter((b) => b.bodyType === "Comet"),
})

export function searchFilter(q: string) {
  const s = q.toLowerCase()
  return (b: Body) => b.name?.toLowerCase().includes(s) || b.englishName?.toLowerCase().includes(s)
}

export function sortBodies(bodies: Body[], sortBy: "name" | "radius" | "gravity"): Body[] {
  return [...bodies].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return (a.englishName || a.name).localeCompare(b.englishName || b.name)
      case "radius":
        return (b.meanRadius || 0) - (a.meanRadius || 0)
      case "gravity":
        return (b.gravity || 0) - (a.gravity || 0)
      default:
        return 0
    }
  })
}

export function applyFilters(
  bodies: Body[],
  filters: {
    search?: string
    category?: string
    minRadius?: number
    maxRadius?: number
    minGravity?: number
    maxGravity?: number
    discoveredBy?: string
    hasMoons?: boolean
  },
): Body[] {
  let filtered = [...bodies]

  if (filters.search) {
    filtered = filtered.filter(searchFilter(filters.search))
  }

  if (filters.category) {
    const categories = categorize(bodies)
    switch (filters.category) {
      case "planets":
        filtered = categories.planets
        break
      case "moons":
        filtered = categories.moons
        break
      case "asteroids":
        filtered = categories.asteroids
        break
      case "comets":
        filtered = categories.comets
        break
    }

    if (filters.search) {
      filtered = filtered.filter(searchFilter(filters.search))
    }
  }

  if (filters.minRadius !== undefined || filters.maxRadius !== undefined) {
    const minRadius = filters.minRadius || 0
    const maxRadius = filters.maxRadius || Number.POSITIVE_INFINITY
    filtered = filtered.filter((body) => {
      const radius = body.meanRadius || 0
      return radius >= minRadius && radius <= maxRadius
    })
  }

  if (filters.minGravity !== undefined || filters.maxGravity !== undefined) {
    const minGravity = filters.minGravity || 0
    const maxGravity = filters.maxGravity || Number.POSITIVE_INFINITY
    filtered = filtered.filter((body) => {
      const gravity = body.gravity || 0
      return gravity >= minGravity && gravity <= maxGravity
    })
  }

  if (filters.discoveredBy) {
    const discoverer = filters.discoveredBy.toLowerCase()
    filtered = filtered.filter((body) => body.discoveredBy?.toLowerCase().includes(discoverer))
  }

  if (filters.hasMoons) {
    filtered = filtered.filter((body) => body.moons && body.moons.length > 0)
  }

  return filtered
}
