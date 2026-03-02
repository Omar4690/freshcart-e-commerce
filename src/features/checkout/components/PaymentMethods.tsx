"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faCreditCard,
  faCheck,
  faWallet,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

interface PaymentMethodsProps {
    selectedMethod: 'cash' | 'card';
    changeMethod: (method: 'cash' | 'card') => void;
}

export default function PaymentMethods({
  changeMethod,
  selectedMethod,
}: PaymentMethodsProps) {
  return (
    <section className="pt-10">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm ">
      {/* Header with gradient matching design system */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FontAwesomeIcon icon={faWallet} />
          Payment Method
        </h2>
        <p className="text-primary-100 text-sm mt-1">
          Choose how you'd like to pay
        </p>
      </div>

      <div className="p-6 space-y-4">
        {/* Cash on Delivery */}
        <button
          type="button"
          onClick={() => {changeMethod("cash")}}
          className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
            selectedMethod === "cash"
              ? "border-primary-600 bg-primary-50/30"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div 
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
              selectedMethod === "cash"
                ? "bg-linear-to-br from-primary-500 to-blue-600 text-white shadow-lg shadow-primary-500/30"
                : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faMoneyBill} className="text-xl" />
            

          </div>

          <div className="flex-1 text-left">
            <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Pay when your order arrives at your doorstep
            </p>
          </div>

          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              selectedMethod === "cash"
                ? "bg-primary-600 text-white"
                : "border-2 border-gray-200"
            }`}
          >
            {selectedMethod === "cash" && (
              <FontAwesomeIcon icon={faCheck} className="text-xs" />
            )}
          </div>
        </button>

        {/* Online Payment */}
        <button
          type="button"
          onClick={() => {changeMethod("card")}}
          className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
            selectedMethod === "card"
              ? "border-primary-600 bg-primary-50/30"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
              selectedMethod === "card"
                ? "bg-linear-to-br from-primary-500 to-blue-600 text-white shadow-lg shadow-primary-500/30"
                : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faCreditCard} className="text-xl" />
          </div>

          <div className="flex-1 text-left">
            <h3 className="font-bold text-gray-900">Pay Online</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Secure payment with Credit/Debit Card via Stripe
            </p>
            <div className="flex items-center gap-2 mt-2">
              <img
                src="https://img.icons8.com/color/48/visa.png"
                alt="Visa"
                className="h-5"
              />
              <img
                src="https://img.icons8.com/color/48/mastercard.png"
                alt="Mastercard"
                className="h-5"
              />
              <img
                src="https://img.icons8.com/color/48/amex.png"
                alt="Amex"
                className="h-5"
              />
            </div>
          </div>

          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              selectedMethod === "card"
                ? "bg-primary-600 text-white"
                : "border-2 border-gray-200"
            }`}
          >
            {selectedMethod === "card" && (
              <FontAwesomeIcon icon={faCheck} className="text-xs" />
            )}
          </div>
        </button>

        {/* Security notice */}
        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faShieldAlt} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">
              Secure & Encrypted
            </p>
            <p className="text-sm text-primary-600">Your payment info is protected with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}