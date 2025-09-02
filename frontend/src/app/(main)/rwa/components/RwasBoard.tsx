"use client";

import RwaCard from "@/components/RwaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { CombinedRwa } from "@/types/rwa/rwa.type";

interface RwasBoardProps {
  isSomeFetching: boolean;
  combinedRwas: CombinedRwa[];
  hideFilters: boolean;
  className?: string;
  absoluteFilters?: boolean;
}

export default function RwasBoard({
  isSomeFetching,
  combinedRwas,
  className,
  hideFilters,
  absoluteFilters,
}: RwasBoardProps) {
  const { user } = useUserStore();

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
  );
}
