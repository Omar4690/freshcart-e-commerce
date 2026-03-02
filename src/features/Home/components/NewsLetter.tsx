import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faLeaf, 
  faTruck, 
  faTag, 
  faArrowRight 
} from "@fortawesome/free-solid-svg-icons";
import { 
  faApple, 
  faGooglePlay 
} from "@fortawesome/free-brands-svg-icons";

import Rating from '../../../components/ui/rating'; 

export default function NewsletterSection() {
  return (
    <section className="container py-20 font-sans">
      <div className="bg-[#f8fdfb] rounded-4xl border border-emerald-50 p-10 flex  lg:flex-row gap-12 items-center shadow-sm">
        
        {/* Left Side: Newsletter */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center w-12 h-12">
              <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">Newsletter</p>
              <p className="text-xs text-gray-400">50,000+ subscribers</p>
            </div>
          </div>

          <h2 className="text-4xl font-extrabold text-slate-800 leading-tight">
            Get the Freshest Updates <span className="text-emerald-500">Delivered Free</span>
          </h2>

          <p className="text-gray-500 text-lg">
            Weekly recipes, seasonal offers & exclusive member perks.
          </p>

          
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-600 shadow-sm">
              <FontAwesomeIcon icon={faLeaf} className="text-emerald-500" /> Fresh Picks Weekly
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-600 shadow-sm">
              <FontAwesomeIcon icon={faTruck} className="text-emerald-500" /> Free Delivery Codes
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-600 shadow-sm">
              <FontAwesomeIcon icon={faTag} className="text-emerald-500" /> Members-Only Deals
            </span>
          </div>

          {/* Input Area */}
          <div className="space-y-3 pt-4">
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-200">
                Subscribe <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <p className="text-[11px] text-gray-400">
              🐝 Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>

        {/* Right Side: App Card */}
        <div className=" lg:w-[400px] bg-[#121b21] rounded-4xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px]" />
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
              <div className="w-1.5 h-3 bg-emerald-400 rounded-full" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Mobile App</span>
            </div>

            <h3 className="text-2xl font-bold">Shop Faster on Our App</h3>
            <p className="text-gray-400 text-sm">Get app-exclusive deals & 15% off your first order.</p>

            <div className="space-y-3">
              {/* App Store Button */}
              <button className="w-full flex items-center gap-4 bg-[#212b32] hover:bg-[#2a373f] p-4 rounded-2xl transition-colors border border-gray-700/50 text-left">
                <FontAwesomeIcon icon={faApple} className="text-3xl" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Download on</p>
                  <p className="text-lg font-semibold -mt-1">App Store</p>
                </div>
              </button>

             
              <button className="w-full flex items-center gap-4 bg-[#212b32] hover:bg-[#2a373f] p-4 rounded-2xl transition-colors border border-gray-700/50 text-left">
                <FontAwesomeIcon icon={faGooglePlay} className="text-2xl" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">Get it on</div>
                  <div className="text-sm font-semibold -mt-0.5">Google Play</div>
                </div>
              </button>
            </div>

            {/* Final Rating Integration */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
              <Rating rating={4.9} />
              <span className="text-[13px] text-gray-400">
                4.9 • 100K+ downloads
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}