const { ethers } = require("hardhat");
const { BigNumber } = require('ethers');
async function main() {
  // Deploy Token contract
  const Token = await ethers.getContractFactory("Token");

  // const name = "sfdsfksdmkfcm";
  // const symbol = "$KTKN";
  // const decimals = 18;
  // const supply = BigNumber.from(10000000000).mul(BigNumber.from(10).pow(decimals));

  const token = await Token.deploy();

  await token.deployed();

  console.log("Token contract deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
