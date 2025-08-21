"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Funnel, Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface TopBarProps {
  hideFilters: boolean;
  setHideFilers: Dispatch<SetStateAction<boolean>>;
}

export default function TopBar({ hideFilters, setHideFilers }: TopBarProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex gap-4">
      <Button
        variant="default"
        size="lg"
        onClick={() => setHideFilers((prevState) => !prevState)}
      >
        {hideFilters ? <Funnel /> : <ChevronLeft />}
        Filters
      </Button>

      <div className="max-w-[380px] w-full">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={
            <Search color="var(--primary)" size={20} className="!w-5 !h-5" />
          }
          iconPosition="right"
          className="py-[9px] text-sm"
          type="text"
          placeholder="Search for type"
        />
      </div>
    </div>
  );
}
