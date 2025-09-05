"use client";

import Chips from "@/app/(main)/rwa/components/Chips";
import Filters from "@/app/(main)/rwa/components/Filters";
import RwasBoard from "@/app/(main)/rwa/components/RwasBoard";
import TopBar from "@/app/(main)/rwa/components/TopBar";
import { useRwasData } from "@/hooks/useRwasData";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface RwasWithFiltersProps {
  absoluteFilters?: boolean;
}

export default function RwasWithFilters({
  absoluteFilters = false,
}: RwasWithFiltersProps) {
  const [hideFilters, setHideFilters] = useState(absoluteFilters || false);

  const { rwas, isSomeFetching, combinedRwas, reqParams } = useRwasData();

  return (
    <div>
      <TopBar hideFilters={hideFilters} setHideFilters={setHideFilters} />
      <div className="flex mt-10 relative">
        <div
          className={`w-[300px] mr-10 overflow-hidden transition-all duration-400 ease-in-out ${hideFilters && "!w-0 !mr-0 !p-0"} ${absoluteFilters && "w-[340px] absolute z-50 top-0 left-0 bg-primary rounded-md p-5"}`}
        >
          <Filters />
        </div>
        <div
          className={`w-[960px] transition-all duration-400 ${hideFilters && !absoluteFilters && "w-full"} ${absoluteFilters && "w-full"}`}
        >
          <Chips />
          <RwasBoard
            totalPages={rwas.data?.data?.totalPages}
            reqParams={reqParams}
            isSomeFetching={isSomeFetching}
            combinedRwas={combinedRwas}
            hideFilters={hideFilters}
            absoluteFilters={absoluteFilters}
          />
        </div>
      </div>
    </div>
  );
}
