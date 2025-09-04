"use client";

import {
  FiltersSchema,
  FilterTopSchema,
} from "@/schemas/rwa/rwaFilters.schema";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type AllFilters = FiltersSchema & FilterTopSchema;

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getFilters = (): Partial<AllFilters> => {
    const entries: [string, string][] = Array.from(searchParams.entries());

    const result: Record<string, unknown> = {};

    for (const [key, value] of entries) {
      if (value === "" || value === "null" || value === "undefined") continue;
      if (key === "page") continue;

      if (key === "priceMin" || key === "priceMax") {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    }

    return result as Partial<AllFilters>;
  };

  const setFilters = (filters: Partial<AllFilters>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, rawValue]) => {
      if (rawValue == null || rawValue === "") {
        params.delete(key);
      } else {
        params.set(key, String(rawValue));
      }
    });

    // params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const removeFilter = (keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((k) => params.delete(k));
    // params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    (Object.keys(getFilters() as AllFilters) as (keyof AllFilters)[]).forEach(
      (key) => {
        params.delete(key as string);
      }
    );

    router.push(`${pathname}?${params.toString()}`);
  };

  return { getFilters, setFilters, removeFilter, clearFilters };
}
