"use server";

import RwaTabs from "@/app/(main)/rwa/[id]/components/RwaTabs";
import { PriceChangeIndicator } from "@/app/(main)/rwa/components/PriceChangeIndicator";
import { Button, buttonVariants } from "@/components/ui/button";
import { SOLANA_ENVIRONMENT } from "@/lib/constants";
import { devideThousands } from "@/utils/devideThousands";
import { formatToK } from "@/utils/formatToK";
import { shortAddress } from "@/utils/shortSomething";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// import RwaData from "./components/RwaData";

const rwa = {
  tokenId: "rwa-12345",
  title: "Luxury Apartment in Dubai Marina",
  assetDescription:
    "Lorem ipsum dolor sit amet consectetur. Sed ut eget etiam magna tortor amet. Ipsum ac in velit dignissim at etiam vel consectetur. Convallis accumsan sapien pellentesque neque sit viverra. Elementum tristique vulputate vitae felis felis lectus nec donec dictum. Gravida imperdiet sit neque malesuada dictum urna morbi blandit.",
  proofOfOwnershipDocument: "/documents/ownership-doc.pdf",
  uniqueIdentifier: "UAEDXB-APT-2025-001",
  movability: "Immpovable",
  royalty: 5,
  price: 32.5623,
  priceUSD: 3236895.23,
  oldPrice: 31.213,
  network: "Solana",
  image: "/nft.avif",
  documents: [
    {
      name: "Ownership Document",
      type: "pdf",
      size: 65353,
      url: "/documents/ownership-doc.pdf",
    },
    {
      name: "Certificate of acquisition",
      type: "pdf",
      size: 65353,
      url: "/documents/ownership-doc.pdf",
    },
  ],
  ownerContact: "+971-50-123-4567",
  assetType: "Real Estate",
  insuranceStatus: "Insured",
  geolocation: {
    lat: 25.08,
    lng: 55.14,
  },
  valuationDate: "2025-08-17T00:00:00.000Z",
  propertyType: "Apartment",
  area: 145,
  constructionYear: 2021,
  metadata: "https://google.com",
  mintAccount: "0xAbC123Ef4567890aBc123Ef4567890aBC123eF45",
  transactionHash:
    "0x9a1b2c3d4e5f67890123456789abcdef1234567890abcdef1234567890abcdef",
  version: 1,
  createdAt: "2025-07-19T12:00:00.000Z",
  updatedAt: null,
  ownerEmail: "owner@example.com",
  ownerUsername: "dubaiInvestor99",
};

const ipfsCID = "fInf932nFPMakzqr99Fneown3";

export default async function page() {
  return (
    <div className="mt-16 md:mt-10 xl:px-5 md:px-0! lg:mt-10 sm:mb-0! sm:pb-5">
      {/* <RwaData /> */}
      <div className="grid grid-cols-11 gap-[72px] relative">
        <div className="col-span-6">
          <img src={rwa.image} alt={rwa.title} className="rounded-xl" />

          <RwaTabs rwa={rwa} />
        </div>

        <div className="col-span-5">
          <div className="sticky top-10">
            <div className="flex items-center gap-2.5">
              <h1 className="text-[28px]">{rwa.title}</h1>
              <span className="px-2.5 py-1 bg-primary rounded-xs">
                v{rwa.version}
              </span>
            </div>

            <div className="flex gap-2.5 mt-1.5">
              <p className="p-sm px-2.5 py-1 bg-primary rounded-xs">
                {rwa.assetType}
              </p>
              <p className="p-sm px-2.5 py-1 bg-primary rounded-xs">
                {rwa.movability} property
              </p>
            </div>

            <div className="flex gap-5 mt-5 items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={`/icons/${rwa.network}-black.svg`}
                  alt={rwa.network}
                  width={16}
                  height={16}
                  priority
                  className="invert-100"
                />
                <span className="p-sm">{rwa.network}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="p-sm">Royalty</span>
                <span className="p-sm px-1 py-px bg-muted text-black rounded-xs">
                  {rwa.royalty}%
                </span>
              </div>
            </div>

            <div className="flex gap-5 items-center mt-2.5">
              <div className="flex gap-2 items-center">
                <span className="p-sm">IPFS CID</span>
                <span className="p-sm px-1 py-px bg-muted text-black rounded-xs">
                  {shortAddress(ipfsCID)}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="p-sm">UNIQUE ID</span>
                <span className="p-sm px-1 py-px bg-muted text-black rounded-xs">
                  {rwa.uniqueIdentifier}
                </span>
              </div>
            </div>

            <div className="mt-7.5">
              <img src="/nft.avif" alt="" className="w-12 h-12 rounded-sm" />
            </div>

            <div className="flex gap-5 mt-2">
              <div className="">
                <p className="p-sm text-secondary/80 -mb-1">Creator</p>
                <p className="p">{rwa.ownerUsername}</p>
              </div>
              <div className="">
                <p className="p-sm text-secondary/80 -mb-1">User conatcts</p>
                <p className="p">{rwa.ownerContact}</p>
              </div>
            </div>

            <div className="mt-2">
              <div className="">
                <p className="p-sm text-secondary/80 -mb-1">Mint account</p>
                <p className="p">{shortAddress(rwa.mintAccount)}</p>
              </div>
            </div>

            <div className="mt-7.5">
              <p className="p-sm text-secondary/80">Buy for</p>

              <div className="flex items-end">
                <h2 className="text-[32px] leading-0 mt-2 font-semibold">
                  {devideThousands(rwa.price)}{" "}
                  <span className="text-2xl">zBTC</span>
                </h2>
                <span className="p-sm text-secondary/80 mb-[3px] ml-2.5">
                  (~ {formatToK(rwa.priceUSD)})
                </span>
                <span className="p-sm text-secondary/80 mb-[3px] ml-2.5">
                  <PriceChangeIndicator
                    price={rwa.price}
                    oldPrice={rwa.oldPrice}
                  />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-[5px] mt-6">
                <Button variant="muted" size="xl">
                  Buy
                </Button>
                <Link
                  href={`https://explorer.solana.com/address/${rwa.mintAccount}${
                    SOLANA_ENVIRONMENT === "devnet" ? "?cluster=devnet" : ""
                  }`}
                  target="_blank"
                  className={buttonVariants({ variant: "default", size: "xl" })}
                >
                  Check in Solana Explorer
                  <ArrowUpRight
                    className="inline !w-6 !h-6"
                    size={30}
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
