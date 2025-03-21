import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';

/**
 * Authentication container component with tabs to switch between login and signup forms
 * 
 * @returns {JSX.Element} AuthBox component
 */
const AuthBox = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("login");
  
  // Header content based on active tab
  const headerContent = {
    login: {
      title: "Log in to your account",
      subtitle: "Welcome back! Please enter your details."
    },
    signup: {
      title: "Sign up for an account",
      subtitle: "Create an account to get started"
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className={cn("bg-card p-12 text-card-foreground shadow-lg border-1 border-muted")}>
        <CardHeader className="p-0 mb-6 flex flex-row justify-center">
          <div className={cn("logo", darkMode ? "logo-dark" : "")}></div>
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
            defaultValue="login" 
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Log in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            
            <TabsContent 
              value="login" 
              className="transition-opacity duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100"
            >
              <LoginForm />
            </TabsContent>
            
            <TabsContent 
              value="signup" 
              className="transition-opacity duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100"
            >
              <SignupForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthBox;
