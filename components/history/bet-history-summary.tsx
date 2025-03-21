"use client"

import { getBetHistorySummary } from "@/lib/mock-history-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, PercentIcon, DollarSignIcon, BarChart3Icon } from "lucide-react"

interface BetHistorySummaryProps {
  summaryData?: ReturnType<typeof getBetHistorySummary>
}

export function BetHistorySummary({ summaryData = getBetHistorySummary() }: BetHistorySummaryProps) {
  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Function to format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
      {/* Win/Loss Record */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 md:p-6 pb-2 md:pb-2">
          <CardTitle className="text-sm font-medium">Win/Loss Record</CardTitle>
          <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className="text-2xl font-bold">
            {summaryData.wins}-{summaryData.losses}{summaryData.pushes > 0 ? `-${summaryData.pushes}` : ''}
          </div>
          <p className="text-xs text-muted-foreground">
            {summaryData.pending > 0 ? `${summaryData.pending} pending` : 'All bets settled'}
          </p>
        </CardContent>
      </Card>
      
      {/* Win Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6 md:pb-2">
          <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          <PercentIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className="text-2xl font-bold">{formatPercentage(summaryData.winRate)}</div>
          <p className="text-xs text-muted-foreground">
            {summaryData.totalBets} total bets
          </p>
        </CardContent>
      </Card>
      
      {/* Profit/Loss */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6 md:pb-2">
          <CardTitle className="text-sm font-medium">Profit/Loss</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className={`text-2xl font-bold ${summaryData.profit > 0 ? 'text-green-500' : summaryData.profit < 0 ? 'text-red-500' : ''}`}>
            {formatCurrency(summaryData.profit)}
          </div>
          <div className="flex items-center pt-1">
            {summaryData.profit > 0 ? (
              <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
            ) : summaryData.profit < 0 ? (
              <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
            ) : (
              <TrendingUpIcon className="h-3 w-3 text-muted-foreground mr-1" />
            )}
            <p className="text-xs text-muted-foreground">
              From {formatCurrency(summaryData.totalStake)} wagered
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Return on Investment */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6 md:pb-2">
          <CardTitle className="text-sm font-medium">ROI</CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className={`text-2xl font-bold ${summaryData.profit > 0 ? 'text-green-500' : summaryData.profit < 0 ? 'text-red-500' : ''}`}>
            {formatPercentage((summaryData.profit / summaryData.totalStake) * 100)}
          </div>
          <p className="text-xs text-muted-foreground">
            Total payout: {formatCurrency(summaryData.totalPayout)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
