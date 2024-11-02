// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { isSessionActive } from '../utils/session';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isSessionActive());
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    document.cookie = 'cleakerToken=; Max-Age=0; path=/; domain=.cleaker.me';
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);