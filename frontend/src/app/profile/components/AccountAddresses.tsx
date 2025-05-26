"use client";

import AccountSkeleton from "@/app/profile/components/states/AccountSkeleton";
import NoAccounts from "@/app/profile/components/states/NoAccounts";
import AccountAddressItem from "@/app/profile/components/account/AccountAddressItem";
import { useUserStore } from "@/store/useUserStore";
import { AccountAddress } from "@/types/user.type";
import { useGetVirtualAccounts } from "@/requests/user/getVirtualAccounts.request";

export default function AccountAddresses() {
  const { user } = useUserStore();
  const { data, isFetching } = useGetVirtualAccounts(true, user?.token!);

  if (isFetching) return <AccountSkeleton />;

  const accounts = data?.data || [];

  if (accounts.length === 0) return <NoAccounts />;

  return (
    <div>
      <h2 className="h2 text-white mb-6">Account Addresses</h2>
      <div className="flex flex-col gap-[5px]">
        {accounts.map((address: AccountAddress) => (
          <AccountAddressItem key={address.token} address={address} />
        ))}
      </div>
    </div>
  );
}
