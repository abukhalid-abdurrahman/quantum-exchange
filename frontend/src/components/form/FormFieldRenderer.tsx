import DateField from "@/components/form/fields/DateField";
import FileDropField from "@/components/form/fields/FileDropField";
import InputField from "@/components/form/fields/InputField";
import MapPickerField from "@/components/form/fields/MapPickerField";
import SelectField from "@/components/form/fields/SelectField";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormField as FormFieldType } from "@/types/form/formField.type";
import { FieldProps } from "@/types/form/formProps.type";

type FieldConfig = FormFieldType["type"];

interface FormFieldRendererProps extends FieldProps {
  fieldType: FieldConfig;
}

export function FormFieldRenderer({
  form,
  input,
  formMessageClasses,
  formLabelClasses,
  inputFieldClasses,
  withFormLabel = true,
  setIsMapOpen,
  coords,
  fieldType,
}: FormFieldRendererProps) {
  const isInputField = ["text", "number", "email", "password"].includes(
    fieldType
  );
  return (
    <>
      <FormField
        control={form.control}
        name={input.name}
        render={({ field: rhfField }) => {
          return (
            <>
              <FormItem className="w-full">
                {withFormLabel && (
                  <FormLabel className={formLabelClasses}>
                    {input.placeholder}
                  </FormLabel>
                )}
                {isInputField && (
                  <InputField
                    inputFieldClasses={inputFieldClasses}
                    form={form}
                    input={input}
                    field={rhfField}
                  />
                )}
                {fieldType === "select" && (
                  <SelectField form={form} input={input} field={rhfField} />
                )}
                {fieldType === "date" && (
                  <DateField form={form} input={input} field={rhfField} />
                )}
                {fieldType === "map" && (
                  <MapPickerField
                    form={form}
                    input={input}
                    setIsMapOpen={setIsMapOpen}
                    coords={coords}
                    field={rhfField}
                  />
                )}
                {fieldType === "file" && (
                  <FormControl>
                    <FileDropField
                      form={form}
                      field={rhfField}
                      maxSize={10000000}
                      accept={{ "image/*": [] }}
                    />
                  </FormControl>
                )}
                {input.description && (
                  <FormDescription className="text-secondary">
                    {input.description}
                  </FormDescription>
                )}
                <FormMessage className={formMessageClasses} />
              </FormItem>
            </>
          );
        }}
      />
    </>
  );
}
