import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldProps } from "@/types/form/formProps.type";

export default function SelectField({ form, inputClasses, input }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem className="flex gap-2 items-center lg:justify-between">
          <FormLabel className="lg:text-base">{input.placeholder}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger
                className={`${inputClasses} !mt-0 lg:max-w-[300px] sm:!max-w-[160px]`}
              >
                <SelectValue placeholder={input.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {input?.selectItems?.map((item, i) => (
                  <SelectItem key={i} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
}
