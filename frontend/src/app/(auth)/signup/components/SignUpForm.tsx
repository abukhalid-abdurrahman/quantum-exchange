"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "@/store/useUserStore";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingAlt from "@/components/LoadingAlt";
import PasswordField from "@/components/PasswordField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@/requests/auth/signUp.request";
import {
  signUpSchema,
  SignUpSchema,
  signUpSchemaDefaultValues,
} from "@/schemas/auth/signUp.schema";

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUserStore();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpSchemaDefaultValues,
    mode: "onBlur",
  });

  const submit = useSignUp();

  const onSubmit = (data: SignUpSchema) => {
    setErrorMessage("");
    setSuccessMessage(false);

    submit.mutate(data, {
      onSuccess: ({ data }) => {
        if (data?.userId) {
          setSuccessMessage(true);
          setTimeout(() => {
            router.push("/?signin=true");
          }, 3000);
        }
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
            name="userName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john_doe"
                    type="text"
                    // isDark={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailAddress"
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

          <PasswordField withRules form={form} />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    // isDark={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

        {successMessage && (
          <p className="text-sm text-green-600 text-center">
            Your account has been successfully created.
            <br /> Redirecting to sign in...
          </p>
        )}

        <Button
          type="submit"
          variant="default"
          size="xl"
          className="w-full mt-[12px]"
          disabled={successMessage}
        >
          {submit.isPending
            ? "Signing up..."
            : successMessage
              ? "Redirecting..."
              : "Sign up"}
        </Button>

        <p className="p-sm text-secondary mt-2">
          Allready have an account?{" "}
          <Link href="/signin" className="text-blue-400">
            Sign in
          </Link>
        </p>

        {submit.isPending && <LoadingAlt />}
      </form>
    </Form>
  );
}
