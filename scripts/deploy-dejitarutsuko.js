const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const DejitaruTsuka = await ethers.getContractFactory("DejitaruTsuka");
  console.log("Deploying DejitaruTsuka...");

  const _router = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
  const name = "Dejitaru Tsuka";
  const symbol = "TSUKA";
  const _decimals = 9;
  const totalsupply = BigNumber.from(1000000000).mul(BigNumber.from(10).pow(_decimals));
  
  const dejitarutsuk = await DejitaruTsuka.deploy(_router, name, symbol, _decimals, totalsupply);
  await dejitarutsuk.deployed();

  console.log("DejitaruTsuka deployed to:", dejitarutsuk.address);
  
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
