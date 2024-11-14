import React from 'react';
import { useAuth } from '../context/AuthContext';
import MeCompactCard from '../components/Me/MeCompact';
import { Toolbar } from '@mui/material';

export default function Home() {
  const { user, isLoggedIn } = useAuth();
  return (
    <div>
      <Toolbar /> {/* Spacer */}
      {isLoggedIn && user ? (
        <MeCompactCard profile={user} />
      ) : (
        <div>Loading profile...</div>
        
      )}
    </div>
  );
}