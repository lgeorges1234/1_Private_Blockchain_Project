

import { Block } from "../../models/block.js";
import { Blockchain } from "../../models/blockchain.js";
import { getCurrentTimeStamp } from "../../utils/functions.js";

describe('Blockchain class', () => {

    let blockchain = {};
    let genesisBlock = {};
    let star = {};
    let star2 = {};
    let address = 'address'

    beforeAll(async () => {
        genesisBlock = { 
            hash: 'fbcedd68fc7254b212fed6a716efd0eef586ce77cde549c9606a30bb6b245db5', 
            height: 1, 
            body: 
                { 
                    name: "First Block in the Chain - Genesis Block", 
                    dec: "0° 0' 0", 
                    ra: "0h 0m 0s", 
                    story: "Everything starts now!" 
                }, 
            time: '1652100362', 
            previousBlockHash: '0x' 
        }
        star = {
            name: "First Star",
            dec: "1° 1' 1",
            ra: "1h 1m 1s",
            story: "This is the First star Recorded!"
        }
        star2 = {
            dec: "68° 52' 56.9",
            ra: "16h 29m 1.0s",
            story: "Testing the story 4"
        }
    });
    beforeEach(async () => {
        blockchain = new Blockchain();  
        blockchain._addBlock(new Block(star));
    })
    it('create a new blockchain instance', () => {
        expect(blockchain instanceof Blockchain).toBeTruthy();
        expect(blockchain.chain[0].body).toEqual(genesisBlock.body);
    });
    describe('_addBlock method', () => {
        it('should add a block to the blockchain', async () => {
            const addedBlockToBlockchainResult = await blockchain._addBlock(new Block(star2));
            expect(addedBlockToBlockchainResult.body).toBe(star2);
            expect(addedBlockToBlockchainResult.previousBlockHash).toBe(blockchain.chain[blockchain.chain.length - 2].hash);
            expect(addedBlockToBlockchainResult.height).toBe(blockchain.chain.length);
        });
    });
    describe('getLatestBlock method', () => {
        it('should return the latest block of the blockchain', () => {
            const getLatestBlockResult = blockchain.getLatestBlock();
            expect(getLatestBlockResult.body).toBe(star);
            expect(getLatestBlockResult.height).toBe(blockchain.chain.length);
        });
    });
    describe('getBlockByHeight method', () => {
        it('should return the block corresponding to the given height', async() => {
            const getHeightReturn = await blockchain.getBlockByHeight(blockchain.chain.length);
            expect(getHeightReturn.body).toEqual(star);
            expect(getHeightReturn.height).toBe(blockchain.chain.length);
        });
    });
    describe('getBlockByHash method', () => {
        it('should return a formated string', async() => {
            const getBlockByHashReturn = await blockchain.getBlockByHash(blockchain.chain[blockchain.chain.length - 1].hash);
            expect(getBlockByHashReturn.body).toEqual(star);
        });
    });
    describe('validateBlock method', () => {
        it('should validate a correct block', async() => {
            const validateBlockchainReturn = await blockchain.validateBlock(blockchain.chain.length);
            expect(validateBlockchainReturn).toBeTrue();
        });
    });
    describe('requestMessageOwnershipVerification method', () => {
        it('should return a formated string', async() => {
            const requestMessageOwnershipVerificationResult = await blockchain.requestMessageOwnershipVerification(address);
            expect(requestMessageOwnershipVerificationResult).toEqual(`${address}:${getCurrentTimeStamp()}:starRegistry`);
        });
    });

});