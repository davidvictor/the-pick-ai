'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import AuthBox from '@/components/auth/auth-box';
import AnimatedBackground from '@/components/ui/animated-background';
import GoogleIcon from '@/components/ui/icons/google-icon';
import { useState, useEffect } from 'react';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(mode);
  
  // Update URL when tab changes
  const handleTabChange = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
    
    // Create a new URLSearchParams object with the current parameters
    const params = new URLSearchParams(searchParams.toString());
    
    // Update mode parameter
    params.set('mode', tab);
    
    // Update URL without causing a navigation
    router.replace(`/auth?${params.toString()}`, { scroll: false });
  };
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleGoogleAuth = () => {
    // This is a visual-only button for now
    console.log('Google auth clicked - not implemented yet');
  };

  // Use the appropriate action based on the current active tab
  const [signinState, signinAction, signinPending] = useActionState<ActionState, FormData>(
    signIn,
    { error: '' },
  );

  const [signupState, signupAction, signupPending] = useActionState<ActionState, FormData>(
    signUp,
    { error: '' },
  );

  // SignIn form component
  const SignInForm = (
    <div className="space-y-6">
      {/* Google Auth Button */}
      <Button 
        onClick={handleGoogleAuth}
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground"
        variant="outline"
        size="xl"
      >
        <GoogleIcon className="h-5 w-5" />
        <span>Sign in with Google</span>
      </Button>

      {/* Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" action={signinAction}>
        <input type="hidden" name="redirect" value={redirect || ''} />
        <input type="hidden" name="priceId" value={priceId || ''} />
        <input type="hidden" name="inviteId" value={inviteId || ''} />
        
        <div className="space-y-2">
          <Label
            htmlFor="signinEmail"
            className="text-sm font-medium block"
          >
            Email
          </Label>
          <Input
            id="signinEmail"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={signinState.email}
            required
            maxLength={50}
            sizeVariant="xl"
            className="rounded-md w-full "
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="signinPassword"
              className="text-sm font-medium block"
            >
              Password
            </Label>
            <Link 
              href="#" 
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="signinPassword"
            name="password"
            type="password"
            autoComplete="current-password"
            defaultValue={signinState.password}
            required
            minLength={8}
            maxLength={100}
            sizeVariant="xl"
            className="rounded-md w-full"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <label 
            htmlFor="remember" 
            className="text-sm text-muted-foreground"
          >
            Remember me for 30 days
          </label>
        </div>

        {signinState?.error && (
          <div className="text-red-500 text-sm">{signinState.error}</div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={signinPending}
          size="xl"
        >
          {signinPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Loading...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </div>
  );

  // SignUp form component
  const SignUpForm = (
    <div className="space-y-6">
      {/* Google Auth Button */}
      <Button 
        onClick={handleGoogleAuth}
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground"
        variant="outline"
        size="xl"
      >
        <GoogleIcon className="h-5 w-5" />
        <span>Sign up with Google</span>
      </Button>

      {/* Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" action={signupAction}>
        <input type="hidden" name="redirect" value={redirect || ''} />
        <input type="hidden" name="priceId" value={priceId || ''} />
        <input type="hidden" name="inviteId" value={inviteId || ''} />
        
        <div className="space-y-2">
          <Label
            htmlFor="signupEmail"
            className="text-sm font-medium"
          >
            Email
          </Label>
          <Input
            id="signupEmail"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={signupState.email}
            required
            maxLength={50}
            sizeVariant="xl"
            className="rounded-md w-full"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="signupPassword"
            className="text-sm font-medium"
          >
            Password
          </Label>
          <Input
            id="signupPassword"
            name="password"
            type="password"
            autoComplete="new-password"
            defaultValue={signupState.password}
            required
            minLength={8}
            maxLength={100}
            sizeVariant="xl"
            className="rounded-md w-full"
            placeholder="Create a password"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium"
          >
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={100}
            sizeVariant="xl"
            className="rounded-md w-full"
            placeholder="Confirm your password"
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            className="mt-1"
          />
          <label 
            htmlFor="terms" 
            className="text-sm text-muted-foreground"
          >
            I agree to the{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {signupState?.error && (
          <div className="text-red-500 text-sm">{signupState.error}</div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={signupPending}
          size="xl"
        >
          {signupPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Loading...
            </>
          ) : (
            'Sign up'
          )}
        </Button>
      </form>
    </div>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <AuthBox 
        initialTab={mode}
        signinForm={SignInForm}
        signupForm={SignUpForm}
        isLoading={false}
        onTabChange={handleTabChange}
      />
    </div>
  );
}
