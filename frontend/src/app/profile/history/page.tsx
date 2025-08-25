import Filters from "@/app/profile/history/components/Filters";
import GeneralFilters from "@/app/profile/history/components/GeneralFilters";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <h2 className="h1 mb-1">RWA history</h2>

      <Filters className="mt-5" />
      <div className="my-12.5 flex flex-col items-center">
        <Image
          src="/tumbleweed.png"
          alt="tumbleweed"
          width={80}
          height={80}
          priority
          className="opacity-80"
        />
        <p className="p-sm text-secondary text-center max-w-[190px] mt-3.5 mb-5">
          You haven't bought, sold or created an RWA yet.
        </p>

        <div className="space-x-3.5">
          <Link
            href="/rwa"
            className={`${buttonVariants({ variant: "default", size: "lg" })}`}
          >
            RWA Market
          </Link>
          <Link
            href="/rwa/create"
            className={`${buttonVariants({ variant: "muted", size: "lg" })}`}
          >
            Create RWA
          </Link>
        </div>
      </div>

      <h2 className="h1 mb-1">Swap history</h2>
      <GeneralFilters className="mt-5" />

      <div className="my-12.5 flex flex-col items-center">
        <Image
          src="/tumbleweed.png"
          alt="tumbleweed"
          width={80}
          height={80}
          priority
          className="opacity-80"
        />
        <p className="p-sm text-secondary text-center max-w-[190px] mt-3.5 mb-5">
          You haven't made a swap yet.
        </p>

        <div className="space-x-3.5">
          <Link
            href="/"
            className={`${buttonVariants({ variant: "muted", size: "lg" })}`}
          >
            Make Swap
          </Link>
        </div>
      </div>
    </div>
  );
}
