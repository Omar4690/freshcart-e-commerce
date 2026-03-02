"use client";
import { useState } from "react";
import ForgetPasswordStep from "../../../features/forgetPassword/component/ForgetPasswordStep";
import VerifyCodeStep from "../../../features/forgetPassword/component/VerifyCodeStep";
import ResetPasswordStep from "../../../features/forgetPassword/component/ResetPasswordStep";

export default function ForgetPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setUserEmail] = useState(""); 

  return (
    <main>
      {step === 1 && (
        <ForgetPasswordStep 
          onSuccess={(userEmail) => {
            setUserEmail(userEmail); 
            setStep(2);
          }} 
        />
      )}
      
      {step === 2 && (
        <VerifyCodeStep 
          email={email} 
          onSuccess={() => setStep(3)} 
          onBack={() => setStep(1)}
        />
      )}
      
      {step === 3 && (
        <ResetPasswordStep 
          email={email} 
        />
      )}
    </main>
  );
}