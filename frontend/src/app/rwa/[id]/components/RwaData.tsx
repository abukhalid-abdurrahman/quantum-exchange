"use client";

import AllRwaData from "@/components/AllRwaData";
import Chart from "@/components/Chart";
import Loading from "@/components/Loading";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  handleCopy,
  shortAddress,
  shortDescription,
} from "@/lib/scripts/script";
import { useRwa, useRwaChanges } from "@/requests/getRequests";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PurchaseButton from "@/components/PurchaseButton";
import SellBuyData from "./SellBuyData";
import { SOLANA_ENVIRONMENT } from "@/lib/constants";

interface RwaDataProps {
  params: any;
}

export default function RwaData({ params }: RwaDataProps) {
  const tokenId = JSON.parse(params.value)?.id;
  const { data, isFetching } = useRwa(tokenId);
  const [isCopied, setIsCopied] = useState(false);
  const { data: sellBuyData, isFetching: isFetchingSellBuy } =
    useRwaChanges(tokenId);
  const [isAlldataOpen, setIsAlldataOpen] = useState(false);

  if (isFetching || isFetchingSellBuy) {
    return (
      <Loading
        className="flex justify-center mt-14"
        classNameLoading="!border-white !border-r-transparent !w-14 !h-14"
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-10 lg:gap-10 lg:flex lg:flex-col-reverse">
        <Chart
          firstData={data.data}
          data={sellBuyData.data}
          className="col-span-2 lg:col-span-1 lg:order-1"
        />
        <div className="flex flex-col gap-5 text-white items-start col-span-1 lg:flex-row lg:order-3 sm:!flex-col">
          <div className="flex gap-5 shrink-0 lg:flex-col lg:gap-3 sm:w-full">
            <img
              src={data.data.image}
              alt="RWA"
              className="w-[100px] rounded-2xl lg:w-[200px] sm:!w-full sm:!aspect-square sm:!h-auto"
            />
            <div className="sm:flex sm:justify-between sm:mt-3 sm:mb-1">
              <h3 className="h1 sm:!text-2xl">{data.data.title}</h3>
              <p className="p text-textGray -mb-2 mt-2 lg:mt-0 lg:-mb-1 sm:hidden">
                Price
              </p>
              <h2 className="h1 text-green-500 font-bold sm:!text-2xl">
                {data.data.price} zBTC
              </h2>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-textGray text-sm -mb-1">
              Asset Description:
            </span>
            <div className="">{data.data.assetDescription}</div>
            <div
              className={`${buttonVariants({
                variant: "gray",
                size: "lg",
              })} !px-5 !w-full flex justify-between flex-wrap`}
            >
              <span className="text-gray-500">Unique Identifier:</span>{" "}
              {data.data.uniqueIdentifier}
            </div>
            <div
              className={`${buttonVariants({
                variant: "gray",
                size: "lg",
              })} !px-5 !w-full flex justify-between flex-wrap`}
            >
              <span className="text-gray-500">Royalty:</span>
              {data.data.royalty}%
            </div>
            <div
              className={`${buttonVariants({
                variant: "gray",
                size: "lg",
              })} !px-5 !w-full flex justify-between flex-wrap`}
            >
              <span className="text-gray-500">Network:</span>
              {data.data.network}
            </div>
            <div
              className={`${buttonVariants({
                variant: "gray",
                size: "lg",
              })} !px-5 !w-full flex justify-between flex-wrap`}
            >
              <span className="text-gray-500">IPFS CID:</span>{" "}
              <span
                className="cursor-pointer relative"
                onClick={() => {
                  handleCopy(
                    data.data.image.replace("https://ipfs.io/ipfs/", ""),
                    { setIsCopied }
                  );
                }}
              >
                {shortAddress(
                  data.data.image.replace("https://ipfs.io/ipfs/", "")
                )}
                {isCopied && (
                  <span className="absolute right-0 -top-6 bg-white text-black text-xs px-2 py-1 rounded-md opacity-90 transition">
                    Copied
                  </span>
                )}
              </span>
            </div>
            <Button
              variant="gray"
              size="default"
              onClick={() => setIsAlldataOpen(true)}
              className="!px-5 !w-full flex justify-center flex-wrap cursor-pointer"
            >
              Show all information
            </Button>
            <Link
              className={`${buttonVariants({ variant: "empty", size: "lg" })}`}
              href={`https://explorer.solana.com/address/${
                data.data.mintAccount
              }${SOLANA_ENVIRONMENT === "devnet" ? "?cluster=devnet" : ""}`}
              target="_blank"
            >
              Check in Solana Explorer
            </Link>
            <PurchaseButton tokenId={tokenId} />
          </div>
        </div>
        {isAlldataOpen && (
          <AllRwaData setIsOpen={setIsAlldataOpen} data={data.data} />
        )}
      </div>
      <SellBuyData tokenId={tokenId} />
    </>
  );
}
