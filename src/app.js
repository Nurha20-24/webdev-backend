import express from 'express';
import api from './api/index.js';
const app = express();

app.use('/public', express.static('public'));
app.use(express.json());

// formData varten
app.use(express.urlencoded({extended: true}));

// lisää prefixin ja ohjaa siten kaikki api routerin sisällä oleville reitille.
app.use('/api/v1', api);

// yksinkertainen middleware esimerkki
app.get(
  '/example/middleware',
  (req, res, next) => {
    console.log('Moro olen tällää');
    next();
  },
  (req, res, next) => {
    console.log('Olen middleware ja käsitteleen dataa');
    next();
  },
  (req, res, next) => {
    console.log('Moikka pääsin perille');
    res.send('Tiedosto upattu ja käsitelty');
  }
);

export default app;
