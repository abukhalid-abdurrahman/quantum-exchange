"use client";

import FilterCard from "@/app/(main)/rwa/components/FilterCard";
import RwaCard from "@/components/RwaCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { CombinedRwa, RwaFiltersParams } from "@/types/rwa/rwa.type";
import { RefreshCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationButtons } from "@/components/PaginationButtons";

interface RwasBoardProps {
  isSomeFetching: boolean;
  combinedRwas: CombinedRwa[];
  hideFilters: boolean;
  absoluteFilters?: boolean;
  reqParams?: RwaFiltersParams;
  totalPages: number;
  className?: string;
}

export default function RwasBoard({
  isSomeFetching,
  combinedRwas,
  className,
  hideFilters,
  totalPages,
  absoluteFilters,
}: RwasBoardProps) {
  const searchParams = useSearchParams();
  const { user } = useUserStore();

  const currentPage = parseInt(searchParams.get("page") || "1");

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
    <div className="flex flex-col items-center">
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

      <PaginationButtons
        className="mt-7.5"
        pages={totalPages}
        currentPage={currentPage}
        searchParams={searchParams}
      />
    </div>
  );
}
