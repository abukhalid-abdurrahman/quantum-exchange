"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import CopyBtn from "@/components/CopyBtn";
import { shortAddress } from "@/utils/shortSomething";
import { statusMessages } from "@/lib/helpers/statusMessages";
import { useGetVirtualAccountBalance } from "@/requests/user/getVirtualAccountBalance.request";
import { Button, buttonVariants } from "@/components/ui/button";

interface StatusModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  isOrderCompleted: boolean;
}

export default function StatusModal({
  orderId,
  isOpen,
  onClose,
  isOrderCompleted,
}: StatusModalProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [txId, setTxId] = useState("");

  const { data, refetch } = useGetVirtualAccountBalance(orderId!, !txId);
  const isCompleted = data?.data.status === "Completed";

  useEffect(() => {
    if (isCompleted) setTxId(data.data.transactionId);
  }, [isCompleted, data]);

  useEffect(() => {
    if (isOrderCompleted) setTxId("");
  }, [isOrderCompleted]);

  useEffect(() => {
    if (!orderId || isCompleted || txId) return;
    const interval = setInterval(refetch, 10000);
    return () => clearInterval(interval);
  }, [orderId, isCompleted, txId]);

  useEffect(() => {
    if (!isOpen || isCompleted) return;
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % statusMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen, isCompleted]);

  if (!isOpen) return null;

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-10">
      <Loading />
      <h2 className="h2 text-center mt-5">{statusMessages[messageIndex]}</h2>
    </div>
  );

  const renderSuccess = () => (
    <>
      <Image
        src="/done.svg"
        alt="Done"
        width={100}
        height={100}
        className="mt-5 sm:w-20"
      />
      <h2 className="h2 mt-5 block! text-center">
        Your transaction was successful
      </h2>

      <div className="flex gap-[5px] mb-[10px] w-full mt-5">
        <div
          className={`${buttonVariants({
            variant: "empty",
            size: "xl",
          })} flex gap-2 bg-gray py-3 px-5 rounded-xl justify-between items-center flex-1 relative`}
        >
          <p className="sm:text-sm xxs:text-xs">Your transaction ID:</p>
          <p>{shortAddress(txId)}</p>
        </div>
        <CopyBtn address={txId} />
      </div>

      <Button
        variant="gray"
        size="xl"
        onClick={() => {
          onClose();
          setTxId("");
        }}
        className="w-full"
      >
        Done
      </Button>
    </>
  );

  return (
    <Modal isNonClosable className="grid">
      <div className="flex flex-col items-center justify-center">
        {!txId ? renderLoading() : renderSuccess()}
      </div>
    </Modal>
  );
}
