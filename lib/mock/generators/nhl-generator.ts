import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { GameGenerator } from "./game-generator";
import { BetGenerator } from "./bet-generator";
import { NHL_TEAMS } from "../data/teams";
import { mockDataConfig } from "../config";
import { Bet } from "@/lib/bet-types";

/**
 * NHL game generator
 * This class generates mock NHL games
 */
export class NHLGameGenerator extends GameGenerator {
  /**
   * Bet generator instance
   */
  private betGenerator: BetGenerator;
  
  /**
   * Constructor
   * @param betGenerator Bet generator instance
   */
  constructor(betGenerator: BetGenerator) {
    super();
    this.betGenerator = betGenerator;
  }
  
  /**
   * Generate a specified number of NHL games
   * @param count Number of games to generate
   * @returns Array of NHL game data
   */
  generateGames(count: number): GameCardProps[] {
    const games: GameCardProps[] = [];
    const teams = [...NHL_TEAMS];
    
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
      const gameId = this.generateGameId("NHL", i);
      
      // Generate spread (puck line in NHL is typically -1.5)
      const spreadValue = 1.5;
      const spreadTeam = Math.random() > 0.5 ? homeTeam.name : awayTeam.name;
      
      // Generate over/under
      const overUnder = this.generateRandomOverUnder("NHL");
      
      // Generate money line
      const favoredTeam = Math.random() > 0.5 ? homeTeam : awayTeam;
      const moneyLine = this.generateRandomMoneyLine(true);
      
      // Generate random date and time
      const date = this.generateRandomDate(
        mockDataConfig.dateRanges.NHL.start,
        mockDataConfig.dateRanges.NHL.end
      );
      const time = this.generateRandomTime();
      const timezone = this.generateRandomTimezone();
      
      // Generate random network
      const network = this.generateRandomNetwork("NHL");
      
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
            "NHL", 
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
