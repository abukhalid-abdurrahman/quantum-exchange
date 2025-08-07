"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectedCrypto } from "@/types/crypto/crypto.type";
import { FormField as FormFieldType } from "@/types/form/formField.type";
import Image from "next/image";
import { KeyboardEvent } from "react";
import { UseFormReturn } from "react-hook-form";

interface SwapInputProps {
  form: UseFormReturn<any>;
  input: FormFieldType;
  token?: SelectedCrypto;
  disabled?: boolean;
  openCryptoModal?: (value: "from" | "to") => void;
}

export default function SwapInput({
  form,
  input,
  token,
  disabled = false,
  openCryptoModal,
}: SwapInputProps) {
  const tokenInputs =
    (input.name === "fromAmount" || input.name === "toAmount") &&
    openCryptoModal;
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (tokenInputs) {
      const { key } = event;
      if (!/^[0-9.]+$/.test(key) && key !== "Backspace" && key !== "Delete") {
        event.preventDefault();
      }
    }
  };

  return (
    <div className="flex gap-2 items-center bg-white rounded-2xl p-5">
      <FormField
        control={form.control}
        name={input.name}
        render={({ field }) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel>{input.placeholder}</FormLabel>
            <FormControl>
              <input
                className="input-swap pt-2! pb-4! sm:pb-2!"
                step="0.00001"
                placeholder={tokenInputs ? token?.token : input.placeholder}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || e.target.value;
                  field.onChange(value === "" ? null : value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {tokenInputs ? (
        <Button
          variant="empty"
          size="lg"
          type="button"
          className="text-lg rounded-full bg-dark-gray px-4 flex justify-center gap-[7px] items-center sm:text-base xxs:py-1 hover:shadow-md transition-all"
          onClick={() =>
            openCryptoModal(input.placeholder.toLowerCase() as "from" | "to")
          }
        >
          <Image
            src={`/${token?.token}.png`}
            alt=""
            width={24}
            height={24}
            className="sm:w-5"
          />
          {token?.token}
        </Button>
      ) : null}
    </div>
  );
}
