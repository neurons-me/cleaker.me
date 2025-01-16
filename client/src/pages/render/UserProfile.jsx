import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Box, Avatar, IconButton, Paper, useMediaQuery, useTheme, Toolbar, AppBar } from '@mui/material';
import QRCode from 'react-qr-code';
import { useAuth } from '../../context/AuthContext'; // Importa el contexto de autenticación
import { Settings, Message } from '@mui/icons-material';

function UserProfile({ profile }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletOrMobile = useMediaQuery('(max-width:1210px)'); // Adjust breakpoint for earlier mobile view
  const { user, isLoggedIn } = useAuth(); // Obtén el usuario y estado de autenticación
  // Verificar si el perfil corresponde al usuario autenticado
  const isViewingOwnProfile = isLoggedIn && user?.username === profile;
  // URL para el código QR
  const profileUrl = `${window.location.origin}/profile`;
  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* Foto de portada */}
      <Box
        sx={{
          height: isMobile ? 200 : 300,
          backgroundImage: 'url(/assets/mdrn.png)', // Cambiar por la ruta correcta
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'brightness(0.9)',
        }}
      >
        {/* Capa de superposición oscura */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            zIndex: 1,
          }}
        />

        {/* Barra de herramientas */}
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2, mt: 1 }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 500, color: 'white' }}>
              {isViewingOwnProfile ? 'Your Profile' : `${profile}'s Profile`}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Contenedor principal */}
  <Container
    maxWidth="md"
    sx={{
    position: 'relative',
    mt: -11,
    px: 2,
    zIndex: 3,
  }}
  >
  <Paper
  elevation={3}
  sx={{
    display: 'flex',
    flexDirection: isTabletOrMobile ? 'column' : 'row', // Adjust layout sooner
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isTabletOrMobile ? 2 : 3, // Adjust padding for smaller screens
    borderRadius: 3,
    background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  }}
>
  {/* Profile Photo */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: isTabletOrMobile ? 1.5 : 2 }}>
    <Avatar
      src="/path/to/profile-photo.jpg" // Replace with actual path
      alt="User Profile"
      sx={{
        width: isTabletOrMobile ? 60 : 100, // Adjust size for smaller screens
        height: isTabletOrMobile ? 60 : 100,
      }}
    >
      {profile[0]?.toUpperCase()} {/* Initial */}
    </Avatar>
    <Box>
      <Typography variant={isTabletOrMobile ? 'h6' : 'h5'} sx={{ fontWeight: 500 }}>
        {isViewingOwnProfile ? user?.username : profile}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {isViewingOwnProfile ? 'Yourself' : 'User Info'}
      </Typography>
    </Box>
  </Box>
  {/* Action Buttons */}
  <Box sx={{ display: 'flex', gap: isTabletOrMobile ? 1 : 2, mt: isTabletOrMobile ? 3 : 0 }}>
    <Button
      component={Link}
      to="/app"
      variant="contained"
      sx={{ bgcolor: theme.palette.primary.main, color: '#fff' }}
    >
      App
    </Button>
    <Button
      component={Link}
      to="/message"
      variant="outlined"
      sx={{ color: theme.palette.primary.main, borderColor: theme.palette.primary.main }}
    >
      Message
    </Button>
    <QRCode value={profileUrl} size={isTabletOrMobile ? 30 : 45} />
  </Box>
</Paper>
</Container>
    </Box>
  );
}
export default UserProfile;
