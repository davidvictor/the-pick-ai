import { League } from "@/services/api-types";

// Types for bet results
export type BetResult = 'win' | 'loss' | 'push' | 'pending';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type BetType = 'straight' | 'parlay' | 'teaser';
export type LegType = 'moneyline' | 'spread' | 'total' | 'prop';

// Legacy bet format (for backward compatibility)
export interface LegacyBet {
  type: string;
  bet: string;
  rating: number;
}

// Main bet interface
export interface Bet {
  id: string;
  date: string;
  units: number;
  odds: number;
  result: BetResult;
  rating: number;
  betType: BetType;
  ev: number | string;
  riskScore: RiskLevel;
  confidenceScore: number;
  rationale: string;
  legs: BetLeg[];
}

// Bet leg interface
export interface BetLeg {
  id: string;
  legType: LegType;
  gameId: string;
  league: League;
  teams: {
    home: string;
    away: string;
  };
  selection: string;
  line: number | null;
  odds: number;
  result: BetResult;
  details: MoneylineLegDetails | SpreadLegDetails | TotalLegDetails | PropLegDetails;
}

// Leg details interfaces
export interface MoneylineLegDetails {
  team: string;
}

export interface SpreadLegDetails {
  team: string;
  points: number;
}

export interface TotalLegDetails {
  type: 'over' | 'under';
  points: number;
}

export interface PropLegDetails {
  player: string;
  propType: string;
  line: number;
  type: 'over' | 'under';
}

// Helper function to calculate profit/loss
export function calculateProfitLoss(bet: Bet): number {
  if (bet.result === 'pending' || bet.result === 'push') {
    return 0;
  }
  
  const unitSize = 100; // Assuming $100 per unit, can be configurable
  
  if (bet.result === 'win') {
    if (bet.odds > 0) {
      // Positive American odds (e.g., +150)
      return (bet.odds / 100) * bet.units * unitSize;
    } else {
      // Negative American odds (e.g., -120)
      return (100 / Math.abs(bet.odds)) * bet.units * unitSize;
    }
  } else {
    // Loss
    return -1 * bet.units * unitSize;
  }
}

// Helper function to calculate payout
export function calculatePayout(bet: Bet): number {
  const unitSize = 100; // Assuming $100 per unit
  
  if (bet.result === 'win') {
    if (bet.odds > 0) {
      // Positive American odds (e.g., +150)
      return (bet.odds / 100) * bet.units * unitSize + (bet.units * unitSize);
    } else {
      // Negative American odds (e.g., -120)
      return (100 / Math.abs(bet.odds)) * bet.units * unitSize + (bet.units * unitSize);
    }
  } else if (bet.result === 'push') {
    return bet.units * unitSize;
  } else {
    return 0;
  }
}

// Helper function to get bet type display
export function getBetTypeDisplay(bet: Bet): string {
  if (!bet) return '';
  
  if (bet.betType === 'parlay') return 'Parlay';
  if (bet.betType === 'teaser') return 'Teaser';
  
  // For straight bets, show the leg type
  if (bet.legs && bet.legs.length > 0) {
    const legType = bet.legs[0].legType;
    return legType === 'moneyline' ? 'ML' : 
           legType === 'spread' ? 'Spread' : 
           legType === 'total' ? 'O/U' : 
           legType === 'prop' ? 'Prop' : '';
  }
  
  return '';
}

// Helper function to get bet details display
export function getBetDetailsDisplay(bet: Bet): string {
  if (!bet) return '';
  
  if (bet.betType === 'parlay' || bet.betType === 'teaser') {
    if (!bet.legs || bet.legs.length === 0) return bet.betType;
    
    // For multi-leg bets, show the number of legs
    if (bet.legs.length > 1) {
      return `${bet.legs.length} Leg ${bet.betType}`;
    }
    
    // For single-leg bets (which shouldn't really happen for parlays/teasers),
    // show the selection of the single leg
    return bet.legs[0].selection;
  }
  
  // For straight bets, show the selection of the leg
  if (bet.legs && bet.legs.length > 0) {
    return bet.legs[0].selection;
  }
  
  return '';
}
