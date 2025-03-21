import { Skeleton } from "@/components/ui/skeleton"

export function GameDetailsSkeleton() {
  return (
    <>
      <div className="bg-background rounded-lg border p-4 md:p-6 mb-6">
        {/* Team Matchup Skeleton */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between w-full">
            {/* Away Team */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 md:h-12 md:w-12 rounded-xs" />
              <div>
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-6 w-28 md:h-8 md:w-32" />
              </div>
            </div>
            
            {/* @ Symbol */}
            <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
            
            {/* Home Team */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <Skeleton className="h-4 w-16 mb-1 ml-auto" />
                <Skeleton className="h-6 w-28 md:h-8 md:w-32" />
              </div>
              <Skeleton className="h-8 w-8 md:h-12 md:w-12 rounded-xs" />
            </div>
          </div>
        </div>
        
        {/* Separator Line */}
        <div className="border-t my-4"></div>
        
        {/* Game Details - Horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:flex lg:flex-wrap pt-1">
          {/* Date */}
          <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
            <Skeleton className="h-4 w-4 mr-2" />
            <Skeleton className="h-5 w-24" />
          </div>
          
          {/* Time */}
          <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
            <Skeleton className="h-4 w-4 mr-2" />
            <Skeleton className="h-5 w-32" />
          </div>
          
          {/* Network */}
          <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
            <Skeleton className="h-4 w-4 mr-2" />
            <Skeleton className="h-5 w-16" />
          </div>
          
          {/* Stadium and Location */}
          <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
            <Skeleton className="h-4 w-4 mr-2" />
            <Skeleton className="h-5 w-20 mr-2" />
            <Skeleton className="h-5 w-24" />
          </div>
          
          {/* Weather */}
          <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
            <Skeleton className="h-5 w-5 mr-2" />
            <Skeleton className="h-5 w-12 mr-2" />
            <Skeleton className="h-5 w-16 mr-2" />
            <Skeleton className="h-5 w-16" />
          </div>
          
          {/* Game Status */}
          <div className="flex flex-auto items-center justify-start xl:justify-end">
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>

      {/* Best Bets Section Skeleton */}
      <div className="bg-background mb-6">
        <Skeleton className="h-7 w-32 mb-4" /> {/* "Best Bets" heading */}
        
        <div className="space-y-4">
          {/* Generate 3 bet item skeletons */}
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="border rounded-lg">
              <div className="flex items-center justify-between w-full p-4">
                <Skeleton className="h-5 w-48" /> {/* Bet type and details */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" /> {/* Star icon */}
                    <Skeleton className="h-5 w-16" /> {/* Rating */}
                  </div>
                  <Skeleton className="h-4 w-4" /> {/* Chevron icon */}
                </div>
              </div>
              
              {/* Show an expanded bet item for the first one */}
              {index === 0 && (
                <div className="p-4 pt-0 border-t">
                  {/* Bet Details Grid Skeleton */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 mb-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Skeleton className="h-4 w-8 mb-1" /> {/* "EV" label */}
                      <Skeleton className="h-5 w-12" /> {/* Value */}
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Skeleton className="h-4 w-20 mb-1" /> {/* "Confidence" label */}
                      <Skeleton className="h-5 w-12" /> {/* Value */}
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Skeleton className="h-4 w-12 mb-1" /> {/* "Units" label */}
                      <Skeleton className="h-5 w-8" /> {/* Value */}
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Skeleton className="h-4 w-20 mb-1" /> {/* "Risk Score" label */}
                      <Skeleton className="h-5 w-16" /> {/* Value */}
                    </div>
                  </div>
                  
                  {/* Rationale Skeleton */}
                  <div className="mt-4">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
