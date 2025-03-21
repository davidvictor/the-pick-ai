'use server';

import { initializeStripePriceIds } from './stripe';

// This component initializes the Stripe price IDs when used in a server component
export async function StripePriceInitializer() {
  await initializeStripePriceIds();
  
  // This component doesn't render anything
  return null;
}
