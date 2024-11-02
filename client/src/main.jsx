// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomThemeProvider } from './themes/ThemeContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);