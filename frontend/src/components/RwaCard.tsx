"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";

import { shortDescription } from "@/utils/shortSomething";
import type { RwaCard } from "@/types/rwa/rwa.type";
import { cn } from "@/lib/utils";

interface RwaCardProps extends RwaCard {
  className?: string;
}

export default function RwaCard({
  title,
  assetType,
  assetDescription,
  price,
  image,
  tokenId,
  className,
}: RwaCardProps) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={() => router.push(`/rwa/${tokenId}`)}
      className={cn(
        "w-full bg-muted text-black p-2 cursor-pointer rounded-md transition-all relative z-0 group hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="aspect-square rounded-sm overflow-hidden relative flex justify-center items-center"
      >
        <div className="absolute inset-0 backdrop-blur-2xl z-10"></div>
        {!imageLoaded && (
          <Skeleton className="bg-primary absolute inset-0 z-30" />
        )}
        <img
          src={image}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className="relative z-20"
        />

        <Button
          variant="default"
          size="default"
          className="absolute z-40 bottom-3 left-1/2 -translate-x-1/2 opacity-0 transition-opacity border border-secondary group-hover:!opacity-100 group-hover:shadow-md hover:bg-primary/95"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Buy
        </Button>
      </div>

      <div className="flex flex-col items-start px-2 pb-1">
        <h2 className="h2 mt-3.5">{title}</h2>
        <p className="text-xs px-1.5 py-[3px] bg-secondary rounded-xs">
          {assetType}
        </p>

        <p className="p-sm text-zinc-500 mt-2.5">
          {shortDescription(assetDescription, 77)}
        </p>

        <div className="mt-5">
          <p className="text-[13px] text-zinc-500">Price:</p>
          <p className="text-lg -mt-1">
            {price} <span className="text-base">zBTC</span>
          </p>
        </div>
      </div>
    </div>
  );
}
