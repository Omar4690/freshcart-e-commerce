import React from "react";
import ForgetPasswordImage from "../../../assets/images/forgetPassword.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-70 py-20  flex items-center justify-center p-4">
      <div className="w-full container bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row ">
        
        {/* Left Side: Design & Information */}
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col items-center justify-center text-center">
          {/* Main Illustration */}
          <img
            className="w-full max-w-2xl object-contain mb-8"
            src={ForgetPasswordImage.src}
            alt="Security illustration with lock, email, and shield"
          />

          {/* Text Content */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Reset Your Password
          </h2>
          <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
            Don't worry, it happens to the best of us. We'll help you get back into your account in no time.
          </p>

          {/* Icon Legend/Features */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-primary-600"><FontAwesomeIcon icon={faEnvelope} /></span> Email Verification
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-600"><FontAwesomeIcon icon={faShieldHalved} /></span> Secure Reset
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-600"><FontAwesomeIcon icon={faLock} /></span> Encrypted
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 bg-white p-8 lg:p-16 flex flex-col justify-center shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;