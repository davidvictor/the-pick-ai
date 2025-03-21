import { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { BetDetailsGrid } from "./bet-details-grid";
import { Bet, BetLeg, getBetTypeDisplay, getBetDetailsDisplay } from "@/lib/bet-types";
import { getLeagueDisplayName } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { League } from "@/services/api-types";

interface BestBetsSectionProps {
  bets: Bet[];
  gameId?: string;
  league?: League;
  teams?: { home: string, away: string };
}

// Component to display a single leg of a multi-leg bet
function BetLegItem({ leg, index }: { leg: BetLeg, index: number }) {
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

export function BestBetsSection({ bets, gameId = "unknown", league = "NFL", teams = { home: "Home Team", away: "Away Team" } }: BestBetsSectionProps) {
  // Initialize with all bets open by default
  const [openBets, setOpenBets] = useState<Set<number>>(() => {
    const initialOpenBets = new Set<number>();
    // Add all bet indices to the set
    for (let i = 0; i < bets.length; i++) {
      initialOpenBets.add(i);
    }
    return initialOpenBets;
  });

  // Helper function to check if a bet is open
  const isBetOpen = (index: number) => openBets.has(index);

  // Toggle function to add/remove from the Set
  const toggleBet = (index: number) => {
    const newOpenBets = new Set(openBets);
    if (newOpenBets.has(index)) {
      newOpenBets.delete(index);
    } else {
      newOpenBets.add(index);
    }
    setOpenBets(newOpenBets);
  };

  return (
    <div className="bg-background mb-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Best Bets</h2>
      {bets.length > 0 ? (
        <div className="space-y-4">
          {bets.map((bet, index) => {
            const normalizedBet = bet;
            
            // Determine if this is a high-rated bet
            const isHighRated = normalizedBet.rating >= 9;
            
            return (
              <div key={normalizedBet.id || `bet-${index}`} className="border rounded-lg">
                <div 
                  className={`flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors cursor-pointer ${isBetOpen(index) ? 'bg-muted' : ''}`}
                  onClick={() => toggleBet(index)}
                >
                  <div className="font-medium">
                    {getBetTypeDisplay(normalizedBet)}: {getBetDetailsDisplay(normalizedBet)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {isHighRated && (
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      )}
                      <span className={isHighRated ? "text-amber-500 font-medium" : ""}>
                        {normalizedBet.rating}/10
                      </span>
                    </div>
                    {isBetOpen(index) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
                {isBetOpen(index) && (
                  <div className="p-4 pt-0 border-t">
                    <BetDetailsGrid
                      ev={normalizedBet.ev}
                      confidence={normalizedBet.confidenceScore}
                      units={normalizedBet.units}
                      riskScore={normalizedBet.riskScore}
                    />
                    
                    {/* Display legs for multi-leg bets */}
                    {(normalizedBet.betType === 'parlay' || normalizedBet.betType === 'teaser') && normalizedBet.legs && normalizedBet.legs.length > 1 && (
                      <div className="mt-4 mb-4">
                        <h4 className="text-sm font-medium mb-2">Bet Legs</h4>
                        {normalizedBet.legs.map((leg, legIndex) => (
                          <BetLegItem key={leg.id || `leg-${legIndex}`} leg={leg} index={legIndex} />
                        ))}
                      </div>
                    )}
                    
                    <div className="text-muted-foreground mt-4">
                      {normalizedBet.rationale || "No explanation available for this bet."}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-muted-foreground">No best bets available for this game.</div>
      )}
    </div>
  );
}
