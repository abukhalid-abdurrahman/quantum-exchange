"use server";

import Header from "@/components/Header";
import RwaData from "./components/RwaData";
import { searchParams } from "@/types";
import { Params } from "@/types/params.type";

interface PageProps extends Params {
  searchParams: Promise<searchParams>;
}

export default async function page({ searchParams, params }: PageProps) {
  return (
    <>
      <Header searchParams={searchParams} />
      <div className="mt-16 md:mt-10 xl:px-5 md:!px-0 lg:mt-10 sm:!mb-0 sm:pb-5">
        <div className="mx-auto">
          <RwaData params={params} />
        </div>
      </div>
    </>
  );
}
