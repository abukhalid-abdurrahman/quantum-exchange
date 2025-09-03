"use client";

import FilterCard from "@/app/(main)/rwa/components/FilterCard";
import RwaCard from "@/components/RwaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilters } from "@/hooks/useFilters";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { CombinedRwa, RwaFiltersParams } from "@/types/rwa/rwa.type";
import { Dispatch, SetStateAction } from "react";

interface RwasBoardProps {
  isSomeFetching: boolean;
  combinedRwas: CombinedRwa[];
  hideFilters: boolean;
  className?: string;
  absoluteFilters?: boolean;
  reqParams?: RwaFiltersParams;
  setReqParams?: Dispatch<SetStateAction<RwaFiltersParams>>;
}

export default function RwasBoard({
  isSomeFetching,
  combinedRwas,
  className,
  hideFilters,
  absoluteFilters,
}: RwasBoardProps) {
  const { user } = useUserStore();
  const { setFilters, getFilters } = useFilters();

  const filters = getFilters();
  const displayFilters = { ...(filters as any) };

  if (filters.priceMin || filters.priceMax) {
    displayFilters.priceRange = `${filters.priceMin ?? ""} - ${filters.priceMax ?? ""}`;
    delete displayFilters.priceMin;
    delete displayFilters.priceMax;
  }

  if (isSomeFetching) {
    return (
      <div
        className={cn(
          "flex flex-wrap gap-x-2.5 gap-y-3 relative z-10 after:absolute after:inset-0 after:z-20 after:bg-linear-to-t after:from-background after:to-transparent",
          className
        )}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton
            key={i}
            className={`bg-primary w-[313px] h-[490px] ${
              hideFilters && !absoluteFilters
                ? "basis-[calc((100%-3*10px)/4)]"
                : "basis-[calc((100%-2*10px)/3)]"
            }`}
          />
        ))}
      </div>
    );
  }

  if (!combinedRwas.length) {
    return (
      <div className="flex flex-1 justify-center mt-14">
        <h3 className="h3 text-center mt-20 opacity-60">
          There are no RWAs available yet.
        </h3>
      </div>
    );
  }

  return (
    <div className="block">
      {/* <div className="flex gap-2 mb-2.5">
        {Object.entries(displayFilters).map(([key, value]) => (
          <FilterCard key={key} filter={key} value={value as string} />
        ))}
      </div> */}
      <div className={cn("flex flex-wrap gap-x-2.5 gap-y-3", className)}>
        {combinedRwas.map((rwa) => (
          <RwaCard
            key={rwa.tokenId}
            className={cn(
              "transition-all duration-400",
              hideFilters && !absoluteFilters
                ? "basis-[calc((100%-3*10px)/4)]"
                : "basis-[calc((100%-2*10px)/3)]"
            )}
            {...rwa}
          />
        ))}
      </div>
    </div>
  );
}
