require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()


module.exports = {
  solidity: "0.8.20",
  networks: {
    kairos: {
      url: process.env.KAIROS_TESTNET_URL || "",
      gasPrice: 250000000000,
      accounts:
        process.env.KAIROS_TESTNET_PRIVATE_KEY !== undefined ? [process.env.KAIROS_TESTNET_PRIVATE_KEY] : [],
    },
    mainnet: {
      url: process.env.MAINNET_URL || "", // 或者 Infura RPC
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
    kaia: {
      url: process.env.KAIA_URL || "", // 或者 Infura RPC
      accounts: [process.env.KAIA_PRIVATE_KEY],
    },
  }
};
