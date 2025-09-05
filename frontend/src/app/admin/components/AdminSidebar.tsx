"use client";

import { useUserStore } from "@/store/useUserStore";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { adminNavList } from "@/lib/helpers/adminNavList";
import { useState } from "react";

export default function AdminSidebar() {
  const { user, logout } = useUserStore();

  const router = useRouter();
  const pathname = usePathname();

  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (i: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  if (!user) return null;

  return (
    <aside className="w-[300px] flex flex-col justify-between h-screen sticky top-0 py-7.5 pb-5 px-5 border-r border-muted/30">
      <div className="">
        <Link
          href="/profile"
          className="flex justify-between items-center cursor-pointer group relative"
        >
          <div className="flex gap-4 items-center">
            <Avatar className="w-10 h-10 flex justify-center items-center border-2 border-secondary">
              <AvatarImage src="/profile.svg" className="invert" />
              <AvatarFallback className="uppercase">
                {user.UserName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="p group-hover:underline">{user.UserName}</p>
              <p className="p-sm text-secondary -mt-1">{user.Email}</p>
            </div>
          </div>

          <ChevronRight
            className="absolute right-0 top-1/2 -translate-y-1/2 transition-all group-hover:-right-2"
            size={16}
          />
        </Link>

        <ul className="mt-12.5 space-y-0.5">
          {adminNavList.map((item, i) => {
            const isOpen = openItems[i] ?? false;

            return (
              <div key={i}>
                <li
                  onClick={() => {
                    router.push(item.href);
                  }}
                  className={`flex px-5 items-center justify-between py-[14px] cursor-pointer rounded-md transition-all relative group hover:bg-primary overflow-hidden ${
                    item.href === pathname && "bg-primary"
                  }`}
                >
                  <div className="flex gap-4">
                    {item.icon && <item.icon size={20} />}
                    <span
                      className={`transition-all group-hover:pl-2 ${
                        item.href === pathname && "pl-2"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {item.children && (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleItem(i);
                        setOpenItems((prev) => ({ ...prev, [i]: !isOpen }));
                      }}
                      className="absolute top-0 bottom-0 right-0 px-4 rounded-xs transition-all hover:bg-muted/10 flex items-center"
                    >
                      <ChevronRight
                        size={16}
                        color="#fff"
                        className={`transition-transform ${
                          openItems[i] ? "rotate-90" : ""
                        }`}
                      />
                    </span>
                  )}
                </li>

                {item.children && (
                  <ul
                    className={`ml-[29px] pl-5 border-l border-muted/30 overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.children.map((child, j) => (
                      <li key={j}>
                        <Link
                          href={child.href}
                          className="transition-all hover:bg-primary py-2 px-4 rounded-sm block max-w-[90%]"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </ul>
      </div>

      <div className="">
        <hr className="border-muted/30 my-2" />

        <div
          onClick={() => {
            logout();
            localStorage.removeItem("user");
            router.push("/");
          }}
          className="flex gap-4 items-center px-5 py-[14px] rounded-md transition-all group hover:bg-primary cursor-pointer opacity-70"
        >
          <LogOut size={20} />
          <p className="p transition-all group-hover:pl-2">Logout</p>
        </div>
      </div>
    </aside>
  );
}
