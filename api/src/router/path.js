// server/routes/path.js
import express from 'express';
import { getSemantics, updateSemantics } from '../controllers/Semantics/index.js';

const router = express.Router();

router.post('/:username/*', updateSemantics);
router.get('/:username/*', getSemantics);

export default router;