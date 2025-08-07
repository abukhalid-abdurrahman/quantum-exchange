"use server";

import CreateRwa from "@/app/rwa/create/components/CreateRwa";
import Header from "@/components/header/Header";
import { SearchParams } from "@/types/params.type";

export default async function page({ searchParams }: SearchParams) {
  return (
    <>
      <Header searchParams={searchParams} />
      <div className="mt-24 lg:mt-16 md:mt-10! xxs:mt-5!">
        <CreateRwa />
      </div>
    </>
  );
}
