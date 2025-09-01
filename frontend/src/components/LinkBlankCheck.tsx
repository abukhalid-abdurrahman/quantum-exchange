import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface LinkBlankCheckProps {
  url: string;
  className?: string;
}

export default function LinkBlankCheck({
  url,
  className,
}: LinkBlankCheckProps) {
  return (
    <Link
      href={url}
      target="_blank"
      className={cn(
        "p flex gap-2 items-center relative after:w-full after:absolute after:bottom-0 after:left-0 after:h-px after:bg-secondary",
        className
      )}
    >
      Check <ArrowUpRight size={20} strokeWidth={1.5} />
    </Link>
  );
}
