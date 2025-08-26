"use server";

import Link from "next/link";
// import RwaLink from "@/components/RwaLink";
import CreateRwaLink from "@/components/header/CreateRwaLink";
import WalletConnect from "@/components/WalletConnect";
import HeaderBtns from "@/components/header/HeaderBtns";
import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SignUpModal";
import MobileHeader from "@/components/header/MobileHeader";
import { SearchParams } from "@/types/params.type";
import { headers } from "next/headers";

const headerLinks = [
  {
    name: "Swap",
    href: "/",
  },
  {
    name: "RWA Market",
    href: "/rwa",
  },
];

export default async function Header({ searchParams }: SearchParams) {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const { signin, signup } = await searchParams;

  return (
    <>
      <header className="flex justify-between items-center text-white pt-6 pb-5 mb-10 w-full xl:px-5 lg:hidden">
        <div className="flex items-center gap-7">
          <Link href="/" className="text-2xl font-black mr-12">
            Quantum Street
          </Link>
          <ul className="flex items-center gap-7 lg:gap-3">
            {headerLinks.map((link) => (
              <li
                className={`${pathname === link.href && "border-b"}`}
                key={link.name}
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-[10px] sm:gap-2">
          <CreateRwaLink />
          <WalletConnect />
          <HeaderBtns />
        </div>
        {signin && <SignInModal />}
        {signup && <SignUpModal />}
      </header>
      {/* Mobile Header */}
      <MobileHeader signin={signin} signup={signup} />
    </>
  );
}
