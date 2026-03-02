"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordValues,
} from "../schema/forgetpass.schema";
import { resetPassword } from "../servers/forgetPassword.actions";
import AuthLayout from "../component/AuthLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  email: string;
}

export default function ResetPasswordStep({ email }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
    },
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    try {
      const res = await resetPassword({
        email: data.email,
        newPassword: data.password,
      });

      if (res.token || res.status === "Success") {
        toast.success("Password reset successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full mx-auto flex flex-col items-center">
        {/* Brand Logo */}
        <div className="flex items-center mb-6">
          <span className="text-3xl font-bold text-primary-600">Fresh</span>
          <span className="text-3xl font-bold text-[#2d3a4b]">Cart</span>
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2d3a4b] mb-2">
            Setup New Password
          </h2>
          <p className="text-gray-500">
            Your new password must be different from previous passwords.
          </p>
        </div>

        {/* Stepper Component - Final Step Active */}
        <div className="flex items-center justify-center w-full mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10 translate-y-[-50%]"></div>

          <div className="flex justify-between w-full max-w-[280px] z-10">
            {/* Step 1 - Completed */}
            <div className="size-10 rounded-full bg-primary-600 text-white flex items-center justify-center border border-white">
              <FontAwesomeIcon icon={faCheck} size="xs" />
            </div>

            {/* Step 2 - Completed */}
            <div className="size-10 rounded-full bg-primary-600 text-white flex items-center justify-center border border-white">
              <FontAwesomeIcon icon={faCheck} size="xs" />
            </div>

            {/* Step 3 - Active */}
            <div className="size-10 rounded-full bg-primary-600 text-white flex items-center justify-center ring-8 ring-green-50 border border-white">
              <FontAwesomeIcon icon={faLock} size="sm" />
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 text-left"
        >
          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2d3a4b]">
              New Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition-all bg-gray-50/50 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2d3a4b]">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                {...register("rePassword")}
                type="password"
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition-all bg-gray-50/50 ${
                  errors.rePassword
                    ? "border-red-500"
                    : "border-gray-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                }`}
              />
            </div>
            {errors.rePassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-primary-600 text-white py-4 mt-4 rounded-xl font-bold shadow-lg shadow-green-100 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />{" "}
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
