"use server";

import Header from "@/components/header/Header";
import { searchParams } from "@/types";
import ChangeRwa from "./components/ChangeRwa";
import { Params } from "@/types/params.type";

interface PageProps extends Params {
  searchParams: Promise<searchParams>;
}

export default async function page({ searchParams, params }: PageProps) {
  return (
    <div>
      <Header searchParams={searchParams} />
      <div className="mt-24 xl:px-5 md:mt-14 md:!px-0 sm:!mt-10">
        <div className="mx-auto">
          <ChangeRwa params={params} />
        </div>
      </div>
    </div>
  );
}
