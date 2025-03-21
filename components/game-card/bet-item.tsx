import { Star } from "lucide-react";
import { Bet, getBetTypeDisplay, getBetDetailsDisplay } from "@/lib/bet-types";
import { isHighRatedBet } from "@/lib/bet-utils";

interface BetItemProps {
  bet: Bet;
  index: number;
}

/**
 * Component for rendering an individual bet item
 */
export function BetItem({ bet, index }: BetItemProps) {
  // Determine if this is a high-rated bet
  const isHighRated = isHighRatedBet(bet.rating);
  
  return (
    <div 
      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors h-[42px]"
    >
      <div>
        <div className="font-medium text-sm">
          {getBetTypeDisplay(bet)}
        </div>
        <div className="text-xs text-muted-foreground">
          {getBetDetailsDisplay(bet)}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {isHighRated && (
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
        )}
        <span className={`pl-1 font-medium text-xs`}>
          {bet.rating}/10
        </span>
      </div>
    </div>
  );
}
