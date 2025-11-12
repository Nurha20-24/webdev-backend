import {
  addCat,
  findCatById,
  listCatsByUserId,
  findCatsByUserId,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};
/*
const getCatsByUserId = async (req, res) => {
  const cats = await listCatsByUserId(req.params.id);
  res.json(cats);
};
*/

const getMyCats = async (req, res) => {
  console.log('', res.locals.user.user_id);
  const cats = await listCatsByUserId(res.locals.user.user_id);
  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(req.params.id);
  if (cats.length > 0) {
    res.json(cats);
  } else {
    res.status(404).json({message: 'No cats found for this user.'});
  }
};

const postCat = async (req, res) => {
  try {
    console.log(req.body);

    const newCat = req.body;
    if (req.file) {
      newCat.filename = req.file.filename;
    } else {
      req.body.filename = 'default-cat.jpg';
    }

    newCat.owner = res.locals.user.user_id;
    const result = await addCat(newCat);
    if (result.cat_id) {
      res.status(201);
      res.json({message: 'New cat added.', result});
    } else {
      res.status(400);
    }
  } catch (error) {
    console.error('Error in postcat: ', error);
  }
};

const putCat = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    res.status(404).json({message: 'Cat not found'});
    return;
  }

  if (
    cat.owner !== res.locals.user.user_id &&
    res.locals.user.role !== 'admin'
  ) {
    return res
      .status(403)
      .json({message: 'Not authorized to update this cat.'});
  }

  const result = await modifyCat(req.body, req.params.id);

  if (result) {
    res.json(result);
  } else {
    res.status(400).json({message: 'Cat not found'});
  }
};

const deleteCat = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    res.status(404).json({message: 'Cat not found'});
    return;
  }

  if (
    cat.owner !== res.locals.user.user_id &&
    res.locals.user.role !== 'admin'
  ) {
    return res
      .status(403)
      .json({message: 'Not authorized to delete this cat.'});
  }
  const result = await removeCat(req.params.id);
  res.json(result);
};

export {
  getCat,
  getCatsByUserId,
  getMyCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
};
