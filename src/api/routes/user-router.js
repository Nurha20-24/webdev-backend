import express from 'express';

import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

import {getCatsByUserId} from '../controllers/cat-controller.js';

const userRouter = express.Router();

/*
userRouter.get('/', (req, res) => {
  res.json(users);
});
*/

userRouter.route('/').get(authenticateToken, getUser).post(postUser);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

userRouter.route('/:id/cats').get(getCatsByUserId);

console.log('Routerissa ollaan');

export default userRouter;
