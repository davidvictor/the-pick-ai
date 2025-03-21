import { League } from "@/services/api-types";

/**
 * NFL team data
 */
export const NFL_TEAMS = [
  { 
    name: "Bills", 
    city: "Buffalo",
    abbreviation: "BUF",
    conference: "AFC",
    division: "East",
    stadium: "Highmark Stadium",
    location: "Orchard Park, NY"
  },
  { 
    name: "Dolphins", 
    city: "Miami",
    abbreviation: "MIA",
    conference: "AFC",
    division: "East",
    stadium: "Hard Rock Stadium",
    location: "Miami Gardens, FL"
  },
  { 
    name: "Patriots", 
    city: "New England",
    abbreviation: "NE",
    conference: "AFC",
    division: "East",
    stadium: "Gillette Stadium",
    location: "Foxborough, MA"
  },
  { 
    name: "Jets", 
    city: "New York",
    abbreviation: "NYJ",
    conference: "AFC",
    division: "East",
    stadium: "MetLife Stadium",
    location: "East Rutherford, NJ"
  },
  { 
    name: "Ravens", 
    city: "Baltimore",
    abbreviation: "BAL",
    conference: "AFC",
    division: "North",
    stadium: "M&T Bank Stadium",
    location: "Baltimore, MD"
  },
  { 
    name: "Bengals", 
    city: "Cincinnati",
    abbreviation: "CIN",
    conference: "AFC",
    division: "North",
    stadium: "Paycor Stadium",
    location: "Cincinnati, OH"
  },
  { 
    name: "Browns", 
    city: "Cleveland",
    abbreviation: "CLE",
    conference: "AFC",
    division: "North",
    stadium: "FirstEnergy Stadium",
    location: "Cleveland, OH"
  },
  { 
    name: "Steelers", 
    city: "Pittsburgh",
    abbreviation: "PIT",
    conference: "AFC",
    division: "North",
    stadium: "Acrisure Stadium",
    location: "Pittsburgh, PA"
  },
  { 
    name: "Texans", 
    city: "Houston",
    abbreviation: "HOU",
    conference: "AFC",
    division: "South",
    stadium: "NRG Stadium",
    location: "Houston, TX"
  },
  { 
    name: "Colts", 
    city: "Indianapolis",
    abbreviation: "IND",
    conference: "AFC",
    division: "South",
    stadium: "Lucas Oil Stadium",
    location: "Indianapolis, IN"
  },
  { 
    name: "Jaguars", 
    city: "Jacksonville",
    abbreviation: "JAX",
    conference: "AFC",
    division: "South",
    stadium: "TIAA Bank Field",
    location: "Jacksonville, FL"
  },
  { 
    name: "Titans", 
    city: "Tennessee",
    abbreviation: "TEN",
    conference: "AFC",
    division: "South",
    stadium: "Nissan Stadium",
    location: "Nashville, TN"
  },
  { 
    name: "Broncos", 
    city: "Denver",
    abbreviation: "DEN",
    conference: "AFC",
    division: "West",
    stadium: "Empower Field at Mile High",
    location: "Denver, CO"
  },
  { 
    name: "Chiefs", 
    city: "Kansas City",
    abbreviation: "KC",
    conference: "AFC",
    division: "West",
    stadium: "GEHA Field at Arrowhead Stadium",
    location: "Kansas City, MO"
  },
  { 
    name: "Raiders", 
    city: "Las Vegas",
    abbreviation: "LV",
    conference: "AFC",
    division: "West",
    stadium: "Allegiant Stadium",
    location: "Las Vegas, NV"
  },
  { 
    name: "Chargers", 
    city: "Los Angeles",
    abbreviation: "LAC",
    conference: "AFC",
    division: "West",
    stadium: "SoFi Stadium",
    location: "Inglewood, CA"
  },
  { 
    name: "Cowboys", 
    city: "Dallas",
    abbreviation: "DAL",
    conference: "NFC",
    division: "East",
    stadium: "AT&T Stadium",
    location: "Arlington, TX"
  },
  { 
    name: "Giants", 
    city: "New York",
    abbreviation: "NYG",
    conference: "NFC",
    division: "East",
    stadium: "MetLife Stadium",
    location: "East Rutherford, NJ"
  },
  { 
    name: "Eagles", 
    city: "Philadelphia",
    abbreviation: "PHI",
    conference: "NFC",
    division: "East",
    stadium: "Lincoln Financial Field",
    location: "Philadelphia, PA"
  },
  { 
    name: "Commanders", 
    city: "Washington",
    abbreviation: "WAS",
    conference: "NFC",
    division: "East",
    stadium: "FedExField",
    location: "Landover, MD"
  },
  { 
    name: "Bears", 
    city: "Chicago",
    abbreviation: "CHI",
    conference: "NFC",
    division: "North",
    stadium: "Soldier Field",
    location: "Chicago, IL"
  },
  { 
    name: "Lions", 
    city: "Detroit",
    abbreviation: "DET",
    conference: "NFC",
    division: "North",
    stadium: "Ford Field",
    location: "Detroit, MI"
  },
  { 
    name: "Packers", 
    city: "Green Bay",
    abbreviation: "GB",
    conference: "NFC",
    division: "North",
    stadium: "Lambeau Field",
    location: "Green Bay, WI"
  },
  { 
    name: "Vikings", 
    city: "Minnesota",
    abbreviation: "MIN",
    conference: "NFC",
    division: "North",
    stadium: "U.S. Bank Stadium",
    location: "Minneapolis, MN"
  },
  { 
    name: "Falcons", 
    city: "Atlanta",
    abbreviation: "ATL",
    conference: "NFC",
    division: "South",
    stadium: "Mercedes-Benz Stadium",
    location: "Atlanta, GA"
  },
  { 
    name: "Panthers", 
    city: "Carolina",
    abbreviation: "CAR",
    conference: "NFC",
    division: "South",
    stadium: "Bank of America Stadium",
    location: "Charlotte, NC"
  },
  { 
    name: "Saints", 
    city: "New Orleans",
    abbreviation: "NO",
    conference: "NFC",
    division: "South",
    stadium: "Caesars Superdome",
    location: "New Orleans, LA"
  },
  { 
    name: "Buccaneers", 
    city: "Tampa Bay",
    abbreviation: "TB",
    conference: "NFC",
    division: "South",
    stadium: "Raymond James Stadium",
    location: "Tampa, FL"
  },
  { 
    name: "Cardinals", 
    city: "Arizona",
    abbreviation: "ARI",
    conference: "NFC",
    division: "West",
    stadium: "State Farm Stadium",
    location: "Glendale, AZ"
  },
  { 
    name: "Rams", 
    city: "Los Angeles",
    abbreviation: "LAR",
    conference: "NFC",
    division: "West",
    stadium: "SoFi Stadium",
    location: "Inglewood, CA"
  },
  { 
    name: "49ers", 
    city: "San Francisco",
    abbreviation: "SF",
    conference: "NFC",
    division: "West",
    stadium: "Levi's Stadium",
    location: "Santa Clara, CA"
  },
  { 
    name: "Seahawks", 
    city: "Seattle",
    abbreviation: "SEA",
    conference: "NFC",
    division: "West",
    stadium: "Lumen Field",
    location: "Seattle, WA"
  }
];
