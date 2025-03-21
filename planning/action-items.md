# Action Items for Frontend Integration

This document outlines specific tasks that need to be completed for each step of the integration plan.

## Step 1: Dependencies & Configuration

- [ ] Compare and merge package.json dependencies
  - [ ] Identify overlapping packages
  - [ ] Resolve version conflicts
  - [ ] Add missing dependencies from frontend-temp

- [ ] Update tailwind.config.ts
  - [ ] Add frontend-temp content paths
  - [ ] Merge theme configurations
  - [ ] Add any custom plugins needed

- [ ] Update tsconfig.json
  - [ ] Add path aliases for new component directories
  - [ ] Ensure consistent compiler options

## Step 2: Layouts & Providers

- [ ] Update root layout.tsx
  - [ ] Add Geist font imports
  - [ ] Integrate ThemeProvider from frontend-temp
  - [ ] Maintain UserProvider for authentication

- [ ] Update dashboard layout
  - [ ] Integrate the app sidebar from frontend-temp
  - [ ] Add sports navigation items
  - [ ] Maintain existing user menu and authentication UI

- [ ] Create combined providers component
  - [ ] Wrap UserProvider and GameServiceProvider together
  - [ ] Ensure theme provider works for both interfaces

## Step 3: Component Integration

- [ ] Create components/sports/ directory
  - [ ] Move game-card components
  - [ ] Move game-details components
  - [ ] Move history components
  - [ ] Move nav components

- [ ] Resolve component conflicts
  - [ ] Compare and consolidate duplicate UI components
  - [ ] Ensure consistent styling across components
  - [ ] Update imports in moved components

## Step 4: Route Integration

- [ ] Move frontend-temp pages into dashboard route group
  - [ ] Create app/(dashboard)/dashboard/sports/ directory
  - [ ] Move best-bets page
  - [ ] Move leagues pages
  - [ ] Move history page

- [ ] Update navigation references in all moved pages
  - [ ] Fix imports for components
  - [ ] Update links and routing

- [ ] Add auth protection
  - [ ] Ensure all new routes use the same auth pattern as existing dashboard routes

## Step 5: Services & Data Integration

- [ ] Create lib/sports/ directory
  - [ ] Move services/ directory content
  - [ ] Move lib/mock-data files
  - [ ] Move lib/team-utils and related files

- [ ] Update imports in all moved services
  - [ ] Fix relative paths
  - [ ] Update component imports

- [ ] Connect to authentication
  - [ ] Modify GameServiceProvider to use auth context
  - [ ] Prepare hooks for future API integration

## Step 6: Style Integration

- [ ] Move custom CSS files
  - [ ] Review and merge global.css files
  - [ ] Move frontend-temp/styles/ files to appropriate locations

- [ ] Ensure theme consistency
  - [ ] Test dark/light mode across all components
  - [ ] Verify color scheme compatibility

## Step 7: Testing & Quality Assurance

- [ ] Test authentication flow with new routes
- [ ] Verify all sports betting pages load correctly
- [ ] Test responsive design across device sizes
- [ ] Check for styling inconsistencies
- [ ] Verify navigation between original and new sections
