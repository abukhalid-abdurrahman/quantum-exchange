"use client";

import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import CryptoItem from "@/components/CryptoItem";
import { useGetNetworks } from "@/requests/swap/getNetworks.request";
import { SelectedCrypto, CryptoOption } from "@/types/crypto/crypto.type";
import { networkIcons } from "@/lib/cryptoOptions";

interface CryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (crypto: SelectedCrypto) => void;
  selectedFrom: SelectedCrypto;
  selectedTo: SelectedCrypto;
  selectedNetwork: CryptoOption | null;
  selectNetwork: (network: CryptoOption) => void;
  setSelectedTo: Dispatch<SetStateAction<SelectedCrypto>>;
  setSelectedFrom: Dispatch<SetStateAction<SelectedCrypto>>;
}

export default function CryptoModal({
  isOpen,
  onClose,
  onSelect,
  selectedNetwork,
  selectNetwork,
}: CryptoModalProps) {
  const { data } = useGetNetworks();
  const networks = useMemo(() => data?.data?.data || [], [data]);

  useEffect(() => {
    if (networks.length && !selectedNetwork?.name) {
      selectNetwork(networks[1]);
    }
  }, [networks, selectedNetwork?.name]);

  const selectedNetworkTokens = useMemo(() => {
    if (networks) {
      return (
        networks.find((n: CryptoOption) => n?.name === selectedNetwork?.name)
          ?.tokens || []
      );
    }
  }, [networks, selectedNetwork]);

  const handleClick = (token: string) => {
    if (selectedNetwork) {
      onSelect({ network: selectedNetwork.name, token });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isNonUrlModal onCloseFunc={onClose}>
      <div className="flex flex-col justify-center h-full">
        <ul className="flex space-x-4">
          {networks.map((network: CryptoOption) => (
            <li key={network.id}>
              <CryptoItem
                image={networkIcons[network.name] || ""}
                crypto={network.name}
                className="cursor-pointer hover:bg-darkGray transition-all"
                onClick={() => selectNetwork(network)}
              />
            </li>
          ))}
        </ul>

        <div className="rounded-xl bg-gray mt-[10px] p-5">
          <ul>
            {selectedNetworkTokens.length > 0 ? (
              selectedNetworkTokens.map((token: string) => (
                <li
                  key={token}
                  className="flex gap-3 items-center text-sm cursor-pointer text-textGray"
                  onClick={() => handleClick(token)}
                >
                  <Image
                    src={`/${token}.png`}
                    alt={token}
                    width={20}
                    height={20}
                  />
                  <p className="p-sm">{token}</p>
                </li>
              ))
            ) : (
              <p className="p-sm text-textGray">No tokens available</p>
            )}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
