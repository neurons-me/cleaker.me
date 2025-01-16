import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Avatar, MenuItem, Divider, MenuList, Button, Switch, ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ColorModeIcon from '@mui/icons-material/Brightness4';
import { useThemeToggle } from '../../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

export default function MeCompact({ profile, onLogout, onClose }) {
  const toggleColorMode = useThemeToggle();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const username = profile?.username || 'Unknown';

  const handleNavigate = () => {
    const profileUrl = `https://${username}.cleaker.me`; // Construct the profile URL
    window.location.href = profileUrl; // Redirect to the profile URL
    onClose(); // Hide the menu
  };

  const menuRef = useRef();

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose(); // Close the menu when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box
      ref={menuRef}
      sx={{
        width: 280,
        bgcolor: 'background.default',
        borderRadius: 3,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 5,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <ButtonBase
        onClick={handleNavigate}
        sx={{
          display: 'block', // Make the button behave like a block element
          width: '100%', // Full width for better interaction
          textAlign: 'center',
        }}
      >
        {/* Avatar Section */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            padding: 2,
            borderRadius: 2,
            width: '100%',
            textAlign: 'center',
            mb: 2,
            boxShadow: 2,
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, margin: '0 auto' }}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            {username}
          </Typography>
        </Box>
      </ButtonBase>

      <MenuList sx={{ width: '100%' }}>
        <MenuItem
          component={Link}
          to="https://www.cleaker.me/editMe"
          sx={{ gap: 1, textDecoration: 'none', color: 'inherit' }}
          onClick={onClose} // Close the menu on click
        >
          <PersonIcon fontSize="small" />
          <Typography variant="body2">Edit Profile</Typography>
        </MenuItem>
        <MenuItem sx={{ gap: 1 }} onClick={onClose}>
          <SettingsIcon fontSize="small" />
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        <MenuItem sx={{ gap: 1 }}>
          <ColorModeIcon fontSize="small" />
          <Typography variant="body2">Dark Mode</Typography>
          <Switch
            checked={isDarkMode}
            onChange={toggleColorMode}
            size="small"
            sx={{ marginLeft: 'auto' }}
          />
        </MenuItem>
      </MenuList>
      <Divider sx={{ width: '100%', mb: 1, mt: 1 }} />
      <Button
        fullWidth
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={() => {
          onLogout();
          onClose(); // Close the menu on logout
        }}
        sx={{
          fontWeight: 'bold',
          bgcolor: 'background.paper',
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            bgcolor: 'background.default',
          },
        }}
      >
        Log Out
      </Button>
    </Box>
  );
}
