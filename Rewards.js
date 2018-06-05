const SHA256 =require('crypto-js/sha256');
class transaction{
	constructor(fromAddress,toAddress,amount){
	this.fromAddress=fromAddress;
	this.toAddress=toAddress;
	this.amount=amount;
  this.chainAddress = [];
	}
  
  listAddress(toAddress,fromAddress){
    this.chainAddress.push(toAddress);
    this.chainAddress.push(fromAddress);
  }



  isValidAddress(address){
    let count=0;
  for(let j=0;j<this.chainAddress.length-1;j++){
      if(this.chainAddress[j]===address){
         count++;
      }
      
  }
  if(count!==0){
    return true;
    
  }
  if(count===0){
    return false;
  }
  

  }

  

  


  
}
class Block {
	constructor(timestamp,transaction,previousHash=''){
		this.timestamp=timestamp;
		this.transaction=transaction;
		this.previousHash=previousHash;
		this  .hash=this.calculateHash();
	  this.nonce = 0;

	}
	calculateHash(){
		 return SHA256( this.previousHash + this.timestamp + JSON.stringify(this.transaction)+this.nonce).toString();
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
  	this.pendingTransaction= [];
  	this.miningReward=100;
  }

  createGenesisBlock(){
  	return new Block(0,"24/05/2017","Genesis Block","0");
  }

  getLatestBlock(){
  	 return this.chain[this.chain.length-1];
  }

 
  
  minePendingTransactions(miningRewardAddress){

  let block = new Block(Date.now(),this.pendingTransaction,this.getLatestBlock().hash);
  block.mineBlock(this.difficulty);
  console.log('block successfully mined..');
  this.chain.push(block);

  this.pendingTransaction = [new transaction(null,miningRewardAddress,this.miningReward)];

 }

 createTransaction(transaction){
 	this.pendingTransaction.push(transaction);
 
 }


 getBalance(address){
 	let balance =0;

 	for(const block of this.chain){
 		for(const trans of block.transaction){
 			if(trans.fromAddress === address ){
 				balance -= trans.amount;
 			}

 			if(trans.toAddress === address){
 				balance += trans.amount;
 			}
 		}

 	}
 	return balance;
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
let mCoin = new transaction();


landCoin.createTransaction(new transaction('address1','address2',100));
landCoin.createTransaction(new transaction('address2','address1',10));
landCoin.createTransaction(new transaction('address2','address3',50));
mCoin.listAddress('address2','address1');
mCoin.listAddress('address2','address3');
mCoin.listAddress('address1','address2');
console.log(mCoin.isValidAddress('address1'));
console.log(mCoin.isValidAddress('address5'));

console.log('starting the miner..');
landCoin.minePendingTransactions('xyz-address');

console.log('balance of xyz is' + landCoin.getBalance('xyz-address'));

console.log('starting the miner again..');
landCoin.minePendingTransactions('xyz-address');

console.log('balance of xyz is' + landCoin.getBalance('xyz-address'));
console.log('balance of address2 is' + landCoin.getBalance('address1'));






