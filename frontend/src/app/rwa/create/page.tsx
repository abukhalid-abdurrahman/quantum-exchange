"use server";

import CreateRwa from "@/app/rwa/create/components/CreateRwa";
import Header from "@/components/header/Header";
import { searchParams } from "@/types";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<searchParams>;
}) {
  return (
    <>
      <Header searchParams={searchParams} />
      <div className="mt-24 lg:mt-16 md:!mt-10 xxs:!mt-5">
        <CreateRwa />
      </div>
    </>
  );
}
