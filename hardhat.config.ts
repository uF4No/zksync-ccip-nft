import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
import "@matterlabs/hardhat-zksync";
import '@typechain/hardhat'


// Load environment variables
import dotenv from "dotenv";
dotenv.config(); 
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;

const config: HardhatUserConfig = {
  zksolc: {
    version: "1.5.8",
    compilerSource: "binary",
    settings: {},
  },
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          evmVersion: 'paris'
        }
      }
    ]
  },
  networks: {
    hardhat: {
      chainId: 31337,
      zksync: false
    },
    sepolia: {
      url: SEPOLIA_RPC_URL !== undefined ? SEPOLIA_RPC_URL : '',
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 11155111,
      gasPrice: 300000000000,
      zksync: false,
    },
    ZKsyncSepolia: {
      url: 'https://sepolia.era.zksync.dev',
      ethNetwork: 'sepolia', // The network that zkSync is connected to
      zksync: true,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      verifyURL: 'https://explorer.sepolia.era.zksync.dev/contract_verification',
    },
  }
};

export default config;
