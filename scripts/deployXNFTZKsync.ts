// deployXNFTZKsync.ts
import { ethers, network } from "hardhat";

async function main() {
    
    console.log(`Deploying XNFT contract to ${network.name}...`);

    // Get the deployer's signer
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Check deployer balance
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

    const ccipRouterAddressZKSepolia = `0xA1fdA8aa9A8C4b945C45aD30647b01f07D7A0B16`;
    const linkTokenAddressZKSepolia = `0x23A1aFD896c8c8876AF46aDc38521f4432658d1e`;
    const chainIdZKSepolia = `6898391096552792247`;

    // Get the contract factory
    const XNFT = await ethers.getContractFactory("XNFT");
    
    console.log("Starting deployment...");
    const xNft = await XNFT.deploy(
        ccipRouterAddressZKSepolia,
        linkTokenAddressZKSepolia,
        chainIdZKSepolia
    );

    console.log("Waiting for deployment...");
    await xNft.waitForDeployment();

    const deployedAddress = await xNft.getAddress();
    console.log(`XNFT deployed on ${network.name} at address: ${deployedAddress}`);

    // Verify the contract
    console.log('Verifying contract on ZKsync Explorer...');
    await hre.run("verify:verify", {
        address: deployedAddress,
        contract: "contracts/XNFT.sol:XNFT",
        constructorArguments: [
            ccipRouterAddressZKSepolia,
            linkTokenAddressZKSepolia,
            chainIdZKSepolia
        ],
    });

    console.log("Contract verified successfully!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
