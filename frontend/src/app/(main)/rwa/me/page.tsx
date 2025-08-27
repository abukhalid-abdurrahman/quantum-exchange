import PageTitle from "@/components/PageTitle";
import RwaTableMe from "./components/RwaTableMe";

export default function page() {
  return (
    <div className="pb-10 md:py-10 xl:px-5 md:px-0! text-white">
      <PageTitle title="My RWAs" />
      <RwaTableMe />
    </div>
  );
}
