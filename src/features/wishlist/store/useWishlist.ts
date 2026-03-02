"use client";

import { toast } from "react-toastify";
import { addProductToWishlist } from "../../../features/wishlist/servers/wishlist.actioms"; 


export const useWishlist = () => {
   

  const handleAddToWishlist = async (productId: string) => {
    try {
      const response = await addProductToWishlist({ productId });

      if (response.status === "success") {
        toast.success(response.message || "Product added to wishlist! ❤️");
        
      
        
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || "Failed to add to wishlist");
        return { success: false };
      }
    } catch (error) {
      toast.error("An error occurred while adding to wishlist");
      return { success: false };
    }
  };

  return { handleAddToWishlist };
};