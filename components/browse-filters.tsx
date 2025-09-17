"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CategoryChips } from "@/components/category-chips"
import { SearchInput } from "@/components/search-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import type { CategoryCounts } from "@/lib/types"

interface BrowseFiltersProps {
  categoryCounts: CategoryCounts
}

export function BrowseFilters({ categoryCounts }: BrowseFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/browse?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/browse")
  }

  const hasActiveFilters = Array.from(searchParams.entries()).some(
    ([key, value]) => key !== "q" && key !== "sort" && value,
  )

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchInput placeholder="Search by name..." />
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryChips />
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>Planets: {categoryCounts.planets}</div>
            <div>Moons: {categoryCounts.moons}</div>
            <div>Asteroids: {categoryCounts.asteroids}</div>
            <div>Comets: {categoryCounts.comets}</div>
          </div>
        </CardContent>
      </Card>

      {/* Sort */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={searchParams.get("sort") || "name"} onValueChange={(value) => updateParam("sort", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="radius">Radius (largest first)</SelectItem>
              <SelectItem value="gravity">Gravity (strongest first)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Radius Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Radius Range (km)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="minRadius">Minimum</Label>
            <Input
              id="minRadius"
              type="number"
              placeholder="0"
              value={searchParams.get("minRadius") || ""}
              onChange={(e) => updateParam("minRadius", e.target.value || null)}
            />
          </div>
          <div>
            <Label htmlFor="maxRadius">Maximum</Label>
            <Input
              id="maxRadius"
              type="number"
              placeholder="No limit"
              value={searchParams.get("maxRadius") || ""}
              onChange={(e) => updateParam("maxRadius", e.target.value || null)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gravity Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gravity Range (m/s²)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="minGravity">Minimum</Label>
            <Input
              id="minGravity"
              type="number"
              step="0.1"
              placeholder="0"
              value={searchParams.get("minGravity") || ""}
              onChange={(e) => updateParam("minGravity", e.target.value || null)}
            />
          </div>
          <div>
            <Label htmlFor="maxGravity">Maximum</Label>
            <Input
              id="maxGravity"
              type="number"
              step="0.1"
              placeholder="No limit"
              value={searchParams.get("maxGravity") || ""}
              onChange={(e) => updateParam("maxGravity", e.target.value || null)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Discovered By */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Discovered By</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter discoverer name..."
            value={searchParams.get("discoveredBy") || ""}
            onChange={(e) => updateParam("discoveredBy", e.target.value || null)}
          />
        </CardContent>
      </Card>

      {/* Has Moons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasMoons"
              checked={searchParams.get("hasMoons") === "true"}
              onCheckedChange={(checked) => updateParam("hasMoons", checked ? "true" : null)}
            />
            <Label htmlFor="hasMoons">Has moons</Label>
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
