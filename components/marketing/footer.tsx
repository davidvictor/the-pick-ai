"use client";

import Link from 'next/link';
import Image from 'next/image';
import { appConfig } from "@/lib/app-config";
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function MarketingFooter() {
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('/logo-light.svg');
  
  useEffect(() => {
    setLogoSrc(resolvedTheme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg');
  }, [resolvedTheme]);
  return (
    <footer className="marketing w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <div className='logo'></div>
            </Link>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              AI-powered sports betting predictions to help you win more consistently.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Pricing
                </Link>
              </li>
              {/* <li>
                <Link href="/history" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Bet History
                </Link>
              </li> */}
              <li>
                <Link href="/sign-up" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Leagues
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/leagues/nfl" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  NFL
                </Link>
              </li>
              <li>
                <Link href="/leagues/nba" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  NBA
                </Link>
              </li>
              <li>
                <Link href="/leagues/mlb" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  MLB
                </Link>
              </li>
              <li>
                <Link href="/leagues/nhl" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  NHL
                </Link>
              </li>
              <li>
                <Link href="/leagues/ncaa" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  NCAA
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {appConfig.footer.legalText}
          </p>
        </div>
      </div>
    </footer>
  );
}
