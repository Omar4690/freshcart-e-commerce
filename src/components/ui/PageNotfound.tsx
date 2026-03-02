import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fbf9] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-20 left-20 opacity-20 text-emerald-300 rotate-12">
        <FontAwesomeIcon icon={faShoppingCart} size="2xl" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-20 text-emerald-300 -rotate-12">
        <FontAwesomeIcon icon={faShoppingCart} size="2xl" />
      </div>

      <div className="text-center max-w-lg z-10">
        <div className="relative inline-block mb-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-50">
             <div className="text-emerald-500 text-7xl">
                <FontAwesomeIcon icon={faShoppingCart} />
             </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full border-4 border-white shadow-lg">
            404
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <div className="size-1.5 bg-emerald-300 rounded-full"></div>
            <div className="w-8 h-3 border-b-2 border-emerald-300 rounded-full"></div>
            <div className="size-1.5 bg-emerald-300 rounded-full"></div>
          </div>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4">Oops! Nothing Here</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Looks like this page went out of stock! Don't worry, 
          there's plenty more fresh content to explore.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/" 
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-100"
          >
            <FontAwesomeIcon icon={faHouse} className="text-sm" />
            <span>Go to Homepage</span>
          </Link>
          <button 
            
            className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl font-bold border border-gray-200 transition-all shadow-sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-3">
           <Link href={`/shop`} className=' px-4 py-4 bg-gray-300/30 rounded-xl hover:bg-gray-300/40'>All Products</Link>
           <Link href={`/categories`} className=' px-4 py-4 bg-gray-300/30 rounded-xl hover:bg-gray-300/40'>Categories</Link>
           <Link href={``} className=' px-4 py-4 bg-gray-300/30 rounded-xl hover:bg-gray-300/40'>Today's Deals</Link>
           <Link href={`/contact`} className=' px-4 py-4 bg-gray-300/30 rounded-xl hover:bg-gray-300/40'>Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}