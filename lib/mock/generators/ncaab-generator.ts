import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { GameGenerator } from "./game-generator";
import { BetGenerator } from "./bet-generator";
import { mockDataConfig } from "../config";
import { Bet } from "@/lib/bet-types";
import { NCAAB_TEAMS } from "@/lib/mock/data/teams/ncaab";

/**
 * NCAAB game generator
 * This class generates mock NCAAB games
 */
export class NcaabGameGenerator extends GameGenerator {
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
   * Generate a specified number of NCAAB games
   * @param count Number of games to generate
   * @returns Array of NCAAB game data
   */
  generateGames(count: number): GameCardProps[] {
    const games: GameCardProps[] = [];
    
    // Use the team data from the data files
    const allTeams = NCAAB_TEAMS.map(team => ({
      name: team.name,
      school: team.school
    }));
    
    // Create a copy of the teams array that we can modify
    const availableTeams = [...allTeams];
    
    // Limit the number of games to ensure we don't run out of teams
    // Each game needs 2 teams, so the max number of games is half the number of teams
    const maxGames = Math.floor(availableTeams.length / 2);
    const gamesToGenerate = Math.min(count, maxGames);
    
    for (let i = 0; i < gamesToGenerate; i++) {
      // Select a random home team from the available teams
      const homeIndex = Math.floor(Math.random() * availableTeams.length);
      const homeTeam = availableTeams[homeIndex];
      
      // Remove the home team from the available teams
      availableTeams.splice(homeIndex, 1);
      
      // Select a random away team from the remaining available teams
      const awayIndex = Math.floor(Math.random() * availableTeams.length);
      const awayTeam = availableTeams[awayIndex];
      
      // Remove the away team from the available teams
      availableTeams.splice(awayIndex, 1);
      
      // Generate game ID
      const gameId = this.generateGameId("NCAAB", i);
      
      // Generate spread (college basketball spreads)
      const spreadValue = (Math.floor(Math.random() * 20) + 1) / 2;
      const spreadTeam = Math.random() > 0.5 ? homeTeam.name : awayTeam.name;
      
      // Generate over/under
      const overUnder = this.generateRandomOverUnder("NCAAB");
      
      // Generate money line
      const moneyLine = this.generateRandomMoneyLine(true);
      
      // Generate random date and time
      const date = this.generateRandomDate(
        mockDataConfig.dateRanges.NCAAB.start,
        mockDataConfig.dateRanges.NCAAB.end
      );
      const time = this.generateRandomTime();
      const timezone = this.generateRandomTimezone();
      
      // Generate random network
      const network = this.generateRandomNetwork("NCAAB");
      
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
          
          // Generate bet with school names for NCAA teams
          const bet = this.betGenerator.generateBet(
            gameId, 
            "NCAAB", 
            { home: homeTeam.school, away: awayTeam.school },
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
          city: homeTeam.school,
        },
        awayTeam: {
          name: awayTeam.name,
          city: awayTeam.school,
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
