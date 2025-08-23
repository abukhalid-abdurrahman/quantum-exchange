import { Database, History, UserRound, WalletCards } from "lucide-react";

export const profileNavList = [
  {
    name: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    name: "My RWAs",
    href: "/profile/linked-wallets",
    icon: Database,
  },
  {
    name: "History",
    href: "/profile/change-password",
    icon: History,
  },
  {
    name: "My Wallets",
    href: "/profile/change-password",
    icon: WalletCards,
  },
];
