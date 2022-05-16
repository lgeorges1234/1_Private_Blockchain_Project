import pkg from 'crypto-js';
const { SHA256 } = pkg;

import { Block } from "../../models/block.js";

describe('Block Class', () => {

    let block = '';
    let data = '';

    beforeAll(async () => {
        data = {
            star: {        
                name: "First Star",
                dec: "1D 1' 1",
                ra: "1h 1m 1s",
                story: "This is the First star Recorded!"
                }, 
            owner: 'owner1Address'
        };
    })

    beforeEach(async () => {
        block = new Block(data);  
    })

    it('create a new Block instance', () => {
        expect(block instanceof Block).toBeTruthy();
        expect(block.getBData()).toEqual(data);
    });
    describe('validateBlock() method ', () => {
        it('should return true to a valid block', async () => {
            block.hash = SHA256(JSON.stringify(block)).toString();
            const validateBlockResult = await block.validateBlock();
            expect(validateBlockResult).toBeTrue();
        })
    });
    describe('getBData() method ', () => {
        it('should return a decoded data', () => {
            const getBDataResult = block.getBData();
            expect(getBDataResult).toEqual(data);
        })
    });

})

