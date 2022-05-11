/**
 *                 ApplicationServer
 *             (Do not change this code)
 * Require Modules to setup the REST Api
 * - `express` Express.js is a Web Framework
 * - `morgan` Isn't required but help with debugging and logging
 * - `body-parser` This module allows to parse the body of the post request into a JSON
 */

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

/**
 * Require the Blockchain class. This allow us to have only one instance of the class.
 */
import { Blockchain } from "./blockchain";

class ApplicationServer{
    constructor(){
        // Express application object
        this.app = express();
        // Blockain class object
        this.blockchain = new Blockchain.Blockchain();
        // Method that initialized the express framework
        this.initExpress();
        // Method that initialize middleware modules
        this.initExpressMiddleWare();
        // Method that initialized the controllers where you defined the endpoints
        this.initControllers();
        // Method that run the express application.
        this.start();
    }

    initExpress(){
        this.app.set("port", 8000);
    }

    initExpressMiddleWare(){
        this.app.use(morgan("dev"));
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(bodyParser.json());
    }

	initControllers() {
        require("./BlockchainController.js").default(this.app, this.blockchain);
	}

    start(){
        let self=this;
        this.app.listen(this.app.get("port"),()=>{
            console.log(`Server listening for port: ${self.app.get("port")}`);
        })
    }
}

new ApplicationServer();