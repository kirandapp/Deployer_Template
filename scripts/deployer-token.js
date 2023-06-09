// const { ethers } = require("hardhat");
// const { BigNumber } = require('ethers');
// const fs = require("fs");

// async function main() {
//   // Read token name from the user
//   const tokenName = "newContract1";

//   // Read the template contract
//   const contractTemplate = fs.readFileSync("./contracts/Token.sol", "utf8");

//   // Replace the placeholder with the user-provided name in the contract template
//   const updatedContractSource = contractTemplate.replace("CONTRACTNAME", tokenName);

//   // Write the updated contract to a temporary file
//   fs.writeFileSync(`./contracts/${tokenName}.sol`, updatedContractSource, "utf8");

//   // Compile the updated contract
//   const TempToken = await ethers.getContractFactory(tokenName);

//   // const name = "sfdsfksdmkfcm";
//   // const symbol = "$KTKN";
//   // const decimals = 18;
//   // const supply = BigNumber.from(10000000000).mul(BigNumber.from(10).pow(decimals));

//   const token = await TempToken.deploy();
//   await token.deployed();

//   console.log("Token contract deployed with name:", tokenName);
//   console.log("Token contract address:", token.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

// const { ethers } = require("hardhat");
// const { BigNumber } = require('ethers');
// const fs = require("fs");

// async function deployTokenContract(contractName) {

//   // Read the contract template
//   const contractTemplate = fs.readFileSync("./contracts/Token.sol", "utf8");

//   // Replace the placeholder with the provided contract name in the contract template
//   const updatedContractSource = contractTemplate.replace("CONTRACTNAME", contractName);

//   // Write the updated contract to a temporary file
//   fs.writeFileSync(`./contracts/${contractName}.sol`, updatedContractSource, "utf8");

//   // Compile the updated contract
//   const TempToken = await ethers.getContractFactory(contractName);

//   // const name = "MyToken";
//   // const symbol = "$MT";
//   // const supply = BigNumber.from(totalSupply);

//   const token = await TempToken.deploy();
//   await token.deployed();

//   console.log("Token contract deployed with name:", contractName);
//   console.log("Token contract address:", token.address);
// }

// async function main() {
//   const contract1Name = "Contract1";
//   // const contract1Decimals = 18;
//   // const contract1TotalSupply = 10000000000;

//   await deployTokenContract(contract1Name);

//   const contract2Name = "Contract2";
//   // const contract2Decimals = 8;
//   // const contract2TotalSupply = 5000000;

//   await deployTokenContract(contract2Name);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

const { ethers, artifacts, run } = require('hardhat');
const { BigNumber } = require('ethers');
const fs = require('fs');

async function deployContract(tokenName) {
  // Read the template contract
  const contractTemplate = fs.readFileSync('./contracts/Token.sol', 'utf8');

  // Replace the placeholder with the user-provided name in the contract template
  const updatedContractSource = contractTemplate.replace('CONTRACTNAME', tokenName);

  // Write the updated contract to a temporary file
  fs.writeFileSync(`./contracts/${tokenName}.sol`, updatedContractSource, 'utf8');

  // Compile the updated contract
  await run('compile');

  // Deploy the contract
  const Token = await ethers.getContractFactory(tokenName);
  const token = await Token.deploy();
  await token.deployed();

  console.log('Token contract deployed with name:', tokenName);
  console.log('Token contract address:', token.address);
}

async function main() {
  // Read token name from the user
  const tokenName = 'DevBook3';

  try {
    // Deploy the contract
    await deployContract(tokenName);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
