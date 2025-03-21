"use client";

import { ReactNode } from 'react';
import { MarketingHeader } from './header';
import { MarketingFooter } from './footer';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function MarketingPageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-grow bg-white dark:bg-gray-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300">
            {children}
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
