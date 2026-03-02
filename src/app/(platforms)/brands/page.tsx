import { getAllBrands } from "@/features/brands/server/brands.actions";
import BrandCard from "@/features/brands/component/BrandCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

export default async function BrandsPage() {
  const response = await getAllBrands();
  const brands = response.data;

  return (
    <main className=" min-h-screen ">
      <div className="mb-8 flex justify-center flex-col px-70 space-y-5 bg-purple-600 h-60">
        <nav className="flex text-sm text-gray-500">
          <Link
            href="/"
            className="hover:text-white text-gray-900 trasition-text duration-200 "
          >
            Home
          </Link>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-gray-900 font-medium  text-white">Brands</span>
        </nav>
        <div className="flex space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-white/40 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            <FontAwesomeIcon icon={faTags} className="text-2xl text-white" />
          </div>{" "}
          <div className="flex-col">
            <h1 className="text-white text-4xl font-bold mb-2">Top Brands</h1>
          <p className="text-white/80 text-sm">
            Shop from your favorite brands
          </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10  px-4">
        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {brands?.map((brand: any) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </main>
  );
}
