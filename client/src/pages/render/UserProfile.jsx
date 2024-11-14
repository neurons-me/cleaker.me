// src/pages/render/UserProfile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Toolbar } from '@mui/material';

function UserProfile() {
  return (
    <Container>
          <Toolbar /> {/* Spacer */}
          <Toolbar /> {/* Spacer */}
      <Typography variant="h4" gutterBottom>
Cleaker  
    </Typography>
      <Button
  component={Link}  // Use Link as the component
  to="/hash-me"      // Destination path
  variant="contained"
  color="primary"
>        Learn More
      </Button>
    </Container>
  );
}

export default UserProfile;