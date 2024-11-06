// routes/index.js
import express from 'express';
import { loginHandler } from './handlers/LoginHandler.js';
import { signUpHandler } from './handlers/signUpHandler.js';
import { verifyEmail } from './handlers/verifyEmailHandler.js';
import  profileViewHandler from './handlers/profileViewHandler.js';
import pathRoutes from './path.js'; 
import walletRoutes from './handlers/walletRoutes.js';  // Import wallet routes

const router = express.Router();

router.post('/login', loginHandler);
router.post('/signUp', signUpHandler);
router.get('/verify-email', verifyEmail);
router.get('/user-profile/:username', profileViewHandler);
router.use('/path', pathRoutes);
router.use('/wallets', walletRoutes);  // Attach wallet routes under `/wallet`

export default router;