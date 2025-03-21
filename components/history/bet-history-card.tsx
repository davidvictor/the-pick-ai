"use client"

import { Bet, calculatePayout, getBetTypeDisplay, getBetDetailsDisplay } from "@/lib/bet-types"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { getLeagueDisplayName } from "@/lib/utils"
import { useState } from "react"
import { BetDetailsGrid } from "@/components/game-details/bet-details-grid"
import { isHighRatedBet } from "@/lib/bet-utils"

// Component to display a single leg of a multi-leg bet
function BetLegItem({ leg, index }: { leg: any, index: number }) {
  return (
    <div className="p-3 bg-muted/30 rounded-md mb-2">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">Leg {index + 1}: {leg.legType === 'moneyline' ? 'ML' : 
                                                       leg.legType === 'spread' ? 'Spread' : 
                                                       leg.legType === 'total' ? 'O/U' : 
                                                       leg.legType === 'prop' ? 'Prop' : ''}</div>
        <Badge variant="outline" className="text-xs">{getLeagueDisplayName(leg.league)}</Badge>
      </div>
      
      <div className="text-sm mb-1">
        <span className="text-muted-foreground">Game:</span> {leg.teams.away} @ {leg.teams.home}
      </div>
      
      <div className="text-sm mb-1">
        <span className="text-muted-foreground">Selection:</span> {leg.selection}
      </div>
      
      <div className="text-sm">
        <span className="text-muted-foreground">Odds:</span> {leg.odds > 0 ? `+${leg.odds}` : leg.odds}
      </div>
    </div>
  );
}

interface BetHistoryCardProps {
  bet: Bet
}

export function BetHistoryCard({ bet }: BetHistoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to get result badge
  const getResultBadge = (result: string) => {
    switch (result) {
      case 'win':
        return <Badge className="bg-green-500">Win</Badge>;
      case 'loss':
        return <Badge className="bg-red-500">Loss</Badge>;
      case 'push':
        return <Badge className="bg-yellow-500">Push</Badge>;
      case 'pending':
        return <Badge className="bg-blue-500">Pending</Badge>;
      default:
        return null;
    }
  };

  // Get the primary league and game for display
  const primaryLeague = bet.legs.length > 0 ? bet.legs[0].league : '';
  const primaryGame = bet.legs.length > 0 ? 
    `${bet.legs[0].teams.away} @ ${bet.legs[0].teams.home}` : '';

  return (
    <div className="bg-background rounded-lg border shadow-sm overflow-hidden mb-4">
      {/* Header with date, league, and result */}
      <div 
        className="flex items-center justify-between p-4 border-b cursor-pointer hover:bg-muted/50"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <div className="font-medium">{formatDate(bet.date)}</div>
          <div className="text-sm text-muted-foreground">
            {primaryLeague ? getLeagueDisplayName(primaryLeague) : ''}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getResultBadge(bet.result)}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>
      
      {/* Game and bet details */}
      <div 
        className="p-4 border-b cursor-pointer hover:bg-muted/50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="mb-2">
          <div className="text-sm text-muted-foreground">Game</div>
          <div>{primaryGame}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Bet Type</div>
            <div>{getBetTypeDisplay(bet)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Bet Details</div>
            <div>{getBetDetailsDisplay(bet)}</div>
          </div>
        </div>
      </div>
      
      {/* Financial details */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Units</div>
            <div>{bet.units}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Payout</div>
            <div className={bet.result === 'win' ? 'text-green-500 font-medium' : ''}>
              {formatCurrency(calculatePayout(bet))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Rating */}
      <div className="p-4 border-b">
        <div className="text-sm text-muted-foreground">Rating</div>
        <div className="flex items-center gap-1">
          {isHighRatedBet(bet.rating) && (
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          )}
          <span className={isHighRatedBet(bet.rating) ? "text-amber-500 font-medium" : ""}>
            {bet.rating}/10
          </span>
        </div>
      </div>
      
      {/* Expanded details section */}
      {expanded && (
        <div className="p-4 bg-muted/30">
          <div className="space-y-4">
            {/* Analytics Grid */}
            <BetDetailsGrid
              ev={bet.ev}
              confidence={bet.confidenceScore}
              units={bet.units}
              riskScore={bet.riskScore}
            />
            
            {/* Display legs for multi-leg bets */}
            {(bet.betType === 'parlay' || bet.betType === 'teaser') && bet.legs && bet.legs.length > 1 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Bet Legs</h4>
                {bet.legs.map((leg, legIndex) => (
                  <BetLegItem key={leg.id || `leg-${legIndex}`} leg={leg} index={legIndex} />
                ))}
              </div>
            )}
            
            {/* Rationale */}
            <div>
              <h4 className="text-sm font-medium mb-2">Rationale</h4>
              <div className="text-muted-foreground text-sm">
                {bet.rationale || "No explanation available for this bet."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

export function BetHistoryCardList({ 
  bets,
  currentPage,
  pageSize,
  totalItems,
  onPageChange
}: { 
  bets: Bet[]
  currentPage?: number
  pageSize?: number
  totalItems?: number
  onPageChange?: (page: number) => void
}) {
  // Calculate total pages if pagination props are provided
  const totalPages = currentPage && pageSize && totalItems 
    ? Math.max(1, Math.ceil(totalItems / pageSize))
    : 0;

  return (
    <div>
      <div className="space-y-4">
        {bets.map((bet, index) => (
          <BetHistoryCard key={bet.id || `bet-${index}`} bet={bet} />
        ))}
      </div>
      
      {/* Pagination for mobile */}
      {totalPages > 1 && (
        <div className="py-4 mt-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange?.(currentPage! - 1)} 
                  disabled={currentPage === 1} 
                />
              </PaginationItem>
              
              {/* Current page indicator */}
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange?.(currentPage! + 1)} 
                  disabled={currentPage === totalPages} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
