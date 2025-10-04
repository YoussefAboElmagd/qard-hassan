import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import googlePlay from '@/assets/images/LandingImgs/Groupplay.png'
import appleStore from '@/assets/images/LandingImgs/Group.png'
import logo from '@/assets/images/main-logo.png'
import mdarjLogo from '@/assets/images/mdarjFooter.png'
import Image from 'next/image';

const Footer = ({ contactUsFooter }: { contactUsFooter: boolean }) => {
    return (
        <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Main content container */}
            <div className="max-w-7xl mx-auto">
                {/* Top section with newsletter and logo */}
                {contactUsFooter ? "" : <>

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between mb-12 lg:mb-16">
                        {/* Right side - Logo and tagline */}
                        <div className="text-center lg:text-right">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight text-secondary">
                                <span className='text-primary'>تابع آخر</span>  الأخبار
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                                انضم إلى نشرتنا الإخبارية للبقاء على اطلاع على الميزات والإصدارات.                        </p>
                        </div>
                        {/* Left side - Newsletter signup */}
                        <div className="flex-1 max-w-lg w-full">
                            <h2 className="text-gray-600 text-base sm:text-lg mb-6 font-bold text-center lg:text-right">دائماً على تواصل</h2>

                            <div className="flex flex-col sm:flex-row gap-3 mb-4">

                                <input
                                    type="email"
                                    placeholder="ادخل البريد الالكتروني"
                                    className="flex-1 w-full px-5 py-3 border border-primary placeholder:text-primary rounded-full text-sm text-right focus:outline-none focus:border-2"
                                />
                                <button className="bg-secondary hover:bg-secondary/80 text-white px-8 py-3 rounded-full font-bold transition-colors w-full sm:w-auto">
                                    اشترك
                                </button>
                            </div>

                            <p className="text-gray-500 text-sm leading-relaxed">
                                من خلال الاشتراك فإنك توافق على سياسة الخصوصية لخدمتنا
                            </p>
                        </div>


                    </div>

                    <div className="border-t border-gray-300 mb-12"></div>
                </>}

                <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 justify-between items-center py-8 sm:py-10'>
                    <Image src={logo.src} alt="logo" width={200} height={150} className="w-40 sm:w-48 md:w-56 h-auto" />
                    <div className="flex flex-wrap justify-center sm:justify-start text-gray-700 gap-x-3 gap-y-2 text-sm sm:text-base">
                        <a href="#" className="hover:text-primary transition-colors sm:border-l-2 border-gray-300 pl-3 whitespace-nowrap">شروط الاستخدام</a>
                        <a href="#" className="hover:text-primary transition-colors sm:border-l-2 border-gray-300 pl-3 whitespace-nowrap">المساعدة والدعم</a>
                        <a href="#" className="hover:text-primary transition-colors sm:border-l-2 border-gray-300 pl-3 whitespace-nowrap">من نحن</a>
                        <a href="#" className="hover:text-primary transition-colors whitespace-nowrap">تمويل</a>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-center sm:justify-end gap-3 text-gray-700 ">
                            <span className="text-lg">0987654321</span>
                            <Phone className="w-5 h-5 text-primary" />

                        </div>
                        <div className="flex items-center justify-center sm:justify-end gap-3 text-gray-700">
                            <span className="text-base">info@gmail.com</span>
                            <Mail className="w-5 h-5 text-primary" />

                        </div>
                        <div className="flex items-center justify-center sm:justify-end gap-3 text-gray-700">
                            <span className="text-base">Saudi Arabia</span>
                            <MapPin className="w-5 h-5 text-primary" />

                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 mb-12"></div>

                {/* Right side - Logo and app downloads */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">

                    {/* Social media icons */}
                    <div className="flex gap-3 justify-center sm:justify-start ">
                        <div className="w-10 h-10 bg-primary hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                            <Instagram className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-10 h-10 bg-primary hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                            <Facebook className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-10 h-10 bg-primary hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                    </div>
                    {/* App download buttons */}
                    <div className="flex gap-4 mb-6 flex-wrap justify-center sm:justify-end ">

                        <div className="cursor-pointer hover:opacity-80 transition-opacity">
                            <Image
                                src={googlePlay.src}
                                alt="Get it on Google Play"
                                width={140}
                                height={48}
                                className="w-32 sm:w-36 h-auto"
                            />
                        </div>
                        <div className="cursor-pointer hover:opacity-80 transition-opacity">
                            <Image
                                src={appleStore.src}
                                alt="Download on App Store"
                                width={140}
                                height={48}
                                className="w-32 sm:w-36 h-auto"
                            />
                        </div>
                    </div>


                </div>

                {/* Powered by Mdarj and Copyright section */}
                <div className="bg-gray-100 py-4 px-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Copyright text */}
                        <div className="text-center sm:text-right">
                            <p className="text-gray-600 text-sm">
                                حقوق الطبع والنشر © 2025  وقف الصدقة الجارية للإقراض الحسن. جميع الحقوق محفوظة
                            </p>
                        </div>
                        
                        {/* Powered by Mdarj */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="text-sm font-bold italic">Powered by Mdarj</span>
                            <div className="flex items-center gap-2 bg-primary rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <Image
                                    src={mdarjLogo.src}
                                    alt="Mdarj Logo"
                                    width={50}
                                    height={50}
                                    
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;