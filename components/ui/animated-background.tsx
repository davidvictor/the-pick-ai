'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface AnimatedBackgroundProps {
  className?: string;
  itemDensity?: number; // Number of items per row
  refreshInterval?: number; // Time in ms between content refreshes
  minDuration?: number; // Minimum animation duration in seconds
  maxDuration?: number; // Maximum animation duration in seconds
}

/**
 * A reusable animated background component with betting line animations
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  itemDensity = 30,
  refreshInterval = 60000,
  minDuration = 350,
  maxDuration = 1800,
}) => {
  useEffect(() => {
    // Function to get a random number within a range (inclusive)
    const getRandomInRange = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Function to get a random number with specified step (e.g., 0.5)
    const getRandomWithStep = (min: number, max: number, step: number): number => {
      const steps = Math.floor((max - min) / step) + 1;
      return min + (Math.floor(Math.random() * steps) * step);
    };

    // Function to get a random animation duration
    const getRandomDuration = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    // Teams array
    const teams = [
      // East Coast
      "NY", "BOS", "PHI", "WAS", "MIA", "ORL", "ATL", "CHA", "BUF", "BAL", "PIT", "CLE", 
      "DET", "TOR", "NJ", "BKN", "TB", "JAX", "DC",
      
      // Central
      "CHI", "MIN", "MIL", "IND", "CIN", "STL", "KC", "NO", "MEM", "NSH", "OKC", "SA", 
      "DAL", "HOU", "DEN", "SLC", "COL",
      
      // West Coast
      "LA", "SF", "SEA", "POR", "SAC", "PHX", "LV", "SD", "AZ", "PDX", "SJ", "OAK", "ANA",
      
      // Other Major Markets
      "CLT", "CBJ", "DET", "EDM", "CGY", "MTL", "OTT", "VAN", "WPG", "CAR", "NAS", "TEN",
      "UTH", "GSW", "LAC", "LAL", "VGK", "AUS", "CLB", "RSL", "POR", "MIA", "NYC", "ATX"
    ];

    // Generate random odds for spreads and totals
    const generateOdds = (isMoneyline = false): string => {
      // For moneylines, generate more varied odds
      if (isMoneyline) {
        const isFavorite = Math.random() < 0.5;
        if (isFavorite) {
          // Favorites: -120 to -500
          const odds = getRandomInRange(120, 500);
          return `-${odds}`;
        } else {
          // Underdogs: +100 to +400
          const odds = getRandomInRange(100, 400);
          return `+${odds}`;
        }
      }
      
      // For spreads and totals, use standard odds
      // Include both positive and negative values
      const standardOdds = [
        // Negative odds (favorites)
        -105, -107, -108, -110, -112, -113, -115, -118, -120,
        // Positive odds (underdogs)
        100, 105, 107, 110, 115, 120
      ];
      
      const selectedOdds = standardOdds[Math.floor(Math.random() * standardOdds.length)];
      
      // Format with proper sign
      if (selectedOdds >= 0) {
        return `(+${selectedOdds})`;
      } else {
        return `(${selectedOdds})`;
      }
    };

    // Generate a random point spread with appropriate odds
    const generateSpread = (): string => {
      // Common spreads are usually between 1 and 14 points, with 0.5 increments
      const spreadValue = getRandomWithStep(1, 14, 0.5);
      const isFavorite = Math.random() < 0.5;
      const odds = generateOdds();
      
      if (isFavorite) {
        return `-${spreadValue} ${odds}`;
      } else {
        return `+${spreadValue} ${odds}`;
      }
    };

    // Generate a random moneyline
    const generateMoneyline = (): string => {
      const odds = generateOdds(true);
      return `${odds} ML`;
    };

    // Generate a random over/under total based on sport type
    const generateOverUnder = (): string => {
      // Randomly choose a sport type to determine appropriate total ranges
      const sportType = Math.floor(Math.random() * 4); // 0: NBA, 1: NFL, 2: MLB, 3: NHL
      
      let total;
      switch (sportType) {
        case 0: // NBA - typically 200-240 points
          total = getRandomWithStep(200, 240, 0.5);
          break;
        case 1: // NFL - typically 37-55 points
          total = getRandomWithStep(37, 55, 0.5);
          break;
        case 2: // MLB - typically 7-11 runs
          total = getRandomWithStep(7, 11, 0.5);
          break;
        case 3: // NHL - typically 5-7 goals
          total = getRandomWithStep(5, 7, 0.5);
          break;
        default:
          total = getRandomWithStep(100, 110, 0.5); // Fallback
      }
      
      const isOver = Math.random() < 0.5;
      const odds = generateOdds();
      
      if (isOver) {
        return `O ${total} ${odds}`;
      } else {
        return `U ${total} ${odds}`;
      }
    };

    // Main function to generate a random betting line
    const getRandomBettingLine = (): string => {
      const team = teams[Math.floor(Math.random() * teams.length)];
      
      // Randomly choose a bet type: 0 = spread, 1 = moneyline, 2 = over/under
      const betType = Math.floor(Math.random() * 3);
      
      let line;
      switch (betType) {
        case 0:
          line = generateSpread();
          break;
        case 1:
          line = generateMoneyline();
          break;
        case 2:
          line = generateOverUnder();
          break;
        default:
          line = generateMoneyline();
      }
      
      return `${team} ${line}`;
    };

    // Calculate the number of rows needed to fill the screen
    const calculateRowCount = (): number => {
      const availHeight = window.innerHeight;
      const rowHeight = 30; // Height of each row in pixels
      const calculatedRows = Math.ceil(availHeight / rowHeight) + 2; // Add 2 extra rows for safety
      return calculatedRows;
    };

    // Generate rows with betting lines
    const createRows = (): void => {
      const container = document.getElementById('bg-moneyline');
      if (!container) return;
      
      // Calculate how many rows we need
      const rowCount = calculateRowCount();
      
      // Clear container
      container.innerHTML = '';
      
      for (let i = 0; i < rowCount; i++) {
        // Create row container
        const rowElement = document.createElement('div');
        rowElement.className = `marquee ${i % 2 === 0 ? 'even-row' : 'odd-row'}`;
        
        // Assign a random duration between minDuration and maxDuration
        const duration = getRandomDuration(minDuration, maxDuration);
        rowElement.style.setProperty('--duration', `${duration}s`);
        
        // Generate betting items
        let rowContent = '';
        for (let j = 0; j < itemDensity; j++) {
          rowContent += `<span class="betting-item">${getRandomBettingLine()}</span>`;
        }
        
        // Create first content element
        const contentOne = document.createElement('div');
        contentOne.className = 'marquee__content';
        contentOne.innerHTML = rowContent;
        
        // Create second content element (identical to the first)
        const contentTwo = document.createElement('div');
        contentTwo.className = 'marquee__content';
        contentTwo.setAttribute('aria-hidden', 'true');
        contentTwo.innerHTML = rowContent;
        
        // Add content elements to row
        rowElement.appendChild(contentOne);
        rowElement.appendChild(contentTwo);
        
        // Add to DOM
        container.appendChild(rowElement);
      }
    };

    // Function to periodically refresh some of the betting lines
    const refreshSomeContent = (): void => {
      const contentElements = document.querySelectorAll('.marquee__content');
      
      contentElements.forEach(element => {
        // Get all betting items in this content
        const bettingItems = element.querySelectorAll('.betting-item');
        
        // Replace about 30% of the items with new betting lines
        const itemsToReplace = Math.floor(bettingItems.length * 0.3);
        const startIndex = Math.floor(Math.random() * (bettingItems.length - itemsToReplace));
        
        for (let i = 0; i < itemsToReplace; i++) {
          const itemIndex = (startIndex + i) % bettingItems.length;
          if (bettingItems[itemIndex]) {
            bettingItems[itemIndex].textContent = getRandomBettingLine();
          }
        }
      });
    };

    // Initialize
    createRows();
    
    // Set up periodic content refresh
    const intervalId = setInterval(refreshSomeContent, refreshInterval);
    
    // Clean up on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [itemDensity, refreshInterval, minDuration, maxDuration]);

  return (
    <div className={cn("bg-moneyline-container relative", className)}>
      <div className="bg-moneyline" id="bg-moneyline"></div>
    </div>
  );
};

export default AnimatedBackground;
