import Link from "next/link";
import { Category } from "../types/category.types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category._id}`}
      className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
    >
      <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl bg-[#f8f9fa] flex items-center justify-center">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#2ecc71] transition-colors">
        {category.name}
      </h3>
    </Link>
  );
}