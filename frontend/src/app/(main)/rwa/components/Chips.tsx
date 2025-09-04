"use client";

import FilterCard from "@/app/(main)/rwa/components/FilterCard";
import { useFilters } from "@/hooks/useFilters";
import { X } from "lucide-react";

export default function Chips() {
  const { getFilters, clearFilters } = useFilters();

  const filters = getFilters();
  const displayFilters = { ...(filters as any) };

  if (
    filters.priceMin !== null &&
    filters.priceMin !== undefined &&
    filters.priceMax !== null &&
    filters.priceMax !== undefined &&
    filters.priceMin >= 0 &&
    filters.priceMax >= 0
  ) {
    displayFilters.priceRange = `${filters.priceMin} - ${filters.priceMax}`;
    delete displayFilters.priceMin;
    delete displayFilters.priceMax;
  } else if (
    filters.priceMin !== null &&
    filters.priceMin !== undefined &&
    filters.priceMin >= 0
  ) {
    displayFilters.priceRange = `from ${filters.priceMin}`;
    delete displayFilters.priceMin;
    delete displayFilters.priceMax;
  } else if (
    filters.priceMax !== null &&
    filters.priceMax !== undefined &&
    filters.priceMax >= 0
  ) {
    displayFilters.priceRange = `to ${filters.priceMax}`;
    delete displayFilters.priceMin;
    delete displayFilters.priceMax;
  }

  if (Object.keys(displayFilters).length > 0) {
    return (
      <div className="flex gap-2 mb-2.5 h-7.5 items-center">
        {Object.entries(displayFilters).map(([key, value]) => (
          <FilterCard key={key} filter={key} value={value as string} />
        ))}
        <p
          onClick={() => clearFilters()}
          className="text-xs ml-2 flex items-center gap-1 opacity-70 transition-all hover:opacity-100 cursor-pointer"
        >
          CLear all filters <X size={14} color="#fff" />
        </p>
      </div>
    );
  }
}
