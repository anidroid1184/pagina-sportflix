'use client';

import type { User } from '@/types';
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_EMAIL = 'user@example.com';
const MOCK_USER_PASS = 'password123';
const MOCK_USER_DATA: User = { id: 'user123', email: MOCK_USER_EMAIL, name: 'Test User' };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    try {
      const savedUser = localStorage.getItem('sporflixUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('sporflixUser');
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === MOCK_USER_EMAIL && pass === MOCK_USER_PASS) {
      setUser(MOCK_USER_DATA);
      try {
        localStorage.setItem('sporflixUser', JSON.stringify(MOCK_USER_DATA));
      } catch (error) {
        console.error("Failed to save user to localStorage", error);
      }
      router.push('/');
    } else {
      // In a real app, you'd use the toast service here
      alert('Credenciales inválidas');
    }
    setLoading(false);
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem('sporflixUser');
    } catch (error) {
      console.error("Failed to remove user from localStorage", error);
    }
    router.push('/login');
  }, [router]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
