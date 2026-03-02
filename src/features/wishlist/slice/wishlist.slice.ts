import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistProduct, WishlistResponse } from "../types/wishlist.types";

export interface WishlistState {
  numOfWishlistItems: number;
  products: WishlistProduct[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  numOfWishlistItems: 0,
  products: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistInfo: function (state, action: PayloadAction<WishlistResponse>) {
      state.products = action.payload.data;
      state.numOfWishlistItems = action.payload.count || action.payload.data.length;
      state.isLoading = false;
      state.error = null;
    },

    removeProductFromWishlist: function (state, action: PayloadAction<{ id: string }>) {
      const productId = action.payload.id;
      
      state.products = state.products.filter(
        (product) => product.id !== productId && product._id !== productId
      );
      
      state.numOfWishlistItems = state.products.length;
    },

    setLoading: function (state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setError: function (state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearWishlist: function (state) {
      state.products = [];
      state.numOfWishlistItems = 0;
    }
  },
});

export const { 
  setWishlistInfo, 
  removeProductFromWishlist, 
  setLoading, 
  setError, 
  clearWishlist 
} = wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;