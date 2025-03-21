import { Bet, BetLeg, BetType, LegType, RiskLevel, BetResult } from "./bet-types";
import { League } from "@/services/api-types";

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
  // Generate a unique ID for the bet
  const betId = `bet-${gameId}-${oldBet.type}-${Math.floor(Math.random() * 1000)}`;
  
  // Default values
  let betType: BetType = "straight";
  let legType: LegType = "moneyline"; // Default leg type
  let selection = oldBet.bet;
  let line: number | null = null;
  let odds = -110; // Default odds
  let details: any = {};
  
  // Parse the bet details based on type
  if (oldBet.type === "ML") {
    legType = "moneyline";
    
    // Extract team and odds from bet string (e.g., "Dolphins -120")
    const parts = oldBet.bet.split(" ");
    const team = parts[0];
    if (parts.length > 1) {
      odds = parseInt(parts[1]);
    }
    
    details = {
      team
    };
  } else if (oldBet.type === "Spread") {
    legType = "spread";
    
    // Extract team and points from bet string (e.g., "Dolphins -2.5")
    const parts = oldBet.bet.split(" ");
    const team = parts[0];
    if (parts.length > 1) {
      line = parseFloat(parts[1]);
      details = {
        team,
        points: Math.abs(line)
      };
    }
  } else if (oldBet.type === "O/U") {
    legType = "total";
    
    // Extract over/under and points from bet string (e.g., "o 44.0")
    const parts = oldBet.bet.split(" ");
    const overUnder = parts[0].toLowerCase() === "o" ? "over" : "under";
    if (parts.length > 1) {
      line = parseFloat(parts[1]);
    }
    
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
    result: "pending" as BetResult,
    details
  };
  
  // Create the bet
  const newBet: Bet = {
    id: betId,
    date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    units: 1,
    odds,
    result: "pending" as BetResult,
    rating: oldBet.rating,
    betType,
    ev: `+${(Math.random() * 10).toFixed(1)}%`, // Random EV
    riskScore: oldBet.rating >= 8 ? "Low" : oldBet.rating >= 6 ? "Medium" : "High",
    confidenceScore: oldBet.rating,
    rationale: `This is a ${oldBet.rating}/10 rated bet on ${selection}.`,
    legs: [betLeg]
  };
  
  return newBet;
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
  // Generate a unique ID for the bet
  const betId = `bet-${gameId}-${type}-${Math.floor(Math.random() * 1000)}`;
  
  // Default values
  let betType: BetType = "straight";
  let legType: LegType = "moneyline"; // Default leg type
  let selection = bet;
  let line: number | null = null;
  let odds = -110; // Default odds
  let details: any = {};
  
  // Parse the bet details based on type
  if (type === "ML") {
    legType = "moneyline";
    
    // Extract team and odds from bet string (e.g., "Dolphins -120")
    const parts = bet.split(" ");
    const team = parts[0];
    if (parts.length > 1) {
      odds = parseInt(parts[1]);
    }
    
    details = {
      team
    };
  } else if (type === "Spread") {
    legType = "spread";
    
    // Extract team and points from bet string (e.g., "Dolphins -2.5")
    const parts = bet.split(" ");
    const team = parts[0];
    if (parts.length > 1) {
      line = parseFloat(parts[1]);
      details = {
        team,
        points: Math.abs(line)
      };
    }
  } else if (type === "O/U") {
    legType = "total";
    
    // Extract over/under and points from bet string (e.g., "o 44.0")
    const parts = bet.split(" ");
    const overUnder = parts[0].toLowerCase() === "o" ? "over" : "under";
    if (parts.length > 1) {
      line = parseFloat(parts[1]);
    }
    
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
  const newBet: Bet = {
    id: betId,
    date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    units: 1,
    odds,
    result: "pending",
    rating,
    betType,
    ev: `+${(Math.random() * 10).toFixed(1)}%`, // Random EV
    riskScore: rating >= 8 ? "Low" : rating >= 6 ? "Medium" : "High",
    confidenceScore: rating,
    rationale: `This is a ${rating}/10 rated bet on ${selection}.`,
    legs: [betLeg]
  };
  
  return newBet;
}

/**
 * Example of converting old bestBets array to new format
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
 * Example of creating a parlay bet
 */
export function createParlayBet(
  legs: BetLeg[],
  rating: number,
  odds: number
): Bet {
  return {
    id: `parlay-${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString().split('T')[0],
    units: 0.5,
    odds,
    result: "pending",
    rating,
    betType: "parlay",
    ev: `+${(Math.random() * 5).toFixed(1)}%`,
    riskScore: "High",
    confidenceScore: rating,
    rationale: `This is a ${rating}/10 rated ${legs.length}-leg parlay.`,
    legs
  };
}

/**
 * Example of creating a teaser bet
 */
export function createTeaserBet(
  legs: BetLeg[],
  rating: number,
  odds: number
): Bet {
  return {
    id: `teaser-${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString().split('T')[0],
    units: 1,
    odds,
    result: "pending",
    rating,
    betType: "teaser",
    ev: `+${(Math.random() * 7).toFixed(1)}%`,
    riskScore: "Medium",
    confidenceScore: rating,
    rationale: `This is a ${rating}/10 rated ${legs.length}-leg teaser with ${legs[0].line} points of teasing.`,
    legs
  };
}
