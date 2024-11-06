// server/routes/auth.js
import express from 'express';
import { cleakMe } from '../controllers/authController';
const router = express.Router();

router.post('/cleak-me', cleakMe);

export default router;