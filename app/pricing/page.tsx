"use client";

import { MarketingPageLayout } from '@/components/marketing/page-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  isPremium = false,
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
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
          <span className="text-3xl font-bold">${price}</span>
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
        <Button className={`w-full ${isPremium ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PricingPage() {
  return (
    <MarketingPageLayout
      title="Pricing Plans"
      subtitle="Choose the plan that works best for your betting needs. All plans include a free trial."
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <PricingCard
          name="Base"
          price={8}
          interval="month"
          trialDays={7}
          features={[
            'Unlimited Usage',
            'Unlimited Workspace Members',
            'Email Support',
            'Access to Core Features',
            'Regular Updates'
          ]}
        />
        <PricingCard
          name="Plus"
          price={12}
          interval="month"
          trialDays={7}
          features={[
            'Everything in Base, and:',
            'Early Access to New Features',
            '24/7 Priority Support',
            'Slack Community Access',
            'Advanced Analytics'
          ]}
          isPremium={true}
        />
      </div>
      
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
