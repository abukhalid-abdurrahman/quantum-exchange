"use server";

import Header from "@/components/header/Header";
import AccountAddresses from "@/app/profile/components/AccountAddresses";
import ChangePassword from "@/app/profile/components/ChangePassword";
import LinkedWallets from "@/app/profile/components/LinkedWallets";
import { searchParams } from "@/types";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<searchParams>;
}) {
  return (
    <div className="">
      <Header searchParams={searchParams} />
      <div className="max-w-[512px] mx-auto mt-20 flex flex-col gap-7 md:mt-14 md:pb-5 sm:!mt-10 xs:!mt-7">
        <AccountAddresses />
        <LinkedWallets />
        <ChangePassword />
      </div>
    </div>
  );
}
