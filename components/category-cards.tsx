import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Moon, Zap, Code as Comet } from "lucide-react"
import type { CategoryCounts } from "@/lib/types"

interface CategoryCardsProps {
  counts: CategoryCounts
}

const categoryData = [
  {
    key: "planets",
    title: "Planets",
    description: "Explore the eight planets of our solar system, from rocky terrestrial worlds to gas giants.",
    icon: Globe,
    href: "/solar-system-planets",
  },
  {
    key: "moons",
    title: "Moons",
    description: "Discover natural satellites orbiting planets, each with unique characteristics and features.",
    icon: Moon,
    href: "/moons-in-space",
  },
  {
    key: "asteroids",
    title: "Asteroids",
    description: "Learn about rocky objects that orbit the Sun, remnants from our solar system's formation.",
    icon: Zap,
    href: "/asteroids-in-space",
  },
  {
    key: "comets",
    title: "Comets",
    description: "Study icy bodies that develop spectacular tails when approaching the Sun.",
    icon: Comet,
    href: "/comets-in-space",
  },
]

export function CategoryCards({ counts }: CategoryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categoryData.map((category) => {
        const Icon = category.icon
        const count = counts[category.key as keyof CategoryCounts]

        return (
          <Card key={category.key} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">{category.title}</CardTitle>
              <div className="text-3xl font-bold text-primary">{count}</div>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <CardDescription className="text-sm leading-relaxed">{category.description}</CardDescription>
              <Link href={category.href}>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                >
                  Explore {category.title}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
