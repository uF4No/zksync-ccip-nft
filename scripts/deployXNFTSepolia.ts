// deployXNFTSepolia.ts
import { ethers, network } from "hardhat";


async function main() {
    // First check if we're on the right network
    if (network.name !== 'sepolia') {
        throw new Error('Must be run on Sepolia network');
    }

    console.log("Deploying XNFT contract to Sepolia...");

    // Get the deployer's signer
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Check deployer balance
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

    const ccipRouterAddressSepolia = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59";
    const linkTokenAddressSepolia = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
    const chainIdSepolia = "16015286601757825753";

    // Get the contract factory
    const XNFT = await ethers.getContractFactory("XNFT");
    
    console.log("Starting deployment...");
    const xNft = await XNFT.deploy(
        ccipRouterAddressSepolia,
        linkTokenAddressSepolia,
        chainIdSepolia
    );

    console.log("Waiting for deployment...");
    await xNft.waitForDeployment();

    const deployedAddress = await xNft.getAddress();
    console.log(`XNFT deployed on ${network.name} at address: ${deployedAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
