import {
  faShieldHalved,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reviewImage from "@/assets/images/review-author.png";
import Image from "next/image";
export default function SignupHero() {
  return (
    <>
      <div className="space-y-8 p-10">
        <div>
          <h2 className="text-4xl font-bold">
            Welcome to <span className="text-primary-600">FreshCart</span>
          </h2>
          <p className="text-lg mt-2">
            Join thousands of happy customers who enjoy fresh groceries <br />
            delivered right to their doorstep.
          </p>
        </div>
        <ul className="space-y-5 *:flex *:items-center *:gap-3">
          <li>
            <div className="icon size-12 rounded-full bg-emerald-200 flex justify-center items-center text-xl text-emerald-600 ">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="content">
              <h3 className="font-semibold">Premium Quality</h3>
              <p className="text-gray-600">
                Premium quality products sourced from trusted suppliers.
              </p>
            </div>
          </li>
          <li>
            <div className="icon size-12 rounded-full bg-emerald-200 flex justify-center items-center text-xl text-emerald-600 ">
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <div className="content">
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-gray-600">
                Same-day delivery available in most areas
              </p>
            </div>
          </li>
          <li>
            <div className="icon size-12 rounded-full bg-emerald-200 flex justify-center items-center text-xl text-emerald-600 ">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div className="content">
              <h3 className="font-semibold">Secure Shopping</h3>
              <p className="text-gray-600">
                Your data and payments are completely secure
              </p>
            </div>
          </li>
        </ul>

        <div className="review bg-white p-6 rounded-xl shadow-md ">
          <div className="flex items-center gap-3">
            <div>
              <Image
                src={reviewImage}
                alt="Customer Reviews"
                className="rounded-full size-12 "
              />
            </div>
            <div className="rating">
              <h3>Sarah Johnson</h3>
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
            </div>
          </div>
        <blockquote className="text-gray-700 italic pt-3">
          <p>
            "FreshCart has transformed my shopping experience. The quality of
            the <br />products is outstanding, and the delivery is always on time.
            Highly <br />recommend!"
          </p>
        </blockquote>
        </div>
      </div>
    </>
  );
}
