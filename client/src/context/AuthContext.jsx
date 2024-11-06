// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage and parse if it exists
    const storedUserData = localStorage.getItem('userData');
    //console.log("Retrieved from localStorage:", storedUserData); // Debug log
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUser(parsedUserData);
        setIsLoggedIn(!!parsedUserData.token); // Check if a token exists
        //console.log("AuthContext user set:", parsedUserData); // Debug log with full user data
      } catch (error) {
        console.error("Failed to parse userData from localStorage:", error);
      }
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Store the user data in state
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};