"use client";

import {
  changePasswordSchema,
  ChangePasswordSchema,
  changePasswordSchemaDefaultValues,
  changePasswordSchemaFileds,
} from "@/schemas/auth/changePassword.schema";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { removeUser } from "@/utils/removeUser.util";
import { useChangePassword } from "@/requests/auth/changePassword.request";

export default function ChangePasswordForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: changePasswordSchemaDefaultValues,
  });

  const changePassword = useChangePassword();

  const onSubmit = (data: ChangePasswordSchema) => {
    setIsLoading(true);
    setErrorMessage("");

    changePassword.mutate(data, {
      onSuccess: () => {
        removeUser(setUser, router);
      },
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error: any) => {
        setErrorMessage(
          error.response?.data?.error?.message || "An error occurred"
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[5px]"
      >
        <div className="space-y-3.5">
          {changePasswordSchemaFileds.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name as keyof ChangePasswordSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.placeholder}</FormLabel>
                  <FormControl>
                    <Input
                      type={item.type}
                      placeholder={item.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {errorMessage && <p className="p-sm text-red-500">{errorMessage}</p>}

        <Button
          variant="default"
          type="submit"
          size="xl"
          className="w-full mt-1"
          disabled={isLoading ? true : false}
        >
          {isLoading ? "Changing..." : "Change"}
        </Button>
      </form>
    </Form>
  );
}
