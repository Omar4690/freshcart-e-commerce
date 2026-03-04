"use client";

import {
  faArrowsRotate,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "../types/products.types";
import Rating from "@/components/ui/rating";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import { toast } from "react-toastify";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import { useAppDispatch } from "@/store/store";

export default function productCard({ info }: { info: Product }) {
  const {
    id,
    category,
    title,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceAfterDiscount,
  } = info;

  const dispatch = useAppDispatch();
  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

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
  return (
    <>
      <div
        id="product-card"
        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md  transition-transform duration-300 hover:-translate-y-2"
      >
        <div className="relative">
          <img
            className="w-full h-60 object-contain bg-white"
            src={imageCover}
            alt={title}
          />

          <div className="absolute top-3 left-3">
            {onSale && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600">
              <FontAwesomeIcon icon={faArrowsRotate} />
            </button>
            <Link
              href={`/products/${id}`}
              className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600"
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">
            <Link
              href={`/products?category=${category._id}`}
              className="hover:text-emerald-600 transition-colors"
            >
              {category.name}
            </Link>
          </div>
          <h3 className="font-medium mb-1 cursor-pointer">
            <Link className="line-clamp-2 hover:text-emerald-600 transition-colors" href={`/products/${id}`}>
              {title}
            </Link>
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex text-amber-400 mr-2">
              <Rating rating={ratingsAverage} />
            </div>
            <span className="text-xs text-gray-500">
              {ratingsAverage} ({ratingsQuantity} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary-600">
                {priceAfterDiscount || price} EGP
              </span>
              {onSale && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {price} EGP
                </span>
              )}
            </div>
            <button
              className="bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary-700"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
