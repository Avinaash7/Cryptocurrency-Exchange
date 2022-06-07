require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKeys = process.env.PRIVATE_KEYS || ""
const mnemonicphrase= "parade hurt negative mandate neglect indoor deliver forest above tunnel mule leopard"

// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
//const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports={
networks: {
 
  development: {
   host: "127.0.0.1",     // Localhost (default: none)
   port: 7545,            // Standard Ethereum port (default: none)
   network_id: "*",       // Any network (default: none)
  },
  rinkeby: {
    provider: function(){
      return new HDWalletProvider(
        mnemonicphrase,
        'https://rinkeby.infura.io/v3/74588d050c7b43319cf75dc009aa7a01'
      )
    },
    gas: 5000000,
    gasPrice: 25000000000,
    network_id: 4
  }
  
},
contracts_directory: './src/contracts/',
contracts_build_directory: './src/abis/',
compilers: {
  solc: {
    version: "0.8.0" ,
     optimizer: {
       enabled: true,
       runs: 200
     }
    
  }
}
}
