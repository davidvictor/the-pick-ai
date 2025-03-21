import { redirect } from 'next/navigation';
import { getUserForAppRouter } from '@/lib/db/queries';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { customerPortalAction, checkoutAction } from '@/lib/payments/actions';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { Check, CreditCard, Star, Zap } from 'lucide-react';
import { BillingSubmitButton } from './submit-button';
import { appConfig } from '@/lib/app-config';

// PricingCard component for the billing page
function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
  isPremium = false,
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
  isPremium?: boolean;
}) {
  return (
    <Card className={`border overflow-hidden ${isPremium ? 'shadow-md border-primary/20 relative' : 'shadow-sm'}`}>
      {isPremium && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
          Popular
        </div>
      )}
      <CardHeader className={`${isPremium ? 'bg-primary/5' : 'bg-muted/10'} pb-6`}>
        <div className="flex items-center gap-2 mb-1">
          {isPremium ? <Star className="h-5 w-5 text-primary" /> : <Zap className="h-5 w-5 text-muted-foreground" />}
          <CardTitle className="text-xl">{name}</CardTitle>
        </div>
        <CardDescription>
          with {trialDays} day free trial
        </CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">${price / 100}</span>
          <span className="text-muted-foreground ml-1">/ {interval}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`h-4 w-4 ${isPremium ? 'text-primary' : 'text-muted-foreground'} mr-2 mt-0.5 flex-shrink-0`} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-2 pb-6">
        <form action={checkoutAction} className="w-full">
          <input type="hidden" name="priceId" value={priceId} />
          <BillingSubmitButton className={`w-full ${isPremium ? 'bg-primary hover:bg-primary/90' : ''}`} />
        </form>
      </CardFooter>
    </Card>
  );
}

