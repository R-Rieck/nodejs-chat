import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan'
import 'dotenv/config'

import routes from './router/index';
import { InitializeDatabase } from './database';

const app = express();

InitializeDatabase();

app.use(cors())
    .use(helmet())
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/users', routes.user)
    .use('/messages', routes.message);

app.listen(process.env.PORT, () => console.log('Your App is running on Port ' + process.env.PORT))