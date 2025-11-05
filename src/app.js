import express from 'express';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use('/public', express.static('public'));
app.use(express.json());

// mock-data
const cats = [
  {
    cat_id: 2,
    name: 'Kisu',
    birthdate: '2023-08-20',
    weight: 6,
    owner: 'Hessu',
    image: 'https://loremflickr.com/320/240/cat',
  },
  {
    cat_id: 3,
    name: 'Misu',
    birthdate: '2023-10-18',
    weight: 7,
    owner: 'Hessu',
    image: 'https://loremflickr.com/320/240/cats',
  },
];

// '/api' -polun juuri
app.get('/api/v1/cats', (req, res) => {
  res.json(cats);
});

app.get('/', (req, res) => {
  res.send('Welcome to my REST API! Visit /api/v1/cats for cats data.');
});

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    cat_id: 6,
    name: 'Whiskers',
    birthdate: '2024-11-18',
    weight: 4,
    owner: 'Liisa',
    image: 'https://loremflickr.com/320/240/cat3',
  };
  res.json(cat);
});

// Tässä on täysin toimva get endpoint.
app.get('/api/v1/cats/:id', (req, res) => {
  const cat = cats.find((cat) => cat.cat_id === parseInt(req.params.id));
  if (cat) {
    res.json(cat);
  } else {
    //res.sendStatus(404);
    res.status(404).json({message: 'Cat not found'});
  }
});

app.get('/api/test', (request, response) => {
  const responsedata = {vastaus: 'Toimii'};
  response.json(responsedata);
});

app.post('/api/v1/cats', (req, res) => {
  const newCat = req.body;
  cats.push(newCat);
  res.status(201).json(newCat);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