export default async function BillingPage() {
  const user = await getUserForAppRouter();

  if (!user) {
    redirect('/sign-in');
  }

  // Check if the user is on a free plan
  const showPricingCards = !user?.subscriptionStatus || 
    (user?.subscriptionStatus !== 'active' && user?.subscriptionStatus !== 'trialing');

  // Only fetch prices and products if we need to show pricing cards
  const [prices, products] = showPricingCards 
    ? await Promise.all([getStripePrices(), getStripeProducts()])
    : [[], []];
  
  // Extract plan information if needed based on configured product IDs
  const basicPlanId = appConfig.stripe.products.basicPlanId;
  const premiumPlanId = appConfig.stripe.products.premiumPlanId;
  
  const basicPlan = showPricingCards ? products.find(p => p.id === basicPlanId) : null;
  const premiumPlan = showPricingCards ? products.find(p => p.id === premiumPlanId) : null;
  
  // If products not found by ID, try fallback to any available products
  const showFallbackProducts = showPricingCards && (!basicPlan || !premiumPlan);
  
  // Get default prices from products directly rather than looking them up separately
  const basicPriceId = basicPlan?.defaultPriceId;
  const premiumPriceId = premiumPlan?.defaultPriceId;
  
  // Look up the full price details for the default prices
  const basicPrice = showPricingCards && basicPriceId 
    ? prices.find(price => price.id === basicPriceId) 
    : null;
  
  const premiumPrice = showPricingCards && premiumPriceId 
    ? prices.find(price => price.id === premiumPriceId) 
    : null;
  
  // Set up fallback products using their default prices
  const fallbackProducts = showFallbackProducts ? products.filter(p => p.defaultPriceId).slice(0, 2) : [];
  const fallbackPrices = showFallbackProducts
    ? fallbackProducts.map(product => {
        return {
          product,
          price: prices.find(price => price.id === product.defaultPriceId)
        };
      }).filter(item => item.price)
    : [];
    
  // For admin debugging - create a mapping of product names to IDs
  const productIdMap = products.reduce((acc, product) => {
    acc[product.name] = product.id;
    return acc;
  }, {} as Record<string, string>);

  // For debugging purposes - console log the price IDs
  console.log('Price IDs in appConfig:', {
    premium: appConfig.stripe.prices.premiumPriceId,
    basic: appConfig.stripe.prices.basicPriceId
  });
  
  return (
    <div className="space-y-6">
      {/* Current subscription info card */}
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Current Subscription</CardTitle>
          </div>
          <CardDescription>
            View and manage your current subscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium">
                  Current Plan: {user?.planName || 'Free'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user?.subscriptionStatus === 'active'
                    ? 'Billed monthly'
                    : user?.subscriptionStatus === 'trialing'
                      ? 'Trial period'
                      : 'No active subscription'}
                </p>
              </div>
              <form action={customerPortalAction}>
                <Button type="submit" variant="outline">
                  Manage Subscription
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Pricing cards for free users */}
      {showPricingCards && (
        <>
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Upgrade Your Plan</CardTitle>
              <CardDescription>
                Choose the plan that works best for your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {basicPlan && basicPrice && (
                  <PricingCard
                    name={basicPlan.name}
                    price={basicPrice.unitAmount || 800}
                    interval={basicPrice.interval || 'month'}
                    trialDays={basicPrice.trialPeriodDays || 7}
                    features={[
                      'Unlimited Usage',
                      'Unlimited Workspace Members',
                      'Email Support',
                    ]}
                    priceId={basicPrice.id}
                  />
                )}
                {premiumPlan && premiumPrice && (
                  <PricingCard
                    name={premiumPlan.name}
                    price={premiumPrice.unitAmount || 1200}
                    interval={premiumPrice.interval || 'month'}
                    trialDays={premiumPrice.trialPeriodDays || 7}
                    features={[
                      'Everything in Basic, and:',
                      'Early Access to New Features',
                      '24/7 Support + Slack Access',
                    ]}
                    priceId={premiumPrice.id}
                    isPremium={true}
                  />
                )}
              </div>
              
              {/* Fallback pricing cards if configured products aren't found */}
              {showFallbackProducts && fallbackPrices.length > 0 && basicPlan === null && premiumPlan === null && (
                <div className="mt-8">
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
                    <p className="text-amber-800 text-sm">
                      Showing available subscription plans. Update your app configuration with the correct product IDs for a customized display.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {fallbackPrices.map((item, idx) => (
                      <PricingCard
                        key={item.product.id}
                        name={item.product.name}
                        price={item.price?.unitAmount || 1000}
                        interval={item.price?.interval || 'month'}
                        trialDays={item.price?.trialPeriodDays || 14}
                        features={[
                          'This plan includes:',
                          `${item.product.name} subscription`,
                          idx === 0 ? 'Standard features' : 'Premium features',
                          'Support available',
                        ]}
                        priceId={item.price?.id}
                        isPremium={idx === 1}
                      />
                    ))}
                  </div>
                  
                  {fallbackProducts.length > 0 && fallbackPrices.length === 0 && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                      <p className="text-red-800 text-sm">
                        Products found but no default prices are set. Please set default prices for your products in the Stripe dashboard.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Debug section for admins to find product IDs - only visible when products aren't found or ?debug=true */}
          {(showFallbackProducts || process.env.NODE_ENV === 'development') && products.length > 0 && (
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Product Configuration Info (Admin)</CardTitle>
                <CardDescription>
                  Technical information for configuring plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    To configure the pricing display, add the following product IDs to your <code>lib/app-config.ts</code> file:
                  </p>
                  <pre className="bg-muted p-3 rounded-md overflow-auto text-xs">
{`// Replace these product IDs in your appConfig
stripe: {
  products: {
    basicPlanId: "${Object.values(productIdMap)[0] || 'product_id_not_found'}",
    premiumPlanId: "${Object.values(productIdMap)[1] || 'product_id_not_found'}"
  }
}`}
                  </pre>
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Available Products with Default Prices:</h4>
                    <ul className="space-y-1 text-xs">
                      {products.map(product => (
                        <li key={product.id}>
                          <code>{product.name}</code>: <code>{product.id}</code>
                          {product.defaultPriceId ? 
                            <span className="ml-2 text-green-600">✓ Default price: <code>{product.defaultPriceId}</code></span> : 
                            <span className="ml-2 text-destructive">✗ No default price set</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <p className="text-sm text-blue-800">
                      <strong>Important:</strong> Make sure each product has a default price set in your Stripe dashboard.
                      The billing page now uses the default price associated with each product.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
