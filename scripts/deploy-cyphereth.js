const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const NeoCypherpunk = await ethers.getContractFactory("NeoCypherpunk");
  console.log("Deploying NeoCypherpunk...");

  const _router = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
  const _name = "Neo Cypherpunk";
  const _symbol = "NEOPUNK";

  const neocypherpunk = await NeoCypherpunk.deploy(_router, _name, _symbol);
  await neocypherpunk.deployed();

  console.log("NeoCypherpunk deployed to:", neocypherpunk.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
