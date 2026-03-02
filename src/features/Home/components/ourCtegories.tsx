import { getAllCategories } from "@/features/categories/server/categories.actions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default async function OurCategories() {
  const response = await getAllCategories();
  
  const categories = response?.data || [];

  return (
    <section id="categories" className="py-10">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-emerald-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-800">
              Shop By <span className="text-emerald-600">Category</span>
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center transition-colors duration-200"
          >
            View All Categories
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category: any) => (
            <Link
              href={`/categories/${category._id}`}
              key={category._id}
              className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all group"
            >
              <div className="h-24 w-24 overflow-hidden bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <Image
                  width={100}
                  height={100}
                  src={category.image}
                  alt={category.name}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-gray-700 text-sm group-hover:text-emerald-600 truncate">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}