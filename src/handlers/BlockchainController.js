/**
 *          BlockchainController
 * 
 * This class expose the endpoints that the client applications will use to interact with the 
 * Blockchain dataset
 */

import e from "express";

class BlockchainController{
    // The constructor receive the instance of the express.js app and the Blockchain class
    constructor(app, blockchainObj) {
        this.app = app;
        this.blockchain = blockchainObj;
        // All endpoints methods needs to be called in the constructor to initialize the route
        this.getBlockByHeight();
        this.requestOwnership();
        this.submitStar();
        this.getBlockByHash();
        this.getStarsByOwner();
    }

    // Endpoint to Get a Block by Height (Get Endpoint)
    getBlockByHeight(){
        this.app.get("/block/height/:height", async(req,res) => {
            if (req.params.height) {
                const height = parsInt(req.params.height);
                let block =  await this.blockchain.getBlockByHeight(height);
                if (block) { 
                    return res.status(200).json(block);
                } else return res.status(404).send("Block Not Found!");
            } else return res.status(404).send("Block Not Found! Review the parameters!");
        });
    };

    // This endpoint allows you to retrieve the block by hash (GET endpoint)
    getBlockByHash() {
        this.app.get("/block/hash/:hash", async (req, res) => {
            if(req.params.hash) {
                const hash = req.params.hash;
                console.log(hash);
                let block = await this.blockchain.getBlockByHash(hash);
                if(block){
                    return res.status(200).json(block);
                } else {
                    return res.status(404).send("Block Not Found!");
                }
            } else {
                return res.status(404).send("Block Not Found! Review the Parameters!");
            }
            
        });
    }

    // Endpoint that allows user to request Ownership of a Wallet address (POST Endpoint)
    requestOwnership(){
        this.app.post("/requestValidation", async(req,res) => {
            if(req.body.address) {
                const address = req.body.address;
                const message = await this.blockchain.requestMessageOwnershipVerification(address);
                if (message) {
                    return res.status(200).json(message);
                } else  return res.status(500).send("An error happened!");
            } else return res.status(500).send("Check the Body Parameter!");
        });
    }

    // Endpoint that allows to submit a Star, first we need to 'requestOwnership' to get the message (POST Endpoint)
    submitStar(){
        this.app.post("/submitstar", async(req,res) => {
            if (req.body.address && req.body.message && req.body.signature && req.body.star) {
                const address = req.body.address;
                const message = req.body.message;
                const signature = req.body.signature;
                const star = req.body.star;
                try {
                    let block = await this.blockchain.submitStar(address,message,signature,star);
                    if (block) {
                        return res.status(200).json(block);
                    } else return res.status(500).send("An error happened!");
                } catch(error) {
                    return res.status(500).send(error);
                }
            } else return res.status(500).send("Check the Body Parameters!");
        });
    }

    // This endpoint allows you to request the list of Stars registerd by an owner
    getStarsByOwner(){
        this.app.get("/block/:address", async(req,res) => {
            if (req.params.address) {
                const address = req.params.address;
                try {
                    let stars = await this.blockchain.getStarsByOwner(address);
                    if (stars) {
                        return res.status(200).json(stars);
                    } else return res.status(404).send("Block Not Found!");
                } catch(error) {
                    return res.status(500).send("An error happened!");
                }
            } else return res.status(500).send("Block Not Found! Review the Parameters!");
        });
    }
}

export default (app, blockchainObj)  => { return new BlockchainController(app, blockchainObj);}