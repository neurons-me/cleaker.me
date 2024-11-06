// src/pages/SignUp.jsx
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

export default function SignUp({ openLogin, setIsLoggedIn }) { // Changed openCleakMe to openLogin
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await fetch('http://localhost:3001/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        setErrorMessage('');
        // Construct user data to store in localStorage
        const userData = { username, email, token: result.token };
        login(userData); 
        navigate(`/user-welcome?username=${username}`);
      } else {
        const errorResult = await response.json();
        setErrorMessage(errorResult.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during API call', error);
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 1, borderRadius: 2, backgroundColor: 'background.paper' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>.Me</Avatar>
        <Typography component="h1" variant="h5">Create a new account.</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField required fullWidth id="username" label="Username" name="username" autoComplete="username" sx={{ mt: 2 }} />
          <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" sx={{ mt: 2 }} />
          <TextField required fullWidth name="password" label="Password" type={showPassword ? 'text' : 'password'} id="password" autoComplete="new-password" sx={{ mt: 2 }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {errorMessage && <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errorMessage}</Typography>}
          {successMessage && <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>{successMessage}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Register Me</Button>
        </Box>
        <Typography
          variant="body2"
          color="primary"
          onClick={openLogin} // Correctly triggers the login modal
          style={{ cursor: 'pointer', marginTop: '10px' }}
        >
          Already have an account?
        </Typography>
      </Box>
    </Container>
  );
}