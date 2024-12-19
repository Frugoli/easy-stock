import { z } from "zod";

export const signInUserSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
});

export type userSignInInput = z.infer<typeof signInUserSchema>;

export const signUpUserSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First Name must be at least 3 characters long" })
      .regex(/^\S*$/, { message: "First Name cannot contain spaces" }),
    lastName: z
      .string()
      .min(3, { message: "Last Name must be at least 3 characters long" })
      .regex(/^\S*$/, { message: "Last Name cannot contain spaces" }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );

export type userSignUpInput = z.infer<typeof signUpUserSchema>;
