// scripts/mint.ts

import { network } from "hardhat";
import { ethers, Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `sepolia`) {
    console.error(`Must be called from sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.SEPOLIA_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressSepolia = `0xD61fb8015Bf9b7631eB8779D01951ce7ec5e07cE`;

  const xNft: XNFT = XNFT__factory.connect(xNftAddressSepolia, signer);

  const tx = await xNft.mint();

  console.log(`Mint Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
