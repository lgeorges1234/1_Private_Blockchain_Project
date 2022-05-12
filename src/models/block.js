import pkg from "crypto-js";
const { SHA256 } = pkg;
import { hex2ascii } from "hex2ascii";


/*  ========== Block Class ========================
    Class with a constructor for block data model
    =============================================== */

export class Block {
    
    constructor(star) {
        this.hash = "",
        this.height = 0,
        this.body = star,
        this.time = "",
        this.previousBlockHash = "0x"
    }

    // validate if block is being tampered by block height
    validateBlock() {
        let self = this;
        return new Promise((resolve, reject) => {
            // store the current hash in an auxiliary variable
            const currentHash = self.hash;
            self.hash = '';
            // recalculate the hash of the entire block
            const newHash = SHA256(JSON.stringify(self)).toString();
            if (currentHash === newHash) {
                resolve(true);
              } else {
                reject(new Error(false));
              }      
        })
    }

    getBData() {
        let self = this;
        return JSON.parse(hex2ascii(self.body));
    }
}