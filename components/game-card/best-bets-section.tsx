import { cn } from "@/lib/utils";
import { Bet } from "@/lib/bet-types";
import { BetItem } from "./bet-item";
import { ChevronRight } from "lucide-react";
import React from "react";

interface BestBetsSectionProps {
  bestBets: Bet[];
  isOnBestBetsPage: boolean;
}

/**
 * Component for rendering the best bets section of a game card
 * Shows a maximum of 2 bets with a "more bets" button if there are additional bets
 */
export function BestBetsSection({ bestBets, isOnBestBetsPage }: BestBetsSectionProps) {
  const hasBets = bestBets.length > 0;
  const hasMoreBets = bestBets.length > 2;
  const visibleBets = bestBets.slice(0, 2);
  const additionalBetsCount = bestBets.length - 2;
  
  return (
    <div className={cn(
      "bg-muted/30 p-4 border-t flex flex-col",
      "lg:h-[152px]" // Fixed height for consistency
    )}>
      {hasBets ? (
        <>
          {/* Header with Best Bets label and More Bets link */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs uppercase text-muted-foreground tracking-wider font-medium">
              {isOnBestBetsPage ? "Best Bet" : "Best Bets"}
            </h3>
            
            {/* "More Bets" link when there are additional bets */}
            {hasMoreBets && (
              <div className="text-xs font-medium uppercase text-muted-foreground flex items-center hover:text-primary transition-colors cursor-pointer">
                <span>+{additionalBetsCount} more</span>
                <ChevronRight className="h-3 w-3 ml-1 animate-throb" />
              </div>
            )}
          </div>
          
          {/* Bet items */}
          <div className="space-y-2 flex-grow">
            {visibleBets.map((bet, index) => (
              <BetItem key={bet.id || `bet-${index}`} bet={bet} index={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-muted-foreground mb-2 text-sm">No best bets available</p>
          <span className="text-primary flex items-center text-sm">
            View Analysis <span className="ml-1">→</span>
          </span>
        </div>
      )}
    </div>
  );
}
