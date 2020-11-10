import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'

import routes from './router/index';

const app = express();

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/users', routes.user)
    .use('/messages', routes.message);

app.listen(process.env.PORT, () => console.log('Your App is running on Port ' + process.env.PORT))