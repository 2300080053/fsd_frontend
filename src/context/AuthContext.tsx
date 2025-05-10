import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { admins, doctors, patients } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (user: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const allUsers = [...admins, ...doctors, ...patients];
    const user = allUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    // In a real app, this would be an API call
    const allUsers = [...admins, ...doctors, ...patients];
    const existingUser = allUsers.find(u => u.email === userData.email);
    
    if (existingUser) {
      return false; // User already exists
    }
    
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
    };
    
    // In a real app, we would save this to a database
    if (userData.role === 'patient') {
      patients.push(newUser as any);
    } else if (userData.role === 'doctor') {
      doctors.push(newUser as any);
    } else if (userData.role === 'admin') {
      admins.push(newUser as any);
    }
    
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};