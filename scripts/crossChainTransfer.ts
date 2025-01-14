// scripts/crossChainTransfer.ts

import { network } from "hardhat";
import { ethers, Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `sepolia`) {
    console.error(`Must be called from Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.SEPOLIA_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressSepolia = `0xBcB23ED6FeFF554E37dBEb6CcdC18A3CfDFA8fD8`;
  
  const from = `0x466ff3c5C76445823b49dF047d72663B8eAe9272`;
  const to = `0x466ff3c5C76445823b49dF047d72663B8eAe9272`;
  const tokenId = 1; // put NFT token id here
  const destinationChainSelector = `6898391096552792247`;
  const payFeesIn = 1; // 0 - Native, 1 - LINK

  const xNft: XNFT = XNFT__factory.connect(xNftAddressSepolia, signer);

  const tx = await xNft.crossChainTransferFrom(
      from,
      to,
      tokenId,
      destinationChainSelector,
      payFeesIn,
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
