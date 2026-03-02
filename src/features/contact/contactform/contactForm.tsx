"use client";

import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle, faHeadset } from '@fortawesome/free-solid-svg-icons';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formRef.current) formRef.current.reset();
    
    setIsSubmitted(true);

    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      {/* Success Message Banner */}
      {isSubmitted && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl mb-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <FontAwesomeIcon icon={faCheckCircle} className="mt-1 text-lg" />
          <div>
            <p className="font-bold text-base">Message sent successfully!</p>
            <p className="text-sm opacity-90">We'll get back to you as soon as possible.</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-green-50 text-green-500 p-3 rounded-xl flex items-center justify-center">
          <FontAwesomeIcon icon={faHeadset} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Send us a Message</h2>
          <p className="text-gray-500 text-sm">Fill out the form and we'll get back to you</p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe" 
              className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="john@example.com" 
              className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Subject</label>
          <select required className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 appearance-none">
            <option value="">Select a subject</option>
            <option value="support">Order Support</option>
            <option value="inquiry">General Inquiry</option>
            <option value="shipping">Shipping Question</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Message</label>
          <textarea 
            required
            rows={5} 
            placeholder="How can we help you?" 
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="bg-primary-600  hover:bg-[#059669] text-white font-bold py-3.5 px-10 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-green-500/10 active:scale-[0.98]"
        >
          <FontAwesomeIcon icon={faPaperPlane} size="sm" /> Send Message
        </button>
      </form>
    </div>
  );
}