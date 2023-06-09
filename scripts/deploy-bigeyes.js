const { ethers } = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const BigEyes = await ethers.getContractFactory("BigEyes");
  console.log("Deploying BigEyes...");

  const name = "Big Eyes";
  const symbol = "$BIG";
  const decimals = 18;
  const totalsupply = BigNumber.from(200000000000).mul(BigNumber.from(10).pow(decimals));

  const bigeyes = await BigEyes.deploy(name, symbol, decimals, totalsupply);
  await bigeyes.deployed();

  console.log("BigEyes deployed to:", bigeyes.address);
  
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
