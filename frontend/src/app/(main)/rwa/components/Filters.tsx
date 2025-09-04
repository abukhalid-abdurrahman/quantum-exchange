"use client";

import FiltersForm from "./FiltersForm";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FiltersProps {
  className?: string;
}

export default function Filters({ className }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={cn("w-[300px]", className)}>
        <FiltersForm />
      </div>
    </>
  );
}
