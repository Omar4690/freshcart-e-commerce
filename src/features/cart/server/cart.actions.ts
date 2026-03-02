"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CartResponse } from "../types/cart.types";


export async function addProductToCart({ productId }: { productId: string }) {
  const cookieStore = await cookies();
  
  const token = cookieStore.get("token")?.value; 

  if (!token) {
    return { status: "fail", message: "You must be logged in to add items to the cart" };
  }

  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: token, 
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error("Cart Error:", error.response?.data || error.message);
    return error.response?.data || { status: "error", message: "Failed to add to cart" };
  }
}

export async function getLoggedUserCart(): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart`,
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromCart(productId: string):Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }


  try {
    const options:AxiosRequestConfig ={
        url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method:"DELETE",
        headers:{
            token
        }
    }
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error
  }
}

export async function updateProductQuantity(productId: string, count: number):Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }


  try {
    const options:AxiosRequestConfig ={
        url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method:"PUT",
        headers:{
            token
        },
        data:{count}
    }
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error
  }
}