import { Bet, BetLeg, BetType, LegType, RiskLevel } from "@/lib/bet-types";
import { League } from "@/services/api-types";
import { mockDataConfig } from "../config";

/**
 * Class for generating mock bets
 * This class provides functionality for generating different types of bets
 */
export class BetGenerator {
  /**
   * Configuration for the mock data generation
   */
  protected config = mockDataConfig;
  
  /**
   * Generate a bet of the specified type
   * @param gameId Game ID
   * @param league League identifier
   * @param teams Team names
   * @param betType Type of bet to generate
   * @param rating Rating for the bet (1-10)
   * @returns Generated bet
   */
  generateBet(
    gameId: string, 
    league: League, 
    teams: { home: string, away: string }, 
    betType: BetType = "straight",
    rating: number = 7
  ): Bet {
    if (betType === "parlay") {
      return this.generateParlayBet(gameId, league, teams, rating);
    } else if (betType === "teaser") {
      return this.generateTeaserBet(gameId, league, teams, rating);
    } else {
      return this.generateStraightBet(gameId, league, teams, rating);
    }
  }
  
  /**
   * Generate a straight bet
   * @param gameId Game ID
   * @param league League identifier
   * @param teams Team names
   * @param rating Rating for the bet (1-10)
   * @returns Generated straight bet
   */
  private generateStraightBet(
    gameId: string, 
    league: League, 
    teams: { home: string, away: string },
    rating: number
  ): Bet {
    // Randomly select leg type
    const legTypes: LegType[] = ["moneyline", "spread", "total"];
    const legType = legTypes[Math.floor(Math.random() * legTypes.length)];
    
    // Generate leg based on type
    const leg = this.generateLeg(legType, gameId, league, teams);
    
    // Generate bet ID
    const betId = `bet-${gameId}-${legType}-${Math.floor(Math.random() * 1000)}`;
    
    // Create bet
    return {
      id: betId,
      date: new Date().toISOString().split('T')[0],
      units: Math.random() > 0.7 ? 2 : 1,
      odds: leg.odds,
      result: "pending",
      rating,
      betType: "straight",
      ev: `+${(Math.random() * 10).toFixed(1)}%`,
      riskScore: rating >= 8 ? "Low" : rating >= 6 ? "Medium" : "High",
      confidenceScore: rating,
      rationale: this.generateRationale(leg, rating),
      legs: [leg]
    };
  }
  
  /**
   * Generate a parlay bet
   * @param gameId Game ID
   * @param league League identifier
   * @param teams Team names
   * @param rating Rating for the bet (1-10)
   * @returns Generated parlay bet
   */
  private generateParlayBet(
    gameId: string, 
    league: League, 
    teams: { home: string, away: string },
    rating: number
  ): Bet {
    // Generate 2-3 legs
    const legCount = Math.floor(Math.random() * 2) + 2;
    const legs: BetLeg[] = [];
    
    for (let i = 0; i < legCount; i++) {
      // For simplicity, use the same game for all legs in this example
      // In a real implementation, you'd generate different games
      const legType = i === 0 ? "moneyline" : i === 1 ? "total" : "spread";
      const leg = this.generateLeg(legType, gameId, league, teams);
      legs.push(leg);
    }
    
    // Calculate parlay odds (simplified)
    const parlayOdds = Math.floor(Math.random() * 500) + 200;
    
    // Generate bet ID
    const betId = `parlay-${gameId}-${Math.floor(Math.random() * 1000)}`;
    
    // Create bet
    return {
      id: betId,
      date: new Date().toISOString().split('T')[0],
      units: 0.5,
      odds: parlayOdds,
      result: "pending",
      rating,
      betType: "parlay",
      ev: `+${(Math.random() * 5).toFixed(1)}%`,
      riskScore: "High",
      confidenceScore: rating,
      rationale: `This is a ${rating}/10 rated ${legCount}-leg parlay combining strong plays across different bet types.`,
      legs
    };
  }
  
