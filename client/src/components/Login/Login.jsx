// src/components/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, TextField, CssBaseline, Modal, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import AccountAndPasswordRecovery from '../AccountRecovery/AccountAndPasswordRecovery';
import CleakerLogo from '../CleakerLogo/CleakerLogo3D';
import { useAuth } from '../../context/AuthContext';

export default function Login({ openSignUp }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [openRecovery, setOpenRecovery] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [loginAttempts, setLoginAttempts] = useState(0); // Track login attempts

  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 500 },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    const loginSuccessful = await checkUsernameAndPassword(username, password);
    if (loginSuccessful) {
      setLoginAttempts(0); // Reset attempts on successful login
      navigate('/'); // Redirect to home
    } else {
      setLoginAttempts((prevAttempts) => prevAttempts + 1); // Increment on failed attempt
      setErrorMessage('Username or Password Incorrect');
    }
  };

  const checkUsernameAndPassword = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, loginAttempts }), // Include loginAttempts in request body
        credentials: 'include', // Send cookies with the request
      });
  
      if (response.ok) {
        const userData = await response.json();
        
        // Validate that token exists in userData
        if (userData && userData.token) {
          login(userData); // Pass the full userData object to AuthContext
          return true;
        } else {
          setErrorMessage('Authentication failed: Token missing.');
          return false;
        }
      } else {
        const { message } = await response.json();
        setErrorMessage(message);
        return false;
      }
    } catch (error) {
      console.error('Error during API call', error);
      setErrorMessage('Server error. Please try again later.');
      return false;
    }
  };

  const handleOpenRecovery = () => setOpenRecovery(true);
  const handleCloseRecovery = () => setOpenRecovery(false);

  return (
    <animated.div style={springProps}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CleakerLogo />
            <Typography variant="h3" color="text.primary">Cleaker</Typography>
          </Box>
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField required fullWidth id="username" label="Username" name="username" sx={{ mt: 2 }} />
            <TextField required fullWidth name="password" label="Password" type="password" sx={{ mt: 1 }} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>.Me</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Typography variant="body2" color="primary" onClick={openSignUp} style={{ cursor: 'pointer' }}>
              New Account
            </Typography>
            <Typography variant="body2" color="text.secondary">/</Typography>
            <Typography variant="body2" color="primary" onClick={handleOpenRecovery} style={{ cursor: 'pointer' }}>
              Recover Account
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Account Recovery Modal */}
      <Modal open={openRecovery} onClose={handleCloseRecovery}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme.palette.background.paper,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: 400,
            width: '100%',
          }}
        >
          <AccountAndPasswordRecovery onClose={handleCloseRecovery} />
        </Box>
      </Modal>
    </animated.div>
  );
}