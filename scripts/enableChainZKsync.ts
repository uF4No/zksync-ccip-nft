// scripts/enableChain.ts

import { network } from "hardhat";
import { ethers, Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `ZKsyncSepolia`) {
    console.error(`Must be called from ZKsyncSepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.ZKSYNC_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressZKsync = `0x9B736CD0cA3353e019Fba841BA7f0506ad93d573`;
  const xNftAddressSepolia = `0xBcB23ED6FeFF554E37dBEb6CcdC18A3CfDFA8fD8`;
  const chainSelectorSepolia = `16015286601757825753`;
  const ccipExtraArgs = `0x97a657c90000000000000000000000000000000000000000000000000000000000030d40`;

  const xNft: XNFT = XNFT__factory.connect(xNftAddressZKsync, signer);

  const tx = await xNft.enableChain(
      chainSelectorSepolia,
      xNftAddressSepolia,
      ccipExtraArgs
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
