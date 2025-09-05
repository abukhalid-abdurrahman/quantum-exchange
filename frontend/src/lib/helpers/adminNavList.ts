import { Database, UserRound, UserRoundPen } from "lucide-react";

export const adminNavList = [
  {
    name: "Profile",
    href: "/admin/profile",
    icon: UserRound,
  },
  {
    name: "Assets",
    href: "/admin/assets",
    icon: Database,
    children: [
      {
        name: "Types",
        href: "/admin/assets/types",
      },
      {
        name: "Templates",
        href: "/admin/assets/templates",
      },
    ],
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: UserRoundPen,
  },
];
