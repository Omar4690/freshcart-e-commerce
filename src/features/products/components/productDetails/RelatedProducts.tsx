"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "swiper/css";
import "swiper/css/navigation";

import { getRelatedProducts } from "../../servers/products.actions";
import ProductCard from "../productCard";
import { Product } from "../../types/products.types";

export default function RelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: string;
  currentProductId: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchRelated() {
      const response = await getRelatedProducts(categoryId);
      const filtered = response.data.filter((p) => p.id !== currentProductId);
      setProducts(filtered);
    }
    fetchRelated();
  }, [categoryId, currentProductId]);

  if (products.length === 0) return null;

  return (
    <div className="mt-16 relative ">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-8 bg-primary-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">
            You May Also <span className="text-primary-600">Like</span>
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button className="related-prev h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="related-next h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".related-prev",
          nextEl: ".related-next",
        }}
        spaceBetween={20} // Added spacing so they aren't touching
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="mySwiper" // Change this if the 'pb-4' class is causing issues
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard info={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
