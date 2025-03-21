import { League } from "@/services/api-types";

/**
 * NHL team data
 */
export const NHL_TEAMS = [
  {
    name: "Bruins",
    city: "Boston",
    abbreviation: "BOS",
    conference: "Eastern",
    division: "Atlantic",
    arena: "TD Garden",
    location: "Boston, MA"
  },
  {
    name: "Maple Leafs",
    city: "Toronto",
    abbreviation: "TOR",
    conference: "Eastern",
    division: "Atlantic",
    arena: "Scotiabank Arena",
    location: "Toronto, ON"
  },
  {
    name: "Avalanche",
    city: "Colorado",
    abbreviation: "COL",
    conference: "Western",
    division: "Central",
    arena: "Ball Arena",
    location: "Denver, CO"
  },
  {
    name: "Golden Knights",
    city: "Vegas",
    abbreviation: "VGK",
    conference: "Western",
    division: "Pacific",
    arena: "T-Mobile Arena",
    location: "Las Vegas, NV"
  },
  {
    name: "Rangers",
    city: "New York",
    abbreviation: "NYR",
    conference: "Eastern",
    division: "Metropolitan",
    arena: "Madison Square Garden",
    location: "New York, NY"
  },
  {
    name: "Capitals",
    city: "Washington",
    abbreviation: "WSH",
    conference: "Eastern",
    division: "Metropolitan",
    arena: "Capital One Arena",
    location: "Washington, DC"
  },
  {
    name: "Oilers",
    city: "Edmonton",
    abbreviation: "EDM",
    conference: "Western",
    division: "Pacific",
    arena: "Rogers Place",
    location: "Edmonton, AB"
  },
  {
    name: "Flames",
    city: "Calgary",
    abbreviation: "CGY",
    conference: "Western",
    division: "Pacific",
    arena: "Scotiabank Saddledome",
    location: "Calgary, AB"
  },
  {
    name: "Penguins",
    city: "Pittsburgh",
    abbreviation: "PIT",
    conference: "Eastern",
    division: "Metropolitan",
    arena: "PPG Paints Arena",
    location: "Pittsburgh, PA"
  },
  {
    name: "Flyers",
    city: "Philadelphia",
    abbreviation: "PHI",
    conference: "Eastern",
    division: "Metropolitan",
    arena: "Wells Fargo Center",
    location: "Philadelphia, PA"
  },
  {
    name: "Hurricanes",
    city: "Carolina",
    abbreviation: "CAR",
    conference: "Eastern",
    division: "Metropolitan",
    arena: "PNC Arena",
    location: "Raleigh, NC"
  },
  {
    name: "Lightning",
    city: "Tampa Bay",
    abbreviation: "TBL",
    conference: "Eastern",
    division: "Atlantic",
    arena: "Amalie Arena",
    location: "Tampa, FL"
  },
  {
    name: "Blackhawks",
    city: "Chicago",
    abbreviation: "CHI",
    conference: "Western",
    division: "Central",
    arena: "United Center",
    location: "Chicago, IL"
  },
  {
    name: "Blues",
    city: "St. Louis",
    abbreviation: "STL",
    conference: "Western",
    division: "Central",
    arena: "Enterprise Center",
    location: "St. Louis, MO"
  },
  {
    name: "Canucks",
    city: "Vancouver",
    abbreviation: "VAN",
    conference: "Western",
    division: "Pacific",
    arena: "Rogers Arena",
    location: "Vancouver, BC"
  },
  {
    name: "Sharks",
    city: "San Jose",
    abbreviation: "SJS",
    conference: "Western",
    division: "Pacific",
    arena: "SAP Center",
    location: "San Jose, CA"
  },
  {
    name: "Ducks",
    city: "Anaheim",
    abbreviation: "ANA",
    conference: "Western",
    division: "Pacific",
    arena: "Honda Center",
    location: "Anaheim, CA"
  },
  {
    name: "Coyotes",
    city: "Arizona",
    abbreviation: "ARI",
    conference: "Western",
    division: "Central",
    arena: "Mullett Arena",
    location: "Tempe, AZ"
  },
  {
    name: "Sabres",
    city: "Buffalo",
    abbreviation: "BUF",
    conference: "Eastern",
    division: "Atlantic",
    arena: "KeyBank Center",
    location: "Buffalo, NY"
  },
  {
    name: "Red Wings",
    city: "Detroit",
    abbreviation: "DET",
    conference: "Eastern",
    division: "Atlantic",
    arena: "Little Caesars Arena",
    location: "Detroit, MI"
  },
  {
    name: "Panthers",
    city: "Florida",
    abbreviation: "FLA",
    conference: "Eastern",
    division: "Atlantic",
    arena: "Amerant Bank Arena",
    location: "Sunrise, FL"
  },
  {
    name: "Kings",
    city: "Los Angeles",
    abbreviation: "LAK",
    conference: "Western",
    division: "Pacific",
    arena: "Crypto.com Arena",
    location: "Los Angeles, CA"
  },
  {
    name: "Wild",
    city: "Minnesota",
    abbreviation: "MIN",
    conference: "Western",
    division: "Central",
    arena: "Xcel Energy Center",
    location: "St. Paul, MN"
  },
  {
    name: "Canadiens",
    city: "Montreal",
    abbreviation: "MTL",
    conference: "Eastern",
    division: "Atlantic",
    arena: "Bell Centre",
    location: "Montreal, QC"
  },
  {
    name: "Devils",
    city: "New Jersey",
    abbreviation: "NJD",
    conference: "Eastern",
    division: "Metropolitan",
    arena: "Prudential Center",
    location: "Newark, NJ"
  },
  {
    name: "Islanders",
    city: "New York",
    abbreviation: "NYI",
    conference: "Eastern",
    division: "Metropolitan",
    arena: "UBS Arena",
    location: "Elmont, NY"
  },
  {
    name: "Senators",
    city: "Ottawa",
    abbreviation: "OTT",
    conference: "Eastern",
    division: "Atlantic",
    arena: "Canadian Tire Centre",
    location: "Ottawa, ON"
  },
  {
    name: "Kraken",
    city: "Seattle",
    abbreviation: "SEA",
    conference: "Western",
    division: "Pacific",
    arena: "Climate Pledge Arena",
    location: "Seattle, WA"
  },
  {
    name: "Stars",
    city: "Dallas",
    abbreviation: "DAL",
    conference: "Western",
    division: "Central",
    arena: "American Airlines Center",
    location: "Dallas, TX"
  },
  {
    name: "Jets",
    city: "Winnipeg",
    abbreviation: "WPG",
    conference: "Western",
    division: "Central",
    arena: "Canada Life Centre",
    location: "Winnipeg, MB"
  },
  {
    name: "Predators",
    city: "Nashville",
    abbreviation: "NSH",
    conference: "Western",
    division: "Central",
    arena: "Bridgestone Arena",
    location: "Nashville, TN"
  },
  {
    name: "Blue Jackets",
    city: "Columbus",
    abbreviation: "CBJ",
    conference: "Eastern",
    division: "Metropolitan",
    arena: "Nationwide Arena",
    location: "Columbus, OH"
  }
];
