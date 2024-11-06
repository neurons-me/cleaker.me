// src/pages/Welcome.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Modal, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import Login from '../components/Login/Login';  // Updated to import Login
import SignUp from '../components/SignUp/SignUp';

export default function Welcome({ setIsLoggedIn }) {
  const theme = useTheme();
  const [openLogin, setOpenLogin] = useState(false); // Updated state name from openCleakMe to openLogin
  const [openSignUp, setOpenSignUp] = useState(false);
  const isLoggedIn = false; // Replace with actual session check logic if needed
  const username = "YourUsername"; // Replace with actual username if needed

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setOpenSignUp(false);
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setOpenLogin(false);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenSignUp(false);
  };

  const springProps = useSpring({
    from: { transform: 'translateY(-100px) scale(0.8)', opacity: 0 },
    to: { transform: 'translateY(0px) scale(1)', opacity: 1 },
    config: { tension: 180, friction: 12, mass: 1 },
    delay: 200,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <animated.div style={springProps}>
        <Box
          sx={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: `8px solid ${
              theme.palette.mode === 'light'
                ? theme.palette.primary.main
                : theme.palette.divider
            }`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mb: 2 }}>
            CLEAKER
          </Typography>

          {isLoggedIn ? (
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mt: 2 }}>
              {username}.me
            </Typography>
          ) : (
            <Button
              variant="contained"
              onClick={handleOpenLogin}
              sx={{
                mt: 2,
                width: 200,
                height: 40,
                textAlign: 'center',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              .me
            </Button>
          )}
        </Box>
      </animated.div>

      {/* Modal to show Login component */}
      <Modal open={openLogin} onClose={handleClose}>
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
          <Login openSignUp={handleOpenSignUp} /> {/* Pass openSignUp prop */}
        </Box>
      </Modal>

      {/* Modal to show SignUp component */}
      <Modal open={openSignUp} onClose={handleClose}>
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
          <SignUp openLogin={handleOpenLogin} setIsLoggedIn={setIsLoggedIn} /> {/* Pass setIsLoggedIn */}
        </Box>
      </Modal>
    </Box>
  );
}