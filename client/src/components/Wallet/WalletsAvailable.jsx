// client/src/components/Wallet/WalletsAvailable.jsx
import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  CircularProgress, 
  IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateWallet from './CreateWallet';
import CryptoAddressQRCode from './CryptoAddressQRCode';

export default function WalletsAvailable({ username }) {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateWallet, setShowCreateWallet] = useState(false);

  // Fetch wallets on component mount
  useEffect(() => {
    async function fetchWallets() {
      try {
        const response = await fetch(`/wallets/${username}/wallets`);
        const data = await response.json();
        setWallets(data.wallets || []);
      } catch (error) {
        console.error('Failed to fetch wallets:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWallets();
  }, [username]);

  const handleAddWallet = () => {
    setShowCreateWallet(true);
  };

  const handleDeleteWallet = async (address) => {
    try {
      const response = await fetch(`/wallet/${username}/wallets`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      if (response.ok) {
        setWallets(wallets.filter(wallet => wallet.address !== address));
        alert('Wallet deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete wallet:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Available Wallets for {username}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {wallets.map((wallet) => (
            <Box key={wallet.address}>
              <ListItem>
                <ListItemText
                  primary={`Address: ${wallet.address}`}
                  secondary={wallet.isDefault ? 'Default Wallet' : ''}
                />
                <CryptoAddressQRCode address={wallet.address} username={username} />
                <IconButton onClick={() => handleDeleteWallet(wallet.address)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      )}

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddWallet}
        sx={{ mt: 2 }}
      >
        Add New Wallet
      </Button>

      {showCreateWallet && (
        <CreateWallet
          onClose={() => setShowCreateWallet(false)}
          cleakerSalt="some-cleaker-salt" // Pass the cleakerSalt value
          userId="some-user-id"           // Pass the userId value
        />
      )}
    </Box>
  );
}