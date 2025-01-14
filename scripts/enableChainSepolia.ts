// scripts/enableChain.ts

import { network } from "hardhat";
import { ethers, Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `sepolia`) {
    console.error(`Must be called from Ethereum Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.SEPOLIA_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressSepolia = `0xBcB23ED6FeFF554E37dBEb6CcdC18A3CfDFA8fD8`;
  const xNftAddressZKsync = `0x9B736CD0cA3353e019Fba841BA7f0506ad93d573`;
  const chainSelectorZKsync = `6898391096552792247`;
  const ccipExtraArgs = `0x97a657c90000000000000000000000000000000000000000000000000000000000030d40`;

  const xNft: XNFT = XNFT__factory.connect(xNftAddressSepolia, signer);

  const tx = await xNft.enableChain(
      chainSelectorZKsync,
      xNftAddressZKsync,
      ccipExtraArgs
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
