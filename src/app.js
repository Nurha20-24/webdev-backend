import express from 'express';
import api from './api/index.js';
const app = express();

app.use('/public', express.static('public'));
app.use(express.json());

// formData varten
app.use(express.urlencoded({extended: true}));

// lisää prefixin ja ohjaa siten kaikki api routerin sisällä oleville reitille.
app.use('/api/v1', api);

export default app;
