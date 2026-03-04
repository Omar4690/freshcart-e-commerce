import { getSubcategoriesOnCategory } from "../../../../features/categories/server/SubCategories.actions";
import { getSpecificCategory } from "@/features/categories/server/categories.actions";
import { faFolderOpen, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function SubcategoryPage({ params }: { params: Promise<{ categoryid: string }> }) {
  const { categoryid } = await params;

  const categoryRes = await getSpecificCategory(categoryid);
  const subRes = await getSubcategoriesOnCategory(categoryid);

  const categoryData = categoryRes?.data; 
  const subcategories = subRes?.data || [];

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Header Banner */}
      <div className="bg-[#2ecc71] py-16 text-white">
        <div className="container mx-auto px-6">
          <nav className="flex text-sm opacity-80 mb-6 space-x-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:underline">Categories</Link>
            <span>/</span>
            <span className="font-medium">{categoryData?.name || "Loading..."}</span>
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 overflow-hidden">
               {categoryData?.image ? (
                 <img src={categoryData.image} alt={categoryData.name} className="w-12 h-12 object-contain" />
               ) : (
                 <FontAwesomeIcon icon={faFolderOpen} className="text-2xl" />
               )}
            </div>
            <div>
              <h1 className="text-4xl font-bold">{categoryData?.name || "Category"}</h1>
              <p className="opacity-90 mt-1 text-lg">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <Link 
          href="/categories" 
          className="inline-flex items-center text-gray-500 hover:text-[#2ecc71] transition-colors mb-8 group"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2 text-xs group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </Link>

        <h2 className="text-xl font-bold text-gray-800 mb-8">
          {subcategories.length} Subcategories in {categoryData?.name || "this category"}
        </h2>

        {/* Subcategories Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {subcategories.map((sub: any) => (
            <Link
              key={sub._id}
              href={`/products?subcategory=${sub._id}`}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-[#2ecc71] hover:shadow-md transition-all duration-500 flex flex-col items-start"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2ecc71] transition-colors">
                <FontAwesomeIcon 
                  icon={faFolderOpen} 
                  className="text-[#2ecc71] group-hover:text-white transition-colors"
                />
              </div>
              <span className="font-bold text-gray-700 text-lg group-hover:text-[#2ecc71]">
                {sub.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {subcategories.length === 0 && (
          <div className="text-center py-32">
             <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faFolderOpen} className="text-gray-400 text-2xl" />
             </div>
             <p className="text-gray-500 text-lg">No subcategories found for this selection.</p>
          </div>
        )}
      </div>
    </main>
  );
}