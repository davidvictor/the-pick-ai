'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interface for user data
interface User {
  id: number;
  // Add other user properties as needed
}

// Interface for auth context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
});

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component for auth state
export function AuthProvider({ 
  children,
  initialAuth = { 
    isAuthenticated: false,
    userId: null
  }
}: { 
  children: ReactNode;
  initialAuth?: {
    isAuthenticated: boolean;
    userId: number | null;
  }
}) {
  // State for auth data
  const [authState, setAuthState] = useState<AuthContextType>({
    user: initialAuth.userId ? { id: initialAuth.userId } : null,
    isLoading: false,
    isAuthenticated: initialAuth.isAuthenticated,
  });

  // Effect to fetch full user data if needed
  useEffect(() => {
    if (initialAuth.isAuthenticated && initialAuth.userId) {
      // You could fetch additional user data here if needed
      // For now, we just use the ID from the initial auth state
    }
  }, [initialAuth.isAuthenticated, initialAuth.userId]);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}
