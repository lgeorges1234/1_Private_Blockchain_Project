

import { Block } from "../../models/block.js";
import { Blockchain } from "../../models/blockchain.js";
import { getCurrentTimeStamp } from "../../utils/functions.js";

describe('Blockchain class', () => {

    let blockchain = {};
    let genesisBlock = {};
    let data1 = {};
    let data2 = {};
    let address = 'address'

    beforeAll(async () => {
        genesisBlock = { 
            hash: 'fbcedd68fc7254b212fed6a716efd0eef586ce77cde549c9606a30bb6b245db5', 
            height: 1, 
            body: 
                { 
                    star: {        
                        "name": "First Block in the Chain - Genesis Block",
                        "dec": "0D 0' 0",
                        "ra": "0h 0m 0s",
                        "story": "Everything starts now!"
                        }, 
                    owner: 'adminAddress'
                }, 
            time: '1652100362', 
            previousBlockHash: '0x' 
        };
        data1 = {
            star: {        
                name: "First Star",
                dec: "1D 1' 1",
                ra: "1h 1m 1s",
                story: "This is the First star Recorded!"
                }, 
            owner: 'owner1Address'
        };
        data2 = {
            star: {        
                name: "First Star",
                dec: "1D 1' 1",
                ra: "1h 1m 1s",
                story: "This is the First star Recorded!"
                }, 
            owner: 'owner2Address'
        };
    });
    beforeEach(async () => {
        blockchain = new Blockchain();  
        blockchain._addBlock(new Block(data1));
    })
    it('create a new blockchain instance', () => {
        expect(blockchain instanceof Blockchain).toBeTruthy();
        expect(blockchain.chain[0].getBData()).toEqual(genesisBlock.body);
    });
    describe('_addBlock method', () => {
        it('should add a block to the blockchain', async () => {
            const addedBlockToBlockchainResult = await blockchain._addBlock(new Block(data2));
            expect(addedBlockToBlockchainResult.getBData()).toEqual(data2);
            expect(addedBlockToBlockchainResult.previousBlockHash).toBe(blockchain.chain[blockchain.chain.length - 2].hash);
            expect(addedBlockToBlockchainResult.height).toBe(blockchain.chain.length);
        });
    });
    describe('getLatestBlock method', () => {
        it('should return the latest block of the blockchain', () => {
            const getLatestBlockResult = blockchain.getLatestBlock();
            expect(getLatestBlockResult.getBData()).toEqual(data1);
            expect(getLatestBlockResult.height).toBe(blockchain.chain.length);
        });
    });
    describe('getBlockByHeight method', () => {
        it('should return the block corresponding to the given height', async() => {
            const getHeightReturn = await blockchain.getBlockByHeight(blockchain.chain.length);
            expect(getHeightReturn.getBData()).toEqual(data1);
            expect(getHeightReturn.height).toBe(blockchain.chain.length);
        });
    });
    describe('getBlockByHash method', () => {
        it('should return a formated string', async() => {
            const getBlockByHashReturn = await blockchain.getBlockByHash(blockchain.chain[blockchain.chain.length - 1].hash);
            expect(getBlockByHashReturn.getBData()).toEqual(data1);
        });
    });
    describe('validateBlock method', () => {
        it('should validate a valid block', async() => {
            const validateBlockchainReturn = await blockchain.validateBlock(blockchain.chain.length);
            expect(validateBlockchainReturn).toBeTrue();
        });
    });
    describe('requestMessageOwnershipVerification method', () => {
        it('should return a formated string', async() => {
            const requestMessageOwnershipVerificationResult = await blockchain.requestMessageOwnershipVerification(genesisBlock.body.owner);
            expect(requestMessageOwnershipVerificationResult).toEqual(`${genesisBlock.body.owner}:${getCurrentTimeStamp()}:starRegistry`);
        });
    });
    describe('getStarsByWalletAddress method', () => {
        it('should return stars by owner', async() => {
            const getStarsByWalletAddressResult = await blockchain.getStarsByWalletAddress(genesisBlock.body.owner);
            expect(getStarsByWalletAddressResult).toEqual([genesisBlock.body.star]);
        });
    });
    describe('validateChain method', () => {
        it('should validate the blockchain', async() => {
            await blockchain._addBlock(new Block(data1))
            await blockchain._addBlock(new Block(data2))
            const validateChainResult = await blockchain.validateChain();
            expect(validateChainResult).toBeTrue();
        });
    })
});