/* Packages I used */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

/* My assets */
import api from './routes/api';

const app = express(); // call express package constructor
const PORT = 3333 || process.env.PORT; // If there is environment port (from deployment platform) set it, if there is no set 2222
app.use(bodyParser.json()); // body-parser middleware to get data from requests body
app.use(cors()); // cors package configuration to prevent Cross-Origin ERROR
dotenv.config(); // dotenv package configuration

/* Mongoose connection provider */
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}, (err) => {
  if (err) throw err;
  console.log('Mongoose connected!');
});

/* mongoose package configuration */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use('/', api); // Use API router for all requests to this server

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); // Run server
