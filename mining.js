const SHA256 =require('crypto-js/sha256');

class Block {
	constructor(timestamp,data,previousHash=''){
		this.timestamp=timestamp;
		this.data=data;
		this.previousHash=previousHash;
		this  .hash=this.calculateHash();
	  this.nonce = 0;

	}
	calculateHash(){
		 return SHA256( this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
	}

mineBlock (difficulty){
		while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
		  this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log('block mined :'+ this.hash);
	}
}

 
class Blockchain{
  
  constructor(){
  	this.chain = [this.createGenesisBlock()];
  	this.difficulty = 4;
  	
  }

  createGenesisBlock(){
  	return new Block(0,"24/05/2017","Genesis Block","0");
  }

  getLatestBlock(){
  	 return this.chain[this.chain.length-1];
  }

  addNewBlock(newBlock){
  	newBlock.previousHash = this.getLatestBlock().hash;
 	 newBlock.mineBlock(this.difficulty)
  	this.chain.push(newBlock);
  }
  
 

  isChainValid(){
  	for(let i=1;i<this.chain.length;i++){
  		const currentBlock =this.chain[i];
  		const previousBlock = this.chain[i-1];
  	
  		if( currentBlock.previousHash !== previousBlock.hash  ){
  		return false;
  		}
  		if (currentBlock.hash !== currentBlock.calculateHash() ){
  		return false;
  		}
   }
  	return true;
  }
  


}
let landCoin = new Blockchain();


 console.log('mining block 1',);
 landCoin.addNewBlock(new Block(1,"25/05/2017",{amount:256}));
 console.log('mining block 2',);
landCoin.addNewBlock(new Block(2,"26/05/2017",{amount:190}));
//console.log(JSON.stringify(landCoin,null,4));




