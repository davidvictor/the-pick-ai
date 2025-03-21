"use client";

import { useState, useEffect } from "react";
import { appConfig } from "@/lib/app-config";

/**
 * Options for the useSimulatedLoading hook
 */
export interface UseSimulatedLoadingOptions {
  /**
   * Custom loading time in milliseconds
   * If not provided, the default loading time from app config will be used
   */
  loadingTime?: number;
  
  /**
   * Whether to start loading immediately
   * @default true
   */
  startImmediately?: boolean;
  
  /**
   * Whether to override the global simulateLoading setting
   * @default false
   */
  forceSimulation?: boolean;
}

/**
 * Hook for simulating loading states
 * 
 * @param options Configuration options for the loading simulation
 * @returns Object with loading state and functions to control it
 */
export function useSimulatedLoading(options: UseSimulatedLoadingOptions = {}) {
  const {
    loadingTime,
    startImmediately = true,
    forceSimulation = false
  } = options;
  
  const [loading, setLoading] = useState(startImmediately);
  
  /**
   * Start the loading simulation
   */
  const startLoading = () => {
    setLoading(true);
  };
  
  /**
   * Stop the loading simulation immediately
   */
  const stopLoading = () => {
    setLoading(false);
  };
  
  /**
   * Simulate a loading state for the specified time
   * @param customTime Optional custom loading time in milliseconds
   * @returns Promise that resolves when the loading is complete
   */
  const simulateLoading = async (customTime?: number): Promise<void> => {
    // Don't simulate if disabled in config (unless forced)
    if (!appConfig.loading.simulateLoading && !forceSimulation) {
      return Promise.resolve();
    }
    
    // Determine the loading time to use
    const timeToUse = customTime || 
                      loadingTime || 
                      appConfig.loading.defaultLoadingTime;
    
    setLoading(true);
    
    return new Promise(resolve => {
      const timer = setTimeout(() => {
        setLoading(false);
        resolve();
      }, timeToUse);
      
      // Return cleanup function
      return () => clearTimeout(timer);
    });
  };
  
  // If startImmediately is true, start the loading simulation
  useEffect(() => {
    if (startImmediately) {
      let timer: NodeJS.Timeout;
      
      // Only simulate if enabled in config (or forced)
      if (appConfig.loading.simulateLoading || forceSimulation) {
        timer = setTimeout(() => {
          setLoading(false);
        }, loadingTime || appConfig.loading.defaultLoadingTime);
      } else {
        // If simulation is disabled, don't show loading state
        setLoading(false);
      }
      
      // Cleanup function
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [startImmediately, loadingTime, forceSimulation]);
  
  return {
    loading,
    startLoading,
    stopLoading,
    simulateLoading
  };
}

/**
 * Helper function to simulate a loading delay
 * Useful for API calls and other async operations
 * 
 * @param operation The name of the operation (used to look up specific loading times)
 * @param customTime Optional custom loading time in milliseconds
 * @returns Promise that resolves after the delay
 */
export async function simulateLoadingDelay(
  operation?: keyof typeof appConfig.loading.times.api,
  customTime?: number
): Promise<void> {
  // Don't simulate if disabled in config
  if (!appConfig.loading.simulateLoading) {
    return Promise.resolve();
  }
  
  // Determine the loading time to use
  let timeToUse = customTime || appConfig.loading.defaultLoadingTime;
  
  // If an operation is specified, try to get its specific loading time
  if (operation && appConfig.loading.times.api[operation]) {
    timeToUse = appConfig.loading.times.api[operation];
  }
  
  // Return a promise that resolves after the delay
  return new Promise(resolve => setTimeout(resolve, timeToUse));
}
