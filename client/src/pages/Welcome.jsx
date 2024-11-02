// src/pages/Welcome.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Modal, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import CleakMe from '../components/CleakMe';
import SignUp from '../components/SignUp';

export default function Welcome({ setIsLoggedIn }) { // Pass setIsLoggedIn from App
  const theme = useTheme();
  const [openCleakMe, setOpenCleakMe] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const isLoggedIn = false; // Replace with actual session check logic if needed
  const username = "YourUsername"; // Replace with actual username if needed

  const handleOpenCleakMe = () => {
    setOpenCleakMe(true);
    setOpenSignUp(false);
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setOpenCleakMe(false);
  };

  const handleClose = () => {
    setOpenCleakMe(false);
    setOpenSignUp(false);
  };

  // Bounce and fade-in animation using react-spring
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
      {/* Animated Box with Bounce Effect */}
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
              onClick={handleOpenCleakMe}
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

      {/* Modal to show CleakMe component */}
      <Modal open={openCleakMe} onClose={handleClose}>
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
          <CleakMe openSignUp={handleOpenSignUp} />
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
          <SignUp openCleakMe={handleOpenCleakMe} setIsLoggedIn={setIsLoggedIn} /> {/* Pass setIsLoggedIn */}
        </Box>
      </Modal>
    </Box>
  );
}