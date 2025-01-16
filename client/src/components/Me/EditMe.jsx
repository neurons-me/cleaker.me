import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Button, Modal, Avatar } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import FaceScan from '../FaceScan/FaceScan';
import CreateWallet from '../Wallet/CreateWallet';
import { useAuth } from '../../context/AuthContext';
import { useSubdomain } from '../../utils/useSubdomain';

export default function EditMe() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { subdomain, isMainView } = useSubdomain();
  const username = searchParams.get('username') || user?.username;

  const isViewingOwnProfile = isMainView
    ? user?.username === username
    : user?.username === subdomain;

  useEffect(() => {
    if (!isLoggedIn || !isViewingOwnProfile) {
      navigate('/'); // Redirect if not authenticated or not the profile owner
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
        alignItems: 'flex-start', // Push the container up
        minHeight: '100vh',
        px: 2,
        pt: 4, // Add a bit of padding from the top
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
        {/* Avatar and "Me" */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Avatar
            src="/path/to/profile-photo.jpg" // Replace with actual path
            alt="User Profile"
            sx={{
              width: 80,
              height: 80,
              marginRight: 2,
              bgcolor: 'primary.main',
              fontSize: '2rem',
            }}
          >
            {username?.[0]?.toUpperCase() || 'U'}
          </Avatar>
        </Box>
        {/* Username */}
        <Typography
          variant="h4"
          color="primary"
          align="center"
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          {username}
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
          Save
        </Button>
        <Button fullWidth variant="outlined" sx={{ mt: 1, py: 1.5 }}>
          Disregard
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
