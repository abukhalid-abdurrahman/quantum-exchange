"use client";

import Wallet from "@/app/(main)/profile/wallets/components/Wallet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import WalletSelector from "@/components/WalletSelector";
import { useGetLinkedWallets } from "@/requests/user/getLinkedWallets.request";
import { useUserStore } from "@/store/useUserStore";
import { LinkedWallet } from "@/types/user/profile.type";
import { useState } from "react";

export default function ConnectedWallets() {
  const { user } = useUserStore();
  const { data, isFetching, refetch } = useGetLinkedWallets(user?.token || "");

  const [showWalletSelector, setShowWalletSelector] = useState(false);

  if (isFetching)
    return <Skeleton className="bg-primary w-[230px] h-[209px]" />;

  const wallets = data?.data || [];
  // const wallets = [
  //   {
  //     network: "Solana",
  //     walletAddress: "ffUhngvbngjkfbdhgjfdsb",
  //   },
  //   {
  //     network: "Solana",
  //     walletAddress: "nfmdspjIFnv438ndu",
  //   },
  //   {
  //     network: "Solana",
  //     walletAddress: "okpfNG483ndksB",
  //   },
  // ];
  if (!wallets.length) {
    return (
      <>
        <p className="p text-secondary">You have no connected wallets yet</p>
        <Button
          variant="muted"
          size="lg"
          onClick={() => setShowWalletSelector(true)}
          className="mt-3"
        >
          Link wallet
        </Button>
        {showWalletSelector && (
          <WalletSelector
            refetch={refetch}
            setShowWalletSelector={setShowWalletSelector}
          />
        )}
      </>
    );
  }

  return (
    <div className="flex gap-2">
      {wallets.length > 0 &&
        wallets.map((wallet: LinkedWallet) => (
          <Wallet
            key={wallet.walletAddress}
            title={wallet.network}
            address={wallet.walletAddress}
            subtitle="Phantom"
          />
        ))}
    </div>
  );
}
