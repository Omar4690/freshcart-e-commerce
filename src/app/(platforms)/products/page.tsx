import { getRelatedProducts } from "../../../features/products/servers/products.actions"; 
import ProductCard from "../../../features/products/components/productCard"; 
import { Product } from "../../../features/products/types/products.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faBoxOpen, faFolderOpen, faX } from "@fortawesome/free-solid-svg-icons"; 
import Link from "next/link";
// ADDED: Import the subcategory action to get the dynamic name
import { getSpecificSubcategory } from "@/features/categories/server/SubCategories.actions";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; subcategory?: string }>;
}) {
  const { category, subcategory } = await searchParams;

  // 1. Fetch products based on category OR subcategory
  const response = category 
    ? await getRelatedProducts(category) 
    : subcategory 
      ? await getRelatedProducts(subcategory) // Assuming your action handles the sub ID
      : { data: [] };

  const products = response?.data || [];

  let subData = null;
  if (subcategory) {
    const subRes = await getSpecificSubcategory(subcategory);
    subData = subRes?.data;
  }

  const categoryData = products.length > 0 ? products[0].category : null;
  
  const displayName = subData?.name || (categoryData ? categoryData.name : "All Products");
  const displayImage = subData?.image || (categoryData ? categoryData.image : null);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Green Header Banner */}
      <div className="bg-[#2ecc71] py-16">
        <div className="container mx-auto px-6">
          <nav className="text-white/80 text-sm mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:underline">Categories</Link>
            <span className="mx-2">/</span>
            
            <span className="font-medium text-white">{displayName}</span>
          </nav>

          <div className="flex items-center gap-6">
            <div className="size-15 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 overflow-hidden">
               {displayImage ? (
                 <img src={displayImage} alt="" className="w-10 h-10 object-contain" data--h-bstatus="5PROCESSED" data--h-bresult="clear"/>
               ) : (
                 <FontAwesomeIcon icon={faFolderOpen} className="text-white text-2xl" />
               )}
            </div>
            <div>
            
              <h1 className="text-4xl font-bold text-white">{displayName}</h1>
              <p className="text-white/90 mt-1 text-lg">Browse items in {displayName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex gap-1"><FontAwesomeIcon icon={faFilter} className="text-xs mt-1" /> <span>Active Filter:</span></div>
            <div className="flex items-center gap-2 bg-primary-600/30  text-primary-600/80 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
             <Link href={`/shop`} className="flex gap-2 justify-center items-center"> <FontAwesomeIcon icon={faFolderOpen} className="" />
              {displayName}
              <FontAwesomeIcon icon={faX} className="" /></Link>
            </div>
            <Link href="/shop" className="text-sm underline text-gray-400 hover:text-gray-500 transition-all duration-200">
              Clear all
            </Link>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Showing {products.length} products
          </div>
        </div>

        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} info={product} />
            ))}
          </div>
        ) : (
          
          <div className="flex flex-col items-center justify-center py-20 text-center  ">
            <div className="size-24 bg-gray-200/60  rounded-full flex items-center justify-center mb-6 ">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-gray-400 text-4xl"
              />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
              No Products Found
            </h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto text-sm">
              No products match your current filters.
            </p>
            <Link
              href="/shop"
              className="bg-[#2ecc71] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#27ae60] transition-all shadow-lg hover:shadow-green-200/50"
            >
             view all Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}