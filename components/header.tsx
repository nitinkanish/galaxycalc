import Link from "next/link"
import Image from "next/image"
import { Calculator, ChevronDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Logo } from "@/public/galaxy-calc.png"
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-1.5 bg-primary rounded-full">
              <Image src={Logo} className="h-5" />
            </div>
            <span className="font-bold text-xl">GalaxyCalc</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
              Browse
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                <span>Categories</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/solar-system-planets">Solar System Planets</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/moons-in-space">Moons in Space</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/asteroids-in-space">Asteroids in Space</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/comets-in-space">Comets in Space</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                <span>Calculators</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/gravitational-force-calculator">Gravitational Force</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orbital-velocity-calculator">Orbital Velocity</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/escape-velocity-calculator">Escape Velocity</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/calculator">All Calculators</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
