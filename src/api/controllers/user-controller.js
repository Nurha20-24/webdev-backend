import {addUser, findUserById, listAllUsers} from '../models/user-model.js';

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

const putUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.json({message: 'User item updated.'});
};

const deleteUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.json({message: 'User item deleted.'});
};

export {getUser, getUserById, postUser, putUser, deleteUser};
