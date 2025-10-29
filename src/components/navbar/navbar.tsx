"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import logo from "@/assets/images/main-logo.png";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Globe, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { FaUserCircle, FaUserCog } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserContext";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  {
    ref: "/",
    title: "الصفحة الرئيسية",
  },
  {
    ref: "/about-us",
    title: "من نحن",
  },
  {
    ref: "/user-profile/loans/loan-request",
    title: "طلب قرض",
  },
  {
    ref: "/governance",
    title: "الحوكمة",
  },
  {
    ref: "/contact-us",
    title: "اتصل بنا",
  },
];

const governanceMenuItems = [
  { title: "السجل التجاري", isActive: false },
  { title: "اللجان الدائمة والمؤقتة", isActive: false },
  { title: "إقرارات الإفصاح", isActive: false },
  { title: "قرارات التعيين", isActive: false },
  { title: "قرارات التملك والاستثمار", isActive: false },
  { title: "أدلة الحوكمة", isActive: false },
  { title: "اللوائح والسياسات", isActive: true, href: "/governance" },
  { title: "اجتماعات الجمعية العمومية", isActive: false },
  { title: "الموازنة التقديرية", isActive: false },
  { title: "التوجه الاستراتيجي", isActive: false },
  { title: "الخطة التشغيلية", isActive: false },
  { title: "التقارير السنوية", isActive: false },
  { title: "القوائم المالية", isActive: false },
  { title: "ورش مقامة بالشراكة المجتمعية 2024", isActive: false },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isGovernanceDropdownOpen, setIsGovernanceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const governanceDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const { user } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      setIsUserDropdownOpen(false);
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (governanceDropdownRef.current && !governanceDropdownRef.current.contains(event.target as Node)) {
        setIsGovernanceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-white lg:bg-[#406f9399] p-3 px-8  border-b border-gray-100/40">
      <div className="flex lg:grid lg:grid-cols-[20%_60%_20%] justify-between items-center text-white">
        {/* Logo  */}
        <Link href="/" className=" flex items-center gap-4 relative z-50">
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
            <li key={ind} className="relative">
              {ele.ref === "/governance" ? (
                <div ref={governanceDropdownRef}>
                  <button
                    onClick={() => setIsGovernanceDropdownOpen(!isGovernanceDropdownOpen)}
                    className={
                      `inline-flex items-center gap-1 pb-1 transition-colors cursor-pointer ${
                        pathname === ele.ref
                          ? "text-secondary border-b-4 border-secondary rounded-b-[3px]"
                          : "border-b-4 border-transparent"
                      } `
                    }
                  >
                    <span>{ele.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isGovernanceDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isGovernanceDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full start-0 w-80 mt-3 bg-white rounded-xl shadow-xl border border-primary/20 py-1.5 z-50 max-h-[70vh] overflow-y-auto divide-y divide-gray-100"
                      >
                        {governanceMenuItems.map((item, idx) => (
                          <div key={idx}>
                            {item.isActive && item.href ? (
                              <Link
                                href={item.href}
                                onClick={() => setIsGovernanceDropdownOpen(false)}
                                className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary/10 hover:text-primary focus:bg-secondary/10 focus:text-primary transition-colors outline-none focus:outline-none"
                              >
                                <span className="me-2 h-2 w-2 rounded-full bg-secondary/70 group-hover:bg-secondary" aria-hidden="true" />
                                <span className="flex-1">{item.title}</span>
                              </Link>
                            ) : (
                              <div className="px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed">
                                {item.title}
                              </div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={ele.ref}
                  className={
                    `inline-block hover:text-secondary transition-colors pb-1 ${pathname === ele.ref || (ele.ref === "/" && (pathname === "/ar" || pathname === "/en"))
                      ? "text-secondary border-b-4 border-secondary rounded-b-[3px]"
                      : "border-b-4 border-transparent"
                    } `
                  }
                >
                  {ele.title}
                </Link>
              )}
            </li>
          ))}
          <li className="ms-5 flex items-center gap-2">
            <span className="text-sm">EN</span>
            <Globe className="w-6 h-6" />
          </li>
        </ul>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex justify-end items-center gap-2 lg:gap-4 me-4">
          {isLoading ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:0.4s]" />
            </div>
          ) : !isAuthenticated ? (
            <>
              <Link
                href="/auth/login"
                className="text-white border-2 border-white font-bold bg-transparent px-3 py-1.5 lg:px-6 lg:py-2 rounded-full hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 text-sm lg:text-base"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/auth/register"
                className="text-white border-2 border-secondary font-bold bg-secondary px-3 py-1.5 lg:px-6 lg:py-2 rounded-full hover:bg-transparent hover:border-white hover:text-white transition-all duration-300 text-sm lg:text-base"
              >
                ابدأ الان
              </Link>
            </>
          ) : null}

          {isAuthenticated && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleUserDropdown}
                className="flex cursor-pointer items-center gap-2 hover:text-secondary transition-colors"
              >
                <PiUserCircleFill className="w-8 h-8" />
                <span>{user?.name || ""}</span>
              </button>
              {/* Dropdown Menu */} 
              {isUserDropdownOpen && (
                <div className="absolute top-full end-0 w-64 mt-3 bg-white rounded-xl shadow-2xl border border-gray-100/50 py-3 pb-0 z-50 backdrop-blur-sm">
                  {/* User Info Section */}
                  <div className="px-5 py-3 border-b border-gray-100/60 bg-gradient-to-r from-gray-50/50 to-gray-100/30">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="w-8 h-8 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || ""}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/user-profile"
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
                href="/"
                className={
                  pathname === "/" || pathname === "/ar" || pathname === "/en"
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
                href="/user-profile/loans/loan-request"
                className={
                  pathname.includes("/user-profile/loans/loan-request")
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "hover:text-secondary transition-colors text-black"
                }
                onClick={toggleMobileMenu}
              >
                طلب قرض
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className={
                  pathname.endsWith("/about-us")
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "hover:text-secondary transition-colors text-black"
                }
                onClick={toggleMobileMenu}
              >
                من نحن
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => setIsGovernanceDropdownOpen(!isGovernanceDropdownOpen)}
                className={`flex items-center gap-1 transition-colors ${
                  pathname.endsWith("/governance")
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "text-black hover:text-primary"
                }`}
              >
                <span>الحوكمة</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isGovernanceDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isGovernanceDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mt-3 bg-white rounded-xl shadow-lg overflow-hidden border border-primary/20 divide-y divide-gray-100"
                  >
                    <div className="py-1">
                      {governanceMenuItems.map((item, idx) => (
                        <div key={idx}>
                          {item.isActive && item.href ? (
                            <Link
                              href={item.href}
                              onClick={() => {
                                setIsGovernanceDropdownOpen(false);
                                toggleMobileMenu();
                              }}
                              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary/10 hover:text-primary focus:bg-secondary/10 focus:text-primary transition-colors"
                            >
                              <span className="flex-1">{item.title}</span>
                              <span className="ms-2 h-2 w-2 rounded-full bg-secondary/70" aria-hidden="true" />
                            </Link>
                          ) : (
                            <div className="block px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed">
                              {item.title}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={
                  pathname.endsWith("/contact-us")
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
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <div className="h-16 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ) : isAuthenticated ? (
            <div className="flex flex-col gap-4">
              {/* User Profile Info */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <PiUserCircleFill className="w-10 h-10 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || ""}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                </div>
              </div>

              {/* Profile Actions */}
              <Link
                href="/user-profile"
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
                href="/auth/login"
                className="text-black border-2 border-black hover:border-secondary px-6 py-3 rounded-full hover:bg-secondary hover:text-white transition-all duration-300 text-center"
                onClick={toggleMobileMenu}
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/auth/register"
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