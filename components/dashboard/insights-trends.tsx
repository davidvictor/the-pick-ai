"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, BarChart } from "lucide-react";

interface InsightsTrendsProps {
  className?: string;
}

/**
 * Insights & Trends component displays valuable betting insights
 */
export function InsightsTrends({ className }: InsightsTrendsProps) {
  // Mock insights data - in a real app, this would come from an API
  const insights = [
    {
      id: "1",
      type: "lineMovement",
      title: "Significant Line Movement",
      description: "Chiefs-Ravens spread has moved from -3 to -3.5 in the last 24 hours, indicating sharp money on the Chiefs.",
      icon: TrendingUp,
      iconColor: "text-blue-500",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "value",
      title: "Value Bet Alert",
      description: "Our model shows Maple Leafs ML at +140 has a 46% chance of hitting, making it a positive expected value play.",
      icon: BarChart,
      iconColor: "text-green-500",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "injury",
      title: "Key Injury Impact",
      description: "Lakers' star center is now questionable for tonight's game against the Warriors, which could affect the total.",
      icon: AlertTriangle,
      iconColor: "text-yellow-500",
      time: "12 hours ago",
    },
  ];

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Insights & Trends</h2>
      
      <div className="space-y-4">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </section>
  );
}

interface InsightCardProps {
  insight: {
    id: string;
    type: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    iconColor: string;
    time: string;
  };
}

function InsightCard({ insight }: InsightCardProps) {
  const { icon: Icon } = insight;
  
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-colors">
      <CardContent className="p-4">
        <div className="flex">
          <div className={`mr-3 p-2 rounded-full bg-gray-100 dark:bg-gray-900 ${insight.iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{insight.title}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">{insight.time}</span>
            </div>
            
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {insight.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
