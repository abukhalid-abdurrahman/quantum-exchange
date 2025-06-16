"use server";

import Link from "next/link";
import RwaLink from "@/components/RwaLink";
import CreateRwaLink from "@/components/CreateRwaLink";
import MyRwaLink from "@/components/MyRwaLink";
import WalletConnect from "@/components/WalletConnect";
import HeaderBtns from "@/components/header/HeaderBtns";
import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SignUpModal";
import MobileHeader from "@/components/header/MobileHeader";
import { SearchParams } from "@/types/params.type";

export default async function Header({ searchParams }: SearchParams) {
  const { signin, signup } = await searchParams;

  return (
    <>
      <header className="flex justify-between items-center text-white py-4 mb-10 w-full xl:px-5 lg:hidden">
        <div className="flex items-center gap-7">
          <Link href="/" className="font-semibold">
            Quantum Street Bridge
          </Link>
          <ul className="flex items-center gap-7 lg:gap-3">
            <li className="">
              <Link href="/">Swap</Link>
            </li>
            <li className="">
              <RwaLink />
            </li>
            <li className="">
              <CreateRwaLink />
            </li>
            <li className="">
              <MyRwaLink />
            </li>
          </ul>
        </div>
        <div className="flex gap-5 sm:gap-2">
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
