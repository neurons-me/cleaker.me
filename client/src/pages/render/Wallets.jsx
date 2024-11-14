// src/pages/Wallets.jsx
import React, { useState } from "react";
import { Box, Modal, Button, Toolbar } from "@mui/material";

export default function Wallets() {
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);

  // Debug log for component rendering
  console.log("Wallets component rendered");

  const handleOpenCreateWallet = () => setIsCreateWalletOpen(true);
  const handleCloseCreateWallet = () => setIsCreateWalletOpen(false);

  return (
    <Box>
      <Toolbar />
      <Button variant="contained" onClick={handleOpenCreateWallet}>
        Create Wallet
      </Button>
    </Box>
  );
}