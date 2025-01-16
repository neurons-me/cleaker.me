// src/pages/WelcomeUser.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Button, Modal } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import FaceScan from '../../components/FaceScan/FaceScan';
import CreateWallet from '../../components/Wallet/CreateWallet';
import { useAuth } from '../../context/AuthContext'; // Importar el contexto de autenticación
import { useSubdomain } from '../../utils/useSubdomain'; // Hook para obtener subdominio

export default function WelcomeUser() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { subdomain, isMainView } = useSubdomain();
  const username = searchParams.get('username') || user?.username; // Preferencia para el usuario autenticado

  // Validación: Solo permitir acceso al propietario del perfil
  const isViewingOwnProfile = isMainView
    ? user?.username === username
    : user?.username === subdomain;

  useEffect(() => {
    if (!isLoggedIn || !isViewingOwnProfile) {
      navigate('/'); // Redirigir si no está autenticado o no es el propietario del perfil
    }
  }, [isLoggedIn, isViewingOwnProfile, navigate]);

  const [isFaceScanOpen, setIsFaceScanOpen] = useState(false);
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const handleOpenFaceScan = () => setIsFaceScanOpen(true);
  const handleCloseFaceScan = () => setIsFaceScanOpen(false);
  const handleOpenCreateWallet = () => setIsCreateWalletOpen(true);
  const handleCloseCreateWallet = () => setIsCreateWalletOpen(false);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5" color="text.secondary" align="center" gutterBottom>
          Welcome to Cleaker
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          {username}
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary">
          Please complete your profile setup below:
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Grid2 container spacing={2}>
          <Grid2 xs={6}>
            <Box
              sx={{
                p: 2,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                cursor: 'pointer',
              }}
              onClick={handleOpenFaceScan}
            >
              <Typography variant="body1" align="center">
                Set Up Face Login
              </Typography>
            </Box>
          </Grid2>
          <Grid2 xs={6}>
            <Box
              sx={{
                p: 2,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                cursor: 'pointer',
              }}
              onClick={handleOpenCreateWallet}
            >
              <Typography variant="body1" align="center">
                + Add Wallet
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
        <Divider sx={{ my: 3 }} />
        <Button fullWidth variant="contained" color="primary" sx={{ py: 1.5 }}>
          Finish Setup
        </Button>
        <Button fullWidth variant="outlined" sx={{ mt: 1, py: 1.5 }}>
          Finish Setting Up Later
        </Button>
      </Box>
      {/* FaceScan Modal */}
      <Modal open={isFaceScanOpen} onClose={handleCloseFaceScan}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <FaceScan open={isFaceScanOpen} onClose={handleCloseFaceScan} />
        </Box>
      </Modal>
      {/* CreateWallet Modal */}
      <Modal open={isCreateWalletOpen} onClose={handleCloseCreateWallet}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <CreateWallet onClose={handleCloseCreateWallet} />
        </Box>
      </Modal>
    </Box>
  );
}
