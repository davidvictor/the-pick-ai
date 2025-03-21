'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  gameTitle: string | null;
  setGameTitle: (title: string | null) => void;
  backRoute: string | null;
  setBackRoute: (route: string | null) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [gameTitle, setGameTitle] = useState<string | null>(null);
  const [backRoute, setBackRoute] = useState<string | null>(null);
  
  return (
    <HeaderContext.Provider value={{ 
      gameTitle, 
      setGameTitle, 
      backRoute, 
      setBackRoute 
    }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
