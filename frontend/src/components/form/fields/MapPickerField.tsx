import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldProps } from "@/types/form/formProps.type";

export default function MapPickerField({
  input,
  setIsMapOpen,
  coords,
  field,
}: FieldProps) {
  if (!field) return null;

  return (
    <FormControl>
      <Input
        onClick={() => {
          if (setIsMapOpen) setIsMapOpen(true);
        }}
        placeholder={input.placeholder}
        className="cursor-pointer"
        {...field}
        value={coords ? `${coords.latitude} ${coords.longitude}` : ""}
        onChange={field.onChange}
      />
    </FormControl>
  );
}
