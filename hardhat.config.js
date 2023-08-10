require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */

const bscTestnetRpc = process.env.BSCT_URL;
const privateKey = process.env.TEST_PRIVATE_KEY;
const fantomTestnetRpc = process.env.FANTOM_RPC_PROVIDER;
const fantomApiKey = process.env.FANTOMSCAN_APIKEY;
const bscApiKey = process.env.BSCSCAN_APIKEY;

const settings = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};
module.exports = {
  
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      { 
        version: "0.8.18",
      },
      {
        version: "0.8.17",
      },
      {
        version: "0.8.13",
      }
    ].map((o) => ({ ...o, settings })),
  },
  networks: {
    bscTestnet: {
      url: bscTestnetRpc || "",
      accounts:
      privateKey !== undefined ? [privateKey] : [],
    },
    ftmTestnet: {
      url: fantomTestnetRpc,
      accounts:[privateKey],
      chainId: 4002,
    },
    // hardhat: {
    //   chainId: 31337,
    //   forking: {
    //     url: `${ process.env.BSC_MAIINETFORK_RPC_URL_QUICKNODE }`,
    //     blockNumber: 14390000,
    //   }
    // },
  },
  allowUnlimitedContractSize: true,
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  etherscan: {
    apiKey: {
      ftmTestnet: fantomApiKey,
      bscTestnet: bscApiKey,
    }
  },
};
