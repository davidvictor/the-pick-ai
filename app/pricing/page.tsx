import { MarketingPageLayout } from '@/components/marketing/page-layout';
import { getStripeProducts, getStripePrices } from '@/lib/payments/stripe';
import { appConfig } from '@/lib/app-config';
import { PricingContent } from './pricing-client';
import { withDynamicRendering } from '@/lib/hoc/with-dynamic-rendering';

// Define interfaces for Stripe data structures
interface StripeProduct {
  id: string;
  name: string;
  description?: string | null;
  defaultPriceId?: string;
}

interface StripePrice {
  id: string;
  productId: string;
  unitAmount: number | null;
  currency: string;
  interval?: string;
  trialPeriodDays?: number | null;
}

// PricingPage needs dynamic rendering since it fetches data from Stripe
async function PricingPage() {
  // Default values from app config to use as fallbacks
  const defaultConfig = {
    basePlan: {
      name: 'Base Plan',
      id: appConfig.stripe.products.basicPlanId,
      description: 'Essential features for casual bettors'
    } as StripeProduct,
    plusPlan: {
      name: 'Premium Plan',
      id: appConfig.stripe.products.premiumPlanId,
      description: 'Advanced features for serious bettors'
    } as StripeProduct,
    basePrice: {
      id: appConfig.stripe.prices.basicPriceId,
      productId: appConfig.stripe.products.basicPlanId,
      unitAmount: 800, // $8.00
      currency: 'usd',
      interval: 'month',
      trialPeriodDays: 14
    } as StripePrice,
    plusPrice: {
      id: appConfig.stripe.prices.premiumPriceId,
      productId: appConfig.stripe.products.premiumPlanId,
      unitAmount: 1200, // $12.00
      currency: 'usd',
      interval: 'month',
      trialPeriodDays: 14
    } as StripePrice
  };

  let products: StripeProduct[] = [];
  let prices: StripePrice[] = [];
  let basePlan: StripeProduct | undefined;
  let plusPlan: StripeProduct | undefined;
  let basePrice: StripePrice | undefined;
  let plusPrice: StripePrice | undefined;

  try {
    // Fetch products and prices from Stripe
    products = await getStripeProducts();
    prices = await getStripePrices();
    
    // Find the specific products based on their IDs in app config
    // Explicitly assigning to constants first to make TypeScript happy
    const foundBasePlan = products.find(p => p.id === appConfig.stripe.products.basicPlanId);
    const foundPlusPlan = products.find(p => p.id === appConfig.stripe.products.premiumPlanId);
    
    basePlan = foundBasePlan;
    plusPlan = foundPlusPlan;
    
    // First try to get prices using the default price IDs from the products
    // If that fails, fall back to the specific price IDs from app config
    if (foundBasePlan && foundBasePlan.defaultPriceId) {
      basePrice = prices.find(p => p.id === foundBasePlan.defaultPriceId);
    }
    
    if (!basePrice) {
      basePrice = prices.find(p => p.id === appConfig.stripe.prices.basicPriceId);
    }
    
    if (foundPlusPlan && foundPlusPlan.defaultPriceId) {
      plusPrice = prices.find(p => p.id === foundPlusPlan.defaultPriceId);
    }
    
    if (!plusPrice) {
      plusPrice = prices.find(p => p.id === appConfig.stripe.prices.premiumPriceId);
    }
    
    // Add warnings if products or prices aren't found
    if (!basePlan || !plusPlan || !basePrice || !plusPrice) {
      console.warn("Some Stripe products or prices were not found. Check your app-config.ts values.");
    }
  } catch (error) {
    console.error("Error fetching Stripe data:", error);
    // Use fallback values in case of error
    basePlan = defaultConfig.basePlan;
    plusPlan = defaultConfig.plusPlan;
    basePrice = defaultConfig.basePrice;
    plusPrice = defaultConfig.plusPrice;
  }
  
  return (
    <MarketingPageLayout
      title="Pricing Plans"
      subtitle="Choose the plan that works best for your betting needs. All plans include a free trial."
    >
      <PricingContent 
        products={products}
        prices={prices}
        basePlan={basePlan}
        plusPlan={plusPlan}
        basePrice={basePrice}
        plusPrice={plusPrice}
      />
      
      {/* Additional information section */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I change plans later?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference immediately. If you downgrade, the change will take effect at the end of your current billing cycle.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What happens after my free trial?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              After your free trial period ends, your account will automatically be charged for the plan you selected. You can cancel anytime before the trial ends to avoid being charged.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Is there a refund policy?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We offer a 14-day money-back guarantee. If you're not satisfied with our service, contact our support team within 14 days of your initial purchase for a full refund.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact information */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Need help choosing a plan?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Our team is ready to help you find the perfect plan for your needs.
        </p>
        <a 
          href="mailto:support@thepick.ai" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600"
        >
          Contact us at support@thepick.ai
        </a>
      </div>
    </MarketingPageLayout>
  );
}

// Apply dynamic rendering to the component
export default withDynamicRendering(PricingPage);
