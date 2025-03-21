"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from 'next-themes';
import { ROUTES } from '@/lib/routes';
import { useUser } from '@/lib/auth';

export function MarketingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userPromise } = useUser();

  // Separate effect for user authentication
  useEffect(() => {
    if (userPromise) {
      // Handle the promise in a try/catch block
      const checkAuth = async () => {
        try {
          const user = await userPromise;
          setIsAuthenticated(!!user);
        } catch (error) {
          console.error('Error checking authentication:', error);
          setIsAuthenticated(false);
        }
      };
      
      checkAuth();
    }
  }, [userPromise]);
  
  // Render auth button based on authentication state
  const renderAuthButton = () => {
    if (isAuthenticated) {
      return (
        <Button asChild variant="outline" className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-700">
          <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
        </Button>
      );
    } else {
      return (
        <Button asChild variant="outline" className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-700">
          <Link href="/auth?mode=signin">Sign In</Link>
        </Button>
      );
    }
  };

  return (
    <header className="marketing w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
              <div className='logo'></div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            About
          </Link>
          <ThemeToggle />
          {renderAuthButton()}
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link 
              href="/pricing" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isAuthenticated ? (
              <Link 
                href={ROUTES.DASHBOARD}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                href="/sign-in" 
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
            <Link 
              href="/sign-up" 
              className="block rounded-md px-3 py-2 text-base font-medium text-white bg-orange-500 hover:bg-orange-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
            <div className="block rounded-md px-3 py-2 mt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
