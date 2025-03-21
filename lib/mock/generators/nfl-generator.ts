import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { GameGenerator } from "./game-generator";
import { BetGenerator } from "./bet-generator";
import { NFL_TEAMS } from "../data/teams/nfl";
import { mockDataConfig } from "../config";
import { Bet } from "@/lib/bet-types";
import { IBetGenerator, IMockDataConfig } from "../types";

/**
 * NFL game generator
 * This class generates mock NFL games
 */
export class NFLGameGenerator extends GameGenerator {
  /**
   * Bet generator instance
   */
  private betGenerator: IBetGenerator;
  
  /**
   * Constructor
   * @param betGenerator Bet generator instance
   * @param config Optional custom configuration
   */
  constructor(betGenerator: IBetGenerator, config?: IMockDataConfig) {
    super(config);
    this.betGenerator = betGenerator;
  }
  
  /**
   * Generate a specified number of NFL games
   * @param count Number of games to generate
   * @returns Array of NFL game data
   */
  generateGames(count: number): GameCardProps[] {
    const games: GameCardProps[] = [];
    const teams = [...NFL_TEAMS];
    
    for (let i = 0; i < count; i++) {
      // Select two random teams
      const homeIndex = Math.floor(Math.random() * teams.length);
      const homeTeam = teams[homeIndex];
      
      // Remove home team to avoid duplicates
      teams.splice(homeIndex, 1);
      
      const awayIndex = Math.floor(Math.random() * teams.length);
      const awayTeam = teams[awayIndex];
      
      // Put home team back for next iteration
      teams.push(homeTeam);
      
      // Generate game ID
      const gameId = this.generateGameId("NFL", i);
      
      // Generate spread
      const spreadValue = this.generateRandomSpread() * (Math.random() > 0.5 ? 1 : -1);
      const spreadTeam = spreadValue < 0 ? homeTeam.name : awayTeam.name;
      
      // Generate over/under
      const overUnder = this.generateRandomOverUnder("NFL");
      
      // Generate money line
      const favoredTeam = Math.random() > 0.5 ? homeTeam : awayTeam;
      const moneyLine = this.generateRandomMoneyLine(true);
      
      // Generate random date and time
      const date = this.generateRandomDate(
        mockDataConfig.dateRanges.NFL.start,
        mockDataConfig.dateRanges.NFL.end
      );
      const time = this.generateRandomTime();
      const timezone = this.generateRandomTimezone();
      
      // Generate random network
      const network = this.generateRandomNetwork("NFL");
      
      // Generate bets
      const bestBets: Bet[] = [];
      
      // Check if this game should have best bets (85% chance)
      if (this.shouldHaveBestBets()) {
        const betCount = Math.floor(Math.random() * mockDataConfig.maxBetsPerGame) + 1;
        
        for (let j = 0; j < betCount; j++) {
          // Determine bet type based on probabilities
          const rand = Math.random();
          const betType = 
            rand < this.config.betTypeProbabilities.straight ? "straight" :
            rand < this.config.betTypeProbabilities.straight + this.config.betTypeProbabilities.parlay ? "parlay" : 
            "teaser";
          
          // Generate rating (higher probability of 7-8, lower probability of 9-10)
          const rating = Math.random() < 0.2 ? 9 : Math.random() < 0.6 ? 8 : 7;
          
          // Generate bet
          const bet = this.betGenerator.generateBet(
            gameId, 
            "NFL", 
            { home: homeTeam.name, away: awayTeam.name },
            betType,
            rating
          );
          
          bestBets.push(bet);
        }
      }
      
      // Generate game status
      const status = this.generateRandomStatus();
      
      // Create game object
      const game: GameCardProps = {
        id: gameId,
        homeTeam: {
          name: homeTeam.name,
          city: homeTeam.city,
        },
        awayTeam: {
          name: awayTeam.name,
          city: awayTeam.city,
        },
        date,
        time,
        timezone,
        network,
        spread: {
          value: Math.abs(spreadValue),
          team: spreadTeam,
        },
        overUnder,
        moneyLine,
        bestBets,
        status,
      };
      
      games.push(game);
    }
    
    return games;
  }
}
