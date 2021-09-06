import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import executorRouter from './src/routes/executor.routes.js';


let app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

;
mongoose.connect('mongodb://mongodb:27017/codeexec', {
  auth: {
    username: "root",
    password: "toor",
  },
  authSource: "admin"
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongo connection error:'));

app.use('/', executorRouter);

export default app;
