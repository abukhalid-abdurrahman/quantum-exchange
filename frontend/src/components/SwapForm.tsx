"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  swapSchema,
  SwapSchema,
  swapSchemaDefaultValues,
  swapSchemaFields,
} from "@/schemas/swap/swap.schema";

import { useUserStore } from "@/store/useUserStore";
import { useSwap } from "@/hooks/swapHooks";
import { useGetExchangeRate } from "@/requests/swap/getExchangeRate.request";
import { useCreateOrder } from "@/requests/swap/createOrder.request";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SwapInput from "@/components/form/SwapInput";
import LoadingAlt from "@/components/LoadingAlt";
import CryptoModal from "@/components/CryptoModal";
import StatusModal from "@/components/StatusModal";
import CryptoAddressModal from "@/components/CryptoAddressModal";

import { SwapFormData, SwapResponse } from "@/types/crypto/swap.type";

export default function SwapForm() {
  const router = useRouter();
  const { user } = useUserStore();

  const form = useForm<SwapSchema>({
    resolver: zodResolver(swapSchema),
    defaultValues: swapSchemaDefaultValues,
  });

  const {
    selectedFrom,
    selectedTo,
    selectedNetwork,
    isCryptoModalOpen,
    openCryptoModal,
    closeCryptoModal,
    setSelectedFrom,
    setSelectedTo,
    selectNetwork,
    selectCrypto,
  } = useSwap();

  const [orderError, setOrderError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [isCryptoAddressModalOpen, setCryptoAddressModalOpen] = useState(false);
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);

  const [formData, setFormData] = useState<SwapFormData | null>(null);
  const [orderResponse, setOrderResponse] = useState<SwapResponse | null>(null);

  const prevFrom = useRef(selectedFrom);
  const prevTo = useRef(selectedTo);

  const fromAmount = form.watch("fromAmount");
  const { data: exchangeRate, isFetching } = useGetExchangeRate(
    selectedFrom.token,
    selectedTo.token
  );
  const submitOrder = useCreateOrder();

  useEffect(() => {
    if (selectedFrom.token === selectedTo.token) {
      setSelectedFrom(prevTo.current);
      setSelectedTo(prevFrom.current);
    }
    prevFrom.current = selectedFrom;
    prevTo.current = selectedTo;
  }, [selectedFrom, selectedTo]);

  useEffect(() => {
    if (exchangeRate) {
      const toAmount = fromAmount ? fromAmount * exchangeRate.data.rate : null;
      form.setValue("toAmount", toAmount);
    }
  }, [fromAmount, exchangeRate]);

  useEffect(() => {
    if (isOrderCompleted) {
      setOrderError("");
      setFormData(null);
      setOrderResponse(null);
      setCryptoAddressModalOpen(false);
      setStatusModalOpen(false);
    }
  }, [isOrderCompleted]);

  const onSubmit = (values: SwapSchema) => {
    if (!user?.Id) {
      router.push("?signin=true");
      return;
    }

    // setIsLoading(true);
    const payload = {
      userId: user.Id,
      fromToken: selectedFrom.token,
      toToken: selectedTo.token,
      amount: values.fromAmount,
      fromNetwork: selectedFrom.network,
      toNetwork: selectedTo.network,
      destinationAddress: values.destinationAddress,
    };

    setFormData(payload);
    submitOrder.mutate(payload, {
      onSuccess: (res) => {
        setOrderResponse(res);
      },
      onError: (err: any) => {
        setOrderError(
          err.response?.data?.error?.message || "An error occurred"
        );
      },
    });

    setCryptoAddressModalOpen(true);
  };

  const handleSwap = () => {
    const temp = selectedFrom;
    setSelectedFrom(selectedTo);
    setSelectedTo(temp);
  };

  const closeStatusModal = () => {
    setIsOrderCompleted(true);
    setStatusModalOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 sm:gap-3"
      >
        {/* Input Fields */}
        <div className="flex flex-col gap-5 relative sm:gap-3">
          <SwapInput
            form={form}
            input={swapSchemaFields[0]}
            token={selectedFrom}
            openCryptoModal={openCryptoModal}
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              type="button"
              className="bg-white w-10 h-10 flex justify-center items-center rounded-xl border border-[#878787] shadow-sm group sm:w-8 sm:h-8"
              onClick={handleSwap}
            >
              <ChevronDown
                size={20}
                className="group-hover:rotate-180 transition-transform duration-200 sm:w-3"
              />
            </button>
          </div>

          <SwapInput
            form={form}
            input={swapSchemaFields[1]}
            token={selectedTo}
            openCryptoModal={openCryptoModal}
          />
        </div>

        <SwapInput form={form} input={swapSchemaFields[2]} />

        <Button
          type="submit"
          variant="gray"
          size="xxl"
          onClick={() => setIsOrderCompleted(false)}
        >
          Swap
        </Button>
      </form>

      {/* --- MODALS --- */}
      <CryptoModal
        isOpen={isCryptoModalOpen}
        onClose={closeCryptoModal}
        selectNetwork={selectNetwork}
        selectedNetwork={selectedNetwork}
        onSelect={selectCrypto}
        selectedFrom={selectedFrom}
        selectedTo={selectedTo}
        setSelectedFrom={setSelectedFrom}
        setSelectedTo={setSelectedTo}
      />

      {isCryptoAddressModalOpen && orderResponse?.data?.orderId && (
        <CryptoAddressModal
          isOrderCompleted={isOrderCompleted}
          setIsOrderCompleted={setIsOrderCompleted}
          fromNetwork={selectedFrom}
          fromAmount={fromAmount}
          formData={formData}
          isOpen={isCryptoAddressModalOpen}
          setIsOpen={setCryptoAddressModalOpen}
          setIsStatusModalOpen={setStatusModalOpen}
          orderId={orderResponse.data.orderId}
          orderError={orderError}
        />
      )}

      {isStatusModalOpen && (
        <StatusModal
          isOrderCompleted={isOrderCompleted}
          orderId={orderResponse?.data?.orderId || ""}
          isOpen={isStatusModalOpen}
          onClose={closeStatusModal}
        />
      )}

      {isFetching && <LoadingAlt />}
    </Form>
  );
}
