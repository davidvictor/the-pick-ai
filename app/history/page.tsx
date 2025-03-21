"use client";

import { MarketingPageLayout } from '@/components/marketing/page-layout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BetHistoryPage() {
  // Sample bet history data
  const bets = [
    {
      id: '1',
      date: 'Mar 20, 2025',
      event: 'LA Rams vs KC Chiefs',
      bet: 'Spread +6',
      odds: '-115',
      stake: '$100',
      result: 'Win',
      payout: '$186.96',
    },
    {
      id: '2',
      date: 'Mar 18, 2025',
      event: 'Boston Celtics vs LA Lakers',
      bet: 'Money Line',
      odds: '+155',
      stake: '$50',
      result: 'Win',
      payout: '$127.50',
    },
    {
      id: '3',
      date: 'Mar 15, 2025',
      event: 'NY Yankees vs Houston Astros',
      bet: 'Total Over 8.5',
      odds: '-110',
      stake: '$100',
      result: 'Loss',
      payout: '$0',
    },
    {
      id: '4',
      date: 'Mar 12, 2025',
      event: 'Vegas Golden Knights vs Toronto Maple Leafs',
      bet: 'Money Line',
      odds: '+135',
      stake: '$75',
      result: 'Win',
      payout: '$176.25',
    },
    {
      id: '5',
      date: 'Mar 10, 2025',
      event: 'Duke vs UNC',
      bet: 'Spread -3.5',
      odds: '-105',
      stake: '$100',
      result: 'Loss',
      payout: '$0',
    },
  ];

  // Calculate stats
  const winCount = bets.filter(bet => bet.result === 'Win').length;
  const winRate = (winCount / bets.length) * 100;
  const profit = bets.reduce((acc, bet) => {
    return acc + (bet.result === 'Win' ? parseFloat(bet.payout.replace('$', '')) - parseFloat(bet.stake.replace('$', '')) : -parseFloat(bet.stake.replace('$', '')));
  }, 0);

  return (
    <MarketingPageLayout
      title="Bet History"
      subtitle="Track your betting performance and gain insights from your past picks"
    >
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bets Placed</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{bets.length}</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Win Rate</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{winRate.toFixed(1)}%</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Net Profit</h3>
            <p className={`text-3xl font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${profit.toFixed(2)}
            </p>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Bets</TabsTrigger>
          <TabsTrigger value="wins">Wins</TabsTrigger>
          <TabsTrigger value="losses">Losses</TabsTrigger>
          <TabsTrigger value="nfl">NFL</TabsTrigger>
          <TabsTrigger value="nba">NBA</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                  <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Date</th>
                  <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Event</th>
                  <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Bet</th>
                  <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Odds</th>
                  <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Stake</th>
                  <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Result</th>
                  <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Payout</th>
                </tr>
              </thead>
              <tbody>
                {bets.map((bet) => (
                  <tr key={bet.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{bet.date}</td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{bet.event}</td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{bet.bet}</td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{bet.odds}</td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{bet.stake}</td>
                    <td className={`py-4 px-4 font-medium ${bet.result === 'Win' ? 'text-green-500' : 'text-red-500'}`}>
                      {bet.result}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{bet.payout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="wins" className="mt-6">
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Select this tab to view your winning bets.</p>
          </div>
        </TabsContent>
        <TabsContent value="losses" className="mt-6">
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Select this tab to view your losing bets.</p>
          </div>
        </TabsContent>
        <TabsContent value="nfl" className="mt-6">
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Select this tab to view your NFL bets.</p>
          </div>
        </TabsContent>
        <TabsContent value="nba" className="mt-6">
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Select this tab to view your NBA bets.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Unlock Your Betting Potential
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Sign up for an account to track your betting performance, receive AI-powered predictions, and maximize your winnings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md">
            Sign Up Now
          </button>
          <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-md">
            Learn More
          </button>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
