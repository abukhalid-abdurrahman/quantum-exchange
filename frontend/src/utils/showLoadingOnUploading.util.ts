import { MAX_FILE_SIZE } from "@/lib/constants";
import { handleUploadFile } from "@/utils/handleUploadFile.util";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

export const showLoadingOnUploading = async (
  e: ChangeEvent<HTMLInputElement>,
  form: UseFormReturn<any>,
  field: ControllerRenderProps<FieldValues, string>,
  setIsUploading: Dispatch<SetStateAction<boolean>>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    form.setError(field.name, {
      type: "manual",
      message: "File must be an image",
    });
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    form.setError(field.name, {
      type: "manual",
      message: "File must be smaller than 100MB",
    });
    return;
  }

  try {
    setIsUploading(true);
    const uploadedUrl = await handleUploadFile(file);
    if (uploadedUrl.includes("http")) {
      field.onChange(uploadedUrl);
    } else {
      throw new Error("File must be smaller than 100MB");
    }
    field.onChange(uploadedUrl);
  } catch (error: any) {
    form.setError(field.name, {
      type: "manual",
      message: error.message || "Upload failed",
    });
  } finally {
    setIsUploading(false);
  }
};
