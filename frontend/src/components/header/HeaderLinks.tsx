"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function HeaderLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-7 lg:gap-3">
      {headerLinks.map((link) => (
        <li
          className={`hover:border-b ${pathname === link.href && "border-b"}`}
          key={link.name}
        >
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
}
