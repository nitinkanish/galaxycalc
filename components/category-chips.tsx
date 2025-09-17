"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"

const categories = [
  { key: "planets", label: "Planets" },
  { key: "moons", label: "Moons" },
  { key: "asteroids", label: "Asteroids" },
  { key: "comets", label: "Comets" },
]

export function CategoryChips() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category")

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (activeCategory === category) {
      params.delete("category")
    } else {
      params.set("category", category)
    }
    router.push(`/browse?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category.key}
          variant={activeCategory === category.key ? "default" : "secondary"}
          className="cursor-pointer hover:bg-primary/80 transition-colors"
          onClick={() => handleCategoryClick(category.key)}
        >
          {category.label}
        </Badge>
      ))}
    </div>
  )
}
