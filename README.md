# Private Blockchain Project

This project is an implementation of a basic blockchain in nodeJS. It represents a test of concept on how a Blockchain application can be used to register stars and keeping ownership of the different additions.


## Table of contents

* [General info](#general-info)
* [Dependencies](#dependencies)
* [Database connection](#database-connection)
* [User actions](#users-action)
* [API call](#api-call)
* [Available Scripts](#available-scripts)
---

## General info

1. The application will create a Genesis Block when we run the application.
2. The user will request the application to send a message to be signed using a Wallet and in this way verify the ownership over the wallet address. The message format will be: `<WALLET_ADRESS>:${new Date().getTime().toString().slice(0,-3)}:starRegistry`;
3. Once the user have the message the user can use a Wallet to sign the message.
4. The user will try to submit the Star object for that it will submit: `wallet address`, `message`, `signature` and the `star` object with the star information.
    The Start information will be formed in this format:
    ```json
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "Testing the story 4"
		}
    ```
5. The application will verify if the time elapsed from the request ownership (the time is contained in the message) and the time when you submit the star is less than 5 minutes.
6. If everything is okay the star information will be stored in the block and added to the `chain`
7. The application will allow us to retrieve the Star objects belong to an owner (wallet address).
---

## Dependencies

This application has been created using Node.js and javascript programming language. The architecture use ES6 classes.
Some of the libraries or npm modules used:
    * "bitcoinjs-lib": "^4.0.3",
    * "bitcoinjs-message": "^2.0.0",
    * "body-parser": "^1.18.3",
    * "crypto-js": "^3.1.9-1",
    * "express": "^4.16.4",
    * "hex2ascii": "0.0.3",
    * "morgan": "^1.9.1"

### Libraries purpose:

1. `bitcoinjs-lib` and `bitcoinjs-message`. Those libraries help to verify the wallet address ownership, it is used to verify the signature.
2. `express` The REST Api is being created using Express.js framework.
3. `body-parser` this library is used as middleware module for Express in order to read the json data submitted in a POST request.
4. `crypto-js` This module contains some of the most important cryotographic methods and is used to create the block hash.
5. `hex2ascii` This library is used to **decode** the data saved in the body of a Block.
---


## Application

### app.js file 

It contains the configuration and initialization of the REST Api, the team who provide this boilerplate code suggest do not change this code because it is already tested and works as expected.

### BlockchainController.js file 

It contains the routes of the REST Api. Those are the methods that expose the urls you will need to call when make a request to the application.

### Classes

#### Block class

This class will allow to implemente instamces of a block. 

It contains a constructor and the following methods:
  - `validateBlock()` - validate if the block has been tampered or not.
  - `getBData()` - decode the body of the block from hexadecimal.
 
---

#### Blockchain class

This class will allow to implemente instamces of a blockchain. 

It contains a constructor and the following methods:
  - `createGenesisBlock()` - create the first block of the blockchain during the creation of the instance.
  - `_addBlock(block)` - store a block into the chain. 
  - `getLatestBlock()` - return the latest block added to the chain.
  - `getBlockByHeight(height)` - return the Block with the height passed as a parameter.
  - `getBlockByHash(hash)` - return the Block with the hash passed as a parameter.
  - `validateBlock(height)` - validate the given block has been tampered or not.
  - `requestMessageOwnershipVerification(address)` - allow to request a message used to be signed by a bitcoin wallet. This is the first step before submiting the block.
  - `submitStar(address, message, signature, star)` - allow users to register a new Block with the star object into the chain.
  - `getStarsByWalletAddress(address)` - return an array of Stars objects existing in the chain and are belongs to the owner with the wallet address passed as parameter.
  - `validateChain()` - return the list of errors when validating the chain.

---

## API calls

|  Actions |  Route |  Request  |  body  |
| ------------- |-------------| -----| -------------  |
|  Get Block by Height:       | /block/height/:height  | [POST]  |  -  |
|  Get Block by Hash:       | /block/height/:hash  | [POST]  |  -  |
|  Request OwnerShip:        | /requestValidation | [POST]  |  address  |
|  Submit Star :  | /submitstar  | [POST]  |  address, message, signature, star  |
|  Get Stars by Owner :  | /blocks/:address |  [GET]  |  -  |

---

## Available Scripts

#### Run server
`npm run start`

#### Run all Tests
`npm run test`

---

## To Do

- test endpoints,
- include eslint and prettier,
- redone project using Typescript
- ...

