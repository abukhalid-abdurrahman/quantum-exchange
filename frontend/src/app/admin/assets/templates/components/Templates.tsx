import ItemCard from "@/app/admin/components/ItemCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import Link from "next/link";

const templatesExamples = [
  {
    name: "Template 1",
    description: "Description 1",
  },
  {
    name: "Template 2",
    description: "Description 2",
  },
  {
    name: "Template 3",
    description: "Description 3",
  },
];

interface TemplateProps {
  className?: string;
}

export default function Templates({ className }: TemplateProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-2", className)}>
      {templatesExamples.map((item) => (
        <ItemCard
          key={item.name}
          title={item.name}
          subtitle={item.description}
          buttons={
            <>
              <Link
                href="#"
                className={buttonVariants({ variant: "default", size: "md" })}
              >
                View
              </Link>
              <Button variant="outline" size="icon">
                <Trash color="#000" />
              </Button>
            </>
          }
        />
      ))}
    </div>
  );
}
