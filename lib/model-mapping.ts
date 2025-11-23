// Mapping of planet/celestial body names to their 3D model URLs
export const MODEL_MAPPING: Record<string, string> = {
  'Uranus': 'https://res.cloudinary.com/dxovhtuki/image/upload/v1763905546/uranus-3d_izvghi.glb',
  'Mars': 'https://res.cloudinary.com/dxovhtuki/image/upload/v1763905632/mars-3d_yk0ej6.glb',
  // Add more mappings as models become available
  // 'Jupiter': 'https://...',
  // 'Earth': 'https://...',
  // etc.
}

export function getModelUrl(bodyName: string): string | null {
  // Try exact match first
  if (MODEL_MAPPING[bodyName]) {
    return MODEL_MAPPING[bodyName]
  }
  
  // Try case-insensitive match
  const lowerName = bodyName.toLowerCase()
  for (const [key, value] of Object.entries(MODEL_MAPPING)) {
    if (key.toLowerCase() === lowerName) {
      return value
    }
  }
  
  return null
}

