"use client";

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function AppPreview() {
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('/logo-light.svg');
  
  useEffect(() => {
    setLogoSrc(resolvedTheme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg');
  }, [resolvedTheme]);
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Mobile app frame */}
          <div className="relative max-w-[380px] w-full">
            {/* Phone frame */}
            <div className="rounded-[32px] bg-gray-200 dark:bg-gray-900 p-4 shadow-xl border border-gray-300 dark:border-gray-800">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 mt-4 px-4">
                <div className="w-20 h-8 relative">
                  <Image 
                    src={logoSrc} 
                    alt="The Pick" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
              
              {/* League tabs */}
              <div className="flex space-x-4 mb-8 justify-center">
                <div className="w-10 h-10 relative">
                  <Image 
                    src="/logos/league/nfl.svg" 
                    alt="NFL"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="w-10 h-10 relative opacity-40">
                  <Image 
                    src="/logos/league/nba.svg" 
                    alt="NBA"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="w-10 h-10 relative opacity-40">
                  <Image 
                    src="/logos/league/mlb.svg" 
                    alt="MLB"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="w-10 h-10 relative opacity-40">
                  <Image 
                    src="/logos/league/nhl.svg" 
                    alt="NHL"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Game details */}
              <div className="px-4 pb-2">
                {/* Time and channel */}
                <div className="flex justify-between mb-6">
                  <div className="px-3 py-1 bg-gray-300 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    5:15 PM
                  </div>
                  <div className="px-3 py-1 bg-gray-300 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    NOV 26
                  </div>
                  <div className="px-3 py-1 bg-gray-300 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    FOX
                  </div>
                </div>
                
                {/* Teams */}
                <div className="flex justify-between mb-6">
                  <Card className="p-4 bg-gray-300 dark:bg-gray-800 border-0 w-[45%] flex flex-col items-center">
                    <div className="w-16 h-16 relative mb-2">
                      <Image 
                        src="/logos/nfl/kansas-city-chiefs.svg" 
                        alt="Kansas City Chiefs"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">KC</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Chiefs</div>
                  </Card>
                  <Card className="p-4 bg-gray-300 dark:bg-gray-800 border-none w-[45%] flex flex-col items-center border-orange-500 border-2">
                    <div className="w-16 h-16 relative mb-2">
                      <Image 
                        src="/logos/nfl/la-rams.svg" 
                        alt="Los Angeles Rams"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">LA</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Rams</div>
                  </Card>
                </div>
                
                {/* The Pick */}
                <Card className="p-4 bg-gray-300 dark:bg-gray-800 border-orange-500 border mb-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Spread +6</div>
                    <div className="text-lg font-bold text-orange-500">-115</div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">CAESARS</div>
                </Card>
                
                {/* Share button */}
                <div className="flex justify-center mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-800 rounded-md text-sm text-gray-700 dark:text-gray-300">
                    <span>Share</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Your picks, right at your fingertips
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Get instant access to AI-powered betting insights for all major sports leagues. 
              Our app delivers the highest-value picks directly to you, with real-time updates 
              and detailed analysis to help you make informed decisions.
            </p>
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white gap-3">
                <span>This week</span>
                <span className="font-bold text-orange-500">+32% ROI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
