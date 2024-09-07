import express from 'express';
import morgan from 'morgan';
import { router } from './src/routes/routes.js';

const app = express();
const PORT = 3000;  // O cualquier otro puerto que desees usar

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/wonderly/api', router);
// Ruta raíz
app.get('/', (req, res) => {
  res.json("QUE HACE ACA, SAPO");
});



app.listen(PORT, () => {
  console.log(`URL: http://localhost:${PORT}`);
});
