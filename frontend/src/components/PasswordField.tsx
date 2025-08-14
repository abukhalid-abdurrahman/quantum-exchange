"use cleint";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordRules } from "@/lib/helpers/passwordRules";
import { CircleCheckBig, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface PasswordFieldProps {
  form: UseFormReturn<any>;
  withRules?: boolean;
}

export default function PasswordField({
  form,
  withRules = false,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                iconPosition="right"
                icon={
                  <>
                    {showPassword ? (
                      <Eye
                        size={20}
                        color="var(--primary)"
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <EyeOff
                        size={20}
                        color="var(--primary)"
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </>
                }
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                // isDark={true}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {withRules && (
        <div className="">
          <p className="p-sm">Password must contain:</p>
          <ul className="text-secondary p-sm mt-2">
            {passwordRules.map((rule, i) => {
              const passed = rule.check(form.watch("password"));
              return (
                <li
                  key={i}
                  className={`flex items-center gap-1 ${
                    passed ? "text-green-600" : "text-secondary"
                  }`}
                >
                  <CircleCheckBig
                    size={16}
                    color="green"
                    className={`${passed ? "block" : "hidden"}`}
                  />
                  {rule.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
