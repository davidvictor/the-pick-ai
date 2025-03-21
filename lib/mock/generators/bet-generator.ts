import { Bet, BetLeg, BetType, LegType, RiskLevel, BetResult } from "@/lib/bet-types";
import { League } from "@/services/api-types";
import { mockDataConfig, getCustomConfig } from "../config";
import { IBetGenerator, IBetGeneratorImpl, IMockDataConfig } from "../types";

/**
 * Bet detail types to improve type safety
 */
interface MoneylineDetails {
  team: string;
}

interface SpreadDetails {
  team: string;
  points: number;
}

interface TotalDetails {
  type: "over" | "under";
  points: number;
}

/**
 * Class for generating mock bets
 * This class provides functionality for generating different types of bets
 */
export class BetGenerator implements IBetGeneratorImpl {
  /**
   * Configuration for the mock data generation
   */
  protected config: IMockDataConfig;
  
  /**
   * Constructor
   * @param config Optional custom configuration
   */
  constructor(config?: IMockDataConfig) {
    this.config = config || mockDataConfig;
  }
  
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
    rating: number = this.config.defaults.defaultRating
  ): Bet {
    // Use strategy pattern to generate the appropriate bet type
    switch(betType) {
      case "parlay":
        return this.generateParlayBet(gameId, league, teams, rating);
      case "teaser":
        return this.generateTeaserBet(gameId, league, teams, rating);
      default:
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
  generateStraightBet(
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
    const betId = this.generateBetId(gameId, "straight", legType);
    
    // Risk score based on rating
    const riskScore = this.calculateRiskScore(rating);
    
    // Create bet
    return {
      id: betId,
      date: this.getCurrentDate(),
      units: this.getRandomUnits(),
      odds: leg.odds,
      result: "pending",
      rating,
      betType: "straight",
      ev: this.generateExpectedValue(rating),
      riskScore,
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
  generateParlayBet(
    gameId: string, 
    league: League, 
    teams: { home: string, away: string },
    rating: number
  ): Bet {
    // Generate 2-3 legs
    const legCount = Math.floor(Math.random() * 2) + 2;
    const legs: BetLeg[] = [];
    
    // Generate different leg types for variety
    const legTypes: LegType[] = ["moneyline", "spread", "total"];
    
    for (let i = 0; i < legCount; i++) {
      // Select a leg type, ensuring we don't use the same type twice in a row
      const legType = legTypes[i % legTypes.length];
      const leg = this.generateLeg(legType, gameId, league, teams);
      legs.push(leg);
    }
    
    // Calculate parlay odds - higher for more legs
    const parlayOdds = 100 + (Math.floor(Math.random() * 200) + 100) * legCount;
    
    // Generate bet ID
    const betId = this.generateBetId(gameId, "parlay");
    
    // Create bet - parlays are always high risk
    return {
      id: betId,
      date: this.getCurrentDate(),
      units: 0.5, // Lower units for parlays
      odds: parlayOdds,
      result: "pending",
      rating,
      betType: "parlay",
      ev: `+${(Math.random() * 5 + 2).toFixed(1)}%`, // Higher EV due to higher odds
      riskScore: "High",
      confidenceScore: rating,
      rationale: `This is a ${rating}/10 rated ${legCount}-leg parlay combining strong plays across different bet types. Each leg has been carefully selected to maximize the potential payout while maintaining a reasonable chance of success.`,
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
  generateTeaserBet(
    gameId: string, 
    league: League, 
    teams: { home: string, away: string },
    rating: number
  ): Bet {
    // Generate 2 spread legs
    const legs: BetLeg[] = [];
    const teaserPoints = league === "NFL" ? 6 : 4.5; // Different teaser points by sport
    
    for (let i = 0; i < 2; i++) {
      const leg = this.generateLeg("spread", gameId, league, teams);
      
      // Get the spread details with proper typing
      const details = leg.details as SpreadDetails;
      
      // Adjust the line for teaser
      const teasedPoints = details.points + teaserPoints;
      leg.line = teasedPoints;
      leg.selection = `${details.team} ${teasedPoints > 0 ? '+' : ''}${teasedPoints}`;
      (leg.details as SpreadDetails).points = teasedPoints;
      
      legs.push(leg);
    }
    
    // Teaser odds are typically around -110
    const teaserOdds = -110;
    
    // Generate bet ID
    const betId = this.generateBetId(gameId, "teaser");
    
    // Create bet - teasers are medium risk
    return {
      id: betId,
      date: this.getCurrentDate(),
      units: 1,
      odds: teaserOdds,
      result: "pending",
      rating,
      betType: "teaser",
      ev: `+${(Math.random() * 7).toFixed(1)}%`,
      riskScore: "Medium",
      confidenceScore: rating,
      rationale: `This is a ${rating}/10 rated 2-team teaser with ${teaserPoints} points of teasing, crossing key numbers to increase the probability of winning. Teasing through key numbers of 3 and 7 provides significant value.`,
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
  generateLeg(
    legType: LegType, 
    gameId: string, 
    league: League, 
    teams: { home: string, away: string }
  ): BetLeg {
    const legId = `leg-${gameId}-${legType}-${Math.floor(Math.random() * 1000)}`;
    let selection = "";
    let line: number | null = null;
    let odds = this.config.defaults.defaultOdds;
    
    // Handle different leg types with proper type safety
    if (legType === "moneyline") {
      // Create moneyline leg
      const team = Math.random() > 0.5 ? teams.home : teams.away;
      odds = Math.random() > 0.5 ? 
        -Math.floor(Math.random() * 200) - 100 : 
        Math.floor(Math.random() * 200) + 100;
      
      selection = `${team} ${odds > 0 ? '+' : ''}${odds}`;
      
      const details: MoneylineDetails = { team };
      
      return {
        id: legId,
        legType,
        gameId,
        league,
        teams,
        selection,
        line: null, // Moneylines don't have a line
        odds,
        result: "pending" as BetResult,
        details
      };
    } 
    else if (legType === "spread") {
      // Create spread leg
      const team = Math.random() > 0.5 ? teams.home : teams.away;
      const points = (Math.floor(Math.random() * 14) + 1) * 0.5;
      line = points;
      selection = `${team} ${points > 0 ? '+' : ''}${points}`;
      
      const details: SpreadDetails = { team, points };
      
      return {
        id: legId,
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
    } 
    else if (legType === "total") {
      // Create total leg
      // League-specific totals
      let points = 0;
      if (league === "NFL" || league === "NCAAF") {
        points = Math.floor(Math.random() * 20) + 40;
      } else if (league === "NBA" || league === "NCAAB") {
        points = Math.floor(Math.random() * 40) + 200;
      } else {
        points = Math.floor(Math.random() * 10) + 5;
      }
      
      const type = Math.random() > 0.5 ? "over" : "under";
      line = points;
      selection = `${type === "over" ? "Over" : "Under"} ${points}`;
      
      const details: TotalDetails = { type, points };
      
      return {
        id: legId,
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
    }
    
    // This should never happen, but TypeScript requires a return
    throw new Error(`Unsupported leg type: ${legType}`);
  }
  
  /**
   * Generate a bet ID
   * @param gameId Game ID
   * @param betType Bet type
   * @param legType Optional leg type for straight bets
   * @returns Bet ID
   */
  generateBetId(gameId: string, betType: BetType, legType?: LegType): string {
    const random = Math.floor(Math.random() * 10000);
    return legType ? 
      `${betType}-${gameId}-${legType}-${random}` : 
      `${betType}-${gameId}-${random}`;
  }
  
  /**
   * Get the current date in YYYY-MM-DD format
   * @returns Current date string
   */
  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  /**
   * Get random units based on bet frequency
   * @returns Units value
   */
  getRandomUnits(): number {
    // 70% chance of 1 unit, 20% chance of 2 units, 10% chance of 0.5 units
    const rand = Math.random();
    if (rand < 0.7) return 1;
    if (rand < 0.9) return 2;
    return 0.5;
  }
  
  /**
   * Generate expected value string
   * @param rating Bet rating
   * @returns EV string
   */
  generateExpectedValue(rating: number): string {
    // Higher ratings correlate with higher expected value
    const ev = (Math.random() * 5) + (rating * 0.5);
    return `+${ev.toFixed(1)}%`;
  }
  
  /**
   * Calculate risk score based on rating
   * @param rating Bet rating
   * @returns Risk level
   */
  calculateRiskScore(rating: number): RiskLevel {
    if (rating >= 8) return "Low";
    if (rating >= 6) return "Medium";
    return "High";
  }
  
  /**
   * Generate a rationale for a bet
   * @param leg Bet leg
   * @param rating Bet rating
   * @returns Rationale string
   */
  generateRationale(leg: BetLeg, rating: number): string {
    const rationales = [
      `This ${rating}/10 rated bet is based on recent team performance and statistical analysis.`,
      `Our models show a ${(Math.random() * 15 + 5).toFixed(1)}% edge on this ${leg.legType} bet.`,
      `Historical trends strongly favor this bet, with a similar situation hitting in 7 of the last 10 matchups.`,
      `Weather conditions and key player matchups create a favorable situation for this bet.`,
      `Line movement analysis indicates sharp money on this side, supporting our model's projection.`,
      `A detailed film study revealed matchup advantages that the current line doesn't account for.`,
      `Tracking reverse line movement shows the sharp bettors are on this side despite public money going the other way.`
    ];
    
    return rationales[Math.floor(Math.random() * rationales.length)];
  }
}
