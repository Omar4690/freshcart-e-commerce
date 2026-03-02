import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function BrandCard({ brand }: { brand: any }) {
  return (
    <Link href={`/brands/${brand._id}`}>
      <div className="group bg-white border border-gray-200 rounded-xl px-6 py-12 transition-all duration-300 hover:shadow-lg hover:border-primary-500 text-center">
        <div className="relative h-24 w-full mb-4">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h3 className="text-sm font-bold text-gray-800 group-hover:text-purple-500">
          {brand.name}
          <p className="hover:text-purple-500 invisible group-hover:visible transition-all duration-200 pt-2 ">View products <FontAwesomeIcon icon={faArrowRight}/></p>
        </h3>
      </div>
    </Link>
  );
}