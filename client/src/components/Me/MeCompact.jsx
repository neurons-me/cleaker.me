// src/components/Me/MeCompact.jsx
import React from 'react';
import { Box, Typography, Card, Avatar } from '@mui/material';

export default function MeCompactCard({ profile = {} }) {
  const { username = 'Unknown', email = 'Not set', privacy = 'public' } = profile;

  if (!profile || Object.keys(profile).length === 0) {
    return <Typography variant="body2" color="text.secondary">Loading profile...</Typography>;
  }

  return (
    <Card sx={{ padding: 2, textAlign: 'center' }}>
      <Avatar sx={{ margin: 'auto', bgcolor: 'primary.main' }}>
        {username.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="h6" sx={{ mt: 1 }}>
        {username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {email}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Privacy: {privacy}
      </Typography>
    </Card>
  );
}