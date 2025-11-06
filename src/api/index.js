import express from 'express';
import catRouter from './routes/cat-router.js';

import userRouter from './routes/user-router.js';

// mini express sovellus
const router = express.Router();

console.log('Talla ollaan catRouter');

// bind base url for all cat routes to catRouter
router.use('/cats', catRouter);
router.use('/users', userRouter);

export default router;
