"use client";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChevronDown,
  faGift,
  faHeadset,
  faPhone,
  faSearch,
  faShoppingCart,
  faTruck,
  faUserPlus,
  faGear,
  faLocationDot,
  faClipboardList,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faUser,
  faHeart,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import logo from "../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { AppState, useAppSelector } from "@/store/store";
import useLogout from "@/features/auth/hooks/useLogout";
import { getAllCategories } from "@/features/categories/server/categories.actions";

export default function Navbar() {
  const { logout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { numOfWishlistItems } = useAppSelector((state) => state.wishlist);
  const { userName, email } = useAppSelector(
    (appState: AppState) => appState.auth,
  );
  const { numOfCartItems } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await getAllCategories();
      setCategories(response?.data || []);
    };
    fetchCats();
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-[100]">
      {/* --- TOP BAR (Only visible on Desktop) --- */}
      <div className="hidden lg:block container border-b border-gray-200 mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <ul className="flex space-x-6">
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faTruck}
                className="text-emerald-600 w-4"
              />
              <span className="text-gray-600 text-sm">
                Free Shipping on Orders 500 EGP
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faGift} className="text-emerald-600 w-4" />
              <span className="text-gray-600 text-sm">New Arrivals Daily</span>
            </li>
          </ul>

          <ul className="flex items-center space-x-5 text-sm text-gray-700">
            <li className="flex items-center space-x-2 hover:text-emerald-600 transition-colors duration-200">
              <FontAwesomeIcon icon={faPhone} className="w-3" />
              <a href="tel:+18001234567">+1 (800) 123-4567</a>
            </li>
            <li className="flex items-center space-x-2 pl-5 hover:text-emerald-600 transition-colors duration-200">
              <FontAwesomeIcon icon={faEnvelope} className="w-3" />
              <a href="mailto:support@freshcart.com">support@freshcart.com</a>
            </li>

            <li className="flex items-center space-x-4 border-l border-gray-300 pl-5">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 hover:text-emerald-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faCircleUser} className="w-3" />
                    <span className="pt-0.5">{userName}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="w-3"
                    />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 hover:text-emerald-600 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faUser} className="w-3" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center space-x-2 hover:text-emerald-600 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="w-3" />
                    <span>Sign up</span>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* --- MAIN NAVIGATION BAR --- */}
      <div className="container mx-auto px-4 py-4 lg:py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-grow">
          <Link href="/">
            <Image
              src={logo}
              alt="FreshCart"
              width={140}
              height={35}
              className="lg:w-[160px]"
            />
          </Link>

          {/* Desktop Search Bar */}
          <div className="relative flex-grow hidden lg:block max-w-4xl">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full border border-gray-300 h-11 rounded-3xl py-2 px-4 pr-10 focus:outline-none focus:border-emerald-500 text-sm"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 text-white p-1.5 rounded-full size-9 flex items-center justify-center">
              <FontAwesomeIcon icon={faSearch} className="w-3" />
            </button>
          </div>
        </div>

        {/* Action Icons Wrapper */}
        <div className="flex items-center">
          {/* MOBILE ONLY ICONS - Explicitly hidden on desktop with lg:hidden */}
          <div className="flex items-center space-x-4 mr-2">
            <Link href="/wishlist" className="relative text-gray-500 lg:hidden">
              <FontAwesomeIcon icon={faHeart} className="text-xl" />
              {numOfWishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full size-4 flex items-center justify-center">
                  {numOfWishlistItems}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative text-gray-500 pe-3 lg:hidden">
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
              {numOfCartItems > 0 && (
                <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[10px] rounded-full size-4 flex items-center justify-center">
                  {numOfCartItems}
                </span>
              )}
            </Link>
          </div>
            <div className="lg:hidden -mt-2">
              <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="bg-emerald-600 lg:hidden text-white size-10 rounded-lg flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>
            </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-gray-700 whitespace-nowrap">
            <Link href="/" className="hover:text-emerald-600">
              Home
            </Link>
            <Link href="/shop" className="hover:text-emerald-600">
              Shop
            </Link>

            <div className="relative group py-2">
              <button className="flex items-center space-x-1 font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors">
                <span>Categories</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="w-2.5 transition-transform group-hover:rotate-180"
                />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="bg-white border border-gray-100 rounded-xl shadow-xl py-3 min-w-[200px]">
                  <li>
                    <Link
                      href="/categories"
                      className="block px-6 py-2.5 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories
                    .filter((cat) =>
                      [
                        "All Categories",
                        "Electronics",
                        "Women's Fashion",
                        "Men's Fashion",
                        "Beauty & Health",
                      ].includes(cat.name),
                    )
                    .map((cat) => (
                      <li key={cat._id}>
                        <Link
                          href={`/products?category=${cat._id}`}
                          className="block px-6 py-2.5 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <Link href="/brands" className="hover:text-emerald-600">
              Brands
            </Link>

            <div className="border-gray-200 pr-5 rounded-full hover:bg-gray-200/20 transition-colors duration-200">
              <Link href="/contact" className="flex items-center space-x-1">
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-full w-9 h-9 flex items-center justify-center">
                  <FontAwesomeIcon icon={faHeadset} className="w-4" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] text-gray-400 font-medium">
                    Support
                  </p>
                  <p className="text-xs font-bold text-gray-800">24/7 Help</p>
                </div>
              </Link>
            </div>

            {/* Desktop Profile Icon/Dropdown */}
            <div className="border-l border-gray-200 pl-5 flex justify-center items-center space-x-2">
              <Link
                href="/wishlist"
                className="group flex items-center justify-center size-10 rounded-full transition-colors duration-200 hover:bg-gray-100"
              >
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-xl pt-1 text-gray-500 group-hover:text-emerald-600 transition-colors duration-200"
                  />
                  {numOfWishlistItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center border-2 border-white">
                      {numOfWishlistItems}
                    </span>
                  )}
                </div>
              </Link>

              <Link
                href="/cart"
                className="group pt-2 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 hover:bg-gray-100"
              >
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-xl text-gray-500 group-hover:text-emerald-600 transition-colors duration-200"
                  />
                  <span className="absolute -top-2 -right-2 size-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {numOfCartItems}
                  </span>
                </div>
              </Link>

              {isAuthenticated ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`size-10 flex justify-center items-center rounded-full transition-all duration-200 hover:bg-gray-100 ${
                      isMenuOpen ? "ring-2 ring-emerald-500/20 bg-gray-100" : ""
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className={`text-xl transition-colors duration-200 ${
                        isMenuOpen ? "text-emerald-600" : "text-gray-500"
                      }`}
                    />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] overflow-hidden">
                      <div className="p-4 flex items-center space-x-3 bg-emerald-50/30 border-b border-gray-100">
                        <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <FontAwesomeIcon
                            icon={faCircleUser}
                            className="text-xl"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-semibold">
                            {userName}
                          </span>
                          <p className="text-xs text-gray-500 truncate">
                            {email || "No email provided"}
                          </p>
                        </div>
                      </div>
                      <ul className="py-2 text-sm text-gray-600">
                        <li>
                          <Link
                            href="/profile"
                            className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faUser}
                              className="w-4 mr-4 text-gray-400"
                            />
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/orders"
                            className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faClipboardList}
                              className="w-4 mr-4 text-gray-400"
                            />
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/wishlist"
                            className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faHeart}
                              className="w-4 mr-4 text-gray-400"
                            />
                            My Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/addresses"
                            className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              className="w-4 mr-4 text-gray-400"
                            />
                            Addresses
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/settings"
                            className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faGear}
                              className="w-4 mr-4 text-gray-400"
                            />
                            Settings
                          </Link>
                        </li>
                        <li className="border-t border-gray-100 mt-2">
                          <button
                            onClick={() => {
                              logout();
                              setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center px-5 py-4 text-red-500 hover:bg-red-50 transition-colors font-medium"
                          >
                            <FontAwesomeIcon
                              icon={faArrowRightFromBracket}
                              className="w-4 mr-4"
                            />
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-emerald-600 text-white px-5 py-2 rounded-2xl ms-2 font-medium hover:bg-emerald-700 transition-colors text-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* --- MOBILE SIDEBAR --- */}
      <div
        className={`fixed inset-0 bg-black/40 z-[110] transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[120] shadow-2xl transform transition-transform duration-200 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 flex items-center justify-between border-b">
            <Image src={logo} alt="FreshCart" width={130} height={32} />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="size-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>

          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 pr-10 text-sm outline-none focus:border-emerald-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-1 rounded-md size-7 flex items-center justify-center">
                <FontAwesomeIcon icon={faSearch} className="text-xs" />
              </button>
            </div>
          </div>

          <nav className="flex-grow px-5 py-2 overflow-y-auto">
            <ul className="space-y-1 text-gray-700 font-semibold text-lg">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full p-3 rounded-lg transition-colors duration-300 hover:bg-primary-600/20 hover:text-primary-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full p-3 rounded-lg transition-colors duration-300 hover:bg-primary-600/20 hover:text-primary-600"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full p-3 rounded-lg transition-colors duration-300 hover:bg-primary-600/20 hover:text-primary-600"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full p-3 rounded-lg transition-colors duration-300 hover:bg-primary-600/20 hover:text-primary-600"
                >
                  Brands
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
              <Link
                href="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center w-full p-3 rounded-xl transition-colors duration-300 hover:bg-gray-50 group"
              >
                <div className="size-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <span className="font-medium text-gray-700">Wishlist</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center w-full p-3 rounded-xl transition-colors duration-300 hover:bg-gray-50 group"
              >
                <div className="size-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>
                <span className="font-medium text-gray-700">Cart</span>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 p-4 hover:bg-emerald-100/40 transtion-colors duration-300 rounded-2xl">
                    <div className="size-11 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div>
                      <p className="font-bold ">{userName}</p>
                      <p className="text-xs text-gray-500 mt-1.5">{email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full p-4  rounded-2xl text-red-600 font-bold transition-colors hover:bg-red-50"
                  >
                    <div className="size-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </div>
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200"
                >
                  Sign In
                </Link>
              )}

              <div className="p-4 hover:bg-gray-100 transition-colors duration-300 rounded-2xl ">
                <div className="flex items-center space-x-4">
                  <div className="size-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                    <FontAwesomeIcon icon={faHeadset} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                      Need Help?
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-bold text-emerald-600 hover:underline"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}