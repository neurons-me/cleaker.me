// src/pages/render/UserProfile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Box, Avatar, IconButton, Paper, useMediaQuery, useTheme, Toolbar, AppBar } from '@mui/material';
import QRCode from 'react-qr-code';
import { Settings, Message } from '@mui/icons-material';

function UserProfile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // URL for the QR code
  const profileUrl = `${window.location.origin}/profile`;

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* Cover Photo with Overlay */}
      <Box
        sx={{
          height: isMobile ? 200 : 300,
          backgroundImage: 'url(/assets/mdrn.png)', // Replace with actual path to cover photo
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'brightness(0.9)', // Adjust brightness based on theme
        }}
      >
        {/* Dark Overlay Layer */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.8)', // Dark overlay
            zIndex: 1,
          }}
        />

        {/* Profile Overview Toolbar (on top of cover photo) */}
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2, mt: 1 }}
        >
          <Toolbar />
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 500, color: 'white' }}>
              Profile Overview
            </Typography>
            <Box>
              <Button component={Link} to="/" sx={{ color: 'white' }}>
                Home
              </Button>
              <Button component={Link} to="/settings" sx={{ color: 'white' }}>
                Settings
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Profile and Info Overlay Container */}
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          mt: -11,
          px: 2,
          zIndex: 3, // Ensures it appears above the cover photo
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 3,
            borderRadius: 3,
            background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)', // Adaptive background color
            border: theme.palette.mode === 'dark' ? '1px solid #424242' : '1px solid #e0e0e0',
            minWidth: isMobile ? '90%' : '80%',
          }}
        >
          {/* Profile Photo and Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src="/path/to/profile-photo.jpg" // Replace with actual path to profile photo
              alt="User Profile"
              sx={{
                width: isMobile ? 70 : 100,
                height: isMobile ? 70 : 100,
                fontSize: isMobile ? 28 : 40,
                bgcolor: '#90a4ae',
                color: '#fff',
                border: '3px solid white',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              A {/* Fallback to initial */}
            </Avatar>
            <Box>
              <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                Alex Thompson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CEO / Co-Founder
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons with Customized QR Code */}
          <Box sx={{ display: 'flex', gap: isMobile ? 1 : 2, mt: isMobile ? 2 : 0 }}>
            <Button
              component={Link}
              to="/app"
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                px: 3,
                borderRadius: '6px',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              App
            </Button>
            <Button
              component={Link}
              to="/message"
              variant="outlined"
              sx={{
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                px: 3,
                borderRadius: '6px',
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  color: theme.palette.primary.dark,
                  bgcolor: 'transparent',
                },
              }}
            >
              Message
            </Button>

            {/* QR Code replacing the settings button */}
            <Box
              sx={{
                width: isMobile ? 40 : 50, // Smaller size for mobile and desktop
                height: isMobile ? 40 : 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(40, 40, 40, 0.5)' : 'rgba(0, 0, 0, 0.05)', // Adaptive background for contrast
                borderRadius: 2,
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', // Optional shadow for depth
              }}
            >
              <QRCode
                value={profileUrl}
                size={isMobile ? 35 : 45} // Smaller QR code size
                fgColor={theme.palette.mode === 'dark' ? '#CCCCCC' : '#000000'} // Light gray for dark mode, black for light mode
                bgColor="transparent" // Transparent background
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default UserProfile;