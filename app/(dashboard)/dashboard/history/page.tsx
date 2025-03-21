"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/nav/app-sidebar"
import { AppHeader } from "@/components/ui/app-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarContent } from "@/components/ui/sidebar-content"
import { BetHistoryTable } from "@/components/history/bet-history-table"
import { BetHistoryCardList } from "@/components/history/bet-history-card"
import { BetHistoryFilters, BetHistoryFilters as BetHistoryFiltersType } from "@/components/history/bet-history-filters"
import { BetHistorySummary } from "@/components/history/bet-history-summary"
import { BetHistoryPageSkeleton } from "@/components/history/skeletons/bet-history-page-skeleton"
import { mockBetHistory, getBetHistorySummary } from "@/lib/mock-history-data"
import { Bet } from "@/lib/bet-types"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSimulatedLoading } from "@/hooks/use-simulated-loading"
import { appConfig } from "@/lib/app-config"

export default function HistoryPage() {
  const isMobile = useIsMobile()
  const { loading } = useSimulatedLoading({
    loadingTime: appConfig.loading.times.page
  })
  const [filteredBets, setFilteredBets] = useState<Bet[]>(mockBetHistory)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10) // Number of items per page
  const [filters, setFilters] = useState<BetHistoryFiltersType>({
    league: 'all',
    betType: 'all',
    legType: 'all',
    result: 'all',
    dateRange: 'all',
    confidenceRange: 'all',
    riskLevel: 'all'
  })

  // Apply filters to bet history and reset pagination when filters change
  useEffect(() => {
    let filtered = [...mockBetHistory]
    
    // Filter by league
    if (filters.league && filters.league !== 'all') {
      filtered = filtered.filter(bet => 
        bet.legs.some(leg => leg.league === filters.league)
      )
    }
    
    // Filter by bet type
    if (filters.betType && filters.betType !== 'all') {
      filtered = filtered.filter(bet => bet.betType === filters.betType)
    }
    
    // Filter by leg type
    if (filters.legType && filters.legType !== 'all') {
      filtered = filtered.filter(bet => 
        bet.legs.some(leg => leg.legType === filters.legType)
      )
    }
    
    // Filter by result
    if (filters.result && filters.result !== 'all') {
      filtered = filtered.filter(bet => bet.result === filters.result)
    }
    
    // Filter by date range
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date()
      let daysToSubtract = 0
      
      switch (filters.dateRange) {
        case 'last7':
          daysToSubtract = 7
          break
        case 'last30':
          daysToSubtract = 30
          break
        case 'last90':
          daysToSubtract = 90
          break
      }
      
      if (daysToSubtract > 0) {
        const cutoffDate = new Date(now)
        cutoffDate.setDate(now.getDate() - daysToSubtract)
        filtered = filtered.filter(bet => new Date(bet.date) >= cutoffDate)
      }
    }
    
    // Filter by confidence range
    if (filters.confidenceRange && filters.confidenceRange !== 'all') {
      let minConfidence = 0
      let maxConfidence = 10
      
      switch (filters.confidenceRange) {
        case 'high':
          minConfidence = 8
          maxConfidence = 10
          break
        case 'medium':
          minConfidence = 5
          maxConfidence = 7
          break
        case 'low':
          minConfidence = 1
          maxConfidence = 4
          break
      }
      
      filtered = filtered.filter(bet => 
        bet.confidenceScore >= minConfidence && bet.confidenceScore <= maxConfidence
      )
    }
    
    // Filter by risk level
    if (filters.riskLevel && filters.riskLevel !== 'all') {
      filtered = filtered.filter(bet => bet.riskScore === filters.riskLevel)
    }
    
    setFilteredBets(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filters])

  // Get summary data for filtered bets
  const summaryData = getBetHistorySummary(filteredBets)
  
  // Get paginated bets for current page
  const paginatedBets = filteredBets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of table when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarContent>
        <AppHeader
          breadcrumbItems={[
            { label: "Betting History", isCurrentPage: true }
          ]}
        />
        
        {loading ? (
          <BetHistoryPageSkeleton />
        ) : (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">Betting History</h1>
              <p className="text-muted-foreground">
                Track your betting performance and history
              </p>
            </div>
            
            {/* Summary Cards */}
            <BetHistorySummary summaryData={summaryData} />
            
            {/* Filters */}
            <BetHistoryFilters onFilterChange={setFilters} />
            
            {/* Bet History Table/Cards */}
            {filteredBets.length === 0 ? (
              <div className="flex items-center justify-center h-40 bg-muted/30 rounded-lg">
                <div className="text-lg text-muted-foreground">No bets match your filters</div>
              </div>
            ) : isMobile ? (
              <BetHistoryCardList 
                bets={paginatedBets}
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={filteredBets.length}
                onPageChange={handlePageChange}
              />
            ) : (
              <BetHistoryTable 
                bets={paginatedBets}
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={filteredBets.length}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </SidebarContent>
    </SidebarProvider>
  )
}
