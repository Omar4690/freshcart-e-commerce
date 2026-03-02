"use client";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSpinner, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "../../schemas/signup.schema";
import signupActions from "../../server/signup.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },

    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

 const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
  try {
    const response = await signupActions(values);
    if (response?.success) {
      toast.success("Account created!");
      
     
      router.push("/login");
    }
  } catch (error) {
   
  }
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="bg-white p-10 rounded-xl shadow-xl rounded-xl space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-semibold">Create Your Account</h2>
            <p className="text-gray-600">
              Start your fresh journey with us today
            </p>
          </div>

          <div className="flex *:flex gap-2 *:items-center *:justify-center *:gap-2 *:w-full">
            <button className="btn bg-transparent border border-gray-400/40 hover:bg-gray-300 transition-colors duration-200">
              <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
              <span>Google</span>
            </button>

            <button className="btn bg-transparent border border-gray-400/40 hover:bg-gray-300 transition-colors duration-200">
              <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>

          <div className="relative w-full h-0.5 bg-gray-300/30">
            <span className="absolute bg-white px-4 left-1/2 top-1/2 -translate-1/2 ">
              or
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                placeholder="Ali"
                className="mt-1 form-control block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  *{errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                placeholder="ali@example.com"
                className="mt-1 form-control block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  *{errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password*
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a strong password"
                className="mt-1 form-control block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                {...register("password")}
              />

              <div className="password-requirements">
                <div className="flex items-center gap-2">
                  <div className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden">
                    <div className={`progress bg-orange-500 w-50 h-full`}></div>
                  </div>
                  <span>Fair</span>
                </div>
              </div>

              {errors.password ? (
                <p className="text-red-500 mt-0.5">
                  *{errors.password.message}
                </p>
              ) : (
                <p className="text-gray-500 -mt-2 text-xs">
                  Must be at least 8 characters with numbers and symbols
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rePassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password*
              </label>
              <input
                type="password"
                id="rePassword"
                placeholder="Confirm your password"
                className="mt-1 form-control block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                {...register("rePassword")}
              />
              {errors.rePassword && (
                <p className="text-red-500 text-sm mt-1">
                  *{errors.rePassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="Phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone*
              </label>
              <input
                type="tel"
                id="Phone"
                placeholder="+1 234 567 8900"
                className="mt-1 form-control block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  *{errors.phone.message}
                </p>
              )}
            </div>

            <div className="terms flex gap-2  items-center mb-1 mt-6">
              <input
                type="checkbox"
                id="terms"
                className="accent-primary-600 size-4"
                {...register("terms")}
              />
              <label htmlFor="terms">
                I agree to the
                <Link
                  href="/terms"
                  className="text-primary-600 px-1.5 underline "
                >
                  Terms of Service
                </Link>
                and
                <Link
                  href="/privacy-policy"
                  className="text-primary-600 underline px-1.5 "
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">
                *{errors.terms.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-primary-600 w-full mt-4 text-white text-lg flex gap-2 justify-center items-center hover:bg-primary-700 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  <span className="">Creating your Account</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span className="">Create My Account</span>
                </>
              )}
            </button>
            <div className="border border-gray-400/20 w-full "></div>
            <p className="mt-4 text-center py-5">
              Already have an account?{" "}
              <Link href="/login" className="text-primary-600 underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
