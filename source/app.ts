import { Response } from "express";

import { Addition } from "./modules/addition";

const express = require('express')

const app = express();
const addition = new Addition();

app.set('view engine', 'jade');

app.get('/', (req: Request, res: Response) => {
    res.end(addition.AddNumber(5, 20).toString())
})

var server = app.listen(8080, () => console.log('ready'))