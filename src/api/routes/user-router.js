import express from 'express';

import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

import {getCatsByUserId} from '../controllers/cat-controller.js';

const userRouter = express.Router();

/*
userRouter.get('/', (req, res) => {
  res.json(users);
});
*/

userRouter.route('/').get(getUser).post(postUser);

userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

userRouter.route('/:id/cats').get(getCatsByUserId);

console.log('Routerissa ollaan');

export default userRouter;
