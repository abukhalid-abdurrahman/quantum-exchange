import { cn } from "@/lib/utils";

interface ItemCardProps {
  className?: string;
  title: string;
  subtitle: string;
  params?: React.ReactNode;
  buttons: React.ReactNode;
}

export default function ItemCard({
  className,
  title,
  subtitle,
  params,
  buttons,
}: ItemCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between p-5 bg-muted text-black min-w-[319px] rounded-md",
        className
      )}
    >
      <div className="">
        <h4 className="p">{title}</h4>
        <p className="p-sm text-black/50">{subtitle}</p>
        {params}
      </div>

      <div className="flex gap-[5px] mt-12">{buttons}</div>
    </div>
  );
}
