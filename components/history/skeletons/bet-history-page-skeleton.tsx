"use client"

import { BetHistorySummarySkeleton } from "./bet-history-summary-skeleton"
import { BetHistoryFiltersSkeleton } from "./bet-history-filters-skeleton"
import { BetHistoryCardSkeleton } from "./bet-history-card-skeleton"
import { BetHistoryTableSkeleton } from "./bet-history-table-skeleton"
import { useIsMobile } from "@/hooks/use-mobile"
import { Skeleton } from "@/components/ui/skeleton"

export function BetHistoryPageSkeleton() {
  const isMobile = useIsMobile()

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Page Header */}
      <div className="mb-4">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>
      
      {/* Summary Cards */}
      <BetHistorySummarySkeleton />
      
      {/* Filters */}
      <BetHistoryFiltersSkeleton />
      
      {/* Bet History Table/Cards */}
      {isMobile ? <BetHistoryCardSkeleton /> : <BetHistoryTableSkeleton />}
    </div>
  )
}

// Export individual skeletons for direct use
export {
  BetHistorySummarySkeleton,
  BetHistoryFiltersSkeleton,
  BetHistoryCardSkeleton,
  BetHistoryTableSkeleton
}
