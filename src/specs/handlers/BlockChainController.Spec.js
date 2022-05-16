import supertest from "supertest";
import request from "request";
// import { ApplicationServer } from "../../app.js";
import app from "../../app2.js";


// new ApplicationServer();
// const request = supertest(app);

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

const base_url = `127.0.0.1/block/height/${genesisBlock.height}`;

xdescribe('get /block/height/:height', () => {
    it('should return the correct block with an existing height', async() => {

        request.get(base_url, function(error, response, body) { 
            console.log(response)
            expect(response).toBe(200);
            done();
        })

        // const response = request
        //     .get(base_url)
        //     .set('Accept', 'application/json');
        // console.log(response)
    });

})