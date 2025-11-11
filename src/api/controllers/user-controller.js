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
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.status(400);
  }
};

const putUser = async (req, res) => {
  const result = await modifyUser(req.body, req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(400).json({message: 'User not updated.'});
  }
};

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);
  res.json(result);
};

export {getUser, getUserById, postUser, putUser, deleteUser};
