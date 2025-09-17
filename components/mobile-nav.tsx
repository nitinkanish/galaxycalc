"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, Calculator, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [calculatorsOpen, setCalculatorsOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex items-center space-x-2 mb-8">
          <div className="p-1 bg-primary rounded">
            <Calculator className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold">GalaxyCalc</span>
        </div>

        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/browse"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Browse
          </Link>

          <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors">
              <span>Categories</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-2 space-y-2">
              <Link
                href="/solar-system-planets"
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                Solar System Planets
              </Link>
              <Link
                href="/moons-in-space"
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                Moons in Space
              </Link>
              <Link
                href="/asteroids-in-space"
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                Asteroids in Space
              </Link>
              <Link
                href="/comets-in-space"
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                Comets in Space
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={calculatorsOpen} onOpenChange={setCalculatorsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors">
              <span>Calculators</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${calculatorsOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-2 space-y-2">
              <Link
                href="/gravitational-force-calculator"
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                Gravitational Force
              </Link>
              <Link
                href="/orbital-velocity-calculator"
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                Orbital Velocity
              </Link>
              <Link
                href="/escape-velocity-calculator"
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                Escape Velocity
              </Link>
              <Link
                href="/calculator"
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                All Calculators
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Link
            href="/about"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
