import { League } from '@/services/api-types';
import { getLeagueDisplayName } from '@/lib/utils';

export const ROUTES = {
  DASHBOARD: '/dashboard',
  LEAGUES: {
    INDEX: '/leagues',
    DETAIL: (league: League) => `/leagues/${league}`,
    GAME: (league: League, gameId: string) => `/leagues/${league}/games/${gameId}`,
  },
  HISTORY: '/dashboard/history',
  ACCOUNT: '/dashboard/account',
  BEST_BETS: '/dashboard/best-bets',
  // Add other routes as needed
};

export interface BreadcrumbItem {
  href?: string;
  label: string;
  isCurrentPage?: boolean;
  className?: string;
}

export const BREADCRUMBS = {
  DASHBOARD: { label: 'Dashboard', href: ROUTES.DASHBOARD },
  LEAGUES: { 
    INDEX: { label: 'Leagues', href: ROUTES.LEAGUES.INDEX },
    DETAIL: (league: League) => ({ 
      label: getLeagueDisplayName(league), 
      href: ROUTES.LEAGUES.DETAIL(league),
      isCurrentPage: true
    })
  },
  HISTORY: { label: 'History', href: ROUTES.HISTORY, isCurrentPage: true },
  // Add other breadcrumbs as needed
};

export function getBreadcrumbsForRoute(pathname: string, params?: Record<string, string>): BreadcrumbItem[] {
  // Default to dashboard breadcrumb
  if (pathname === ROUTES.DASHBOARD) {
    return [{ ...BREADCRUMBS.DASHBOARD, isCurrentPage: true }];
  }
  
  // League-specific breadcrumbs
  if (pathname.startsWith('/leagues') || pathname.includes('/dashboard/leagues')) {
    const league = params?.league as League;
    
    if (league) {
      // Check if we're on a game detail page
      if (pathname.includes('/games/') && params?.gameId) {
        // Game detail page - we don't have the game title here, that will be updated by the component
        return [
          { ...BREADCRUMBS.DASHBOARD, href: ROUTES.DASHBOARD },
          { label: 'Leagues', href: ROUTES.LEAGUES.INDEX, className: "hidden md:block" },
          { label: getLeagueDisplayName(league), href: ROUTES.LEAGUES.DETAIL(league) },
          { label: 'Game Details', isCurrentPage: true }
        ];
      }
      
      // League detail page
      return [
        { ...BREADCRUMBS.DASHBOARD, href: ROUTES.DASHBOARD },
        { label: 'Leagues', href: ROUTES.LEAGUES.INDEX, className: "hidden md:block" },
        BREADCRUMBS.LEAGUES.DETAIL(league)
      ];
    }
    
    // Leagues index page
    return [
      { ...BREADCRUMBS.DASHBOARD, href: ROUTES.DASHBOARD },
      { ...BREADCRUMBS.LEAGUES.INDEX, isCurrentPage: true }
    ];
  }
  
  // History page
  if (pathname.includes('/history')) {
    return [
      { ...BREADCRUMBS.DASHBOARD, href: ROUTES.DASHBOARD },
      BREADCRUMBS.HISTORY
    ];
  }
  
  // Default fallback
  return [{ ...BREADCRUMBS.DASHBOARD, isCurrentPage: true }];
}
