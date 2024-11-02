// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

function UserProfile() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Home Page
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