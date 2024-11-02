// src/pages/Home.jsx
import React from 'react';

import { Typography, Box, Toolbar  } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ paddingTop: 8, textAlign: 'center' }}>
      <Toolbar /> {/* Spacer */}
      <Typography variant="h4" gutterBottom>
        Welcome to Cleaker!
      </Typography>
      <Typography variant="body1">
        This is your home page. Explore your notifications, messages, and profile settings.
      </Typography>
    </Box>
  );
}