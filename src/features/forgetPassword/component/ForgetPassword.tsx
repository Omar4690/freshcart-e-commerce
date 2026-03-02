import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { forgotPassword } from '../servers/forgetPassword.actions';
import AuthLayout from '../component/AuthLayout';
import { useNavigate } from 'react-router-dom';

const emailSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function ForgetPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema)
  });

  const onSubmit = async (values: EmailForm) => {
    try {
      await forgotPassword(values);
      navigate('/verify-code', { state: { email: values.email } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
      <p className="text-gray-500 mb-6">No worries, we'll send you reset instructions.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0aad0a] outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full bg-[#0aad0a] text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
    </AuthLayout>
  );
}