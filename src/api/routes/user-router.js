import express from 'express';

import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/middlewares.js';

const userRouter = express.Router();

/*
userRouter.get('/', (req, res) => {
  res.json(users);
});
*/

userRouter.route('/').get(authenticateToken, getUser).post(postUser);

userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

console.log('Routerissa ollaan');

export default userRouter;
