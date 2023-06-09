require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
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

    bsct: {
      url: process.env.BSCT_URL || "",
      accounts:
        process.env.TEST_PRIVATE_KEY !== undefined ? [process.env.TEST_PRIVATE_KEY] : [],
    },
    fantom: {
      url: `${ process.env.FANTOM_RPC_PROVIDER }`,
      accounts:[`${process.env.TEST_PRIVATE_KEY}`],
      chainId: 4002,
    },

    hardhat: {
      chainId: 31337,
      forking: {
        url: `${ process.env.BSC_MAIINETFORK_RPC_URL_QUICKNODE }`,
        blockNumber: 14390000,
      }
    },
  },
  // settings: {
  //   optimizer: {
  //     enabled: true,
  //     viaIR: true,
  //     runs: 200,
  //   },
  // },
  allowUnlimitedContractSize: true,
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  etherscan: {
    // apiKey: process.env.ETHERSCAN_API_KEY,
    apiKey: process.env.FANTOMSCAN_APIKEY,
  },
};
