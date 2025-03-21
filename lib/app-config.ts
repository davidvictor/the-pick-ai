/**
 * Application-wide configuration settings
 */
export const appConfig = {
  /**
   * Stripe payment configuration
   */
  stripe: {
    /**
     * Product and price IDs for subscription plans
     * Update these when products change in Stripe dashboard
     */
    products: {
      /**
       * Basic subscription product ID
       */
      basicPlanId: "prod_RyrOLOw8EFSzTN",
      
      /**
       * Premium subscription product ID
       */
      premiumPlanId: "prod_RyrO9jCfWmK2IQ"
    },
    /**
     * Price IDs for subscription plans (manually configured)
     * For direct checkout actions
     */
    prices: {
      /**
       * Basic subscription default price ID
       * The actual price ID from Stripe - DO NOT use placeholder names
       */
      basicPriceId: "price_1OvyRVGSwrLIvPpQl6uJozfL",

      /**
       * Premium subscription default price ID
       * This is used for the "Upgrade to Pro" button
       * The actual price ID from Stripe - DO NOT use placeholder names
       */
      premiumPriceId: "price_1R4tg7GLlAJZMxRMq7yU9k6y"
    }
  },
  
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
    simulateLoading: false,
    
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
