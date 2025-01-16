// router/routes.js
import express from 'express';
import { loginHandler } from './handlers/LoginHandler.js';
import { signUpHandler } from './handlers/signUpHandler.js';
import { verifyEmail } from './handlers/verifyEmailHandler.js';
import  profileViewHandler from './handlers/profileViewHandler.js';
import pathRoutes from './path.js'; 
import walletRoutes from './handlers/walletRoutes.js';  // Import wallet routes
import { logOutHandler } from './handlers/logOutHandler.js'; // Import logout handler
const router = express.Router();

router.post('/login', loginHandler);
router.post('/signUp', signUpHandler);
router.get('/verify-email', verifyEmail);
router.get('/user-profile/:username', profileViewHandler);
router.use('/path', pathRoutes);
router.use('/wallets', walletRoutes);  // Attach wallet routes under `/wallet`
router.get('/logout', logOutHandler); // Define the logout route

router.get('/protected', (req, res) => {
    const token = req.cookies.cleakerToken;
    if (!token) {
        console.log("Unauthorized");
      return res.status(401).send({ message: 'Unauthorized' });
    }
    try {
      const payload = verifyAuthCookie(token);
      console.log("Access granted");
      res.send({ message: 'Access granted', payload });
    } catch (err) {
        console.log("Invalid or expired token");
      res.status(401).send({ message: 'Invalid or expired token' });
    }
  });

export default router;