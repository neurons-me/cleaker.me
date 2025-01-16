import React from 'react';
import { Box, Divider, Stack } from '@mui/material';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const appBarHeight = 64; // Match the AppBar height for consistency

export default function RightMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: `calc(100vh - ${appBarHeight}px)`, // Adjust height to account for AppBar
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        borderLeft: '1px solid',
        borderColor: 'divider',
        marginTop: `${appBarHeight + 1}px`, // Match SideMenu's margin
        overflowY: 'auto', // Ensure scrollable content
      }}
    >
      {/* Menu Content */}
      <Stack sx={{ flexGrow: 1, p: 2 }}>
        <MenuContent />
      </Stack>

      {/* Divider */}
      <Divider />

      {/* Card Alerts or Footer */}
      <Box sx={{ p: 2 }}>
        <CardAlert />
      </Box>
    </Box>
  );
}
