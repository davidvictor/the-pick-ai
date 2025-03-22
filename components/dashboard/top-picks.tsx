"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bet } from "@/lib/bet-types";
import { useState } from "react";

interface TopPicksProps {
  className?: string;
}

/**
 * Today's Top Picks component displays AI-generated best bets
 */
export function TopPicks({ className }: TopPicksProps) {
  // Mock data for top picks - in a real app this would come from an API
  const topPicks = [
    {
      id: "1",
      homeTeam: {
        name: "Chiefs",
        city: "Kansas City",
        logo: "/logos/nfl/kansas-city-chiefs.svg",
      },
      awayTeam: {
        name: "Ravens",
        city: "Baltimore",
        logo: "/logos/nfl/baltimore-ravens.svg",
      },
      date: "Mar 21, 2025",
      time: "8:20 PM",
      network: "NBC",
      betType: "Spread",
      betDetails: "Chiefs -3.5",
      odds: "-110",
      confidence: 4.5, // Out of 5
      analysis: "The Chiefs' offense is performing at an elite level and their home field advantage should be significant against the Ravens' struggling secondary.",
    },
    {
      id: "2",
      homeTeam: {
        name: "Lakers",
        city: "Los Angeles",
        logo: "/logos/nba/los-angeles-lakers-default.svg",
      },
      awayTeam: {
        name: "Warriors",
        city: "Golden State",
        logo: "/logos/nba/golden-state-warriors-default.svg",
      },
      date: "Mar 21, 2025",
      time: "10:30 PM",
      network: "ESPN",
      betType: "Over/Under",
      betDetails: "Over 226.5",
      odds: "-105",
      confidence: 4, // Out of 5
      analysis: "Both teams rank in the top 10 for pace of play and offensive efficiency, while their defensive ratings have been below average in the last 5 games.",
    },
    {
      id: "3",
      homeTeam: {
        name: "Bruins",
        city: "Boston",
        logo: "/logos/nhl/boston-bruins.svg",
      },
      awayTeam: {
        name: "Maple Leafs",
        city: "Toronto",
        logo: "/logos/nhl/toronto-maple-leafs.svg",
      },
      date: "Mar 21, 2025",
      time: "7:00 PM",
      network: "TNT",
      betType: "Money Line",
      betDetails: "Maple Leafs",
      odds: "+140",
      confidence: 3.5, // Out of 5
      analysis: "Toronto has won 4 of the last 5 matchups between these teams, including two wins in Boston this season.",
    },
  ];

  return (
    <section className={`mb-8 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Top Picks</h2>
        {/* <Link href="/best-bets" className="text-sm text-orange-500 hover:text-orange-600">
          View all
        </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topPicks.map((pick) => (
          <PickCard key={pick.id} pick={pick} />
        ))}
      </div>
    </section>
  );
}

interface PickCardProps {
  pick: {
    id: string;
    homeTeam: {
      name: string;
      city: string;
      logo: string;
    };
    awayTeam: {
      name: string;
      city: string;
      logo: string;
    };
    date: string;
    time: string;
    network: string;
    betType: string;
    betDetails: string;
    odds: string;
    confidence: number;
    analysis: string;
  };
}

function PickCard({ pick }: PickCardProps) {
  // Confidence indicator rendering
  const renderConfidence = (confidence: number) => {
    const fullStars = Math.floor(confidence);
    const hasHalfStar = confidence % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        {hasHalfStar && (
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-star-gradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
      <Link href={`/games/${pick.id}`}>
        <CardHeader className="p-4 pb-2 space-y-0">
          {/* Teams and Game Info */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="flex space-x-2 items-center">
                <div className="w-8 h-8 relative">
                  {pick.awayTeam.logo && (
                    <div className="w-8 h-8 relative rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                      <Image 
                        src={pick.awayTeam.logo} 
                        alt={pick.awayTeam.name} 
                        fill
                        className="object-contain" 
                      />
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium">{pick.awayTeam.city}</span>
              </div>
              <span className="mx-2 text-xs text-gray-500">@</span>
              <div className="flex space-x-2 items-center">
                <div className="w-8 h-8 relative">
                  {pick.homeTeam.logo && (
                    <div className="w-8 h-8 relative rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                      <Image 
                        src={pick.homeTeam.logo} 
                        alt={pick.homeTeam.name} 
                        fill
                        className="object-contain" 
                      />
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium">{pick.homeTeam.city}</span>
              </div>
            </div>
            
            <Badge variant="outline" className="text-xs font-normal">
              {pick.network}
            </Badge>
          </div>
          
          {/* Date and Time */}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {pick.date} • {pick.time}
          </div>
        </CardHeader>
      </Link>
      
      <CardContent className="p-4 pt-2">
        {/* Bet Type and Odds */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {pick.betType}: <span className="text-orange-500">{pick.betDetails}</span>
            </span>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {pick.odds}
          </span>
        </div>
        
        {/* AI Confidence */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">AI Confidence</span>
          {renderConfidence(pick.confidence)}
        </div>
        
        {/* Analysis */}
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {pick.analysis}
        </p>
        
        {/* Actions */}
        {/* <div className="flex justify-between gap-2">
          <Button variant="default" size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
            Track Bet
          </Button>
          <Button variant="outline" size="sm" className="flex-1 border-orange-200 text-orange-500 hover:bg-orange-50 dark:border-gray-700 dark:hover:bg-gray-800">
            Full Analysis
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
}
