import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faDatabase, 
  faUserEdit, 
  faLock, 
  faShareAlt, 
  faUserShield, 
  faCookieBite, 
  faClock,
  faEnvelope,
  faArrowLeft,
  faArrowRight,
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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      {/* 1. Header Banner */}
      <div className="bg-[#22c55e] text-white py-16 px-8">
        <div className="container flex items-center gap-6">
          <div className="bg-white/30 p-4 rounded-2xl backdrop-blur-md mt-4">
            <FontAwesomeIcon icon={faShieldAlt} className="text-3xl" />
          </div>
          <div>
            <nav className="text-sm flex gap-2 mb-2">
              <Link href={`/`}>
                <span className='font-medium opacity-80 hover:underline'>Home</span>
              </Link>
              <span>/</span>
              <span className=''>Privacy Policy</span>
            </nav>
            <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
            <p className="mt-2 text-sm font-medium opacity-90">Last updated: February 2026</p>
          </div>
        </div>
      </div>

      <div className="container px-8 py-7">
        {/* 2. Privacy Matters Alert */}
        <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex items-start gap-4 mb-10 shadow-sm">
          <div className="bg-[#22c55e] text-white p-2.5 rounded-xl mt-0.5">
            <FontAwesomeIcon icon={faShieldAlt} size="sm" />
          </div>
          <div>
            <h4 className="font-bold text-green-900">Your Privacy Matters</h4>
            <p className="text-green-800/80 text-sm leading-relaxed">
              This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.
            </p>
          </div>
        </div>

        {/* 3. Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArticleCard title="Information We Collect" articleNumber="1" icon={faDatabase}>
            <p><span className="font-bold text-green-600 mr-2">1.1</span> <span className="font-bold text-gray-800">Personal Data:</span> Name, email address, phone number, and shipping address.</p>
            <p><span className="font-bold text-green-600 mr-2">1.2</span> <span className="font-bold text-gray-800">Payment Data:</span> Credit card information processed securely through our payment providers.</p>
            <p><span className="font-bold text-green-600 mr-2">1.3</span> <span className="font-bold text-gray-800">Technical Data:</span> IP address, browser type, device information, and access times.</p>
            <p><span className="font-bold text-green-600 mr-2">1.4</span> <span className="font-bold text-gray-800">Usage Data:</span> Pages viewed, products browsed, and actions taken within our platform.</p>
          </ArticleCard>

          <ArticleCard title="How We Use Your Information" articleNumber="2" icon={faUserEdit}>
            <p><span className="font-bold text-green-600 mr-2">2.1</span> To process and fulfill your orders.</p>
            <p><span className="font-bold text-green-600 mr-2">2.2</span> To send order confirmations and shipping updates.</p>
            <p><span className="font-bold text-green-600 mr-2">2.3</span> To provide customer support and respond to inquiries.</p>
            <p><span className="font-bold text-green-600 mr-2">2.4</span> To improve our products, services, and user experience.</p>
            <p><span className="font-bold text-green-600 mr-2">2.5</span> To send promotional communications (with your consent).</p>
          </ArticleCard>

          <ArticleCard title="Data Protection" articleNumber="3" icon={faLock}>
            <p><span className="font-bold text-green-600 mr-2">3.1</span> We implement industry-standard encryption (SSL/TLS) for all data transfers.</p>
            <p><span className="font-bold text-green-600 mr-2">3.2</span> Payment information is processed by PCI-compliant payment providers.</p>
            <p><span className="font-bold text-green-600 mr-2">3.3</span> We conduct regular security audits and vulnerability assessments.</p>
            <p><span className="font-bold text-green-600 mr-2">3.4</span> Access to personal data is restricted to authorized personnel only.</p>
          </ArticleCard>

          <ArticleCard title="Information Sharing" articleNumber="4" icon={faShareAlt}>
            <p><span className="font-bold text-green-600 mr-2">4.1</span> We do not sell, trade, or rent your personal information to third parties.</p>
            <p><span className="font-bold text-green-600 mr-2">4.2</span> We may share data with trusted service providers who assist in our operations.</p>
            <p><span className="font-bold text-green-600 mr-2">4.3</span> We may disclose information when required by law or to protect our rights.</p>
          </ArticleCard>

          <ArticleCard title="Your Rights" articleNumber="5" icon={faUserShield}>
            <p><span className="font-bold text-green-600 mr-2">5.1</span> <span className="font-bold text-gray-800">Access:</span> Request a copy of your personal data.</p>
            <p><span className="font-bold text-green-600 mr-2">5.2</span> <span className="font-bold text-gray-800">Rectification:</span> Request correction of inaccurate data.</p>
            <p><span className="font-bold text-green-600 mr-2">5.3</span> <span className="font-bold text-gray-800">Erasure:</span> Request deletion of your personal data.</p>
            <p><span className="font-bold text-green-600 mr-2">5.4</span> <span className="font-bold text-gray-800">Portability:</span> Request your data in a portable format.</p>
            <p><span className="font-bold text-green-600 mr-2">5.5</span> <span className="font-bold text-gray-800">Opt-out:</span> Unsubscribe from marketing communications at any time.</p>
          </ArticleCard>

          <ArticleCard title="Cookies" articleNumber="6" icon={faCookieBite}>
            <p><span className="font-bold text-green-600 mr-2">6.1</span> We use cookies to enhance your browsing experience and remember preferences.</p>
            <p><span className="font-bold text-green-600 mr-2">6.2</span> You can control cookie settings through your browser preferences.</p>
            <p><span className="font-bold text-green-600 mr-2">6.3</span> Disabling cookies may affect the functionality of certain features.</p>
          </ArticleCard>

          <ArticleCard title="Data Retention" articleNumber="7" icon={faClock}>
            <p className="mt-1">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.
            </p>
          </ArticleCard>

          <ArticleCard title="Contact Us" articleNumber="8" icon={faEnvelope}>
            <p className="mt-1">
              For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at 
              <span className="text-green-600 font-bold ml-1 cursor-pointer hover:underline">privacy@freshcart.com</span>
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
          <Link href={`/terms`}>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#22c55e] text-white rounded-xl font-bold hover:bg-[#16a34a] transition-all text-sm shadow-lg shadow-green-500/20">
              View Terms of Service <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}