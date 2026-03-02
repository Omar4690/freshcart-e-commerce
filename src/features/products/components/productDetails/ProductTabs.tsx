"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBookOpen, 
  faStar as faStarSolid, 
  faTruck, 
  faCheck,
  faShippingFast,
  faUndo,
  faShieldAlt
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Product } from "../../types/products.types";

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "Product Details", icon: faBookOpen },
    { id: "reviews", label: `Reviews (${product.ratingsQuantity || 0})`, icon: faStarSolid },
    { id: "shipping", label: "Shipping & Returns", icon: faTruck },
  ];

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Tab Header */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all relative ${
              activeTab === tab.id ? "text-primary-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={tab.icon} className="text-xs" />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 lg:p-10">
        {/* Product Details Tab */}
        {activeTab === "details" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="font-bold text-gray-900">About this Product</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50/50 p-5 rounded-lg border border-gray-100">
                <h4 className="text-sm font-bold mb-4">Product Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Category</span><span>{product.category.name}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Brand</span><span>{product.brand.name}</span></div>
                </div>
              </div>
              <div className="bg-gray-50/50 p-5 rounded-lg border border-gray-100">
                <h4 className="text-sm font-bold mb-4">Key Features</h4>
                <ul className="space-y-3 text-sm">
                  {["Premium Quality Product", "100% Authentic Guarantee", "Fast & Secure Packaging", "Quality Tested"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-primary-500 text-xs" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start border-b border-gray-100 pb-8">
              <div className="text-center md:w-1/4">
                <h2 className="text-5xl font-bold text-gray-900">{product.ratingsAverage}</h2>
                <div className="flex justify-center gap-1 my-2 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={i < Math.floor(product.ratingsAverage) ? faStarSolid : faStarRegular} />
                  ))}
                </div>
                <p className="text-xs text-gray-500">Based on {product.ratingsQuantity} reviews</p>
              </div>

              <div className="flex-1 w-full space-y-3">
                {[
                  { s: 5, p: "25%" }, { s: 4, p: "60%" }, { s: 3, p: "25%" }, { s: 2, p: "5%" }, { s: 1, p: "5%" }
                ].map((row) => (
                  <div key={row.s} className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <span className="w-8 whitespace-nowrap">{row.s} star</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: row.p }} />
                    </div>
                    <span className="w-8 text-right">{row.p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-12">
              <div className="text-gray-300 text-4xl mb-4">
                <FontAwesomeIcon icon={faStarRegular} />
              </div>
              <p className="text-gray-500 text-sm mb-4">Customer reviews will be displayed here.</p>
              <button className="text-primary-600 font-bold hover:underline">Write a Review</button>
            </div>
          </div>
        )}

        {/* Shipping & Returns Tab */}
        {activeTab === "shipping" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#ebf9eb] border border-green-100 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-[#0aad0a] text-white rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faShippingFast} />
                  </div>
                  <h4 className="font-bold text-gray-900">Shipping Information</h4>
                </div>
                <ul className="text-sm space-y-3 text-gray-700">
                  {["Free shipping on orders over $50", "Standard delivery: 3-5 business days", "Express delivery available", "Track your order in real-time"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-primary-600 text-xs" /> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-[#ebf9eb] border border-green-100 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-[#0aad0a] text-white rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUndo} />
                  </div>
                  <h4 className="font-bold text-gray-900">Returns & Refunds</h4>
                </div>
                <ul className="text-sm space-y-3 text-gray-700">
                  {["30-day hassle-free returns", "Full refund or exchange available", "Free return shipping on defective items", "Easy online return process"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-primary-600 text-xs" /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-5 bg-gray-50 rounded-lg flex items-center gap-4 border border-gray-100">
              <div className="h-12 w-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400">
                <FontAwesomeIcon icon={faShieldAlt} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Buyer Protection Guarantee</p>
                <p className="text-xs text-gray-500 leading-relaxed">Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}