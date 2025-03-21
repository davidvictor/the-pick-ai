import { Skeleton } from "@/components/ui/skeleton"

export function GameCardSkeleton() {
  return (
    <div className="bg-background rounded-lg border overflow-hidden flex flex-col">
      {/* Teams Header Skeleton */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center justify-between w-full">
          {/* Away Team */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-xs" />
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          
          {/* Home Team */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <Skeleton className="h-4 w-16 mb-1 ml-auto" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-8 w-8 rounded-xs" />
          </div>
        </div>
      </div>
      
      {/* Game Info Skeleton */}
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
      
      {/* Best Bets Skeleton */}
      <div className="bg-muted/30 p-4 border-t flex flex-col lg:h-[152px]">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-2 flex-grow">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
