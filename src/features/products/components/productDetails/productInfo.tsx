"use client";
import Rating from "@/components/ui/rating";
import {
  faBolt,
  faCartShopping,
  faMinus,
  faPlus,
  faShareNodes,
  faShieldAlt,
  faTruckFast,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "../../types/products.types";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { useState } from "react";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import { toast } from "react-toastify";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import { useAppDispatch } from "@/store/store";
import { useWishlist } from "@/features/wishlist/store/useWishlist";

export default function ProductInfo({
  product,
  info,
}: {
  product: Product;
  info: Product;
}) {
  const { id } = info;
   const { handleAddToWishlist } = useWishlist();


  
  const dispatch = useAppDispatch();

  const handleAddToCart = async () => {
    try {
      const response = await addProductToCart({ productId: id });

      if (response.status === "success") {
        toast.success(response.message);

        const cartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(cartInfo));
      } else {
        toast.error(response.message || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("fail to add to cart");
    }
  };

  const {
    title,
    description,
    images,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceAfterDiscount,
    quantity,
    category,
    brand,
  } = product;

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const isLowStock = quantity > 0 && quantity < 10;
  const [count, SetCount] = useState(1);

  return (
    <section id="product-detail" className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex sm:flex-col lg:flex-row gap-8 items-start">
          <div id="product-images" className="w-full w-1/4 ">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4 lg:flex-row">
              <ImageGallery 
                items={images.map((image) => ({
                  original: image,
                  thumbnail: image,
                }))}
                showFullscreenButton={false}
                showNav={false}
                showPlayButton={false}
                data--h-bstatus="5PROCESSED"
                data--h-bresult="clear"
                
              />
            </div>
          </div>

          <div id="product-info" className="w-full w-3/4 ">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap lg:flex-row gap-2 mb-4">
                <Link
                  href={""}
                  className="bg-primary-50 lg:flex-row text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition"
                >
                  {category.name}
                </Link>
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                  {brand.name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {title}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-3 mb-4">
                <Rating rating={ratingsAverage} />
                <span className="text-sm text-gray-600">
                  {ratingsAverage} ({ratingsQuantity} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="flex items-center flex-wrap gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {priceAfterDiscount || price} EGP
                </span>
                {onSale && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {price}
                    </span>
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {quantity > 0 ? (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isLowStock ? "bg-yellow-600" : "bg-green-500"
                      }`}
                    ></span>
                    {isLowStock
                      ? `Only ${quantity} left - Order soon!`
                      : "In Stock"}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-gray-100 pt-5 mb-6">
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => SetCount(Math.max(1, count - 1))}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={count}
                      onChange={(e) => SetCount(Math.max(1, +e.target.value))}
                      className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                    />
                    <button
                      onClick={() => SetCount(count + 1)}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {quantity} available
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {count * (priceAfterDiscount || price)} EGP
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium bg-primary-600 hover:bg-primary-700 active:scale-[0.98] transition"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition">
                  <FontAwesomeIcon icon={faBolt} className="mr-2" />
                  Buy Now
                </button>
              </div>
              <div className="flex gap-3 mt-4">
                {/* Add to Wishlist Button */}
                <button
                  onClick={() => handleAddToWishlist(id)}
                  className="flex-1  hover:text-primary-600 transition-text duration-300 hover:border-primary-600 transition-border duration-300 flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
                >
                  <FontAwesomeIcon icon={faHeart} className="text-lg" />
                  <span className="">Add to Wishlist</span>
                </button>

                {/* Share Button */}
                <button className="flex items-center hover:border-primary-600  hover:text-primary-600 transition-text duration-300 transition-border duration-300 justify-center p-3.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]">
                  <FontAwesomeIcon icon={faShareNodes} className="text-lg" />
                </button>
              </div>
              {/* Trust Badges */}
              <div className="border-t border-gray-100 pt-6 ">
                <div className="grid sm:grid-cols-3 gap-4 flex justify-items-center ">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-emerald-100 text-primary-600 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faTruckFast} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold">
                        Free Delivery
                      </span>
                      <p className="text-xs text-gray-500">Orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-emerald-100 text-primary-600 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUndo} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold">
                        30 Days Return
                      </span>
                      <p className="text-xs text-gray-500">Money back</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-emerald-100 text-primary-600 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faShieldAlt} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold">
                        Secure Payment
                      </span>
                      <p className="text-xs text-gray-500">100% Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
