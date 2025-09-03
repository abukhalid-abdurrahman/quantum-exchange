"use client";

import { useFilters } from "@/hooks/useFilters";
import { X } from "lucide-react";

interface FilterCardProps {
  filter: string;
  value: string;
}

export default function FilterCard({ filter, value }: FilterCardProps) {
  const { removeFilter } = useFilters();

  return (
    <div className="flex gap-2.5 px-2.5 py-1 bg-muted text-black rounded-xs items-center">
      <p className="p-sm">{value}</p>
      <X
        onClick={() => {
          if (filter === "priceRange") {
            removeFilter(["priceMin", "priceMax"]);
          } else removeFilter([filter]);
        }}
        className="cursor-pointer"
        size={18}
        color="#000"
      />
    </div>
  );
}
