import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../../../src/features/products/components/productCard";
import getProducts from "../products/servers/products.actions";
import Link from "next/link";

export default async function ShopProducts() { 
  const response = await getProducts();
  return (
    <section>
      <div className="bg-[#2ecc71] py-12">
        <div className="container mx-auto px-4">
          <nav className="text-white/80 text-xs mb-4">
           <Link href={`/`}> <span className="hover:underline cursor-pointer">Home</span></Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-white">All Products</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="size-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
              <FontAwesomeIcon icon={faBoxOpen} className="text-white text-3xl" />
            </div>
            <div className="text-white">
              <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
              <p className="text-emerald-50 mt-1 opacity-90">Explore our complete product collection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <p className="text-gray-500 text-sm mb-6">Showing {response.data.length} products</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {response.data.map((product: any) => (
            <ProductCard key={product._id} info={product} />
          ))}
        </div>
      </div>
    </section>
  );
}