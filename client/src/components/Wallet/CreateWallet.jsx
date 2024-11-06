import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Container, useTheme } from '@mui/material';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import ReactQRCode from 'react-qr-code';
import VisibilitySelector from '../Utils/VisibilitySelector';

export default function CreateWallet({ onClose, cleakerSalt, userId, username }) {
  const [wallet, setWallet] = useState(null);
  const [recoveryNumber, setRecoveryNumber] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visibility, setVisibility] = useState('public');

  const theme = useTheme();

  const generateWallet = async () => {
    if (!recoveryNumber || !passphrase) {
      setErrorMessage("Both fields are required.");
      return;
    }

    // Generate the wallet based on user input and unique salts
    const seedHash = CryptoJS.SHA256(recoveryNumber + passphrase + cleakerSalt + userId).toString();
    const newWallet = ethers.Wallet.fromMnemonic(ethers.utils.entropyToMnemonic(Buffer.from(seedHash, 'hex')));
    setWallet(newWallet);
    setErrorMessage('');

    // Send the wallet data to the backend
    try {
      await addWalletToServer(newWallet.address, newWallet.privateKey);
    } catch (error) {
      setErrorMessage("Failed to save wallet to server.");
      console.error("Failed to save wallet:", error);
    }
  };

  const addWalletToServer = async (address, privateKey) => {
    const response = await fetch(`http://localhost:3001/${username}/wallets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, label: 'My Wallet', type: 'Ethereum', isDefault: false }),
    });

    if (!response.ok) {
      throw new Error('Failed to add wallet to server');
    }
  };

  const handleCopyAddress = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.address);
      alert('Wallet address copied to clipboard!');
    }
  };

  const qrData = `${recoveryNumber}-${passphrase}`;

  return (
    <Container component="main" maxWidth="sm" sx={{ textAlign: 'center', p: 3, position: 'relative' }}>
      {/* Visibility Selector in top-right corner */}
      <Box sx={{ position: 'absolute', top: -21, right: 1 }}>
        <VisibilitySelector value={visibility} onChange={setVisibility} showLabel={true} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        {/* QR Code Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ReactQRCode value={qrData} size={150} fgColor={theme.palette.primary.main} />
        </Box>

        {/* Input Section */}
        <Box sx={{ width: '60%' }}>
          <TextField
            label="Enter Key"
            fullWidth
            value={recoveryNumber}
            onChange={(e) => setRecoveryNumber(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: theme.palette.primary },
                '&:hover fieldset': { borderColor: theme.palette.primary.dark },
              },
              '& .MuiInputLabel-root': { color: theme.palette.primary },
            }}
          />
          <TextField
            label="Enter Hash"
            fullWidth
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: theme.palette.primary },
                '&:hover fieldset': { borderColor: theme.palette.primary.dark },
              },
              '& .MuiInputLabel-root': { color: theme.palette.primary },
            }}
          />
          {errorMessage && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Box>

      {!wallet ? (
        <Button variant="contained" onClick={generateWallet} fullWidth sx={{ mt: 3 }}>
          Get Wallet
        </Button>
      ) : (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Wallet Address:</strong>
          </Typography>
          <TextField
              fullWidth
              value={wallet.address}
              variant="outlined"
              size="small"
              slotProps={{
              htmlInput: { readOnly: true } // Replaces inputProps
              }}
          sx={{
          mt: 1,
            '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: theme.palette.secondary.main },
    },
  }}
/>
          <Button variant="outlined" onClick={handleCopyAddress} fullWidth sx={{ mt: 1 }}>
            Copy Address
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            <strong>Private Key:</strong> Keep this safe and do not share it!
          </Typography>
          <TextField
            fullWidth
            value={wallet.privateKey}
            variant="outlined"
            size="small"
            slotProps={{
            htmlInput: { readOnly: true } // Replaces inputProps
            }}
        sx={{
          mt: 1,
            '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: theme.palette.secondary.main },
    },
  }}
/>

          <Button variant="contained" color="primary" onClick={onClose} fullWidth sx={{ mt: 2 }}>
            Done
          </Button>
        </Box>
      )}
    </Container>
  );
}