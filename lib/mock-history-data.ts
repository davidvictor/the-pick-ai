import { Bet, BetLeg, BetResult, BetType, LegType, RiskLevel, calculatePayout } from "./bet-types";
import { League } from "@/services/api-types";

// Mock bet history data
export const mockBetHistory: Bet[] = [
  {
    id: "bet-001",
    date: "2025-03-18",
    units: 1,
    odds: -120,
    result: "win",
    rating: 8,
    betType: "straight",
    ev: "+5.2%",
    riskScore: "Medium",
    confidenceScore: 7,
    rationale: "The Dolphins have a strong defensive line that should contain the Jets' running game. Weather conditions favor the Dolphins' passing attack.",
    legs: [
      {
        id: "leg-001",
        legType: "moneyline",
        gameId: "nfl-1",
        league: "NFL",
        teams: {
          home: "Jets",
          away: "Dolphins"
        },
        selection: "Dolphins",
        line: null,
        odds: -120,
        result: "win",
        details: {
          team: "Dolphins"
        }
      }
    ]
  },
  {
    id: "bet-002",
    date: "2025-03-17",
    units: 1.1,
    odds: -110,
    result: "loss",
    rating: 7,
    betType: "straight",
    ev: "+3.8%",
    riskScore: "Low",
    confidenceScore: 7,
    rationale: "The Celtics have been strong against the spread as underdogs this season. Their defensive matchups against the Lakers' key players are favorable.",
    legs: [
      {
        id: "leg-002",
        legType: "spread",
        gameId: "nba-1",
        league: "NBA",
        teams: {
          home: "Lakers",
          away: "Celtics"
        },
        selection: "Celtics +3.5",
        line: 3.5,
        odds: -110,
        result: "loss",
        details: {
          team: "Celtics",
          points: 3.5
        }
      }
    ]
  },
  {
    id: "bet-003",
    date: "2025-03-16",
    units: 1.05,
    odds: -105,
    result: "win",
    rating: 8,
    betType: "straight",
    ev: "+6.1%",
    riskScore: "Low",
    confidenceScore: 8,
    rationale: "Both teams are starting their ace pitchers, and the game is being played in pitcher-friendly Dodger Stadium. Historical matchups between these teams have trended under.",
    legs: [
      {
        id: "leg-003",
        legType: "total",
        gameId: "mlb-2",
        league: "MLB",
        teams: {
          home: "Dodgers",
          away: "Giants"
        },
        selection: "Under 7.5",
        line: 7.5,
        odds: -105,
        result: "win",
        details: {
          type: "under",
          points: 7.5
        }
      }
    ]
  },
  {
    id: "bet-004",
    date: "2025-03-15",
    units: 1.4,
    odds: -140,
    result: "win",
    rating: 9,
    betType: "straight",
    ev: "+7.5%",
    riskScore: "Low",
    confidenceScore: 9,
    rationale: "The Bruins have dominated the Maple Leafs in their last 5 meetings, winning 4 of them. Home ice advantage and superior goaltending give them a significant edge.",
    legs: [
      {
        id: "leg-004",
        legType: "moneyline",
        gameId: "nhl-1",
        league: "NHL",
        teams: {
          home: "Bruins",
          away: "Maple Leafs"
        },
        selection: "Bruins",
        line: null,
        odds: -140,
        result: "win",
        details: {
          team: "Bruins"
        }
      }
    ]
  },
  {
    id: "bet-005",
    date: "2025-03-14",
    units: 1.1,
    odds: -110,
    result: "push",
    rating: 7,
    betType: "straight",
    ev: "+4.2%",
    riskScore: "Medium",
    confidenceScore: 7,
    rationale: "Michigan has covered the spread in 3 of their last 4 games against Ohio State. Their defense should keep the game close even if they don't win outright.",
    legs: [
      {
        id: "leg-005",
        legType: "spread",
        gameId: "ncaaf-2",
        league: "NCAAF",
        teams: {
          home: "Ohio State",
          away: "Michigan"
        },
        selection: "Michigan +6.5",
        line: 6.5,
        odds: -110,
        result: "push",
        details: {
          team: "Michigan",
          points: 6.5
        }
      }
    ]
  },
  {
    id: "bet-006",
    date: "2025-03-13",
    units: 1.1,
    odds: -110,
    result: "win",
    rating: 9,
    betType: "straight",
    ev: "+8.3%",
    riskScore: "Low",
    confidenceScore: 9,
    rationale: "Duke-UNC games have gone over the total in 7 of their last 8 meetings. Both teams are playing at a fast pace this season and have efficient offenses.",
    legs: [
      {
        id: "leg-006",
        legType: "total",
        gameId: "ncaab-1",
        league: "NCAAB",
        teams: {
          home: "Duke",
          away: "North Carolina"
        },
        selection: "Over 151.5",
        line: 151.5,
        odds: -110,
        result: "win",
        details: {
          type: "over",
          points: 151.5
        }
      }
    ]
  },
  {
    id: "bet-007",
    date: "2025-03-12",
    units: 1,
    odds: 140,
    result: "loss",
    rating: 9,
    betType: "straight",
    ev: "+7.2%",
    riskScore: "Medium",
    confidenceScore: 8,
    rationale: "The Eagles have won 3 of their last 5 games at Dallas. Their defensive line should be able to pressure the Cowboys' quarterback and disrupt their offense.",
    legs: [
      {
        id: "leg-007",
        legType: "moneyline",
        gameId: "nfl-3",
        league: "NFL",
        teams: {
          home: "Cowboys",
          away: "Eagles"
        },
        selection: "Eagles",
        line: null,
        odds: 140,
        result: "loss",
        details: {
          team: "Eagles"
        }
      }
    ]
  },
  {
    id: "bet-008",
    date: "2025-03-11",
    units: 1,
    odds: 110,
    result: "win",
    rating: 8,
    betType: "straight",
    ev: "+6.5%",
    riskScore: "Medium",
    confidenceScore: 8,
    rationale: "The Cavaliers match up well against the Heat's frontcourt. They've won 4 of their last 6 games in Miami and are coming in with momentum after three straight wins.",
    legs: [
      {
        id: "leg-008",
        legType: "moneyline",
        gameId: "nba-4",
        league: "NBA",
        teams: {
          home: "Heat",
          away: "Cavaliers"
        },
        selection: "Cavaliers",
        line: null,
        odds: 110,
        result: "win",
        details: {
          team: "Cavaliers"
        }
      }
    ]
  },
  {
    id: "bet-009",
    date: "2025-03-10",
    units: 1.15,
    odds: -115,
    result: "win",
    rating: 9,
    betType: "straight",
    ev: "+7.8%",
    riskScore: "Low",
    confidenceScore: 9,
    rationale: "The Rangers have been strong on the road this season and have their ace pitcher starting. Even in losses to the Astros, they've kept games close, covering the +1.5 run line in 7 of their last 8 meetings.",
    legs: [
      {
        id: "leg-009",
        legType: "spread",
        gameId: "mlb-5",
        league: "MLB",
        teams: {
          home: "Astros",
          away: "Rangers"
        },
        selection: "Rangers +1.5",
        line: 1.5,
        odds: -115,
        result: "win",
        details: {
          team: "Rangers",
          points: 1.5
        }
      }
    ]
  },
  {
    id: "bet-010",
    date: "2025-03-09",
    units: 1.1,
    odds: -110,
    result: "loss",
    rating: 8,
    betType: "straight",
    ev: "+4.5%",
    riskScore: "Medium",
    confidenceScore: 7,
    rationale: "Both teams have strong goaltending and have played low-scoring games against each other this season. The Hurricanes' defensive system should limit scoring chances.",
    legs: [
      {
        id: "leg-010",
        legType: "total",
        gameId: "nhl-6",
        league: "NHL",
        teams: {
          home: "Hurricanes",
          away: "Lightning"
        },
        selection: "Under 5.5",
        line: 5.5,
        odds: -110,
        result: "loss",
        details: {
          type: "under",
          points: 5.5
        }
      }
    ]
  },
  {
    id: "bet-011",
    date: "2025-03-08",
    units: 1.1,
    odds: -110,
    result: "win",
    rating: 9,
    betType: "straight",
    ev: "+8.1%",
    riskScore: "Low",
    confidenceScore: 9,
    rationale: "Florida State has been undervalued in the market. Their defense matches up well against Clemson's offense, and they've covered the spread in 5 of their last 6 games as underdogs.",
    legs: [
      {
        id: "leg-011",
        legType: "spread",
        gameId: "ncaaf-3",
        league: "NCAAF",
        teams: {
          home: "Clemson",
          away: "Florida State"
        },
        selection: "Florida State +4.0",
        line: 4.0,
        odds: -110,
        result: "win",
        details: {
          team: "Florida State",
          points: 4.0
        }
      }
    ]
  },
  {
    id: "bet-012",
    date: "2025-03-07",
    units: 1.1,
    odds: -110,
    result: "pending",
    rating: 7,
    betType: "straight",
    ev: "+3.9%",
    riskScore: "Medium",
    confidenceScore: 7,
    rationale: "Michigan has played well as underdogs in rivalry games. Their guard play should give them an advantage, and they've covered in 3 of their last 4 visits to East Lansing.",
    legs: [
      {
        id: "leg-012",
        legType: "spread",
        gameId: "ncaab-5",
        league: "NCAAB",
        teams: {
          home: "Michigan State",
          away: "Michigan"
        },
        selection: "Michigan +2.0",
        line: 2.0,
        odds: -110,
        result: "pending",
        details: {
          team: "Michigan",
          points: 2.0
        }
      }
    ]
  },
  {
    id: "bet-013",
    date: "2025-03-06",
    units: 1.1,
    odds: -110,
    result: "win",
    rating: 9,
    betType: "straight",
    ev: "+7.9%",
    riskScore: "Low",
    confidenceScore: 9,
    rationale: "Division games tend to be closer than the spread suggests. The Rams have covered in 4 of their last 5 games against the 49ers, even when losing outright.",
    legs: [
      {
        id: "leg-013",
        legType: "spread",
        gameId: "nfl-5",
        league: "NFL",
        teams: {
          home: "49ers",
          away: "Rams"
        },
        selection: "Rams +6.0",
        line: 6.0,
        odds: -110,
        result: "win",
        details: {
          team: "Rams",
          points: 6.0
        }
      }
    ]
  },
  {
    id: "bet-014",
    date: "2025-03-05",
    units: 1.1,
    odds: -110,
    result: "loss",
    rating: 8,
    betType: "straight",
    ev: "+5.2%",
    riskScore: "Medium",
    confidenceScore: 8,
    rationale: "The Mavericks' star player has historically performed well against the Suns. Their improved perimeter defense should help contain the Suns' guards.",
    legs: [
      {
        id: "leg-014",
        legType: "spread",
        gameId: "nba-6",
        league: "NBA",
        teams: {
          home: "Suns",
          away: "Mavericks"
        },
        selection: "Mavericks +2.5",
        line: 2.5,
        odds: -110,
        result: "loss",
        details: {
          team: "Mavericks",
          points: 2.5
        }
      }
    ]
  },
  {
    id: "bet-015",
    date: "2025-03-04",
    units: 1.1,
    odds: -110,
    result: "win",
    rating: 9,
    betType: "straight",
    ev: "+6.8%",
    riskScore: "Low",
    confidenceScore: 8,
    rationale: "The Athletics have been competitive against the Mariners this season despite their overall record. The +1.5 run line gives value as most of their losses have been by just one run.",
    legs: [
      {
        id: "leg-015",
        legType: "spread",
        gameId: "mlb-8",
        league: "MLB",
        teams: {
          home: "Mariners",
          away: "Athletics"
        },
        selection: "Athletics +1.5",
        line: 1.5,
        odds: -110,
        result: "win",
        details: {
          team: "Athletics",
          points: 1.5
        }
      }
    ]
  },
  {
    id: "bet-016",
    date: "2025-03-03",
    units: 0.5,
    odds: -110,
    result: "win",
    rating: 8,
    betType: "straight",
    ev: "+7.8%",
    riskScore: "Low",
    confidenceScore: 8,
    rationale: "Joel Embiid has averaged 32.5 points in his last 5 games against the Knicks. The Knicks' center rotation is weakened due to injuries.",
    legs: [
      {
        id: "leg-016",
        legType: "prop",
        gameId: "nba-5",
        league: "NBA",
        teams: {
          home: "76ers",
          away: "Knicks"
        },
        selection: "Joel Embiid Over 29.5 Points",
        line: 29.5,
        odds: -110,
        result: "win",
        details: {
          player: "Joel Embiid",
          propType: "Points",
          line: 29.5,
          type: "over"
        }
      }
    ]
  },
  {
    id: "bet-017",
    date: "2025-03-02",
    units: 0.5,
    odds: 600,
    result: "win",
    rating: 9,
    betType: "parlay",
    ev: "+3.5%",
    riskScore: "High",
    confidenceScore: 6,
    rationale: "This parlay combines two high-value plays. The Eagles have historically performed well as underdogs against the Cowboys. The Heat vs Cavaliers total has gone under in 7 of their last 10 matchups.",
    legs: [
      {
        id: "leg-017-1",
        legType: "moneyline",
        gameId: "nfl-3",
        league: "NFL",
        teams: {
          home: "Cowboys",
          away: "Eagles"
        },
        selection: "Eagles",
        line: null,
        odds: 140,
        result: "win",
        details: {
          team: "Eagles"
        }
      },
      {
        id: "leg-017-2",
        legType: "total",
        gameId: "nba-4",
        league: "NBA",
        teams: {
          home: "Heat",
          away: "Cavaliers"
        },
        selection: "Under 210.0",
        line: 210.0,
        odds: -110,
        result: "win",
        details: {
          type: "under",
          points: 210.0
        }
      }
    ]
  },
  {
    id: "bet-018",
    date: "2025-03-01",
    units: 1,
    odds: -120,
    result: "win",
    rating: 8,
    betType: "teaser",
    ev: "+6.3%",
    riskScore: "Medium",
    confidenceScore: 8,
    rationale: "This 6-point NFL teaser crosses key numbers (3, 7) in both games, significantly increasing the probability of covering both spreads. Both the Rams and Dolphins have strong defensive units that should keep the games close.",
    legs: [
      {
        id: "leg-018-1",
        legType: "spread",
        gameId: "nfl-5",
        league: "NFL",
        teams: {
          home: "49ers",
          away: "Rams"
        },
        selection: "Rams +12.0",
        line: 12.0,
        odds: -110,
        result: "win",
        details: {
          team: "Rams",
          points: 12.0
        }
      },
      {
        id: "leg-018-2",
        legType: "spread",
        gameId: "nfl-1",
        league: "NFL",
        teams: {
          home: "Jets",
          away: "Dolphins"
        },
        selection: "Dolphins +3.5",
        line: 3.5,
        odds: -110,
        result: "win",
        details: {
          team: "Dolphins",
          points: 3.5
        }
      }
    ]
  }
];

// Helper function to get bet history summary
export const getBetHistorySummary = (history: Bet[] = mockBetHistory) => {
  const wins = history.filter(bet => bet.result === 'win').length;
  const losses = history.filter(bet => bet.result === 'loss').length;
  const pushes = history.filter(bet => bet.result === 'push').length;
  const pending = history.filter(bet => bet.result === 'pending').length;
  
  // Calculate total stake and payout
  const unitSize = 100; // Assuming $100 per unit
  const totalStake = history.reduce((sum, bet) => sum + (bet.units * unitSize), 0);
  const totalPayout = history.reduce((sum, bet) => sum + calculatePayout(bet), 0);
  
  const profit = totalPayout - totalStake;
  const winRate = wins / (wins + losses) * 100;
  
  return {
    wins,
    losses,
    pushes,
    pending,
    totalBets: history.length,
    totalStake,
    totalPayout,
    profit,
    winRate: isNaN(winRate) ? 0 : winRate
  };
};
