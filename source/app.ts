import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'

import routes from './router/index';
import { InitializeDatabase } from './database';

const app = express();

InitializeDatabase().then((result: any) => console.log(result)).catch((err: Error) => console.log(err))

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/users', routes.user)
    .use('/messages', routes.message);

app.listen(process.env.PORT, () => console.log('Your App is running on Port ' + process.env.PORT))