import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, TextField, CssBaseline, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

export default function CleakMe({ openSignUp }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 777 },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    const loginSuccessful = await checkUsernameAndPassword(username, password);
    if (loginSuccessful) {
      navigate('/');
    } else {
      setErrorMessage('Username or Password Incorrect');
    }
  };

  const checkUsernameAndPassword = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/cleak-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error during API call', error);
      return false;
    }
  };

  return (
    <animated.div style={springProps}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h3" color="text.primary">Cleaker</Typography>
          {errorMessage && <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errorMessage}</Typography>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField required fullWidth id="username" label="Username" name="username" sx={{ mt: 2 }} />
            <TextField required fullWidth name="password" label="Password" type="password" sx={{ mt: 1 }} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>.Me</Button>
          </Box>
          <Typography variant="body2" color="primary" onClick={openSignUp} style={{ cursor: 'pointer', marginTop: '10px' }}>
            New User
          </Typography>
        </Box>
      </Container>
    </animated.div>
  );
}