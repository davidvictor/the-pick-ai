import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { GameGenerator } from "./game-generator";
import { BetGenerator } from "./bet-generator";
import { mockDataConfig } from "../config";
import { Bet } from "@/lib/bet-types";

/**
 * MLS game generator
 * This class generates mock MLS games
 */
export class MLSGameGenerator extends GameGenerator {
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
   * Generate a specified number of MLS games
   * @param count Number of games to generate
   * @returns Array of MLS game data
   */
  generateGames(count: number): GameCardProps[] {
    const games: GameCardProps[] = [];
    
    // Sample MLS teams with city and team name
    const teams = [
      { name: "United", city: "Atlanta" },
      { name: "FC", city: "Austin" },
      { name: "FC", city: "Charlotte" },
      { name: "Fire", city: "Chicago" },
      { name: "FC Cincinnati", city: "Cincinnati" },
      { name: "Rapids", city: "Colorado" },
      { name: "Crew", city: "Columbus" },
      { name: "United", city: "D.C." },
      { name: "FC Dallas", city: "Dallas" },
      { name: "Dynamo", city: "Houston" },
      { name: "Galaxy", city: "LA" },
      { name: "LAFC", city: "Los Angeles" },
      { name: "Inter Miami", city: "Miami" },
      { name: "United", city: "Minnesota" },
      { name: "CF Montréal", city: "Montréal" },
      { name: "SC", city: "Nashville" },
      { name: "Revolution", city: "New England" },
      { name: "City FC", city: "New York" },
      { name: "Red Bulls", city: "New York" },
      { name: "City", city: "Orlando" },
      { name: "Union", city: "Philadelphia" },
      { name: "Timbers", city: "Portland" },
      { name: "Real Salt Lake", city: "Salt Lake City" },
      { name: "Earthquakes", city: "San Jose" },
      { name: "Sounders", city: "Seattle" },
      { name: "Sporting Kansas City", city: "Kansas City" },
      { name: "City SC", city: "St. Louis" },
      { name: "FC", city: "Toronto" },
      { name: "Whitecaps", city: "Vancouver" }
    ];
    
    for (let i = 0; i < count; i++) {
      // Select two random teams
      const homeIndex = Math.floor(Math.random() * teams.length);
      const homeTeam = teams[homeIndex];
      
      // Remove home team to avoid duplicates
      const availableTeams = teams.filter((_, index) => index !== homeIndex);
      
      const awayIndex = Math.floor(Math.random() * availableTeams.length);
      const awayTeam = availableTeams[awayIndex];
      
      // Generate game ID
      const gameId = this.generateGameId("MLS", i);
      
      // Generate spread
      const spreadValue = 1.5;
      // Use the full team name for the spread team
      const spreadTeam = Math.random() > 0.5 ? 
        (homeTeam.city && homeTeam.name ? `${homeTeam.city} ${homeTeam.name}` : homeTeam.name) : 
        (awayTeam.city && awayTeam.name ? `${awayTeam.city} ${awayTeam.name}` : awayTeam.name);
      
      // Generate over/under
      const overUnder = (Math.floor(Math.random() * 5) + 2) + (Math.random() > 0.5 ? 0 : 0.5);
      
      // Generate money line
      const moneyLine = this.generateRandomMoneyLine(true);
      
      // Generate random date and time
      const date = this.generateRandomDate(
        mockDataConfig.dateRanges.MLS.start,
        mockDataConfig.dateRanges.MLS.end
      );
      const time = this.generateRandomTime();
      const timezone = this.generateRandomTimezone();
      
      // Generate random network
      const network = this.generateRandomNetwork("MLS");
      
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
          
          // Generate bet with full team names
          const homeFullName = homeTeam.city && homeTeam.name ? `${homeTeam.city} ${homeTeam.name}` : homeTeam.name;
          const awayFullName = awayTeam.city && awayTeam.name ? `${awayTeam.city} ${awayTeam.name}` : awayTeam.name;
          
          const bet = this.betGenerator.generateBet(
            gameId, 
            "MLS", 
            { home: homeFullName, away: awayFullName },
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
