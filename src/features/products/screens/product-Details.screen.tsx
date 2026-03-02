import { getproductById } from "../servers/products.actions"
import ProductInfo from "../components/productDetails/productInfo";
import ProductTabs from "../components/productDetails/ProductTabs"; 
import RelatedProducts from "../components/productDetails/RelatedProducts"; 

export default async function ProductDetailsScreen({productId}:{productId:string }) {
    const response = await getproductById({id:productId}); 
    const product = response.data;
    
    return (
      <div className="bg-gray-50 min-h-screen pb-12">
        <ProductInfo product={product} info={product}/> 
        
        <div className="container mx-auto px-4 mt-8">
           <ProductTabs product={product} />
           
         
           <RelatedProducts 
             categoryId={product.category._id} 
             currentProductId={product.id} 
           />
        </div>
      </div>
    );
}