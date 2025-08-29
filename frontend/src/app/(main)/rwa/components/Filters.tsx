"use client";

import FiltersForm from "./FiltersForm";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Funnel, X } from "lucide-react";
import { RwaFiltersParams } from "@/types/rwa/rwa.type";
import { cn } from "@/lib/utils";

interface FiltersProps {
  setReqParams: Dispatch<SetStateAction<RwaFiltersParams>>;
  className?: string;
}

export default function Filters({ setReqParams, className }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={cn("w-[300px]", className)}>
        <FiltersForm setReqParams={setReqParams} />
      </div>
    </>
  );
}
