"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import logo from "@/assets/images/main-logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Menu, X, LogOut } from "lucide-react";
import { FaUserCircle, FaUserCog } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";

const links = [
  {
    ref: "/ar",
    title: "الصفحة الرئيسية",
  },
  {
    ref: "/ar/about-us",
    title: "من نحن",
  },
  {
    ref: "",
    title: "طلب قرض",
  },
  {
    ref: "/ar/contact-us",
    title: "اتصل بنا",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setIsUserDropdownOpen(false);
    router.push("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-white lg:bg-[#406f9399] p-3 px-8  border-b border-gray-100/40 ">
      <div className="flex justify-between items-center text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 relative z-50">
          <Image
            src={logo.src}
            alt="logo"
            width={200}
            height={100}
            className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex  items-center justify-center gap-6 xl:gap-10">
          {links.map((ele, ind) => (
            <li key={ind}>
              <Link
                href={ele.ref}
                className={
                  `hover:text-secondary transition-colors ${ele.ref === pathname
                    ? "text-secondary border-b-4 border-secondary pb-1 rounded-b-[3px]"
                    : ""
                  } `
                }
              >
                {ele.title}
              </Link>
            </li>
          ))}<li className="ms-5 flex items-center gap-2">
            <span className="text-sm">EN</span>
            <Globe className="w-6 h-6" />
          </li>
        </ul>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {pathname.includes("/ar/user-profile") == false ? (
            <>
              <Link href="/ar/user-profile" className="text-white hover:text-secondary transition-colors">
                <FaUserCog className="w-6 h-6" />
              </Link>
              <Link
                href="/ar/login"
                className="text-white border-2 border-white font-bold bg-transparent px-3 py-1.5 lg:px-6 lg:py-2 rounded-full hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 text-sm lg:text-base"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/ar/register"
                className="text-white border-2 border-secondary font-bold bg-secondary px-3 py-1.5 lg:px-6 lg:py-2 rounded-full hover:bg-transparent hover:border-white hover:text-white transition-all duration-300 text-sm lg:text-base"
              >
                ابدأ الان
              </Link>
            </>
          ) : (
            ""
          )}

          {pathname.includes("/ar/user-profile") && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleUserDropdown}
                className="flex cursor-pointer items-center gap-2 hover:text-secondary transition-colors"
              >
                <PiUserCircleFill className="w-8 h-8" />
                <span>محمد الشافعي</span>
              </button>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute top-full end-0 w-64 mt-3 bg-white rounded-xl shadow-2xl border border-gray-100/50 py-3 pb-0 z-50 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-200">
                  {/* User Info Section */}
                  <div className="px-5 py-3 border-b border-gray-100/60 bg-gradient-to-r from-gray-50/50 to-gray-100/30">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="w-8 h-8 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">محمد الشافعي</p>
                        <p className="text-xs text-gray-500 truncate">user@example.com</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/ar/user-profile"
                      className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-200 group"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
                        <FaUserCog className="w-4 h-4 text-gray-600 group-hover:text-primary" />
                      </div>
                      <span className="font-medium">الملف الشخصي</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer gap-3 w-full px-5 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-200 group"
                    >
                      <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-red-100 transition-colors duration-200">
                        <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                      </div>
                      <span className="font-medium">تسجيل الخروج</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-secondary hover:text-secondary transition-colors relative z-50"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white transform transition-transform duration-300 ease-in-out z-40 md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-6 mb-8">
            <li>
              <Link
                href="/ar"
                className={
                  pathname === "/ar"
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "hover:text-secondary transition-colors text-black"
                }
                onClick={toggleMobileMenu}
              >
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link
                href="/ar/about-us"
                className={
                  pathname === "/ar/about-us"
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "hover:text-secondary transition-colors text-black"
                }
                onClick={toggleMobileMenu}
              >
                من نحن
              </Link>
            </li>
            <li>
              <Link
                href="/ar/contact-us"
                className={
                  pathname === "/ar/contact-us"
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "hover:text-secondary transition-colors text-black"
                }
                onClick={toggleMobileMenu}
              >
                اتصل بنا
              </Link>
            </li>
            <li className="flex items-center gap-2 text-black">
              <span className="text-sm">AR</span>
              <Globe className="w-5 h-5" />
            </li>
          </ul>

          {/* Mobile CTA Buttons / User Profile Section */}
          {pathname.includes("/ar/user-profile") ? (
            <div className="flex flex-col gap-4">
              {/* User Profile Info */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <PiUserCircleFill className="w-10 h-10 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">محمد الشافعي</p>
                  <p className="text-xs text-gray-500 truncate">user@example.com</p>
                </div>
              </div>
              
              {/* Profile Actions */}
              <Link
                href="/ar/user-profile"
                className="flex items-center gap-3 text-black border-2 border-gray-300 hover:border-secondary px-4 py-3 rounded-full hover:bg-secondary hover:text-white transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                <FaUserCog className="w-5 h-5" />
                <span>الملف الشخصي</span>
              </Link>
              
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="flex items-center gap-3 text-red-600 border-2 border-red-300 hover:border-red-500 px-4 py-3 rounded-full hover:bg-red-50 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                href="/ar/login"
                className="text-black border-2 border-black hover:border-secondary px-6 py-3 rounded-full hover:bg-secondary hover:text-white transition-all duration-300 text-center"
                onClick={toggleMobileMenu}
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/ar/register"
                className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-full transition-all duration-300 text-center font-semibold"
                onClick={toggleMobileMenu}
              >
                ابدأ الان
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
