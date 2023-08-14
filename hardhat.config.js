require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox");

let options =  {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.URL_INFURE,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};

if (process.env.NODE_ENV === 'testing') {
  options =  {
    solidity: "0.8.19",
  }
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = options
