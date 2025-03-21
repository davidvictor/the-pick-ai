"use client";

import { Card, CardContent } from "@/components/ui/card";

/**
 * Performance Summary component displays betting statistics
 */
export function PerformanceSummary() {
  // Sample stats data - in a real app this would come from the user's profile or API
  const stats = {
    winRate: 62.7,
    profitLoss: 486.75,
    currentStreak: 5, // positive for wins, negative for losses
    activeBets: 3
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Performance Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Win Rate Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Win Rate</span>
              <span className="text-3xl font-bold text-green-500">{stats.winRate}%</span>
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">Last 30 days</span>
            </div>
          </CardContent>
        </Card>

        {/* Profit/Loss Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Profit/Loss</span>
              <span className={`text-3xl font-bold ${stats.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${Math.abs(stats.profitLoss).toFixed(2)}
              </span>
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">All time</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Streak Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Streak</span>
              <div className="flex items-center">
                <span className={`text-3xl font-bold ${stats.currentStreak > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.currentStreak > 0 ? 'W' : 'L'}{Math.abs(stats.currentStreak)}
                </span>
              </div>
              <div className="mt-2 flex space-x-1">
                {[...Array(Math.min(Math.abs(stats.currentStreak), 5))].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${stats.currentStreak > 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Bets Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Bets</span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeBets}</span>
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">Pending results</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
