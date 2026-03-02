import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function DealsBanner() {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Deal of the Day */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mb-4">
                <span className="text-xs font-medium">🔥 Deal of the Day</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Fresh Organic Fruits
              </h3>
              <p className="text-white/80 mb-4">
                Get up to 40% off on selected organic fruits
              </p>

              {/* Countdown Timer Placeholder */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold">40% OFF</div>
                <div className="text-sm text-white/70">
                  Use code:{" "}
                  <span className="font-bold text-white">ORGANIC40</span>
                </div>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition"
              >
                Shop Now
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>

          {/* New Arrivals / Exotic Vegetables */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-orange-600 p-8 text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mb-4">
                <span>✨</span>
                <span className="text-xs font-medium">New Arrivals</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Exotic Vegetables
              </h3>
              <p className="text-white/80 mb-4">
                Discover our latest collection of premium vegetables
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold">25% OFF</div>
                <div className="text-sm text-white/70">
                  Use code:{" "}
                  <span className="font-bold text-white">FRESH25</span>
                </div>
              </div>

              <Link
                href="/products?sort=newest"
                className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-bold hover:bg-orange-50 transition"
              >
                Explore Now
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
