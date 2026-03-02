"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { WishlistResponse } from "../types/wishlist.types";


export async function addProductToWishlist({ productId }: { productId: string }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { status: "fail", message: "You must be logged in to add items to the wishlist" };
  }

  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      {
        headers: {
          token: token,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error("Wishlist Error:", error.response?.data || error.message);
    return error.response?.data || { status: "error", message: "Failed to add to wishlist" };
  }
}


export async function getLoggedUserWishlist(): Promise<WishlistResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: token,
      },
    });
    return data;
  } catch (error: any) {
    console.error("Wishlist Get Error:", error.response?.data || error.message);
    throw error;
  }
}


export async function removeProductFromWishlist(productId: string): Promise<WishlistResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: token,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error("Wishlist Delete Error:", error.response?.data || error.message);
    throw error;
  }
}