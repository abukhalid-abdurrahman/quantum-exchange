"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "@/store/useUserStore";
import { parseJwt } from "@/utils/parseJwt.util";
import { useSignIn } from "@/requests/auth/signIn.request";
import {
  signInSchema,
  SignInSchema,
  signInSchemaDefaultValues,
} from "@/schemas/auth/signIn.schema";

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
import LoadingAlt from "@/components/LoadingAlt";
import PasswordField from "@/components/PasswordField";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUserStore();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInSchemaDefaultValues,
  });

  const submit = useSignIn();

  const onSubmit = (data: SignInSchema) => {
    setErrorMessage("");

    submit.mutate(data, {
      onSuccess: ({ data }) => {
        const { token, expiresAt, startTime } = data;
        const { Id, UserName, Email } = parseJwt(token);

        setUser({ token, expiresAt, startTime, Id, UserName, Email });

        Cookies.set("oasisToken", token, { expires: new Date(expiresAt) });
        router.push(callbackUrl);
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
        className="flex flex-col items-center gap-2 w-full"
      >
        <div className="flex flex-col gap-[14px] w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    type="email"
                    // isDark={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PasswordField form={form} />
        </div>

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

        <Link href="/forgot-password" className="p-sm text-white my-1">
          Forgot your password?
        </Link>

        <Button variant="default" type="submit" size="xl" className="w-full">
          {submit.isPending ? "Signing in..." : "Sign In"}
        </Button>

        <p className="p-sm text-secondary mt-2">
          New here?{" "}
          <Link href="/signup" className="text-blue-400">
            Let's get started
          </Link>
        </p>

        {submit.isPending && <LoadingAlt />}
      </form>
    </Form>
  );
}
