"use client";

import Filters from "@/app/(main)/rwa/components/Filters";
import RwasBoard from "@/app/(main)/rwa/components/RwasBoard";
import TopBar from "@/app/(main)/rwa/components/TopBar";
import { useRwasData } from "@/hooks/useRwasData";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RwasWithFilters() {
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1");
  const [hideFilters, setHideFilters] = useState(false);

  const { rwas, isSomeFetching, combinedRwas, reqParams, setReqParams } =
    useRwasData(initialPage);

  return (
    <div>
      <TopBar hideFilters={hideFilters} setHideFilters={setHideFilters} />
      <div className="flex mt-10">
        <div
          className={`w-[300px] mr-10 overflow-hidden transition-all duration-400 ease-in-out ${hideFilters && "!w-0 !mr-0"}`}
        >
          <Filters setReqParams={setReqParams} />
        </div>
        <RwasBoard
          className={`w-[960px] transition-all duration-400 ${hideFilters && "w-full"}`}
          isSomeFetching={isSomeFetching}
          combinedRwas={combinedRwas}
          hideFilters={hideFilters}
        />
      </div>
    </div>
  );
}
