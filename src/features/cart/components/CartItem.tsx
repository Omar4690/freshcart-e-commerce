"use client";
import {
  faCheck,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { CartItem as CartItemType } from "../types/cart.types";
import Swal from "sweetalert2";
import { removeProductFromCart, updateProductQuantity } from "../server/cart.actions";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/store";
import { removeProduct, setCartInfo } from "../store/cart.slice";

export default function CartItem({ info }: { info: CartItemType }) {
  const { _id, count, price, product } = info;
  const { id, brand, category, imageCover, quantity, title } = product;

  const dispatch = useAppDispatch();

  const handleRemove = async () => {
    const result = await Swal.fire({
      html: `
      <div class="text-center py-2">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Remove Item?</h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          Remove <span class="font-semibold text-gray-700">${title.slice(
            0,
            40,
          )}${title.length > 40 ? "..." : ""}</span> from your cart?
        </p>
      </div>
    `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 m-0",
        actions: "px-6 pb-6 pt-0 gap-3 flex-row-reverse",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all",
      },
    });

    if (result.isConfirmed) {
      dispatch(removeProduct({ id }));
      const response = await removeProductFromCart(id);
      toast.success("Product removed");
    }
  };
  const handleUpdate = async (newCount: number) => {

  if (newCount < 1) return;

  try {
    const response = await updateProductQuantity(id, newCount);
    dispatch(setCartInfo(response))
  } catch (error) {
  }
};



  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300">
        <div className="p-4 sm:p-5">
          <div className="flex gap-4 sm:gap-6">
            {/* Product Image */}
            <Link href={`/`} className="relative shrink-0 group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border">
                <img
                  src={imageCover}
                  alt={title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* In Stock Badge */}
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                <FontAwesomeIcon icon={faCheck} className="text-[8px]" />
                In Stock
              </div>
            </Link>

            {/* Product Info */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Top Section: Category & Title */}
              <div className="mb-3">
                <Link href={`/`} className="group/title">
                  <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed truncate">
                    {title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs rounded-lg font-medium">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    SKU: {_id.slice(-6).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-primary-600 font-bold text-lg">
                    {price} EGP
                  </span>
                  <span className="text-xs text-gray-400">per unit</span>
                </div>
              </div>

              {/* Bottom Section: Quantity Controls & Actions */}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                    <button
                      className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors"
                      aria-label="Decrease quantity"
                      onClick={()=>{
                        handleUpdate(count - 1)
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-xs" />
                    </button>

                    <span className="w-12 text-center font-bold text-gray-900">
                      {count}
                    </span>

                    <button
                      className="h-8 w-8 rounded-lg bg-primary-600 shadow-sm shadow-primary-600/30 flex items-center justify-center text-white hover:bg-primary-700 transition-colors"
                      aria-label="Increase quantity"
                      onClick={()=>{
                        handleUpdate(count + 1)
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-xs" />
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Total</p>
                    <p className="text-xl font-bold text-gray-900">
                      {price * count}
                      {""}
                      <span className="text-sm font-medium text-gray-400 ml-1">
                        EGP
                      </span>
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                    title="Remove item"
                    aria-label="Remove from cart"
                    onClick={handleRemove}
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
