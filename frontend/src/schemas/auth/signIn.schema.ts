import { FormField } from "@/types/form/formField.type";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signInSchemaDefaultValues: SignInSchema = {
  email: "",
  password: "",
};

export const signInSchemaFields: FormField[] = [
  {
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
  },
];
