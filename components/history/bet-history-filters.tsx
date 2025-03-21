"use client"

import { useState } from "react"
import { League } from "@/services/api-types"
import { BetType, LegType, BetResult } from "@/lib/bet-types"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { getLeagueDisplayName } from "@/lib/utils"
import { CalendarIcon, FilterIcon } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

interface BetHistoryFiltersProps {
  onFilterChange: (filters: BetHistoryFilters) => void
}

export interface BetHistoryFilters {
  league?: League | 'all'
  betType?: BetType | 'all'
  legType?: LegType | 'all'
  result?: BetResult | 'all'
  dateRange?: 'all' | 'last7' | 'last30' | 'last90'
  confidenceRange?: 'all' | 'high' | 'medium' | 'low'
  riskLevel?: 'all' | 'Low' | 'Medium' | 'High'
}

export function BetHistoryFilters({ onFilterChange }: BetHistoryFiltersProps) {
  const isMobile = useIsMobile()
  const [filters, setFilters] = useState<BetHistoryFilters>({
    league: 'all',
    betType: 'all',
    legType: 'all',
    result: 'all',
    dateRange: 'all',
    confidenceRange: 'all',
    riskLevel: 'all'
  })

  const leagues: League[] = ["NFL", "NBA", "MLB", "NHL", "MLS", "NCAAF", "NCAAB"]
  const betTypes: (BetType | 'all')[] = ['all', 'straight', 'parlay', 'teaser']
  const legTypes: (LegType | 'all')[] = ['all', 'moneyline', 'spread', 'total', 'prop']
  const results: (BetResult | 'all')[] = ['all', 'win', 'loss', 'push', 'pending']
  const confidenceRanges = [
    { value: 'all', label: 'All Confidence Levels' },
    { value: 'high', label: 'High (8-10)' },
    { value: 'medium', label: 'Medium (5-7)' },
    { value: 'low', label: 'Low (1-4)' }
  ]
  const riskLevels = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'Low', label: 'Low Risk' },
    { value: 'Medium', label: 'Medium Risk' },
    { value: 'High', label: 'High Risk' }
  ]
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'last7', label: 'Last 7 Days' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'last90', label: 'Last 90 Days' }
  ]

  const handleFilterChange = (key: keyof BetHistoryFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters: BetHistoryFilters = {
      league: 'all',
      betType: 'all',
      legType: 'all',
      result: 'all',
      dateRange: 'all',
      confidenceRange: 'all',
      riskLevel: 'all'
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  // Desktop filters
  const DesktopFilters = () => (
    <div className="bg-muted/30 p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="outline" size="sm" onClick={resetFilters}>Reset</Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Date Range</label>
          <Select 
            value={filters.dateRange} 
            onValueChange={(value) => handleFilterChange('dateRange', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">League</label>
          <Select 
            value={filters.league} 
            onValueChange={(value) => handleFilterChange('league', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select league" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leagues</SelectItem>
              {leagues.map((league) => (
                <SelectItem key={league} value={league}>
                  {getLeagueDisplayName(league)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Bet Type</label>
          <Select 
            value={filters.betType} 
            onValueChange={(value) => handleFilterChange('betType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select bet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="straight">Straight</SelectItem>
              <SelectItem value="parlay">Parlay</SelectItem>
              <SelectItem value="teaser">Teaser</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Leg Type</label>
          <Select 
            value={filters.legType} 
            onValueChange={(value) => handleFilterChange('legType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select leg type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leg Types</SelectItem>
              <SelectItem value="moneyline">Moneyline</SelectItem>
              <SelectItem value="spread">Spread</SelectItem>
              <SelectItem value="total">Total</SelectItem>
              <SelectItem value="prop">Prop</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Result</label>
          <Select 
            value={filters.result} 
            onValueChange={(value) => handleFilterChange('result', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              {results.filter(r => r !== 'all').map((result) => (
                <SelectItem key={result} value={result} className="capitalize">
                  {result.charAt(0).toUpperCase() + result.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Confidence</label>
          <Select 
            value={filters.confidenceRange} 
            onValueChange={(value) => handleFilterChange('confidenceRange', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select confidence level" />
            </SelectTrigger>
            <SelectContent>
              {confidenceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Risk Level</label>
          <Select 
            value={filters.riskLevel} 
            onValueChange={(value) => handleFilterChange('riskLevel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              {riskLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  // Mobile filters in a sheet
  const MobileFilters = () => (
    <div className="mb-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Filter your betting history
            </SheetDescription>
          </SheetHeader>
          <div className="p-4 space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Select 
                value={filters.dateRange} 
                onValueChange={(value) => handleFilterChange('dateRange', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">League</label>
              <Select 
                value={filters.league} 
                onValueChange={(value) => handleFilterChange('league', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select league" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Leagues</SelectItem>
                  {leagues.map((league) => (
                    <SelectItem key={league} value={league}>
                      {getLeagueDisplayName(league)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Bet Type</label>
              <Select 
                value={filters.betType} 
                onValueChange={(value) => handleFilterChange('betType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="straight">Straight</SelectItem>
                  <SelectItem value="parlay">Parlay</SelectItem>
                  <SelectItem value="teaser">Teaser</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Leg Type</label>
              <Select 
                value={filters.legType} 
                onValueChange={(value) => handleFilterChange('legType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select leg type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Leg Types</SelectItem>
                  <SelectItem value="moneyline">Moneyline</SelectItem>
                  <SelectItem value="spread">Spread</SelectItem>
                  <SelectItem value="total">Total</SelectItem>
                  <SelectItem value="prop">Prop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Result</label>
              <Select 
                value={filters.result} 
                onValueChange={(value) => handleFilterChange('result', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  {results.filter(r => r !== 'all').map((result) => (
                    <SelectItem key={result} value={result} className="capitalize">
                      {result.charAt(0).toUpperCase() + result.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Confidence</label>
              <Select 
                value={filters.confidenceRange} 
                onValueChange={(value) => handleFilterChange('confidenceRange', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select confidence level" />
                </SelectTrigger>
                <SelectContent>
                  {confidenceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Risk Level</label>
              <Select 
                value={filters.riskLevel} 
                onValueChange={(value) => handleFilterChange('riskLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  {riskLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={resetFilters}>Reset Filters</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )

  return isMobile ? <MobileFilters /> : <DesktopFilters />
}
