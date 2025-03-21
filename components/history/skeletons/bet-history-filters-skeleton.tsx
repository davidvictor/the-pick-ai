import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function BetHistoryFiltersSkeleton() {
  const isMobile = useIsMobile()

  // Desktop filters skeleton
  const DesktopFiltersSkeleton = () => (
    <div className="bg-muted/30 p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-9 w-16" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {/* Date Range */}
        <div>
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        {/* League */}
        <div>
          <Skeleton className="h-5 w-16 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        {/* Bet Type */}
        <div>
          <Skeleton className="h-5 w-20 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        {/* Leg Type */}
        <div>
          <Skeleton className="h-5 w-20 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        {/* Result */}
        <div>
          <Skeleton className="h-5 w-16 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        {/* Confidence */}
        <div>
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        {/* Risk Level */}
        <div>
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )

  // Mobile filters skeleton
  const MobileFiltersSkeleton = () => (
    <div className="mb-4">
      <Skeleton className="h-10 w-full" />
    </div>
  )

  return isMobile ? <MobileFiltersSkeleton /> : <DesktopFiltersSkeleton />
}
