import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Separator } from '../../components/ui/separator';
import { Form, FormItem, FormLabel, FormControl } from '../../components/ui/form';
import { GoogleIcon } from './GoogleIcon';
import { cn } from '../../lib/utils';

/**
 * Login form component
 * 
 * @returns {JSX.Element} LoginForm component
 */
const LoginForm = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/app');
  };

  const handleGoogleLogin = () => {
    navigate('/app');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Button 
          onClick={handleGoogleLogin}
          className={cn("w-full flex items-center justify-center gap-2", 
            "bg-white dark:bg-gray-800 text-black dark:text-white", 
            "border border-gray-300 dark:border-gray-600", 
            "hover:bg-gray-100 dark:hover:bg-gray-700")}
          variant="outline"
          size="xl"
        >
          <GoogleIcon className="h-5 w-5" />
          <span>Log in with Google</span>
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-4">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="w-full"
                size='lg'
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Password</FormLabel>
              <Link to="/app" className="text-sm text-primary hover:underline">
                Forgot password
              </Link>
            </div>
            <FormControl>
              <Input 
                type="password" 
                placeholder="••••••••" 
                required 
                className="w-full"
                size='lg'
              />
            </FormControl>
          </FormItem>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              size='lg'
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember for 30 days
            </label>
          </div>

          <Button type="submit" className="w-full" size='xl'>
            Log in
          </Button>
        </Form>
      </div>

    </div>
  );
};

export default LoginForm;
