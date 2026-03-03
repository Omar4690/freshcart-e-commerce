import { ReactNode } from "react";
import "../styles/globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "@fortawesome/fontawesome-svg-core/styles";
import { config } from "@fortawesome/fontawesome-svg-core";
import "react-toastify/dist/ReactToastify.css";
config.autoAddCss = false;

import { Exo } from "next/font/google";
import Providers from "@/components/providers/providers";
import { verifyToken } from "@/features/auth/server/auth.actions";
import { getLoggedUserCart } from "@/features/cart/server/cart.actions";
import { CartState } from "@/features/cart/store/cart.slice";
import { WishlistState } from "../features/wishlist/slice/wishlist.slice"; 

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-exo",
});
let defaultWishlistState: WishlistState = {
  numOfWishlistItems: 0,
  products: [],
  isLoading: false,
  error: null,
};

let defaultCartState: CartState = {
  cartId: null,
  numOfCartItems: 0,
  totalCartPrice: 0,
  products: [],
  error: null,
  isLoading: false,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let wishlistState = defaultWishlistState;
  const authValues = await verifyToken();

  let cartState = defaultCartState

  if (authValues.isAuthenticated) {
    try {
      const cartResponse = await getLoggedUserCart();
      cartState = {
        cartId: cartResponse.cartId ,
        numOfCartItems: cartResponse.numOfCartItems ,
        totalCartPrice:  cartResponse.data.totalCartPrice ,
        products: cartResponse.data.products,
        error: null,
        isLoading: false,
      };
    } catch (error) {
      cartState = defaultCartState
    }
  }

  

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${exo.className} font-medium`}>
        <Providers preloadedState={{ auth: authValues , cart: cartState , wishlist: wishlistState }}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
