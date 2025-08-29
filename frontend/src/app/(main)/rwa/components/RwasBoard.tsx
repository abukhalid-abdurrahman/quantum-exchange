"use client";

import RwaCard from "@/components/RwaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { CombinedRwa } from "@/types/rwa/rwa.type";
import { LoaderCircle } from "lucide-react";

const combinedRwasExample = [
  {
    tokenId: "1",
    title: "Relax Real Estate",
    assetType: "Real Estate",
    assetDescription:
      "Lorem ipsum dolor sit amet consectetur. Venenatis morbi pretium vitae aenean nam.",
    price: 100,
    image: "https://placehold.in/300x200.png/dark",
  },
  {
    tokenId: "3",
    title: "Mercedes-Benz w210",
    assetType: "Automobile",
    assetDescription:
      "Lorem ipsum dolor sit amet consectetur. Venenatis morbi pretium vitae aenean nam.",
    price: 100,
    image: "/nft.avif",
  },
  {
    tokenId: "2",
    title: "Relax Real Estate",
    assetType: "Technichal",
    assetDescription:
      "Lorem ipsum dolor sit amet consectetur. Venenatis morbi pretium vitae aenean nam.",
    price: 100,
    image: "/nft.avif",
  },
  {
    tokenId: "4",
    title: "Relax Real Estate",
    assetType: "Technichal",
    assetDescription:
      "Lorem ipsum dolor sit amet consectetur. Venenatis morbi pretium vitae aenean nam.",
    price: 100,
    image: "/nft.avif",
  },
];

interface RwasBoardProps {
  isSomeFetching: boolean;
  combinedRwas: CombinedRwa[];
  hideFilters: boolean;
  className?: string;
}

export default function RwasBoard({
  isSomeFetching,
  combinedRwas,
  className,
  hideFilters,
}: RwasBoardProps) {
  const { user } = useUserStore();

  if (isSomeFetching) {
    return (
      <div className={cn("flex flex-wrap gap-x-2.5 gap-y-3", className)}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton
            key={i}
            className={`bg-primary w-[313px] h-[490px] ${
              hideFilters
                ? "basis-[calc((100%-3*10px)/4)]"
                : "basis-[calc((100%-2*10px)/3)]"
            }`}
          />
        ))}
      </div>
    );
  }

  // if (!combinedRwas.length) {
  //   return (
  //     <div className="flex justify-center mt-14">
  //       <h3 className="h3 text-center mt-20 opacity-60">
  //         There are no RWAs available yet.
  //       </h3>
  //     </div>
  //   );
  // }

  return (
    <div className={cn("flex flex-wrap gap-x-2.5 gap-y-3", className)}>
      {combinedRwasExample.map((rwa) => (
        <RwaCard
          key={rwa.tokenId}
          className={cn(
            "transition-all duration-400",
            hideFilters
              ? "basis-[calc((100%-3*10px)/4)]"
              : "basis-[calc((100%-2*10px)/3)]"
          )}
          {...rwa}
        />
      ))}
    </div>
  );
}
