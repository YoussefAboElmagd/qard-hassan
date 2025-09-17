"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/main-logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";

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
    ref: "/ar/contact-us",
    title: "اتصل بنا",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-white lg:bg-transparent p-3  border-b border-gray-100/40 ">
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
        <ul className="hidden lg:flex items-center justify-center gap-6 xl:gap-10">
          {links.map((ele, ind) => (
            <li key={ind}>
              <Link
                href={ele.ref}
                className={
                  `hover:text-secondary transition-colors ${
                    ele.ref == pathname
                      ? "text-secondary border-b-4 border-secondary pb-1 rounded-b-[3px]"
                      : ""
                  } `

                
                }
              >
                {ele.title}
              </Link>
            </li>
          ))}

          {/* <li>
            <Link
              href="/ar/about-us"
              className={
                pathname.includes("/about-us")
                  ? "text-secondary border-b-4 border-secondary pb-1 rounded-b-[3px]"
                  : "hover:text-secondary transition-colors"
              }
            >
              من نحن
            </Link>
          </li>
          <li>
            <Link
              href="/ar/contact-us"
              className={
                pathname.includes("/contact-us")
                  ? "text-secondary border-b-4 border-secondary pb-1 rounded-b-[3px]"
                  : "hover:text-secondary transition-colors"
              }
            >
              اتصل بنا
            </Link>
          </li> */}
          <li className="ms-10 flex items-center gap-2">
            <span className="text-sm">AR</span>
            <Globe className="w-6 h-6" />
          </li>
        </ul>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <Link
            href="/ar/register"
            className="text-white border-2 border-white px-3 py-1.5 lg:px-6 lg:py-2 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 text-sm lg:text-base"
          >
            ابدأ الان
          </Link>
          <Link
            href="/ar/login"
            className="text-white border-2 border-white px-3 py-1.5 lg:px-6 lg:py-2 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 text-sm lg:text-base"
          >
            تسجيل الدخول
          </Link>
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
        className={`fixed top-0 right-0 h-full w-80 bg-white transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-6 mb-8">
            <li>
              <Link
                href="/ar"
                className={
                  pathname.includes("/ar")
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
                  pathname.includes("/ar/about-us")
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
                  pathname.includes("/ar/contact-us")
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

          {/* Mobile CTA Buttons */}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
