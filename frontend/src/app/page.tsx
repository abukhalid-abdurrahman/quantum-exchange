"use server";

import Header from "@/components/header/Header";
import SwapForm from "@/components/SwapForm";
import { SearchParams } from "@/types/params.type";

export default async function page({ searchParams }: SearchParams) {
  return (
    <div
      style={{
        backgroundImage: "url(/bg3.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="h-screen"
    >
      <div className="max-w-[1200px] mx-auto md:px-5">
        <Header searchParams={searchParams} />
        <div className="max-w-[512px] mx-auto mt-36">
          <div className="mx-auto">
            <SwapForm />
          </div>
        </div>
      </div>
    </div>
  );
}
