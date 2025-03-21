/**
 * Application-wide configuration settings
 */
export const appConfig = {
  /**
   * Footer configuration
   */
  footer: {
    /**
     * Legal text displayed in the footer
     */
    legalText: "© 2025 The Pick, Inc. All rights reserved. This platform is meant for entertainment purposes only. If you or someone you know has a gambling problem and wants help, call 1-800-GAMBLER."
  },
  
  /**
   * Loading configuration
   */
  loading: {
    /**
     * Whether to simulate loading states (useful for development and testing)
     */
    simulateLoading: true,
    
    /**
     * Default loading time in milliseconds
     */
    defaultLoadingTime: 1500,
    
    /**
     * Specific loading times for different operations (in milliseconds)
     */
    times: {
      /**
       * Page loading time
       */
      page: 1500,
      
      /**
       * API request loading times
       */
      api: {
        getGamesByLeague: 300,
        getAvailableLeagues: 200,
        getGameById: 300,
        getGameDetails: 500
      }
    }
  }
};
