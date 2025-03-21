"use client";

import { Check, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SubmitButton } from './submit-button';
import { checkoutAction } from '@/lib/payments/actions';

// PricingCard component with enhanced design
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
  price: number | null | undefined;
  interval: string | undefined;
  trialDays: number | null | undefined;
  features: string[];
  priceId?: string;
  isPremium?: boolean;
}) {
  // Safe defaults for nullable values
  const safePrice = price ?? (isPremium ? 1200 : 800);
  const safeInterval = interval || 'month';
  const safeTrialDays = trialDays ?? 14;
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
          with {safeTrialDays} day free trial
        </CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">${Math.floor(safePrice / 100)}</span>
          <span className="text-muted-foreground ml-1">/ {safeInterval}</span>
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
          <SubmitButton className={`w-full ${isPremium ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`} />
        </form>
      </CardFooter>
    </Card>
  );
}

// Define interfaces to match the server component
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

// Component that contains the pricing UI
export function PricingContent({
  products,
  prices,
  basePlan, 
  plusPlan,
  basePrice,
  plusPrice
}: {
  products: StripeProduct[];
  prices: StripePrice[];
  basePlan?: StripeProduct;
  plusPlan?: StripeProduct;
  basePrice?: StripePrice;
  plusPrice?: StripePrice;
}) {
  // Log warning if products or prices are missing
  if (!basePlan || !plusPlan || !basePrice || !plusPrice) {
    console.warn('Some Stripe products or prices were not found. Using fallback values.');
  }
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <PricingCard
          name={basePlan?.name || 'Base'}
          price={basePrice?.unitAmount || 800}
          interval={basePrice?.interval || 'month'}
          trialDays={basePrice?.trialPeriodDays || 14}
          features={[
            'Unlimited Usage',
            'Unlimited Workspace Members',
            'Email Support',
            'Access to Core Features',
            'Regular Updates'
          ]}
          priceId={basePrice?.id}
        />
        <PricingCard
          name={plusPlan?.name || 'Plus'}
          price={plusPrice?.unitAmount || 1200}
          interval={plusPrice?.interval || 'month'}
          trialDays={plusPrice?.trialPeriodDays || 14}
          features={[
            'Everything in Base, and:',
            'Early Access to New Features',
            '24/7 Priority Support',
            'Slack Community Access',
            'Advanced Analytics'
          ]}
          priceId={plusPrice?.id}
          isPremium={true}
        />
      </div>
    </>
  );
}
