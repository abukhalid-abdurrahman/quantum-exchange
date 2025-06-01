import { Coords } from "@/types/form/coords.type";
import { FormField } from "@/types/form/formField.type";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

export interface FieldProps {
  form: UseFormReturn<any>;
  input: FormField;
  formItemClasses?: string;
  formLabelClasses?: string;
  selectTriggerClasses?: string;
  formMessageClasses?: string;
  inputFieldClasses?: string;
  withSelectLabel?: boolean;
  withFormLabel?: boolean;
  isFileField?: boolean;
  setIsMapOpen?: Dispatch<SetStateAction<boolean>>;
  coords?: Coords;
}
