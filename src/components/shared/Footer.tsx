import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faTruck,
  faUndo,
  faShieldAlt,
  faHeadset,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/freshcart-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 ">
      {/* 1. Feature Bar */}
      <div className="bg-[#e9f7ef] py-6 mb-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <FeatureItem
            icon={faTruck}
            title="Free Shipping"
            desc="On orders over 500 EGP"
          />
          <FeatureItem
            icon={faUndo}
            title="Easy Returns"
            desc="14-day return policy"
          />
          <FeatureItem
            icon={faShieldAlt}
            title="Secure Payment"
            desc="100% secure checkout"
          />
          <FeatureItem
            icon={faHeadset}
            title="24/7 Support"
            desc="Contact us anytime"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* 2. Company Info */}
          <div className="lg:col-span-2">
            <div className="bg-white inline-block p-2 rounded-lg mb-6">
              <Image src={logo} alt="FreshCart" width={140} height={35} />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-3 text-sm">
              <div className="">
                <a href="tel:+1 (800) 123-4567" className="flex items-center space-x-3 hover:text-emerald-500 transition-color duration-200">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-emerald-500 w-4"
                  />
                  <span>+1 (800) 123-4567</span>
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <a href="mailto:support@freshcart.com" className="flex items-center space-x-3 hover:text-emerald-500 transition-color duration-200">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-emerald-500 w-4"
                  />
                 
                <span>support@freshcart.com</span>
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-emerald-500 w-4"
                />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
            {/* Social Icons */}
            <div className="flex space-x-3 mt-8">
              <SocialIcon icon={faFacebookF} />
              <SocialIcon icon={faTwitter} />
              <SocialIcon icon={faInstagram} />
              <SocialIcon icon={faYoutube} />
            </div>
          </div>

          
          <ul className="space-y-3 ">
            <li className="font-bold text-white text-xl pb-4">
                Shop
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/shop`}>All Products</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/categories`}>Categories</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/brands`}>Brands</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Electronics</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Men's Fashion</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Women's Fashion</Link>
            </li>
          </ul>
          <ul className="space-y-3 ">
            <li className="font-bold text-white text-xl pb-4">
                Account
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>My Account</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Order History</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/wishlist`}>Wishlist</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/cart`}>Shopping Cart</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/login`}>Sign In</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/signup`}>Create Account</Link>
            </li>
          </ul>
         <ul className="space-y-3 ">
            <li className="font-bold text-white text-xl pb-4">
                Support
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/contact`}>Contact Us</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Help Center</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Shipping Info</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Electronics</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Returns & Refunds</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Track Order</Link>
            </li>
          </ul>
          <ul className="space-y-3 ">
            <li className="font-bold text-white text-xl pb-4">
                Legal
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/policy`}>Privacy Policy</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={`/terms`}>Terms of Service</Link>
            </li>
            <li className="hover:text-emerald-500 transition-colors duration-200">
                <Link href={``}>Cookie Policy</Link>
            </li>
            
          </ul>
        </div>
      </div>


      {/* 4. Bottom Bar */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-200/50">
          <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCreditCard} className="w-5 text-gray-200/40 " />
              <span>Visa</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCreditCard} className="w-5 text-gray-200/40 " />
              <span>Mastercard</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCreditCard} className="w-5 text-gray-200/40 " />
              <span>PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-components for cleaner code
function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
        <FontAwesomeIcon icon={icon} className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-gray-900 font-bold text-sm">{title}</h4>
        <p className="text-gray-500 text-xs">{desc}</p>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-white font-bold mb-6">{title}</h4>
      <ul className="space-y-4 text-sm">
        {links.map((link) => (
          <li key={link}>
            <Link href="#" className="hover:text-emerald-500 transition-colors">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon }: any) {
  return (
    <a
      href="#"
      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-white"
    >
      <FontAwesomeIcon icon={icon} className="w-3" />
    </a>
  );
}
