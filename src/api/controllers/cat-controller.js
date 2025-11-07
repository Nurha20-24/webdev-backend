import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

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

const putCat = (req, res) => {
  // not implemented in this example, this is  homework
  res.status(200);
  res.json({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  // not implemented in this example, this is homework
  res.status(200);
  res.json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};
