export interface WishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
  };
  ratingsAverage: number;
  price: number;
  id: string;
}

export interface WishlistResponse {
  status: string;
  count?: number;
  data: WishlistProduct[]; 
  message?: string;        
  wishlist?: string[];     
}