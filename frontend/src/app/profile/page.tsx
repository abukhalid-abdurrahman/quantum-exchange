"use server";

import Header from "@/components/Header";
import { searchParams } from "@/lib/types";
import AccountAddresses from "./components/AccountAddresses";
import ChangePasswordForm from "./components/ChangePasswordForm";
import LinkedWallets from "./components/LinkedWallets";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<searchParams>;
}) {
  return (
    <div className="">
      <Header searchParams={searchParams} />
      <div className="max-w-[512px] mx-auto mt-20 md:mt-14 md:pb-5 sm:!mt-10 xs:!mt-7">
        <AccountAddresses />
        <LinkedWallets />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
