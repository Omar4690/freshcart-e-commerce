import { getAllCategories } from "@/features/categories/server/categories.actions";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import CategoriesCard from "../../../features/categories/component/CategoryCard"; 
import { Category } from "../../../features/categories/types/category.types";

export default async function CategoriesPage() {
  const { data: categories } = await getAllCategories();

  return (
    <main>
      <div className="bg-[#2ecc71] py-16 px-6 lg:px-60 text-white">
        <div className="text-sm mb-4 text-white/80 space-x-2 ">
          <Link href={`/`}>
            <span className="hover:text-white transition-text duration-200">Home</span>
          </Link>
          <span>/</span>
          <Link href={`/categories`}>
            <span className="hover:text-white transition-text duration-200">Categories</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/30 text-white text-3xl rounded-xl py-5 px-5">
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">All Categories</h1>
            <p className="opacity-90">Browse our wide range of product categories</p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12 lg:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((cat: Category) => (
          <CategoriesCard key={cat._id} category={cat} />
        ))}
      </div>
    </main>
  );
}