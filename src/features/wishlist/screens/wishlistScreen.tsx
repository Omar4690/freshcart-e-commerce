"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { removeProductFromWishlist } from "../../../features/wishlist/servers/wishlist.actioms";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import { useAppDispatch } from "@/store/store";
import { WishlistProduct } from "../types/wishlist.types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCartShopping,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { setWishlistInfo } from "../slice/wishlist.slice";

export default function WishlistScreen({
  initialItems,
}: {
  initialItems: WishlistProduct[];
}) {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    dispatch(setWishlistInfo({ status: "success", data: initialItems }));
  }, [initialItems, dispatch]);

  const handleAddToCart = async (id: string) => {
    try {
      const response = await addProductToCart({ productId: id });
      if (response.status === "success") {
        toast.success(response.message);
        const cartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(cartInfo));
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const response = await removeProductFromWishlist(id);
      if (response.status === "success") {
        toast.success("Removed from wishlist");

        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);

        dispatch(
          setWishlistInfo({
            status: "success",
            data: updatedItems,
            count: updatedItems.length,
          }),
        );
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <section className="bg-gray-100/30">
      <div className=" font-sans min-h-screen ">
        <div className=" py-3 px-50 bg-white">
          <div className="space-x-2 text-sm mb-4">
            <Link
              href={`/`}
              className="hover:text-primary-600 transtion-text duration-300 text-gray-400"
            >
              Home
            </Link>
            <span>/</span>
            <span>Wishlist</span>
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-red-500/10 py-4 px-4 rounded-xl ">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-red-500 text-lg"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">My Wishlist</h1>
              <p className="text-gray-400 text-sm">
                {items.length} items saved
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 ">
          <div className=" rounded-2xl container overflow-hidden  ">
            {items.length == 0 ? (
              <>
                <div className="text-center space-y-2">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-2xl bg-gray-300/30 px-6 py-6 rounded-xl"
                  />
                  <h4 className="font-bold  text-lg">Your wishlist is empty</h4>
                  <p className="text-sm text-gray-500 ">
                    Browse products and save your favorites here.
                  </p>
                 <Link href={`/shop`}>
                  <button className="py-3 px-30 mt-4 hover:bg-emerald-700 transition-all duration-200 rounded-xl bg-primary-600 text-white font-bold ">
                    Browser Products <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                 </Link>
                </div>
              </>
            ) : (
              <>
                <table className="w-full text-left border-collapse shadow-xl ">
                  <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium text-center">
                        Status
                      </th>
                      <th className="px-6 py-4 font-medium text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {items.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50/50 transition-colors "
                      >
                        <td className="px-6 py-4 ">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 relative border rounded-lg overflow-hidden bg-white">
                              <Image
                                src={product.imageCover}
                                alt={product.title}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="">
                              <h3 className="font-semibold text-slate-800 text-sm">
                                {product.title.split(" ").slice(0, 2).join(" ")}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {product.category.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-700  border-gray-300">
                          {product.price} EGP
                        </td>
                        <td className=" text-center  text-green-600 text-xs font-bold">
                          <span className="bg-primary-600/10 px-3 py-1.5 rounded-xl ">
                            In Stock
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleAddToCart(product.id)}
                              className=" px-4 py-2 rounded-lg text-xs bg-primary-600 font-semibold hover:bg-emerald-700 transition-all duration-200"
                            >
                              <div className="space-x-2 text-white">
                                <FontAwesomeIcon icon={faCartShopping} />
                                <span> Add to Cart</span>
                              </div>
                            </button>
                            <button
                              onClick={() => handleRemove(product.id)}
                              className=" pt-1 text-gray-400 hover:text-red-500 transition-text duration-200"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="border border-gray-300/50 p-2  transition-all duration-200 hover:bg-red-400/10 rounded-lg"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          {items.length == 0 ? null : (
            <>
              <Link href={`/shop`}>
                <span className="hover:text-primary-600 transition-text duration-300 text-gray-500 px-50 py-6 text-sm">
                  <FontAwesomeIcon icon={faArrowLeft} /> Continue Shopping
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