  /**
   * Generate a teaser bet
   * @param gameId Game ID
   * @param league League identifier
   * @param teams Team names
   * @param rating Rating for the bet (1-10)
   * @returns Generated teaser bet
   */
  private generateTeaserBet(
    gameId: string, 
    league: League, 
    teams: { home: string, away: string },
    rating: number
  ): Bet {
    // Generate 2 spread legs
    const legs: BetLeg[] = [];
    
    for (let i = 0; i < 2; i++) {
      const leg = this.generateLeg("spread", gameId, league, teams);
      // Adjust the line for teaser (e.g., add 6 points)
      const teasedPoints = (leg.details as any).points + 6;
      leg.line = teasedPoints;
      leg.selection = `${(leg.details as any).team} ${teasedPoints > 0 ? '+' : ''}${teasedPoints}`;
      (leg.details as any).points = teasedPoints;
      legs.push(leg);
    }
    
    // Teaser odds are typically around -110
    const teaserOdds = -110;
    
    // Generate bet ID
    const betId = `teaser-${gameId}-${Math.floor(Math.random() * 1000)}`;
    
    // Create bet
    return {
      id: betId,
      date: new Date().toISOString().split('T')[0],
      units: 1,
      odds: teaserOdds,
      result: "pending",
      rating,
      betType: "teaser",
      ev: `+${(Math.random() * 7).toFixed(1)}%`,
      riskScore: "Medium",
      confidenceScore: rating,
      rationale: `This is a ${rating}/10 rated 2-team teaser with 6 points of teasing, crossing key numbers to increase the probability of winning.`,
      legs
    };
  }
  
  /**
   * Generate a bet leg
   * @param legType Type of leg to generate
   * @param gameId Game ID
   * @param league League identifier
   * @param teams Team names
   * @returns Generated bet leg
   */
  private generateLeg(
    legType: LegType, 
    gameId: string, 
    league: League, 
    teams: { home: string, away: string }
  ): BetLeg {
    const legId = `leg-${gameId}-${legType}-${Math.floor(Math.random() * 1000)}`;
    let selection = "";
    let line: number | null = null;
    let odds = -110;
    let details: any = {};
    
    if (legType === "moneyline") {
      const team = Math.random() > 0.5 ? teams.home : teams.away;
      odds = Math.random() > 0.5 ? -Math.floor(Math.random() * 200) - 100 : Math.floor(Math.random() * 200) + 100;
      selection = `${team} ${odds > 0 ? '+' : ''}${odds}`;
      details = { team };
    } else if (legType === "spread") {
      const team = Math.random() > 0.5 ? teams.home : teams.away;
      const points = (Math.floor(Math.random() * 14) + 1) * 0.5;
      line = points;
      selection = `${team} ${points > 0 ? '+' : ''}${points}`;
      details = { team, points };
    } else if (legType === "total") {
      const points = Math.floor(Math.random() * 20) + 40;
      const type = Math.random() > 0.5 ? "over" : "under";
      line = points;
      selection = `${type === "over" ? "Over" : "Under"} ${points}`;
      details = { type, points };
    }
    
    return {
      id: legId,
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
  }
  
  /**
   * Generate a rationale for a bet
   * @param leg Bet leg
   * @param rating Bet rating
   * @returns Rationale string
   */
  private generateRationale(leg: BetLeg, rating: number): string {
    const rationales = [
      `This ${rating}/10 rated bet is based on recent team performance and statistical analysis.`,
      `Our models show a ${(Math.random() * 15 + 5).toFixed(1)}% edge on this ${leg.legType} bet.`,
      `Historical trends strongly favor this bet, with a similar situation hitting in 7 of the last 10 matchups.`,
      `Weather conditions and key player matchups create a favorable situation for this bet.`,
      `Line movement analysis indicates sharp money on this side, supporting our model's projection.`
    ];
    
    return rationales[Math.floor(Math.random() * rationales.length)];
  }
}
