"use server";

import { SignupFormValues, signupSchema } from "../schemas/signup.schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export default async function signupActions(values: SignupFormValues) {
  const validationResult = signupSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    if (validationResult.error) {
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        const message = issue.message;
        ("password should contain at least one number");

        if (!errors[field]) {
          errors[field] = message;
        }
      });
    }

    return {
      success: false,
      message: "validation error",
      errors,
    };
  }

  const { terms, ...requestbody } = values;
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: requestbody,
    };
    const { data } = await axios.request(options);
    if (data.message === "success") {
      return {
        success: true,
        messsage: "Accout created successfully",
        data,
      };
    }
    return {
      success: false,
      message: data.message || "something went wrong",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      if (errorMessage === "Account Already Exists") {
        return {
          success: false,
          message: "account exists",
          errors: {
            email: "an account with this email already exists",
          },
        };
      }
    }
  }
}
