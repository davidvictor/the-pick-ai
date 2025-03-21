import { checkoutAction } from '@/lib/payments/actions';
import { Check, Star, Zap } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Prices are fresh for one hour max
export const revalidate = 3600;

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
          <SubmitButton className={`w-full ${isPremium ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`} />
        </form>
      </CardFooter>
    </Card>
  );
}

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const basePlan = products.find((product) => product.name === 'Base');
  const plusPlan = products.find((product) => product.name === 'Plus');

  const basePrice = prices.find((price) => price.productId === basePlan?.id);
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that works best for your needs. All plans include a free trial.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <PricingCard
          name={basePlan?.name || 'Base'}
          price={basePrice?.unitAmount || 800}
          interval={basePrice?.interval || 'month'}
          trialDays={basePrice?.trialPeriodDays || 7}
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
          trialDays={plusPrice?.trialPeriodDays || 7}
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
    </main>
  );
}
