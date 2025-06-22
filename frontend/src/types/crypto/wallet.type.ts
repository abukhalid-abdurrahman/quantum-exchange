import { PublicKey } from "@solana/web3.js";

export type LinkWallet = {
  walletAddress: PublicKey;
  network: string;
};
