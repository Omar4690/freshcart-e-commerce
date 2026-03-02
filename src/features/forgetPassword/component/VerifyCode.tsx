import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { verifyResetCode } from '../servers/forgetPassword.actions';
import AuthLayout from '../component/AuthLayout';
import { useNavigate } from 'react-router-dom';

const codeSchema = z.object({
  resetCode: z.string().length(6, "Must be exactly 6 digits"),
});

type CodeForm = z.infer<typeof codeSchema>;

export default function VerifyCode() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CodeForm>({
    resolver: zodResolver(codeSchema)
  });

  const onSubmit = async (values: CodeForm) => {
    try {
      const res = await verifyResetCode(values);
      if (res.status === "Success") navigate('/reset-password');
    } catch (err) {
      alert("Invalid verification code");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-2 text-[#0aad0a]">Check your email</h2>
      <p className="text-gray-500 mb-6">We've sent a 6-digit code to your inbox.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            {...register("resetCode")}
            placeholder="000000"
            className="w-full p-4 border border-gray-300 rounded-lg text-center text-2xl font-bold tracking-[0.5em] focus:ring-2 focus:ring-[#0aad0a] outline-none"
          />
          {errors.resetCode && <p className="text-red-500 text-sm mt-2">{errors.resetCode.message}</p>}
        </div>
        <button type="submit" className="w-full bg-[#0aad0a] text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition shadow-md">
          Verify Code
        </button>
      </form>
    </AuthLayout>
  );
}