import type { Body, BodiesResponse } from "./types"

const BASE = "https://api.le-systeme-solaire.net/rest"

async function apiFetch<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.GALAXYINFO_API_KEY ?? ""}`,
    },
    // Cache on the server for 1 hour
    next: { revalidate },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error ${res.status}: ${text}`)
  }

  return res.json() as Promise<T>
}

export async function getAllBodies(): Promise<BodiesResponse> {
  return apiFetch<BodiesResponse>("/bodies")
}

export async function getBody(id: string): Promise<Body> {
  return apiFetch<Body>(`/bodies/${id}`)
}

export async function findBodyByName(name: string): Promise<Body | null> {
  try {
    const { bodies } = await getAllBodies()

    // Normalize the search name
    const searchName = name.toLowerCase().replace(/-/g, " ")

    // Find exact match first
    let body = bodies.find((b) => b.englishName?.toLowerCase() === searchName || b.name.toLowerCase() === searchName)

    // If no exact match, try partial match
    if (!body) {
      body = bodies.find(
        (b) => b.englishName?.toLowerCase().includes(searchName) || b.name.toLowerCase().includes(searchName),
      )
    }

    return body || null
  } catch {
    return null
  }
}

export async function getBodyBySlugOrId(slugOrId: string): Promise<Body | null> {
  try {
    // First try as direct ID
    if (/^\d+$/.test(slugOrId)) {
      return await getBody(slugOrId)
    }

    // Then try as name/slug
    return await findBodyByName(slugOrId)
  } catch {
    return null
  }
}
