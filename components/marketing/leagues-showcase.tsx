"use client";

import Image from 'next/image';

export function LeaguesShowcase() {
  const leagues = [
    { name: 'NFL', logo: '/logos/league/nfl.svg' },
    { name: 'NBA', logo: '/logos/league/nba.svg' },
    { name: 'MLB', logo: '/logos/league/mlb.svg' },
    { name: 'NHL', logo: '/logos/league/nhl.svg' },
    // Using placeholder for NCAA since we don't have the logo
    { name: 'NCAA', logo: '/logos/sports/basketball.svg' }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-10 text-center">
          Access bets across all major leagues
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {leagues.map((league) => (
            <div key={league.name} className="flex justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 relative">
                <Image
                  src={league.logo}
                  alt={`${league.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
