// src/components/Wallet/CryptoAddressQRCode.jsx
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { QRCode } from 'react-qr-code';

export default function CryptoAddressQRCode({ address, username }) {
  const qrData = address || `${username}.cleaker`; // Use the address if available, otherwise fallback to username URL

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Address copied to clipboard!');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        mt: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {address ? 'Crypto Wallet Address' : 'Cleaker Username QR'}
      </Typography>

      <QRCode value={qrData} size={150} level="H" includeMargin={true} />

      {address && (
        <>
          <TextField
            fullWidth
            value={address}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 2, width: '100%' }}
          />
          <Button variant="outlined" onClick={handleCopyAddress} sx={{ mt: 1 }}>
            Copy Address
          </Button>
        </>
      )}
    </Box>
  );
}