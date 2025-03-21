import { League } from '@/services/api-types';
import { getLeagueDisplayName } from '@/lib/utils';

export const ROUTES = {
  DASHBOARD: '/app',
  LEAGUES: {
    INDEX: '/app/leagues',
    DETAIL: (league: League) => `/app/leagues/${league}`,
    GAME: (league: League, gameId: string) => `/app/leagues/${league}/games/${gameId}`,
  },
  HISTORY: '/app/history',
  ACCOUNT: {
    INDEX: '/app/account',
    GENERAL: '/app/account/general',
    NOTIFICATIONS: '/app/account/notifications',
    BILLING: '/app/account/billing',
    ACTIVITY: '/app/account/activity',
    SECURITY: '/app/account/security',
  },
  BEST_BETS: '/app/best-bets',
  UI_KIT: '/app/ui-kit',
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
  ACCOUNT: {
    INDEX: { label: 'Account', href: ROUTES.ACCOUNT.INDEX },
    GENERAL: { label: 'General', href: ROUTES.ACCOUNT.GENERAL, isCurrentPage: true },
    NOTIFICATIONS: { label: 'Notifications', href: ROUTES.ACCOUNT.NOTIFICATIONS, isCurrentPage: true },
    BILLING: { label: 'Billing', href: ROUTES.ACCOUNT.BILLING, isCurrentPage: true },
    ACTIVITY: { label: 'Activity', href: ROUTES.ACCOUNT.ACTIVITY, isCurrentPage: true },
    SECURITY: { label: 'Security', href: ROUTES.ACCOUNT.SECURITY, isCurrentPage: true },
  },
  UI_KIT: { label: 'UI Kit', href: ROUTES.UI_KIT, isCurrentPage: true },
  // Add other breadcrumbs as needed
};

export function getBreadcrumbsForRoute(pathname: string, params?: Record<string, string>): BreadcrumbItem[] {
  // Default to dashboard breadcrumb
  if (pathname === ROUTES.DASHBOARD) {
    return [{ ...BREADCRUMBS.DASHBOARD, isCurrentPage: true }];
  }
  
  // League-specific breadcrumbs
  if (pathname.startsWith('/leagues') || pathname.includes('/app/leagues')) {
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
  
  // Account pages
  if (pathname.includes('/account')) {
    // Base breadcrumb for all account pages
    const baseBreadcrumbs = [
      { ...BREADCRUMBS.DASHBOARD, href: ROUTES.DASHBOARD },
      { ...BREADCRUMBS.ACCOUNT.INDEX, isCurrentPage: false }
    ];
    
    // Add specific page breadcrumb based on pathname
    if (pathname.includes('/account/general')) {
      return [...baseBreadcrumbs, BREADCRUMBS.ACCOUNT.GENERAL];
    }
    
    if (pathname.includes('/account/notifications')) {
      return [...baseBreadcrumbs, BREADCRUMBS.ACCOUNT.NOTIFICATIONS];
    }
    
    if (pathname.includes('/account/billing')) {
      return [...baseBreadcrumbs, BREADCRUMBS.ACCOUNT.BILLING];
    }
    
    if (pathname.includes('/account/activity')) {
      return [...baseBreadcrumbs, BREADCRUMBS.ACCOUNT.ACTIVITY];
    }
    
    if (pathname.includes('/account/security')) {
      return [...baseBreadcrumbs, BREADCRUMBS.ACCOUNT.SECURITY];
    }
    
    // Default account page (index)
    return [...baseBreadcrumbs, { ...BREADCRUMBS.ACCOUNT.INDEX, isCurrentPage: true }];
  }
  
  // History page
  if (pathname.includes('/history')) {
    return [
      { ...BREADCRUMBS.DASHBOARD, href: ROUTES.DASHBOARD },
      BREADCRUMBS.HISTORY
    ];
  }
  
  // UI Kit page
  if (pathname.includes('/ui-kit')) {
    return [
      { ...BREADCRUMBS.DASHBOARD, href: ROUTES.DASHBOARD },
      BREADCRUMBS.UI_KIT
    ];
  }
  
  // Default fallback
  return [{ ...BREADCRUMBS.DASHBOARD, isCurrentPage: true }];
}
