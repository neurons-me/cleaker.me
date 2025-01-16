import React, { useState } from 'react';
import { Box, Typography, Button, Modal, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';

export default function LoginPage({ setIsLoggedIn }) {
  const theme = useTheme();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Minimum height to match viewport
      maxHeight: '100vh', // Prevent overflowing
      overflow: 'hidden', // Prevent scrollbars if content overflows
      backgroundColor: theme.palette.background.default,
      padding: 0, // Remove potential padding
      margin: 0, // Remove potential margin
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
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            CLEAKER
          </Typography>

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
          <Login openSignUp={handleOpenSignUp} />
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
          <SignUp openLogin={handleOpenLogin} setIsLoggedIn={setIsLoggedIn} />
        </Box>
      </Modal>
    </Box>
  );
}
