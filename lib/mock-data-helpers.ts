import { Bet, BetLeg, BetType, LegType, RiskLevel, BetResult } from "./bet-types";
import { League } from "@/services/api-types";
import { mockDataService } from "./mock";

/**
 * @fileoverview
 * 
 * Legacy bet conversion utilities for backward compatibility
 * and integration with older code.
 * 
 * New code should use the mockDataService and BetGenerator directly.
 */

/**
 * Helper function to parse old bet format to determine leg type
 * 
 * @param betType Old bet type string ('ML', 'Spread', 'O/U')
 * @returns Corresponding leg type
 */
function getLegTypeFromOldFormat(betType: string): LegType {
  switch (betType) {
    case "ML":
      return "moneyline";
    case "Spread":
      return "spread";
    case "O/U":
      return "total";
    default:
      return "moneyline";
  }
}

/**
 * Generate a unique ID for a bet
 * 
 * @param prefix Prefix for the ID
 * @returns Unique ID
 */
function generateBetId(prefix: string = "bet"): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Get risk score based on rating
 * 
 * @param rating Bet rating (1-10)
 * @returns Risk level
 */
function getRiskScore(rating: number): RiskLevel {
  if (rating >= 8) return "Low";
  if (rating >= 6) return "Medium";
  return "High";
}

/**
 * Generate expected value string
 * 
 * @param rating Bet rating (1-10)
 * @returns EV string
 */
function generateExpectedValue(rating: number): string {
  const baseEv = Math.random() * 5;
  const ratingBonus = rating * 0.5;
  return `+${(baseEv + ratingBonus).toFixed(1)}%`;
}

/**
 * Helper function to convert old bet format to new bet model
 * This function handles the legacy format used in mock-data.ts
 * 
 * @param oldBet Old bet object with type, bet, and rating properties
 * @param gameId Game ID
 * @param league Game league
 * @param teams Game teams
 * @returns New bet object
 */
export function convertLegacyBet(
  oldBet: { type: string, bet: string, rating: number },
  gameId: string,
  league: League,
  teams: { home: string, away: string }
): Bet {
  return convertToBetModel(oldBet.type, oldBet.bet, oldBet.rating, gameId, league, teams);
}

/**
 * Helper function to convert old bet format to new bet model
 * 
 * @param type Old bet type ('ML', 'Spread', 'O/U')
 * @param bet Old bet details string
 * @param rating Old bet rating
 * @param gameId Game ID
 * @param league Game league
 * @param teams Game teams
 * @returns New bet object
 */
export function convertToBetModel(
  type: string,
  bet: string,
  rating: number,
  gameId: string,
  league: League,
  teams: { home: string, away: string }
): Bet {
  // Get a bet generator instance from the mock data service
  const betGenerator = mockDataService.getBetGenerator();
  
  // If we have a bet generator, use it to create a proper bet
  if (betGenerator) {
    // Most of the time, we can just use the bet generator with the appropriate params
    return betGenerator.generateBet(
      gameId,
      league,
      teams,
      "straight", // Always straight bets for legacy conversion
      rating
    );
  }
  
  // Fallback legacy implementation (if for some reason we don't have a bet generator)
  const betId = generateBetId(`legacy-${type.toLowerCase()}`);
  
  // Default values
  const betType: BetType = "straight";
  const legType = getLegTypeFromOldFormat(type);
  const selection = bet;
  let line: number | null = null;
  let odds = -110; // Default odds
  let details: any = {};
  
  // Parse details based on bet string
  const parts = bet.split(" ");
  if (type === "ML" && parts.length > 1) {
    // Moneyline bet
    const team = parts[0];
    odds = parseInt(parts[1] || "-110");
    details = { team };
  } 
  else if (type === "Spread" && parts.length > 1) {
    // Spread bet
    const team = parts[0];
    line = parseFloat(parts[1] || "0");
    details = {
      team,
      points: Math.abs(line)
    };
  } 
  else if (type === "O/U" && parts.length > 1) {
    // Total bet
    const overUnder = parts[0].toLowerCase() === "o" ? "over" : "under";
    line = parseFloat(parts[1] || "0");
    details = {
      type: overUnder,
      points: line
    };
  }
  
  // Create the bet leg
  const betLeg: BetLeg = {
    id: `leg-${betId}`,
    legType,
    gameId,
    league,
    teams,
    selection,
    line,
    odds,
    result: "pending",
    details
  };
  
  // Create the bet
  return {
    id: betId,
    date: new Date().toISOString().split('T')[0],
    units: 1,
    odds,
    result: "pending",
    rating,
    betType,
    ev: generateExpectedValue(rating),
    riskScore: getRiskScore(rating),
    confidenceScore: rating,
    rationale: `This is a ${rating}/10 rated bet on ${selection}.`,
    legs: [betLeg]
  };
}

/**
 * Convert old bestBets array to new format
 * 
 * @param oldBets Array of old bet objects
 * @param gameId Game ID
 * @param league Game league
 * @param teams Game teams
 * @returns Array of new bet objects
 */
export function convertBestBets(
  oldBets: Array<{ type: string, bet: string, rating: number }>,
  gameId: string,
  league: League,
  teams: { home: string, away: string }
): Bet[] {
  return oldBets.map(oldBet => 
    convertToBetModel(oldBet.type, oldBet.bet, oldBet.rating, gameId, league, teams)
  );
}

/**
 * @deprecated Use the BetGenerator directly
 */
export function createParlayBet(
  legs: BetLeg[],
  rating: number,
  odds: number
): Bet {
  return {
    id: generateBetId("parlay"),
    date: new Date().toISOString().split('T')[0],
    units: 0.5,
    odds,
    result: "pending",
    rating,
    betType: "parlay",
    ev: generateExpectedValue(rating),
    riskScore: "High",
    confidenceScore: rating,
    rationale: `This is a ${rating}/10 rated ${legs.length}-leg parlay combining strong plays across different bet types.`,
    legs
  };
}

/**
 * @deprecated Use the BetGenerator directly
 */
export function createTeaserBet(
  legs: BetLeg[],
  rating: number,
  odds: number
): Bet {
  const teaserPoints = legs[0]?.line || 6;
  
  return {
    id: generateBetId("teaser"),
    date: new Date().toISOString().split('T')[0],
    units: 1,
    odds,
    result: "pending",
    rating,
    betType: "teaser",
    ev: generateExpectedValue(rating),
    riskScore: "Medium",
    confidenceScore: rating,
    rationale: `This is a ${rating}/10 rated ${legs.length}-leg teaser with ${teaserPoints} points of teasing, crossing key numbers to increase the probability of winning.`,
    legs
  };
}
