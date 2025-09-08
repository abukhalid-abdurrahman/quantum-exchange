import ItemCard from "@/app/admin/components/ItemCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Layers, SquaresIntersect, Trash } from "lucide-react";
import Link from "next/link";

const typesExamples = [
  {
    name: "Real Estate",
    description: "Lorem ipsum dolor it ammet consecuert osibay in que sui",
    movability: "Immovable",
    template: {
      name: "Template 1",
      id: 2,
    },
  },
  {
    name: "Jewellery",
    description: "Lorem ipsum dolor it ammet consecuert osibay in que sui",
    movability: "Immovable",
    template: {
      name: "Template 1",
      id: 3,
    },
  },
  {
    name: "Automobile",
    description: "Lorem ipsum dolor it ammet consecuert osibay in que sui",
    movability: "Movable",
    template: {
      name: "Template 1",
      id: 4,
    },
  },
  {
    name: "Land",
    description: "Lorem ipsum dolor it ammet consecuert osibay in que sui",
    movability: "Immovable",
    template: {
      name: "Template 1",
      id: 5,
    },
  },
  {
    name: "Type 1",
    description: "Lorem ipsum dolor it ammet consecuert osibay in que sui",
    movability: "Movable",
    template: {
      name: "Template 1",
      id: 6,
    },
  },
  {
    name: "Type 2",
    description: "",
    movability: "Immovable",
    template: {
      name: "Template 1",
      id: 7,
    },
  },
];

interface TypesProps {
  className?: string;
}

export default function Types({ className }: TypesProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-2", className)}>
      {typesExamples.map((item) => (
        <ItemCard
          key={item.name}
          title={item.name}
          subtitle={item.description}
          params={
            <div className="flex mt-2.5 gap-3">
              <div className="p-sm flex items-center gap-2">
                <Layers size={16} />
                {item.movability}
              </div>
              <div className="p-sm flex items-center gap-2">
                <SquaresIntersect size={16} />
                <Link
                  href={`/admin/templates/${item.template.id}`}
                  className="border-b border-black transition-opacity hover:opacity-70"
                >
                  {item.movability}
                </Link>
              </div>
            </div>
          }
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
