/* Packages I used */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

/* My assets */
import api from './routes';

const app = express();
const PORT = 3333 || process.env.PORT;

/* Package configurations */
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

/* Mongoose connection provider */
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}, (err) => {
  if (err) throw err;
  console.log('Mongoose connected!');
});

/* mongoose package configuration */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use('/', api);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); // Run server
