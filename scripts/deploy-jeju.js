const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const JEJU = await ethers.getContractFactory("JEJU");
  console.log("Deploying JEJU...");

  const _dexRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
  const _name = "JEJU INU";
  const _symbol = "JEJU";

  const jeju = await JEJU.deploy(_dexRouter, _name, _symbol);
  await jeju.deployed();

  console.log("JEJU deployed to:", jeju.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
