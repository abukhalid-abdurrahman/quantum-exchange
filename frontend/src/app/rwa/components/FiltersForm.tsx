"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FiltersSchema,
  filtersSchema,
  filtersSchemaDefaultValues,
  filtersSchemaFields,
} from "@/schemas/rwa/rwaFilters.schema";
import { RwaFiltersParams } from "@/types/rwa/rwa.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputFilterField from "@/app/rwa/components/form/InputFilterField";
import SelectFilterField from "@/app/rwa/components/form/SelectFilterField";

interface FiltersFormProps {
  setReqParams: Dispatch<SetStateAction<RwaFiltersParams>>;
  setIsFiltersOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function FiltersForm({
  setReqParams,
  setIsFiltersOpen,
}: FiltersFormProps) {
  const [inputClasses] = useState(
    "px-2 py-1 bg-transparent border-textGray text-white rounded-sm text-sm w-full lg:text-base lg:text-black"
  );

  const form = useForm<FiltersSchema>({
    resolver: zodResolver(filtersSchema),
    defaultValues: filtersSchemaDefaultValues,
  });

  const onSubmit = (data: z.infer<typeof filtersSchema>) => {
    setReqParams((prevState: RwaFiltersParams) => {
      return {
        ...prevState,
        ...data,
      };
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex gap-3 text-sm text-nowrap lg:flex-col lg:text-base"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-3 lg:justify-between">
          <p className="">Price</p>
          <div className="flex gap-1 items-center max-w-36 lg:max-w-40">
            {filtersSchemaFields
              .filter(
                (item) => item.name === "priceMin" || item.name === "priceMax"
              )
              .map((item, i) => (
                <InputFilterField
                  key={i}
                  form={form}
                  inputClasses={inputClasses}
                  input={item}
                />
              ))}
          </div>
        </div>
        {filtersSchemaFields
          .filter(
            (item) =>
              item.name === "assetType" ||
              item.name === "sortBy" ||
              item.name === "sortOrder"
          )
          .map((item, i) => (
            <SelectFilterField
              key={i}
              form={form}
              inputClasses={inputClasses}
              input={item}
            />
          ))}
        <div className="flex gap-3 lg:hidden">
          <Button variant="gray" size="sm" type="submit">
            Apply filters
          </Button>
          <Button
            onClick={() => {
              form.reset();
              if (setIsFiltersOpen) setIsFiltersOpen(false);
            }}
            variant="gray"
            size="sm"
            type="submit"
          >
            Clear filters
          </Button>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:gap-3">
          <Button
            onClick={() => (setIsFiltersOpen ? setIsFiltersOpen(false) : null)}
            variant="gray"
            size="default"
            type="submit"
            className="hidden lg:flex lg:mt-3"
          >
            Apply filters
          </Button>
          <Button
            onClick={() => {
              form.reset();
              if (setIsFiltersOpen) setIsFiltersOpen(false);
            }}
            variant="gray"
            size="default"
            type="submit"
          >
            Clear filters
          </Button>
        </div>
      </form>
    </Form>
  );
}
