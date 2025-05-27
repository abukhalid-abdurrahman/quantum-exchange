import { InfoRowProps } from "@/app/rwa/types/rwaProps.interfaces";
import { buttonVariants } from "@/components/ui/button";

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div
      className={`${buttonVariants({
        variant: "gray",
        size: "lg",
      })} !px-5 w-full flex justify-between flex-wrap`}
    >
      <span className="text-gray-500">{label}:</span>
      {value}
    </div>
  );
}
