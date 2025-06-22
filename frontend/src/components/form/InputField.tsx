import { Button, buttonVariants } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldProps } from "@/types/form/formProps.type";
import { showLoadingOnUploading } from "@/utils/showLoadingOnUploading.util";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function InputField({
  form,
  input,
  formMessageClasses,
  formLabelClasses,
  inputFieldClasses,
  withFormLabel = false,
  isFileField = false,
  setIsMapOpen,
  coords,
}: FieldProps) {
  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => {
        const [isUploading, setIsUploading] = useState(false);
        return (
          <FormItem className="w-full">
            {withFormLabel && (
              <FormLabel className={formLabelClasses}>
                {input.placeholder}
              </FormLabel>
            )}
            <FormControl>
              {isFileField ? (
                <div className="relative">
                  {field.value ? (
                    <div
                      className={`${buttonVariants({
                        variant: "empty",
                        size: "xl",
                      })} min-h-[50px] h-auto py-2
                            w-full justify-between px-5 gap-2 flex-wrap`}
                    >
                      <p className="p-sm text-black">
                        You already have a file uploaded.
                      </p>
                      <div className="flex gap-2">
                        <Link
                          href={field.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonVariants({
                            variant: "gray",
                            size: "sm",
                          })}
                        >
                          View
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          type="button"
                          onClick={() => field.onChange("")}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      className={
                        isUploading ? "cursor-not-allowed opacity-50" : ""
                      }
                      onChange={async (e) => {
                        showLoadingOnUploading(e, form, field, setIsUploading);
                      }}
                    />
                  )}
                  {isUploading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 className="animate-spin text-white" size={18} />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {input.name === "geolocation" ? (
                    <Input
                      onClick={() => {
                        if (setIsMapOpen) setIsMapOpen(true);
                      }}
                      placeholder={input.placeholder}
                      className="cursor-pointer"
                      {...field}
                      value={
                        coords ? `${coords.latitude} ${coords.longitude}` : ""
                      }
                      onChange={field.onChange}
                    />
                  ) : (
                    <Input
                      type={input.type}
                      className={`${inputFieldClasses}`}
                      placeholder={input.placeholder}
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          parseFloat(e.target.value) || e.target.value;
                        field.onChange(value);
                      }}
                    />
                  )}
                </div>
              )}
            </FormControl>
            <FormMessage className={formMessageClasses} />
          </FormItem>
        );
      }}
    />
  );
}
