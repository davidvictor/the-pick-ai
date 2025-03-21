"use client";

import { useState } from "react";
import { GameCardProps } from "@/components/game-card/game-card";
import { GameCardGrid } from "@/components/game-card/game-card-grid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockGamesByLeague } from "@/lib/mock-data-updated";
import { League } from "@/services/api-types";

interface UpcomingGamesProps {
  className?: string;
}

/**
 * Upcoming Games component displays games from various leagues
 */
export function UpcomingGames({ className }: UpcomingGamesProps) {
  const [activeLeague, setActiveLeague] = useState<League>("NFL");
  
  // Get games for the active league
  const games = mockGamesByLeague[activeLeague] || [];
  
  // Take just the first few games to display
  const upcomingGames = games.slice(0, 3);

  return (
    <section className={`mb-8 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Games</h2>
      </div>

      <Tabs defaultValue="NFL" onValueChange={(value) => setActiveLeague(value as League)}>
        <TabsList className="mb-4">
          <TabsTrigger value="NFL">NFL</TabsTrigger>
          <TabsTrigger value="NBA">NBA</TabsTrigger>
          <TabsTrigger value="NHL">NHL</TabsTrigger>
          <TabsTrigger value="MLB">MLB</TabsTrigger>
          <TabsTrigger value="NCAAF">NCAAF</TabsTrigger>
          <TabsTrigger value="NCAAB">NCAAB</TabsTrigger>
        </TabsList>

        {Object.entries(mockGamesByLeague).map(([league, games]) => (
          <TabsContent key={league} value={league} className="mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              {games.length > 0 ? (
                <GameCardGrid games={games.slice(0, 3)} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No upcoming games for {league}</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
