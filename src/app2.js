import express from "express";
import morgan from "morgan";
//  import { urlencoded, json } from "body-parser";
import pkg from 'body-parser';
const { urlencoded, json } = pkg;

import BlockchainController from "./handlers/BlockchainController.js";
import { Blockchain } from './models/blockchain.js';

const app = express();

//Blockchain class object
const blockchain = new Blockchain();
//Method that initialized the express framework.
initExpress();
//Method that initialized middleware modules
initExpressMiddleWare();
//Method that initialized the controllers where you defined the endpoints
initControllers();
//Method that run the express application.
start();

function initExpress() {
    app.set("port", 8000);
}

function initExpressMiddleWare() {
    app.use(morgan("dev"));
    app.use(urlencoded({extended:true}));
    app.use(json());
}

function initControllers() {
    BlockchainController(app, blockchain);
}

function start() {
    app.listen(app.get("port"), () => {
        console.log(`Server Listening for port: ${app.get("port")}`);
    });
}

export default app;