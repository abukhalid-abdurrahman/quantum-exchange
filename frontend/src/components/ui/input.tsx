import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {icon && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${iconPosition === "left" ? "left-5" : "right-5"}`}
          >
            {icon}
          </div>
        )}
        <input
          onWheel={(e) => {
            if (type === "number") e.currentTarget.blur();
          }}
          type={type}
          className={cn(
            `flex px-[20px] py-[12px] w-full text-black rounded-md border border-input bg-muted text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-gray md:text-sm ${icon && iconPosition === "left" ? "pl-[55px]" : "pr-[55px]"}`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
