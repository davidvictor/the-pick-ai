import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BetHistorySummarySkeleton() {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
      {/* Win/Loss Record Card Skeleton */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 md:p-6 pb-2 md:pb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <Skeleton className="h-8 w-20 mb-1" />
          <Skeleton className="h-4 w-24" />
        </CardContent>
      </Card>
      
      {/* Win Rate Card Skeleton */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 md:p-6 pb-2 md:pb-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-4 w-28" />
        </CardContent>
      </Card>
      
      {/* Profit/Loss Card Skeleton */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 md:p-6 pb-2 md:pb-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <Skeleton className="h-8 w-24 mb-1" />
          <div className="flex items-center pt-1">
            <Skeleton className="h-3 w-3 mr-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardContent>
      </Card>
      
      {/* ROI Card Skeleton */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 md:p-6 pb-2 md:pb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-4 w-36" />
        </CardContent>
      </Card>
    </div>
  )
}
