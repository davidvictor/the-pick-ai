"use client";

import { useState, useEffect } from "react";
import { useGameService } from "@/services/game-service-context";

/**
 * Hook to track the loading state of leagues data
 * @returns Object with isLoading state
 */
export function useLeaguesLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const gameService = useGameService();

  useEffect(() => {
    // Simulate loading time for leagues data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading
  };
}
