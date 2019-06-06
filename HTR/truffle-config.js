require('dotenv').config();
require('chai/register-should');
var HDWalletProvider = require("truffle-hdwallet-provider");

//process.env.MNEMONIC="cactus ball cattle honey dune check style mention equal title inform series"

module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  plugins: null,
  networks: {
    development: {
//      provider: new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/5594b883cd4e4761a214bbbb88c2cc29", 0, 10),
      host: "127.0.0.1",
      port: 8545,
//      gas:      1000000,
      gasLimit: 3366921,
      gas: 3366921,
//      gasPrice: 220000000, // Specified in Wei
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/5594b883cd4e4761a214bbbb88c2cc29", 0, 10),
      network_id: "3",
      gas: 7990000,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      skipDryRun: true,
      user : process.env.INFURA_KEY,
      gasPrice: 22000000000 // Specified in Wei
    },
    kovan: {
      provider: new HDWalletProvider(process.env.MNEMONIC, "https://kovan.infura.io/"),
      network_id: "42",
      gas: 7200000,
      gasPrice: 22000000000 // Specified in Wei
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8525,
      gas: 10000000000000,
      gasPrice: 0x01,
    },
    rinkeby: {
      provider: new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/", 0, 10),
      network_id: "4",
      gas: 7200000,
      gasPrice: 22000000000 // Specified in Wei
    },
    production: {
      provider: new HDWalletProvider(process.env.MNEMONIC, "https://mainnet.infura.io/dYWKKqsJkbv9cZlQFEpI "),
      network_id: "1",
      gas: 7990000,
      gasPrice: 7000000000
    },    
  },
  compilers: {
    solc: {
      version: "0.5.8+commit.23d335f2.Emscripten.clang",  // ex:  "0.4.20". (Default: Truffle's installed solc)
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
 }
  
};
