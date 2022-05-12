import supertest from "supertest";
import { ApplicationServer } from "../../app.js";


const request = supertest(ApplicationServer);

const genesisBlock = { 
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

describe('get /block/height/:height', () => {
    it('should return the correct block with an existing height', async() => {
        const getBlockByHeightResponse = await request.get(`/block/height/${genesisBlock.height}`)
        console.log(getBlockByHeightResponse)
        expect(getBlockByHeightResponse.status).toBe(200);
    });

})