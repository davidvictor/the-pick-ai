"use client"

import React from "react"
import { Bet, calculatePayout, getBetTypeDisplay, getBetDetailsDisplay } from "@/lib/bet-types"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { getLeagueDisplayName } from "@/lib/utils"
import { useState } from "react"
import { BetDetailsGrid } from "@/components/game-details/bet-details-grid"
import { isHighRatedBet } from "@/lib/bet-utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

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

interface BetHistoryTableProps {
  bets: Bet[]
  currentPage: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
}

export function BetHistoryTable({ 
  bets, 
  currentPage, 
  pageSize, 
  totalItems, 
  onPageChange 
}: BetHistoryTableProps) {
  const [expandedBetIndex, setExpandedBetIndex] = useState<number | null>(null);
  
  const toggleExpandBet = (index: number) => {
    setExpandedBetIndex(expandedBetIndex === index ? null : index);
  };
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

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>League</TableHead>
            <TableHead>Game</TableHead>
            <TableHead>Bet Type</TableHead>
            <TableHead>Bet Details</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Payout</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bets.map((bet, index) => (
            <React.Fragment key={bet.id || `bet-${index}`}>
              <TableRow 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => toggleExpandBet(index)}
              >
                <TableCell>{formatDate(bet.date)}</TableCell>
                <TableCell>
                  {bet.legs.length > 0 ? getLeagueDisplayName(bet.legs[0].league) : ''}
                </TableCell>
                <TableCell>
                  {bet.legs.length > 0 ? 
                    `${bet.legs[0].teams.away} @ ${bet.legs[0].teams.home}` : ''}
                </TableCell>
                <TableCell>{getBetTypeDisplay(bet)}</TableCell>
                <TableCell className="flex items-center gap-2">
                  {getBetDetailsDisplay(bet)}
                  {expandedBetIndex === index ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </TableCell>
                <TableCell>{bet.units}</TableCell>
                <TableCell>{getResultBadge(bet.result)}</TableCell>
                <TableCell className={bet.result === 'win' ? 'text-green-500 font-medium' : ''}>
                  {formatCurrency(calculatePayout(bet))}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {isHighRatedBet(bet.rating) && (
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    )}
                    <span className={isHighRatedBet(bet.rating) ? "text-amber-500 font-medium" : ""}>
                      {bet.rating}/10
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              
              {/* Expanded row for bet details */}
              {expandedBetIndex === index && (
                <TableRow>
                  <TableCell colSpan={9} className="bg-muted/30 p-4">
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
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="py-4 border-t">
          <Pagination className="justify-center md:justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(currentPage - 1)} 
                  disabled={currentPage === 1} 
                />
              </PaginationItem>
              
              {/* First page */}
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis if needed */}
              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              {/* Previous page if not first */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange(currentPage - 1)}>
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Current page (ghost button) */}
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>
              
              {/* Next page if not last */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange(currentPage + 1)}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis if needed */}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              {/* Last page */}
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(currentPage + 1)} 
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
