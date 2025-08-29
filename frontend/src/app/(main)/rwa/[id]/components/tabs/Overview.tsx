import { buttonVariants } from "@/components/ui/button";
import { renderBytes } from "@/utils/renderBytes";
import { ArrowDown, ArrowUpRight, Files } from "lucide-react";
import Link from "next/link";

export default function Overview({ rwa }: { rwa: any }) {
  return (
    <div className="w-full">
      <h3 className="h3">Description</h3>
      <p className="p mt-5">{rwa.assetDescription}</p>

      <h3 className="h3 mt-10 mb-5">Documents</h3>
      <div className="grid grid-cols-2 gap-2 text-black">
        {rwa.documents.map((doc: any, i: number) => (
          <div key={i} className="bg-muted p-[15px] rounded-md">
            <div className="flex gap-2.5">
              <div className="w-[45px] h-auto aspect-square rounded-sm flex justify-center items-center bg-secondary">
                <Files size={28} color="#000" />
              </div>

              <div className="">
                <h4 className="p">{doc.name}</h4>
                <p className="flex gap-2.5 p-sm text-black/40">
                  <span className="uppercase">{doc.type},</span>
                  <span>{renderBytes(doc.size)}</span>
                </p>
              </div>
            </div>

            <div className="mt-7.5 space-x-[5px]">
              <Link
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                })}
                href={doc.url}
              >
                View
                <ArrowUpRight size={20} />
              </Link>
              <Link
                className={buttonVariants({
                  variant: "outline",
                  size: "default",
                })}
                href={doc.url}
              >
                Download
                <ArrowDown size={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
