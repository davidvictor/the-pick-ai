'use client';

import { ReactNode } from "react";
import { GameServiceProvider } from "@/services/game-service-context";

interface LeaguesLayoutProps {
  children: ReactNode;
}

export default function LeaguesLayout({ children }: LeaguesLayoutProps) {
  return (
    <GameServiceProvider useMockData={true}>
      {children}
    </GameServiceProvider>
  );
}
