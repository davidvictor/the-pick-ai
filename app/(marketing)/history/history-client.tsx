"use client";

import { BetHistorySummary } from '@/components/history/bet-history-summary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getBetHistorySummary, mockBetHistory } from '@/lib/mock-history-data';
import Link from 'next/link';
import { BarChart, LineChart, TrendingUp, Calendar, Award, CheckCircle, XCircle } from 'lucide-react';

export default function HistoryClient() {
  const summaryData = getBetHistorySummary();
  
  // Calculate win streaks from mockBetHistory
  const getWinStreaks = () => {
    let currentStreak = 0;
    let streaks: { start: number; length: number }[] = [];
    
    mockBetHistory.forEach((bet, index) => {
      if (bet.result === 'win') {
        currentStreak++;
        
        // Check if this is the last bet or the next bet isn't a win
        const isLastBet = index === mockBetHistory.length - 1;
        const nextBetLoses = !isLastBet && mockBetHistory[index + 1].result !== 'win';
        
        if (isLastBet || nextBetLoses) {
          if (currentStreak >= 3) { // Only count streaks of 3 or more
            streaks.push({ start: index - currentStreak + 1, length: currentStreak });
          }
          currentStreak = 0;
        }
      } else {
        currentStreak = 0;
      }
    });
    
    // Sort by streak length (descending)
    return streaks.sort((a, b) => b.length - a.length);
  };
  
  const winStreaks = getWinStreaks();
  
  // Calculate league performance
  const getLeaguePerformance = () => {
    const leagues: Record<string, { wins: number; losses: number; pushes: number }> = {};
    
    mockBetHistory.forEach(bet => {
      // Skip pending bets
      if (bet.result === 'pending') return;
      
      // Get the league from the first leg (assuming all legs are the same league for simplicity)
      const league = bet.legs[0].league;
      
      if (!leagues[league]) {
        leagues[league] = { wins: 0, losses: 0, pushes: 0 };
      }
      
      leagues[league][bet.result === 'win' ? 'wins' : bet.result === 'loss' ? 'losses' : 'pushes']++;
    });
    
    return Object.entries(leagues).map(([league, stats]) => {
      const total = stats.wins + stats.losses + stats.pushes;
      const winRate = total > 0 ? (stats.wins / (stats.wins + stats.losses)) * 100 : 0;
      
      return {
        league,
        winRate: winRate.toFixed(1),
        total,
        ...stats
      };
    }).sort((a, b) => b.total - a.total); // Sort by total bets (descending)
  };
  
  const leaguePerformance = getLeaguePerformance();
  
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Betting History</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transparent, verifiable results from The Pick AI's betting algorithm
          </p>
        </div>
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300">
      {/* Highlight Stats Banner */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-900">
          <span className="font-medium mr-2 text-gray-700 dark:text-gray-200">All-Time Win Rate:</span>
          <span className="font-bold text-orange-500">{summaryData.winRate.toFixed(1)}%</span>
        </div>
      </div>
      
      {/* Performance Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Performance Summary</h2>
        <BetHistorySummary summaryData={summaryData} />
      </section>
      
      {/* Winning Streaks */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Winning Streaks</h2>
        </div>
        
        {winStreaks.length > 0 ? (
          <div className="space-y-4">
            {winStreaks.slice(0, 3).map((streak, index) => {
              const startBet = mockBetHistory[streak.start];
              const endBet = mockBetHistory[streak.start + streak.length - 1];
              
              return (
                <Card key={index} className="bg-gradient-to-r from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 border-orange-100 dark:border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {streak.length} Consecutive Wins
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(startBet.date)} - {formatDate(endBet.date)}
                        </p>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                          +${(streak.length * 100).toFixed(2)} profit
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-4 sm:grid-cols-8 gap-1">
                      {Array.from({ length: streak.length }).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-full h-2 bg-green-500 rounded-full" 
                          title={`Win ${i+1} of ${streak.length}`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No significant winning streaks found.</p>
        )}
      </section>
      
      {/* Recent Bets Table */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Bets</h2>
        </div>
        
        <div className="rounded-lg border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b">
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">League</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Matchup</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Pick</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Odds</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">Result</th>
                </tr>
              </thead>
              <tbody>
                {mockBetHistory.slice(0, 8).map((bet) => (
                  <tr key={bet.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{formatDate(bet.date)}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{bet.legs[0].league}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {bet.legs[0].teams.away} @ {bet.legs[0].teams.home}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{bet.legs[0].selection}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {bet.odds > 0 ? `+${bet.odds}` : bet.odds}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        {bet.result === 'win' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Win
                          </span>
                        )}
                        {bet.result === 'loss' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Loss
                          </span>
                        )}
                        {bet.result === 'push' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            Push
                          </span>
                        )}
                        {bet.result === 'pending' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Pending
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* League Performance */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <BarChart className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">League Performance</h2>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {leaguePerformance.map((league, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{league.league}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Win Rate</span>
                  <span className="text-lg font-bold text-orange-500">{league.winRate}%</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-orange-500 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, parseFloat(league.winRate))}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Wins</p>
                    <p className="font-medium text-green-600 dark:text-green-400">{league.wins}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Losses</p>
                    <p className="font-medium text-red-600 dark:text-red-400">{league.losses}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                    <p className="font-medium">{league.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Testimonials & CTA */}
      <section className="mb-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center mb-6">
          <Award className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Our Users Say</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-gray-600 dark:text-gray-300">
                  "The Pick AI has completely changed how I bet on sports. Their win rate is incredible and the transparency of seeing their full history gives me confidence in their picks."
                </p>
                <div className="mt-2">
                  <p className="font-semibold text-gray-900 dark:text-white">Michael T.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member since 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-gray-600 dark:text-gray-300">
                  "I've been with several betting services before, but none have been as consistent as The Pick AI. The historical performance speaks for itself!"
                </p>
                <div className="mt-2">
                  <p className="font-semibold text-gray-900 dark:text-white">Sarah K.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member since 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-orange-50 dark:bg-gray-900 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ready to start winning?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of members who are already benefiting from our AI-powered picks. 
            Get access to all our premium picks with a 72.7% win rate.
          </p>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-medium">
            <Link href="/sign-up">Get Started Today</Link>
          </Button>
        </div>
      </section>
        </div>
      </div>
    </div>
  );
}
