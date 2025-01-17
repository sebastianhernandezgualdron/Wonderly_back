import express from 'express';
import morgan from 'morgan';
import { router } from './src/routes/routes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 3000;  // O cualquier otro puerto que desees usar

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/wonderly/api', router);
// Ruta raíz
app.get('/', (req, res) => {
  res.json("QUE HACE ACA, SAPO");
});
console.log('SECRET:', process.env.SECRET);


app.listen(PORT, () => {
  console.log(`URL: http://localhost:${PORT}`);
});
