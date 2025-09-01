"use client";

import { cn } from "@/lib/utils";
import { handleCopy } from "@/utils/handleCopy.util";
import { shortAddress } from "@/utils/shortSomething";
import { useState } from "react";

interface TextToCopyProps {
  className?: string;
  text: string;
  shorted?: boolean;
}

export default function TextToCopy({
  className,
  text,
  shorted = true,
}: TextToCopyProps) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <p
      onClick={() => handleCopy(text, { setIsCopied })}
      className={cn(
        "p relative cursor-pointer after:w-full after:absolute after:bottom-0 after:left-0 after:h-px after:bg-secondary",
        className
      )}
    >
      {shorted ? shortAddress(text) : text}

      {isCopied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-90 transition">
          Copied
        </span>
      )}
    </p>
  );
}
