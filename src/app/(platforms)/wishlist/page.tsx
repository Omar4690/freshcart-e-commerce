import WishlistScreen from "../../../features/wishlist/screens/wishlistScreen";
import { getLoggedUserWishlist } from "../../../features/wishlist/servers/wishlist.actioms";

export default async function WishlistPage() {
  const response = await getLoggedUserWishlist();
  const items = response.data;

  return (
    <>
      <WishlistScreen initialItems={items} />
    </>
  );
}