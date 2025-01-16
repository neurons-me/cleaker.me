// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
/*When the app initializes:
AuthProvider in main.jsx loads user data from localStorage (or starts in a default state if no data is found).*/
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      {/* App (and any of its child components) will have access to the state and
        functions defined in AuthContext. */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);

// Registrar el service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}