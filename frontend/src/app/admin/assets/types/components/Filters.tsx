"use client";

import { Form } from "@/components/ui/form";
import {
  assetTypesFiltersschema,
  assetTypesFiltersSchemaDefaultValues,
  AssetTypesFiltersSchemaType,
} from "@/schemas/admin/assetTypesFilters.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Filters() {
  const form = useForm<AssetTypesFiltersSchemaType>({
    resolver: zodResolver(assetTypesFiltersschema),
    defaultValues: assetTypesFiltersSchemaDefaultValues,
  });

  const selected = form.watch("type");

  const toggleType = (value: string) => {
    if (selected.includes(value)) {
      form.setValue(
        "type",
        selected.filter((t) => t !== value),
        { shouldValidate: true }
      );
    } else {
      form.setValue("type", [...selected, value], { shouldValidate: true });
    }
  };

  return (
    <Form {...form}>
      <form className="flex gap-4">
        <p className="p-sm">Type: </p>
        <ul className="flex gap-3.5">
          {assetTypesFiltersSchemaDefaultValues.type.map((item, i) => (
            <li
              onClick={() => toggleType(item)}
              className={`p-sm cursor-pointer border-b border-transparent transition-all hover:opacity-70 ${
                selected.includes(item) && "!border-muted"
              }`}
              key={i}
            >
              {item}
            </li>
          ))}
        </ul>
      </form>
    </Form>
  );
}
