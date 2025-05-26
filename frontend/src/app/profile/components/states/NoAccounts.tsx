import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NoAccounts() {
  return (
    <div>
      <h2 className="h2 text-white mb-4">Account Addresses</h2>
      <div className="flex flex-col gap-[5px]">
        <p className="p text-white">
          You don't have any virtual accounts yet. Make your first swap to
          create one.
        </p>
        <Link
          href="/"
          className={buttonVariants({ variant: "gray", size: "xl" })}
        >
          Make a Swap
        </Link>
      </div>
    </div>
  );
}
