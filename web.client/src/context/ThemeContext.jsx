// src/themes/ThemeContext.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../themes/theme';
import Cookies from 'js-cookie'; // Import js-cookie

const ThemeToggleContext = createContext();

export function useThemeToggle() {
  return useContext(ThemeToggleContext);
}

export function CustomThemeProvider({ children }) {
  // Check the cookie for a saved theme; default to light if not found
  const storedTheme = Cookies.get('theme') === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(storedTheme);

  // Toggle theme and save the new preference to a cookie
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      Cookies.set('theme', newTheme ? 'dark' : 'light', {
        domain: '.cleaker.me', // Ensure cookie works across subdomains
        secure: true,
        sameSite: 'lax',
      });
      return newTheme;
    });
  };

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}
