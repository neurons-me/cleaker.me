// src/pages/UserWelcome.jsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Divider, Button, Modal } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import FaceScan from '../components/FaceScan/FaceScan';

export default function UserWelcome() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  const [isFaceScanOpen, setIsFaceScanOpen] = useState(false);

  const handleOpenFaceScan = () => setIsFaceScanOpen(true);
  const handleCloseFaceScan = () => setIsFaceScanOpen(false);

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
            >
              <Typography variant="body1" align="center">
                Verify Email
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
            >
              <Typography variant="body1" align="center">
                Find and Invite Contacts
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
            >
              <Typography variant="body1" align="center">
                Create a Wallet
              </Typography>
            </Box>
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 3 }} />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ py: 1.5 }}
        >
          Finish Setup
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 1, py: 1.5 }}
        >
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
            maxWidth: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <FaceScan open={isFaceScanOpen} onClose={handleCloseFaceScan} />
        </Box>
      </Modal>
    </Box>
  );
}