"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative pt-16 pb-20 overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(67, 67, 67, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Win percentage banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 text-sm">
            <span className="mr-2 text-gray-500 dark:text-gray-400">All Time Win Percentage</span>
            <span className="font-semibold text-orange-500">62.7%</span>
          </div>
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          <span className="block">AI-Powered Bets</span>
          <span className="block text-orange-500">That Win</span>
        </h1>
        
        {/* Subheading */}
        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Win More, Stress Less:</span> Our AI scours the web in real-time to find the best value bets 🔍, 
            delivering winning insights straight to your pocket through our exclusive Telegram group 🔥.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-medium">
            <Link href="/sign-up">Get The Picks</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 px-8 py-6 text-lg font-medium">
            <Link href="/history">View Bet History</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
