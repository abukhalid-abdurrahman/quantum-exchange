import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldProps } from "@/types/form/formProps.type";

export default function InputField({ form, inputClasses, input }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <>
          <FormItem className="w-full">
            <FormControl>
              <Input
                type={input.type}
                className={`${inputClasses} text-right`}
                placeholder={input.placeholder}
                {...field}
                value={field.value === null ? "" : field.value}
              />
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
}
