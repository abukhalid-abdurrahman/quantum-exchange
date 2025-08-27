import Link from "next/link";
import CreateRwaLink from "@/components/header/CreateRwaLink";
import WalletConnect from "@/components/WalletConnect";
import HeaderBtns from "@/components/header/HeaderBtns";
import MobileHeader from "@/components/header/MobileHeader";
import HeaderLinks from "@/components/header/HeaderLinks";

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center text-white pt-6 pb-5 mb-10 w-full xl:px-5 lg:hidden">
        <div className="flex items-center gap-7">
          <Link href="/" className="text-2xl font-black mr-12">
            Quantum Street
          </Link>
          <HeaderLinks />
        </div>
        <div className="flex gap-[10px] sm:gap-2">
          <CreateRwaLink />
          <WalletConnect />
          <HeaderBtns />
        </div>
      </header>
      {/* Mobile Header */}
      <MobileHeader />
    </>
  );
}
