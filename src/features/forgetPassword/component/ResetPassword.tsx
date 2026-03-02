import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordValues } from '../schema/forgetpass.schema';
import { resetPassword } from '../servers/forgetPassword.actions';
import AuthLayout from '../component/AuthLayout';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    try {
      await resetPassword({ email: data.email, newPassword: data.password });
      navigate('/login'); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6">New Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} type="email" placeholder="Confirm Email" className="w-full p-3 border rounded-lg mb-2" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

        <input {...register("password")} type="password" placeholder="New Password" className="w-full p-3 border rounded-lg" />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

        <input {...register("rePassword")} type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-lg" />
        {errors.rePassword && <p className="text-red-500 text-xs">{errors.rePassword.message}</p>}

        <button type="submit" className="w-full bg-[#0aad0a] text-white py-3 rounded-lg font-bold hover:bg-green-600 transition">
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}