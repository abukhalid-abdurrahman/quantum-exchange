"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileNavList } from "@/lib/helpers/profileNavList";
import { useUserStore } from "@/store/useUserStore";
import { ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfileSidebar() {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <aside className="max-w-[240px]">
      <div className="flex justify-between items-center cursor-pointer group">
        <div className="flex gap-4 items-center">
          <Avatar className="w-10 h-10 flex justify-center items-center border-2 border-secondary">
            <AvatarImage src="/profile.svg" className="invert" />
            <AvatarFallback className="uppercase">
              {user.UserName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="p group-hover:underline">{user.UserName}</p>
            <p className="p-sm text-secondary">{user.Email}</p>
          </div>
        </div>

        <ChevronRight size={16} />
      </div>

      <ul className="mt-7.5 space-y-0.5">
        {profileNavList.map((item, i) => {
          return (
            <Link
              href={item.href}
              key={i}
              className="flex gap-4 items-center px-5 py-[14px] rounded-md transition-all hover:bg-primary"
            >
              {item.icon && <item.icon size={20} />}
              {item.name}
            </Link>
          );
        })}
      </ul>

      <hr className="border-muted/30 my-7" />

      <div className="flex gap-4 items-center px-5 py-[14px] rounded-md transition-all hover:bg-primary cursor-pointer">
        <LogOut size={20} />
        <p className="p">Logout</p>
      </div>
    </aside>
  );
}
