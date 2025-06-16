"use client";

import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import CountdownTimer from "@/components/CountdownTimer";
import QRCodeDisplay from "@/components/QrCode";
import CopyBtn from "@/components/CopyBtn";
import { useEffect, useState } from "react";
import { shortAddress } from "@/utils/shortSomething";
import { VirtualAddressMesages } from "@/lib/helpers/virtualAddressMessages";
import { useUserStore } from "@/store/useUserStore";
import { useGetVirtualAccounts } from "@/requests/user/getVirtualAccounts.request";
import { useGetVirtualAccountBalance } from "@/requests/user/getVirtualAccountBalance.request";
import { buttonVariants } from "@/components/ui/button";
import { SelectedCrypto } from "@/types/crypto/crypto.type";
import { SwapFormData } from "@/types/crypto/swap.type";

interface StatusModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setIsStatusModalOpen: (open: boolean) => void;
  fromNetwork: SelectedCrypto;
  fromAmount: number;
  formData: SwapFormData | null;
  orderId?: string;
  orderError: string;
  isOrderCompleted: boolean;
  setIsOrderCompleted: (value: boolean) => void;
}

export default function CryptoAddressModal({
  fromNetwork,
  fromAmount,
  formData,
  isOpen,
  setIsOpen,
  setIsStatusModalOpen,
  orderId,
  orderError,
  isOrderCompleted,
  setIsOrderCompleted,
}: StatusModalProps) {
  const { user } = useUserStore();
  const [address, setAddress] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);
  const [message, setMessage] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const { data: accountData } = useGetVirtualAccounts(
    showAddress,
    user?.token || ""
  );
  const {
    data: balanceData,
    refetch: refetchBalance,
    isError: balanceError,
    isFetching: balanceFetching,
  } = useGetVirtualAccountBalance(orderId!, isOpen);

  useEffect(() => {
    if (formData) {
      const found = accountData?.data.find(
        (item: { token: string; address: string }) =>
          item.token === formData.fromToken
      );
      if (found) setAddress(found.address);
    }
  }, [accountData]);

  useEffect(() => {
    if (!balanceData) return;

    const status = balanceData.data.status;

    if (status === "InsufficientFunds") {
      setShowAddress(true);
      setIsStatusModalOpen(false);
    } else if (status === "Expired") {
      setIsCanceled(true);
      setTimeLeft(0);
    } else if (status === "Pending" || status === "Completed") {
      setShowAddress(false);
      setIsOpen(false);
      setIsStatusModalOpen(true);
    }
  }, [balanceData]);

  useEffect(() => {
    if (!isOpen || !showAddress || isCanceled) return;
    const interval = setInterval(() => {
      if (!balanceFetching && !balanceError) {
        refetchBalance();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [showAddress, isOpen, isCanceled]);

  useEffect(() => {
    if (isOrderCompleted) {
      setAddress("");
      setShowAddress(false);
    }
  }, [isOrderCompleted]);

  useEffect(() => {
    const interval = 120;
    const index = Math.floor((600 - timeLeft) / interval);
    if (index < VirtualAddressMesages.length && timeLeft < 600 - interval) {
      setMessage(VirtualAddressMesages[index]);
    }
  }, [timeLeft]);

  const handleClose = () => {
    setAddress("");
    setShowAddress(false);
    setIsOpen(false);
    setIsOrderCompleted(true);
  };

  if (!isOpen) return null;

  const isLoading = !showAddress && !balanceError && !orderError;
  const isExpired = !timeLeft && isCanceled;
  const isError = orderError || balanceError;
  const isReady = showAddress && !!timeLeft && !balanceError;

  return (
    <Modal
      isNonUrlModal
      isNonClosable={isLoading}
      onCloseFunc={handleClose}
      className={isLoading || isExpired || isError ? "min-h-64" : ""}
    >
      {isLoading && (
        <Loading className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}

      {isExpired && (
        <>
          <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
          <p className="p text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Your order has been closed due to insufficient balance.
          </p>
        </>
      )}

      {isError && (
        <p className="p text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {orderError || "Something went wrong. Please try again later."}
        </p>
      )}

      {isReady && (
        <>
          <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />

          <div className="text-center">
            <h2 className="h2 text-lg mb-3 max-w-[280px] mx-auto">
              Please deposit your virtual account with{" "}
              <span className="font-bold">{fromAmount}</span> amount of{" "}
              {fromNetwork.token}s
            </h2>

            <QRCodeDisplay text={address} />

            {message && <p className="text-textGray p-sm mt-2">{message}</p>}

            <div className="flex gap-[5px] mt-5 items-center justify-center">
              <div
                className={`${buttonVariants({
                  variant: "empty",
                  size: "xl",
                })} flex gap-2 bg-gray py-3 px-5 rounded-xl justify-between items-center flex-1 relative`}
              >
                <p className="sm:text-sm sm:absolute sm:-top-[21px] sm:left-0">
                  Your {fromNetwork.token} virtual account:
                </p>
                <p>{shortAddress(address)}</p>
              </div>
              <CopyBtn address={address} />
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
