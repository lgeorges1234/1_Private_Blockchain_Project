import pkg from "crypto-js";
const { SHA256 } = pkg;
import bitcoinMessage from "bitcoinjs-message";

import { Block } from "./block.js";
import { getCurrentTimeStamp } from "../utils/functions.js";

/*  ========== Blockchain Class ======================
    Class with a constructor for blockchain data model
    with function to support:
        - createGenesisBlock();
        - getLatestBlock();
        - addBlocl();
        - getBlock();
        - validateBlock();
        - validateChain();
    =================================================== */

export class Blockchain {
    
    constructor() {
        // init chain array
        this.chain = [];
        // add first genesis block
        this.createGenesisBlock();
    }

    // create the first block of the chainblock
    async createGenesisBlock() {
        const data = {
            "star": {        
                "name": "First Block in the Chain - Genesis Block",
                "dec": "0D 0' 0",
                "ra": "0h 0m 0s",
                "story": "Everything starts now!"
                }, 
            "owner": 'adminAddress'
        };
        await this._addBlock(new Block(data));
    }

    // add a new block to the blockchain
    _addBlock(newBlock) {
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                // define the height of the new block
                newBlock.height = self.chain.length + 1;
                // add timestamp to the new block
                newBlock.time = getCurrentTimeStamp();
                // add the hash of the previous block if it is not the genesis block
                if (this.chain.length>0) newBlock.previousBlockHash = self.chain[this.chain.length-1].hash;
                // create a hash for the new block
                newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
                // push the block into the chainblock)
                self.chain.push(newBlock);
                resolve(self.chain[self.chain.length - 1]);
            } catch (error) { reject(new Error(`Could not add a new block: ${error}`)) }
        })
    }

    // get the latest block added to the chain
    getLatestBlock() {
        let self = this;
        return self.chain[self.chain.length-1]
    }

    // get block height, it is a helper method that return the height of the blockchain
    getBlockByHeight(height) {
        let self = this;
        return new Promise((resolve, reject) => {     
            try {
                const getBlockByHeightResult = self.chain[height - 1];
                if (getBlockByHeightResult) resolve(getBlockByHeightResult)
                else throw new Error('No block corresponding to this height!')
            } catch(error) { reject(new Error(error)); }
        });
    }

    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {     
            try {
                const getBlockByHashResult = self.chain.filter(block => block.hash === hash);
                if (getBlockByHashResult) resolve(getBlockByHashResult[0])
                else throw new Error('No block corresponding to this hash!')
            } catch(error) { reject(new Error(error)); }
        });
    }

    // validate if block is being tampered by block height
    async validateBlock(height) {
        let self = this;
        try {
            if (height > 0 && height <= self.chain.length) {
                const block = await self.getBlockByHeight(height);
                const validateBlockReturn = await block.validateBlock();
                return validateBlockReturn;
            } else throw new Error("Block isn't valid!")
        } catch(error) { return new Error(error);}
    }

    requestMessageOwnershipVerification(address) {
        return new Promise((resolve, _reject) => {
            resolve(`${address}:${getCurrentTimeStamp()}:starRegistry`);
        });
    }

    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise((resolve, reject) => {
            const data = {
                "star": star, 
                "owner": address
            };
            // get the absolute value in ms of the difference between the current time and the message time
            const elapsedTime = Math.abs(parseInt(getCurrentTimeStamp()) - parseInt(message.split(':')[1]));
            try {
                // check if the time elapsed is less than 5 minutes
                if (elapsedTime < 300000) {
                    // verify the message with wallet address and signature
                    bitcoinMessage.verify(message, address, signature);
                    // create and add the block to the chain
                    resolve(self._addBlock(new Block(data)));
                } else throw new Error('Message has exceeded the period of time !')
            } catch(error) { reject(new Error(error)); }
        });
    };

    getStarsByWalletAddress(address) {
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                // let starsByOwner = self.chain.filter(block => console.log(`block: ${JSON.stringify(block.getBData().owner)}`));
                let starsByOwner = self.chain.filter(block => block.getBData().owner == address).map(block => block.getBData().star);
                if (starsByOwner) resolve(starsByOwner);
                else throw new Error('No stars have been recorded through this address!')
            } catch(error) { reject(new Error(error)); }
        });
    }

    validateChain() {
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                self.chain.forEach((block, index) => {
                    if (!block.validateBlock) throw new Error(`block ${index + 1} is not valid!`);
                    switch (block.height) {
                        case (1) :  return;
                        default : {
                            if (block.previousBlockHash !== self.chain[index -1].hash) throw new Error(`block chain validity is compromised between block ${index} and block ${index + 1} !`)
                            else return;
                        }
                    }
                });
                resolve(true);
            } catch(error) { reject(new Error(error)); }
        })
    }
}