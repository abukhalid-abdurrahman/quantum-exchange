"use client";

import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";

export default function CreateRwaLink() {
  const { user } = useUserStore();
  return (
    <Link href={`${user ? "/rwa/create" : "?signin=true"}`}>Create RWA</Link>
  );
}
