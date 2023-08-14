
const hre = require("hardhat");

async function main() {

  const FactoryYourCoin = await hre.ethers.getContractFactory("FactoryYourCoin")
  const factoryYourCoinContract = await FactoryYourCoin.deploy()
  await factoryYourCoinContract.waitForDeployment(); 
  console.log("Contract deployed at address:", await factoryYourCoinContract.getAddress())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
