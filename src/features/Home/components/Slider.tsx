"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import sliderImg_1 from "../../../assets/images/home-slider-1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Slider() {
  return (
    <>
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{
            clickable: true,
          }}
          
          className="mySwiper relative"
          autoplay={{ delay: 4000 }}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
        >
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`h-[500px] flex items-center justify-center relative`}
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    Fresh Products Delivered to your Door
                  </h2>
                  <p>Get 20% off your first order</p>

                  <div className="mt-4">
                    <Link
                      href={`/shop`}
                      className="btn bg-white border-2 border-white/50 text-primary-600"
                    >
                      Shop Now
                    </Link>

                    <Link
                      href={``}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`h-[500px] flex items-center justify-center relative`}
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    Premium Quality Guaranteed
                  </h2>
                  <p>Fresh from farm to your table</p>

                  <div className="mt-4">
                    <Link
                      href={`/shop`}
                      className="btn bg-white border-2 border-white/50 text-primary-600 "
                    >
                      Shop Now
                    </Link>

                    <Link
                      href={``}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`h-[500px] flex items-center justify-center relative`}
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    Fast & Free Delivery
                  </h2>
                  <p>Same day delivery ava</p>

                  <div className="mt-4">
                    <Link
                      href={`/shop`}
                      className="btn bg-white border-2 border-white/50 text-primary-600 "
                    >
                      Shop Now
                    </Link>

                    <Link
                      href={``}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transform-scale duration-200 text-primary-600 rounded-full p-3 cursor-pointer bg-white/90 hover:bg-white">
            <FontAwesomeIcon icon={faChevronLeft} className="text-lg " />
          </button>
          <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transform-scale duration-200 text-primary-600 rounded-full p-3 cursor-pointer bg-white/90 hover:bg-white">
            <FontAwesomeIcon icon={faChevronRight} className="text-lg " />
          </button>
        </Swiper>
      </section>
    </>
  );
}
