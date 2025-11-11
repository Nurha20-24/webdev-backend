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

const getCatsByUserId = async (req, res) => {
  const cats = await listCatsByUserId(req.params.id);
  res.json(cats);
};

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
  //console.log(req.body);
  //console.log(req.file);
  //console.log(req.file.filename);

  const newCat = req.body;

  newCat.filename = req.file.filename;
  newCat.owner = res.locals.user.user_id;

  const result = await addCat(newCat);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.status(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(400).json({message: 'Cat not found'});
  }
};

const deleteCat = async (req, res) => {
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
