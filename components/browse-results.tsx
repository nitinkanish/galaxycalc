import { BodyCard } from "@/components/body-card"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import type { Body } from "@/lib/types"

interface BrowseResultsProps {
  bodies: Body[]
  searchParams: Record<string, string | undefined>
  totalItems: number
  currentPage: number
  totalPages: number
  itemsPerPage: number
}

export function BrowseResults({
  bodies,
  searchParams,
  totalItems,
  currentPage,
  totalPages,
  itemsPerPage,
}: BrowseResultsProps) {
  const hasFilters = Object.keys(searchParams).some((key) => searchParams[key] && key !== "page")

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value)
      }
    })
    if (page > 1) {
      params.set("page", page.toString())
    }
    const queryString = params.toString()
    return `/browse${queryString ? `?${queryString}` : ""}`
  }

  if (totalItems === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="space-y-4">
            <div className="text-6xl">🔍</div>
            <div>
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                {hasFilters
                  ? "Try adjusting your filters or search terms to find what you're looking for."
                  : "No celestial bodies match your criteria."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {startItem.toLocaleString()}-{endItem.toLocaleString()} of {totalItems.toLocaleString()} result
          {totalItems !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
        {bodies.map((body) => (
          <BodyCard key={body.id} body={body} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={buildPageUrl(currentPage - 1)} />
                </PaginationItem>
              )}

              {/* First page */}
              {currentPage > 3 && (
                <>
                  <PaginationItem>
                    <PaginationLink href={buildPageUrl(1)}>1</PaginationLink>
                  </PaginationItem>
                  {currentPage > 4 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}

              {/* Pages around current page */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                if (pageNum > totalPages) return null

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink href={buildPageUrl(pageNum)} isActive={pageNum === currentPage}>
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {/* Last page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink href={buildPageUrl(totalPages)}>{totalPages}</PaginationLink>
                  </PaginationItem>
                </>
              )}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={buildPageUrl(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
