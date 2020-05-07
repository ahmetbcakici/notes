import express from 'express';

import user from './user';
import note from './note';

const router = express.Router();

router.use('/user',user);
router.use('/note',note);

export default router;
