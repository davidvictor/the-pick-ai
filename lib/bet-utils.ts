import { Star } from "lucide-react";

/**
 * Determines if a bet is considered high-rated
 * @param rating The bet rating
 * @returns Boolean indicating if the bet is high-rated
 */
export function isHighRatedBet(rating: number): boolean {
  return rating >= 9;
}
