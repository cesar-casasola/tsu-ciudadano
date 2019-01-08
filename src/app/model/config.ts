export interface IConfig {    
    blockchainURL: string;
    repositoryURL: string;    
  }
  
  export class Config { 
    
    blockchainURL: string;
    repositoryURL: string; 
  
    constructor( 
      _blockchainURL: string,
      _repositoryURL: string 
    ) {
      this.blockchainURL = _blockchainURL     
      this.repositoryURL = _repositoryURL    
      }

  }