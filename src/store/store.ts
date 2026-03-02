import cart from "@/app/(platforms)/cart/page";
import { authReducer, AuthState } from "@/features/auth/store/auth.slice";
import { cartReducer, CartState } from "@/features/cart/store/cart.slice";
import { wishlistReducer, WishlistState } from "@/features/wishlist/slice/wishlist.slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export type PreloadedState = {
  auth: AuthState;
  cart:CartState;
  wishlist:WishlistState;
};

export function createStore(preloadedState: PreloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },

    preloadedState,
  });

  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore['dispatch']

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();