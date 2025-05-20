// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  user: any;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
