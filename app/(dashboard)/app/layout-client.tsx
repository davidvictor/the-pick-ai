'use client';

import { GameServiceProvider } from "@/services/game-service-context";

/**
 * Client component for app routes
 * This handles UI concerns like the GameServiceProvider
 */
export default function AppClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameServiceProvider useMockData={true}>
      {children}
    </GameServiceProvider>
  );
}
