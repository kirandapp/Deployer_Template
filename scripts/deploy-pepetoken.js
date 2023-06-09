const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const PepeToken = await ethers.getContractFactory("PepeToken");
  console.log("Deploying PepeToken...");

  const name = "Pepe Token";
  const symbol = "$Pepe";
  const totalsupply = BigNumber.from(420690000000000).mul(BigNumber.from(10).pow(18));

  const pepetoken = await PepeToken.deploy(name, symbol, totalsupply);
  await pepetoken.deployed();

  console.log("PepeToken deployed to:", pepetoken.address);
  
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
