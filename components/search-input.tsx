"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDebouncedCallback } from "use-debounce"

interface SearchInputProps {
  placeholder?: string
  className?: string
}

export function SearchInput({ placeholder = "Search celestial bodies...", className }: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedSearch = useDebouncedCallback((term: string) => {
    // Only auto-navigate if we're already on the browse page
    if (pathname === "/browse") {
      const params = new URLSearchParams(searchParams.toString())
      if (term) {
        params.set("q", term)
      } else {
        params.delete("q")
      }
      router.push(`/browse?${params.toString()}`)
    }
  }, 300)

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  const clearSearch = () => {
    setSearchTerm("")
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && searchTerm) {
      clearSearch()
    } else if (e.key === "Enter" && searchTerm && pathname !== "/browse") {
      // Navigate to browse page with search term when Enter is pressed
      router.push(`/browse?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className={`relative ${className}`} role="search">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none"
        aria-hidden="true"
      />
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-10"
        aria-label="Search celestial bodies"
        aria-describedby={searchTerm ? "search-clear-button" : undefined}
        autoComplete="off"
        spellCheck="false"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          aria-label="Clear search"
          id="search-clear-button"
          tabIndex={0}
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}
