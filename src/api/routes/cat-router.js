import express from 'express';

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsByUserId,
  getMyCats,
} from '../controllers/cat-controller.js';

// multer imports
import multer from 'multer';
import {authenticateToken} from '../../middlewares/authentication.js';
import {createThumbnail} from '../../middlewares/upload.js';
const upload = multer({dest: 'uploads/'});

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getCat)
  .post(authenticateToken, upload.single('file'), createThumbnail, postCat);

// omat kuvat
catRouter.route('/user').get(authenticateToken, getMyCats);

// jonkun toisen kuvat
catRouter.route('/user/:id').get(authenticateToken, getCatsByUserId);

catRouter
  .route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default catRouter;
