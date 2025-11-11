import {
  addCat,
  findCatById,
  findCatsByUserId,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
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
  console.log(req.body);

  if (req.file) {
    req.body.filename = req.file.filename;
    console.log(req.file);
  }
  const result = await addCat(req.body);
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

export {getCat, getCatById, getCatsByUserId, postCat, putCat, deleteCat};
