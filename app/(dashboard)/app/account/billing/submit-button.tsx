'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

interface BillingSubmitButtonProps {
  className?: string;
}

export function BillingSubmitButton({ className }: BillingSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn("w-full border flex items-center justify-center", className)}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Processing...
        </>
      ) : (
        'Upgrade Plan'
      )}
    </Button>
  );
}
