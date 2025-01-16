// server/routes/walletRoutes.js
import express from 'express';
import { getWallets, addWallet, deleteWallet, updateWallet, setDefaultWallet } from '../../controllers/Wallets/index.js';
const router = express.Router();
router.get('/:username/wallets', getWallets); // Retrieve all wallets for the user
router.post('/:username/wallets', addWallet);  // Add a new wallet
router.delete('/:username/wallets/:walletAddress', deleteWallet); // Delete a wallet by address
router.patch('/:username/wallets/:walletAddress', updateWallet);  // Update wallet details
router.patch('/:username/wallets/:walletAddress/default', setDefaultWallet); // Set wallet as default
export default router;