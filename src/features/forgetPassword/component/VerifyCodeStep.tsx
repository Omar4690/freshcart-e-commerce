"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { verifyResetCode, forgotPassword } from "../servers/forgetPassword.actions";
import AuthLayout from "../component/AuthLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faSpinner, faArrowLeft, faShieldHeart, faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const codeSchema = z.object({
  resetCode: z.string().length(6, "Code must be 6 digits"),
});

type CodeForm = z.infer<typeof codeSchema>;


export default function VerifyCodeStep({ 
  onSuccess, 
  onBack, 
  email 
}: { 
  onSuccess: () => void;
  onBack: () => void;
  email: string;
}) {
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CodeForm>({
    resolver: zodResolver(codeSchema)
  });

  const onSubmit = async (data: CodeForm) => {
    try {
      const res = await verifyResetCode(data);
      if (res.status === "Success") {
        toast.success("Code verified!");
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid or expired code");
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setIsResending(true);
    try {
      await forgotPassword({ email });
      toast.success("New code sent to your email!");
      setTimer(60); 
    } catch (error) {
      toast.error("Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
   <AuthLayout>
      <div className="mb-10 text-center ">
        <h2 className="text-center mb-2 text-4xl"><span className="text-primary-600 ">Fresh</span>Cart</h2>
        <h2 className="text-3xl font-black text-center text-gray-900 mb-2">Check your email</h2>
        <p className="text-gray-500 leading-relaxed">
          We've sent a 6-digit verification code to <span className="text-gray-900 font-semibold">{email}</span>
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
                  <div  className="size-10 rounded-full bg-primary-600 text-white flex items-center justify-center ring-8 ring-green-50 border border-white">
                    <FontAwesomeIcon icon={faKey} size="xs" />
                  </div>
      
                  {/* Step 3 - Active */}
                  <div  className="size-10 rounded-full bg-gray-300 text-white flex items-center justify-center ring-8  border border-white">
                    <FontAwesomeIcon icon={faLock} size="sm" />
                  </div>
                </div>
              </div>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="font-bold">Verification code</label>
          <input
            {...register("resetCode")} 
            type="text"
            placeholder="0 0 0 0 0 0"
            className={`w-full py-5 mt-2 border-2 rounded-2xl text-center text-3xl font-black tracking-[0.4em] focus:border-[#0aad0a] focus:ring-4 focus:ring-green-50 outline-none transition-all placeholder:text-gray-200 ${errors.resetCode ? 'border-red-500' : 'border-gray-100'}`}
            maxLength={6}
          />
          {errors.resetCode && <p className="text-red-500 text-sm mt-1">{errors.resetCode.message}</p>}
        </div>

        <div className="pt-4 border-t border-gray-50 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Didn't get the code?{" "}
            <button 
              type="button" 
              onClick={handleResend}
              disabled={timer > 0 || isResending}
              className={`font-bold transition-colors ${timer > 0 ? 'text-gray-300' : 'text-[#0aad0a] hover:text-green-700 underline underline-offset-4'}`}
            >
              {isResending ? "Sending..." : timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
            </button>
          </p>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-70"
        >
          {isSubmitting ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : "Verify Code"}
        </button>

        <button 
          type="button" 
          onClick={onBack} 
          className="w-full text-center py-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2"/>
          Change email address
        </button>
      </form>
    </AuthLayout>
  );
}