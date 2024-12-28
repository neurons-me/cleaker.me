import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    // Log the initial load of user data from localStorage
    console.log("AuthContext - Checking localStorage for user data");
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUser(parsedUserData);
        setIsLoggedIn(!!parsedUserData.token);
        console.log("AuthContext - Loaded user:", parsedUserData);
        console.log("AuthContext - isLoggedIn:", !!parsedUserData.token);
      } catch (error) {
        console.error("Failed to parse userData from localStorage:", error);
      }
    } else {
      console.log("AuthContext - No user data found in localStorage");
    }
    setLoading(false); // Data load is complete
  }, []);

  const login = (userData) => {
    console.log("AuthContext - Logging in user:", userData);
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    console.log("AuthContext - Logging out user");
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};