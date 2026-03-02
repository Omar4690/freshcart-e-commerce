import ContactForm from "../../../features/contact/contactform/contactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faQuestionCircle,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import Link from "next/link";
export default function Page() {
  const cards = [
    {
      icon: faPhone,
      title: "Phone",
      desc: "Mon-Fri from 8am to 6pm",
      meta: "+1 (800) 123-4567",
    },
    {
      icon: faEnvelope,
      title: "Email",
      desc: "We'll respond within 24 hours",
      meta: "support@freshcart.com",
    },
    {
      icon: faMapMarkerAlt,
      title: "Office",
      desc: "123 Commerce Street, New York, NY 10001, US",
      meta: "",
    },
    {
      icon: faClock,
      title: "Business Hours",
      desc: "Mon-Fri: 8am - 6pm | Sat: 9am - 4pm",
      meta: "Sunday: Closed",
    },
  ];

  return (
    <main className="min-h-screen ">
      {/* Header Section */}
      <div className="bg-primary-600/9 text-white ">
        <div className="bg-[#2ecc71] py-12">
        <div className=" mx-auto  px-10 lg:px-55 lg:py-6 ">
          <nav className="text-white/80 text-sm mb-4">
           <Link href={`/`}> <span className="hover:underline cursor-pointer">Home</span></Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-white">Contact Us</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="size-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
              <FontAwesomeIcon icon={faHeadset} className="text-white text-3xl" />
            </div>
            <div className="text-white">
              <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
              <p className="text-emerald-50 mt-1 opacity-90">We'd love to hear from you. Get in touch with our team.</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Main Content */}
      <div className=" container px-6 py-20 grid  lg:grid-cols-3 gap-8">
        {/* Left Sidebar Cards */}
        <div className="space-y-4">
          {cards.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start"
            >
              <div className="text-[#10b981] mt-1 bg-green-50 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={item.icon} size="sm" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-0.5">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
                {item.meta && (
                  <p className="text-[#10b981] font-semibold text-sm mt-1">
                    {item.meta}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Social Links */}
          <div className="p-6">
            <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[faFacebookF, faTwitter, faInstagram, faLinkedinIn].map(
                (icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-gray-400 hover:bg-[#10b981] hover:text-white hover:border-[#10b981] transition-all"
                  >
                    <FontAwesomeIcon icon={icon} size="sm" />
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <ContactForm />

          {/* Bottom Help Section */}
          <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 flex items-start gap-5">
            <div className="bg-white p-3 rounded-full text-[#10b981] shadow-sm flex items-center justify-center w-12 h-12 flex-shrink-0">
              <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">
                Looking for quick answers?
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Check out our Help Center for frequently asked questions about
                orders, shipping, returns, and more.
              </p>
              <a
                href="#"
                className="text-[#10b981] font-bold text-sm hover:underline group"
              >
                Visit Help Center{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
