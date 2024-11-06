// src/components/AccountRecovery/AccountAndPasswordRecovery.jsx

import React, { useState } from 'react';
import { Button, Box, Typography, Container, TextField, CssBaseline, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

export default function AccountAndPasswordRecovery({ onClose }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const theme = useTheme();

  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 777 },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/account-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Check your email for recovery instructions.');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to send recovery instructions. Please try again.');
      }
    } catch (error) {
      console.error('Error during API call', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <animated.div style={springProps}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h4" color="text.primary" gutterBottom>
            Account Recovery
          </Typography>
          {errorMessage && <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errorMessage}</Typography>}
          {successMessage && <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>{successMessage}</Typography>}
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send Recovery Email
            </Button>
          </Box>
          <Button onClick={onClose} sx={{ mt: 2, color: theme.palette.primary.main }}>
            Cancel
          </Button>
        </Box>
      </Container>
    </animated.div>
  );
}