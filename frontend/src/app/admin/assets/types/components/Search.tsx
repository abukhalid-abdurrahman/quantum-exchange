"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchField() {
  const [search, setSearch] = useState("");

  return (
    <div className="w-[380px]">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        icon={<Search color="var(--primary)" size={20} className="!w-5 !h-5" />}
        iconPosition="right"
        className="py-[9px] text-sm"
        type="text"
        placeholder="Search for type"
      />
    </div>
  );
}
