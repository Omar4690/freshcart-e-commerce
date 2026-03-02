import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .nonempty("email is required")
      .pipe(z.email("invalid email address")),
      
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),

    rePassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    message: "password and confirm password must match",
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;