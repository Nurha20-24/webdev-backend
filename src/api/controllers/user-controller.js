import bcrypt from 'bcrypt';

import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.status(400);
  }
};

const putUser = async (req, res) => {
  // Authorization: users can update only their own info, or admin can update any user
  const authUser = res.locals.user;
  const targetUserId = Number(req.params.id);
  if (
    !authUser ||
    (authUser.user_id !== targetUserId && authUser.role !== 'admin')
  ) {
    return res
      .status(403)
      .json({message: 'Not authorized to update this user.'});
  }

  const result = await modifyUser(req.body, req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(400).json({message: 'User not updated.'});
  }
};

const deleteUser = async (req, res) => {
  //
  const authUser = res.locals.user;
  const targetUserId = Number(req.params.id);
  if (
    !authUser ||
    (authUser.user_id !== targetUserId && authUser.role !== 'admin')
  ) {
    return res.status(403).json({message: 'Forbidden'});
  }

  const result = await removeUser(req.params.id);
  res.json(result);
};

export {getUser, getUserById, postUser, putUser, deleteUser};
