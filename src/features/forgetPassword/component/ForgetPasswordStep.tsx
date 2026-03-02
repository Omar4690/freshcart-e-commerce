import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPassword } from "../servers/forgetPassword.actions";
import AuthLayout from "../component/AuthLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faLock,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const schema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
});

type EmailForm = z.infer<typeof schema>;

export default function ForgetPasswordStep({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: EmailForm) => {
    try {
      await forgotPassword(data);
      onSuccess(data.email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full  mx-auto flex flex-col items-center">
        {/* Brand Logo */}
        <div className="flex items-center mb-6">
          <span className="text-3xl font-bold text-primary-600">Fresh</span>
          <span className="text-3xl font-bold text-[#2d3a4b]">Cart</span>
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2d3a4b] mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-500">
            No worries, we'll send you a reset code
          </p>
        </div>
        {/* Stepper Component */}
        <div className="flex items-center justify-center w-full mb-10 relative">
          {/* The Perfect Background Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10 translate-y-[-50%]"></div>

          <div className="flex justify-between w-full max-w-[280px] z-10 bg-transparent">
            {/* Step 1 - Active Email */}
            <div className="size-12 rounded-full bg-primary-600 text-white flex items-center justify-center ring-8 ring-green-50 border border-white">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>

            {/* Step 2 - Inactive Code */}
            <div className="size-12 rounded-full bg-white border border-gray-200 text-gray-300 flex items-center justify-center">
              <FontAwesomeIcon icon={faKey} />
            </div>

            {/* Step 3 - Inactive Lock */}
            <div className="size-12 rounded-full bg-white border border-gray-200 text-gray-300 flex items-center justify-center">
              <FontAwesomeIcon icon={faLock} />
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-6 text-left"
        >
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2d3a4b]">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                {...register("email")}
                placeholder="Enter your email address"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition-all bg-gray-50/50 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-100  disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                <span> Sending...</span>
              </>
            ) : (
              <>Send Reset Code</>
            )}
          </button>
        </form>

        {/* Navigation Footer */}
        <div className="mt-8 flex flex-col items-center gap-6 w-full">
          <Link
            href="/login"
            className="flex items-center gap-2 text-primary-600 font-semibold transition-colors"
          >
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} size="sm" /> Back to Sign In
          </Link>

          <div className="w-full pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-primary-600 font-bold cursor-pointer hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
