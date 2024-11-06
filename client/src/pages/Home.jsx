// src/pages/Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import MeCompactCard from '../components/Me/MeCompact';
import {
  Toolbar
} from '@mui/material';
export default function Home() {
  const { user, isLoggedIn } = useAuth();
  
  // Check if `userData` is available in session storage and parse if valid
  const sessionUser = (() => {
    const storedUserData = sessionStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  })();



  return (
    <div>
      <Toolbar /> {/* Spacer */}
      {isLoggedIn && (user || sessionUser) ? (
        <MeCompactCard profile={user || sessionUser} />
      ) : (
        <div>Loading profile...</div>
      )}
    </div>
  );
}