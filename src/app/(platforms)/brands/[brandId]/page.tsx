import {
  getBrandById,
  getProductsByBrand,
} from "@/features/brands/server/brands.actions";
import Image from "next/image";
import ProductCard from "../../../../features/products/components/productCard"; 
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faTags } from "@fortawesome/free-solid-svg-icons";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;

  const [brandResponse, productsResponse] = await Promise.all([
    getBrandById(brandId),
    getProductsByBrand(brandId),
  ]);

  const brand = brandResponse?.data;
  const products = productsResponse?.data || [];

  if (!brand)
    return <div className="text-center py-20 font-bold text-gray-500">Brand Not Found</div>;

  return (
    <main className="min-h-screen bg-white">
      {/* Brand Header Design (Green Banner) */}
      <div className="bg-[#2ecc71] py-12 sm:px-6 lg:px-60 text-white">
        <nav className="text-sm mb-4 flex items-center gap-2  ">
          <Link href="/" className="text-white/70 hover:text-white  duration-200 transition-text">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/brands" className="text-white/70 hover:text-white duration-200 transition-colors">brands</Link>
          <span className="opacity-50">/</span>
          <span className="uppercase font-semibold tracking-wider">{brand.name}</span>
        </nav>
        
        <div className="flex items-center gap-6">
          <div className="bg-white p-2 rounded-xl shadow-md">
            <div className="relative h-14 w-14">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-tight leading-none mb-1">
              {brand.name}
            </h1>
            <p className="text-sm opacity-90">Shop {brand.name} products</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:px-20">
        {/* Active Filters Bar */}
        <div className="flex items-center gap-3 mb-6 text-sm">
          <span className="text-gray-400 font-medium">Active Filters:</span>
          <div className="bg-purple-50 text-purple-600 px-3 py-1 rounded-xl flex items-center gap-2 font-semibold text-xs border border-purple-100 shadow-sm">
            <FontAwesomeIcon icon={faTags} className="text-[10px]" /> {brand.name}
            <Link href="/brands">
              <button className="hover:text-purple-800 text-lg leading-none ml-1">×</button>
            </Link>
          </div>
          <Link href="/brands">
            <button className="text-gray-400 underline underline-offset-4 text-xs hover:text-gray-700 transition-all duration-200 ml-2">
              Clear all
            </button>
          </Link>
        </div>

        <p className="text-gray-400 mb-8 text-xs font-medium tracking-wide">
          Showing {products.length} products
        </p>

        {/* 5-Column Grid Layout */}
        {products.length > 0 ? (
          <div className="grid lg:grid-cols-5 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} info={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-30">
            <span className="bg-gray-300 rounded-full py-6 px-6 mb-4">
                <FontAwesomeIcon icon={faBoxOpen} className="text-3xl" />
            </span>
            <h3 className="text-bold ">No Products Found</h3>
             <p className="text-gray-400 font-medium">No products match your current filters.</p>
             <Link href="/shop" className="mt-4 inline-block bg-[#2ecc71] text-white px-6 py-2 rounded-lg font-bold">
                View All products
             </Link>
          </div>
        )}
      </div>
    </main>
  );
}