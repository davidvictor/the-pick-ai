import { Skeleton } from "@/components/ui/skeleton"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

function BetHistoryCardItemSkeleton() {
  return (
    <div className="bg-background rounded-lg border overflow-hidden mb-4">
      {/* Header with date, league, and result */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-4" />
        </div>
      </div>
      
      {/* Game and bet details */}
      <div className="p-4 border-b">
        <div className="mb-2">
          <Skeleton className="h-4 w-12 mb-1" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>
      
      {/* Financial details */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-12 mb-1" />
            <Skeleton className="h-5 w-8" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </div>
      
      {/* Rating */}
      <div className="p-4 border-b">
        <Skeleton className="h-4 w-16 mb-1" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  )
}

export function BetHistoryCardSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3).fill(0).map((_, index) => (
        <BetHistoryCardItemSkeleton key={index} />
      ))}
      
      {/* Pagination Skeleton */}
      <div className="py-4 mt-4 border-t">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Skeleton className="h-10 w-10 rounded-md" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-10 w-10 rounded-md" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-10 w-10 rounded-md" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
