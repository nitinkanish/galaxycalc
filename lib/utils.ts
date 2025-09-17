import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return "—"
  if (num === 0) return "0"

  // Handle very large numbers with scientific notation
  if (Math.abs(num) >= 1e6) {
    return num.toExponential(2)
  }

  return num.toLocaleString()
}

export function formatMass(mass: { massValue: number; massExponent: number } | undefined): string {
  if (!mass) return "—"
  const value = mass.massValue * Math.pow(10, mass.massExponent)
  return `${value.toExponential(2)} kg`
}

export function formatVolume(vol: { volValue: number; volExponent: number } | undefined): string {
  if (!vol) return "—"
  const value = vol.volValue * Math.pow(10, vol.volExponent)
  return `${value.toExponential(2)} km³`
}

export function formatTemperature(temp: number | undefined): string {
  if (temp === undefined) return "—"
  const celsius = temp - 273.15
  return `${temp.toFixed(1)} K (${celsius.toFixed(1)} °C)`
}

export function formatDuration(seconds: number | undefined): string {
  if (seconds === undefined) return "—"
  if (seconds === 0) return "0 seconds"

  const days = seconds / (24 * 3600)
  if (days > 365) {
    const years = days / 365
    return `${years.toFixed(2)} years`
  } else if (days > 1) {
    return `${days.toFixed(2)} days`
  } else {
    const hours = seconds / 3600
    return `${hours.toFixed(2)} hours`
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getBodyTypeColor(bodyType: string): string {
  switch (bodyType.toLowerCase()) {
    case "planet":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "moon":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    case "asteroid":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "comet":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    default:
      return "bg-secondary text-secondary-foreground"
  }
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
}

export function getBodySlug(body: { englishName?: string; name: string; id: string }): string {
  const name = body.englishName || body.name
  const slug = generateSlug(name)
  return slug || body.id // Fallback to ID if slug generation fails
}

export function parseSlug(slug: string): { name: string; isLegacyId: boolean } {
  // Check if it's a legacy numeric ID
  if (/^\d+$/.test(slug)) {
    return { name: slug, isLegacyId: true }
  }

  // Convert slug back to searchable name
  const name = slug.replace(/-/g, " ")
  return { name, isLegacyId: false }
}

export function createCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com"
  return `${baseUrl}${path}`
}
