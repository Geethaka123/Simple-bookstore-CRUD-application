import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//op 1: Allow all origins with default of cors(*)
app.use(cors());

//op 2: Allow custom orgins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type'],
//   })
// );

app.get('/' ,(request, response) => {
  console.log(request)
  return response.status(234).send('hi');
});

app.use('/books' , booksRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`app is listning to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });