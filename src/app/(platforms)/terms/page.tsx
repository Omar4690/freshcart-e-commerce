import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileAlt, 
  faHandshake, 
  faUserCheck, 
  faUserCircle, 
  faCreditCard, 
  faTruck, 
  faUndo, 
  faGavel, 
  faEnvelope,
  faArrowLeft,
  faArrowRight,
  faShieldAlt,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

const ArticleCard = ({ title, articleNumber, icon, children }: { 
  title: string, 
  articleNumber: string, 
  icon: any, 
  children: React.ReactNode 
}) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-green-50 text-green-600 p-2.5 rounded-xl">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider leading-none">Article {articleNumber}</p>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
    </div>
    <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      {/* 1. Green Header Banner */}
      <div className="bg-[#22c55e] text-white py-16 px-8">
        <div className="container  flex  items-center gap-6">
          <div className="bg-white/30 p-4 rounded-2xl  backdrop-blur-md mt-4">
            <FontAwesomeIcon icon={faFileAlt} className="text-3xl " />
            
          </div>
          <div>
            <nav className="text-sm flex gap-2 mb-2">
             <Link href={`/`}>
             <span className='font-medium opacity-80 hover:underline '>Home</span>
             </Link>
             <span>/</span>
             <span className=''>Terms of Service</span>
            </nav>
            <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
            <p className="mt-2 text-sm font-medium opacity-90">Last updated: February 2026</p>
          </div>
        </div>
      </div>

      <div className="container px-8 py-7">
        {/* 2. Important Notice Alert */}
        <div className="bg-orange-50 border border-orange-100 p-5 rounded-2xl flex items-start gap-4 mb-10 shadow-sm">
          <div className="bg-orange-400 text-white p-2 rounded-lg mt-0.5">
            <FontAwesomeIcon icon={faFileAlt} size="sm" />
          </div>
          <div>
            <h4 className="font-bold text-orange-900">Important Notice</h4>
            <p className="text-orange-800/80 text-sm leading-relaxed">
              By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. 
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>

        {/* 3. Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArticleCard title="Acceptance of Terms" articleNumber="1" icon={faHandshake}>
            <p><span className="font-bold text-green-600 mr-2">1.1</span> By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
            <p><span className="font-bold text-green-600 mr-2">1.2</span> If you do not agree to these Terms, you must not access or use the Service.</p>
            <p><span className="font-bold text-green-600 mr-2">1.3</span> We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.</p>
          </ArticleCard>

          <ArticleCard title="User Eligibility" articleNumber="2" icon={faUserCheck}>
            <p><span className="font-bold text-green-600 mr-2">2.1</span> The Service is intended for users who are at least eighteen (18) years of age.</p>
            <p><span className="font-bold text-green-600 mr-2">2.2</span> By using the Service, you represent and warrant that you are of legal age to form a binding contract.</p>
            <p><span className="font-bold text-green-600 mr-2">2.3</span> If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.</p>
          </ArticleCard>

          <ArticleCard title="Account Registration" articleNumber="3" icon={faUserCircle}>
            <p><span className="font-bold text-green-600 mr-2">3.1</span> You may be required to create an account to access certain features of the Service.</p>
            <p><span className="font-bold text-green-600 mr-2">3.2</span> You agree to provide accurate, current, and complete information during registration.</p>
            <p><span className="font-bold text-green-600 mr-2">3.3</span> You are solely responsible for maintaining the confidentiality of your account credentials.</p>
            <p><span className="font-bold text-green-600 mr-2">3.4</span> You agree to notify us immediately of any unauthorized use of your account.</p>
          </ArticleCard>

          <ArticleCard title="Orders and Payments" articleNumber="4" icon={faCreditCard}>
            <p><span className="font-bold text-green-600 mr-2">4.1</span> All orders placed through the Service are subject to acceptance and availability.</p>
            <p><span className="font-bold text-green-600 mr-2">4.2</span> Prices are subject to change without notice prior to order confirmation.</p>
            <p><span className="font-bold text-green-600 mr-2">4.3</span> Payment must be made in full at the time of purchase through approved payment methods.</p>
            <p><span className="font-bold text-green-600 mr-2">4.4</span> We reserve the right to refuse or cancel any order at our sole discretion.</p>
          </ArticleCard>

          <ArticleCard title="Shipping and Delivery" articleNumber="5" icon={faTruck}>
            <p><span className="font-bold text-green-600 mr-2">5.1</span> Shipping times are estimates only and are not guaranteed.</p>
            <p><span className="font-bold text-green-600 mr-2">5.2</span> Risk of loss and title for items purchased pass to you upon delivery to the carrier.</p>
            <p><span className="font-bold text-green-600 mr-2">5.3</span> We are not responsible for delays caused by carriers, customs, or other factors beyond our control.</p>
          </ArticleCard>

          <ArticleCard title="Returns and Refunds" articleNumber="6" icon={faUndo}>
            <p><span className="font-bold text-green-600 mr-2">6.1</span> Our return policy allows returns within 14 days of delivery for most items.</p>
            <p><span className="font-bold text-green-600 mr-2">6.2</span> Products must be unused and in original packaging.</p>
            <p><span className="font-bold text-green-600 mr-2">6.3</span> Refunds will be processed within 5-7 business days after receiving the returned item.</p>
          </ArticleCard>

          <ArticleCard title="Limitation of Liability" articleNumber="7" icon={faGavel}>
            <p className="mt-1">
              To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>
          </ArticleCard>

          <ArticleCard title="Contact Us" articleNumber="8" icon={faEnvelope}>
            <p className="mt-1">
              If you have any questions about these Terms, please contact us at 
              <span className="text-green-600 font-bold ml-1 cursor-pointer hover:underline">support@freshcart.com</span>
            </p>
          </ArticleCard>
        </div>

        {/* 4. Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-200 gap-4">
          <Link href={`/`}>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm">
            <FontAwesomeIcon icon={faArrowLeft} size="sm" /> Back to Home
          </button>
          </Link>
          <Link href={`/policy`} >
          <button className="flex items-center gap-2 px-6 py-3 bg-[#22c55e] text-white rounded-xl font-bold hover:bg-[#16a34a] transition-all text-sm shadow-lg shadow-green-500/20">
            View Privacy Policy <FontAwesomeIcon icon={faArrowRight} size="sm" />
          </button>
          </Link>
        </div>
      </div>

     
     
    </div>
  );
}