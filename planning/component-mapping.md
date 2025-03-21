# Component Mapping for Integration

This document maps the frontend-temp components to their new locations in the integrated project and identifies potential conflicts.

## Component Relocation Map

| Frontend-temp Component | New Location | Notes |
|-------------------------|--------------|-------|
| `frontend-temp/components/game-card/*` | `components/sports/game-card/*` | Maintain folder structure |
| `frontend-temp/components/game-details/*` | `components/sports/game-details/*` | Maintain folder structure |
| `frontend-temp/components/history/*` | `components/sports/history/*` | Maintain folder structure |
| `frontend-temp/components/nav/*` | `components/sports/nav/*` | Might conflict with existing nav |
| `frontend-temp/components/ui/*` | Review for conflicts | See UI conflicts section |

## UI Component Conflicts

| Component | Frontend-temp | Main Project | Resolution Strategy |
|-----------|---------------|--------------|---------------------|
| Button | `frontend-temp/components/ui/button.tsx` | `components/ui/button.tsx` | Use main project component and update styling |
| Card | `frontend-temp/components/ui/card.tsx` | `components/ui/card.tsx` | Use main project component and update styling |
| Avatar | `frontend-temp/components/ui/avatar.tsx` | `components/ui/avatar.tsx` | Use main project component and update styling |
| Dropdown | `frontend-temp/components/ui/dropdown-menu.tsx` | `components/ui/dropdown-menu.tsx` | Use main project component and update styling |
| Input | `frontend-temp/components/ui/input.tsx` | `components/ui/input.tsx` | Use main project component and update styling |

## New Route Structure

```
app/
  ├── (dashboard)/
  │   └── dashboard/
  │       ├── activity/
  │       ├── settings.tsx
  │       └── sports/ (new)
  │           ├── best-bets/
  │           │   └── page.tsx
  │           ├── history/
  │           │   └── page.tsx
  │           ├── leagues/
  │           │   ├── page.tsx
  │           │   └── [league]/
  │           │       └── page.tsx
  │           └── page.tsx (redirects to best-bets)
  ├── (login)/
```

## Provider Hierarchy

After integration, the provider hierarchy will be:

```
RootLayout
├── UserProvider (auth)
│   └── Theme/StyleProviders
│       └── GameServiceProvider (for sports data)
│           └── Page Content
```

## Component Dependencies

Key component dependencies to address:

1. **Game Card Components**:
   - Depend on game service context
   - Use team utilities
   - Use UI components like buttons, cards

2. **Navigation Components**:
   - Need to integrate with authentication state
   - Must work within dashboard layout
   - Should preserve existing navigation items

3. **History Components**:
   - Depend on mock data and history services
   - Will need to connect to real user data eventually

## Services Integration

| Frontend-temp Service | New Location | Integration Notes |
|------------------------|---------------|------------------|
| `services/api-game-service.ts` | `lib/sports/services/api-game-service.ts` | Will need auth context |
| `services/mock-game-service.ts` | `lib/sports/services/mock-game-service.ts` | For development only |
| `services/game-service-context.tsx` | `lib/sports/services/game-service-context.tsx` | Update provider imports |

## Mock Data Integration

| Frontend-temp Mock Data | New Location | Notes |
|------------------------|---------------|-------|
| `lib/mock-data-*.ts` | `lib/sports/mock-data/` | Consolidate in one folder |
| `lib/teams/*` | `lib/sports/teams/` | Keep together |
| `lib/bet-*.ts` | `lib/sports/bets/` | Organize in one place |

This mapping provides a clear reference for the integration process, helping to identify potential conflicts and dependencies in advance.
