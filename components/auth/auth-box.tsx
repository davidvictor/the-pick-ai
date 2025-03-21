'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export interface AuthBoxProps {
  initialTab?: 'signin' | 'signup';
  signinForm: React.ReactNode;
  signupForm: React.ReactNode;
  isLoading?: boolean;
  onTabChange?: (tab: 'signin' | 'signup') => void;
}

/**
 * Authentication container component with tabs to switch between login and signup forms
 * Uses local state for tab switching
 */
const AuthBox: React.FC<AuthBoxProps> = ({ 
  initialTab = 'signin', 
  signinForm, 
  signupForm, 
  isLoading = false,
  onTabChange
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(initialTab);
  
  // Header content based on active tab
  const headerContent = {
    signin: {
      title: "Sign in to your account",
      subtitle: "Welcome back! Please enter your details."
    },
    signup: {
      title: "Sign up for an account",
      subtitle: "Create an account to get started"
    }
  };

  // Handle tab change - update state and notify parent
  const handleTabChange = (value: string) => {
    const newTab = value as 'signin' | 'signup';
    setActiveTab(newTab);
    if (onTabChange) {
      onTabChange(newTab);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto relative z-10 py-12">
      <Card className="bg-card p-4 md:p-12 text-card-foreground shadow-lg border border-muted">
        <CardHeader className="p-0 mb-6 flex flex-row justify-center">
          <div className="logo-container h-12 flex items-center justify-center">
            <div className="logo"></div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Header section above tabs */}
          <div className="space-y-2 text-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight transition-opacity duration-300">
              {headerContent[activeTab].title}
            </h2>
            <p className="text-sm text-muted-foreground transition-opacity duration-300">
              {headerContent[activeTab].subtitle}
            </p>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            
            <TabsContent 
              value="signin"
              className="transition-opacity duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100"
            >
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                signinForm
              )}
            </TabsContent>

            <TabsContent 
              value="signup"
              className="transition-opacity duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100"
            >
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                signupForm
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthBox;
