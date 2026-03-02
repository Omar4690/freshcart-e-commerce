"use client";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faEye,
  faLock,
  faSpinner,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import loginAction from "../../server/login.actions";
import { useRouter } from "next/navigation";
import { setToken } from "../../server/auth.actions";
import { useDispatch } from "react-redux";
import { setAuthInfo } from "../../store/auth.slice";

export default function loginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await loginAction(values);

      if (response.success) {
        await setToken(response.data.token, values.rememberMe);
        dispatch(
          setAuthInfo({ isAuthenticated: true, userInfo: response.data.user , userName: response.data.user.name, // Added missing property
            email: response.data.user.email }),
        );

        toast.success(response?.message);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof LoginFormValues, {
              message: response.errors[key],
            });
          });
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-primary-600">
                Fresh<span className="text-gray-800">Cart</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="text-red-500 text-lg"
              />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-blue-600 text-lg"
              />
              <span className="font-medium text-gray-700">
                Continue with Facebook
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                OR CONTINUE WITH EMAIL
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-600"
                  {...register("email")}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 mt-1">*{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forget-password"
                  className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-600"
                  {...register("password")}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 mt-1">*{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded"
                  {...register("rememberMe")}
                />
                <span className="ml-3 text-sm text-gray-700">
                  Keep me signed in
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-colors font-bold disabled:opacity-50 "
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                  <span>Signning In...</span>
                </>
              ) : (
                <>Sign In</>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              New to FreshCart?
              <Link
                href="/signup"
                className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLock} className="mr-1" />
              SSL Secured
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} className="mr-1" />
              50K+ Users
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faStar} className="mr-1" />
              4.9 Rating
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
