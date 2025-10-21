"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import profileImage from '@/assets/images/userProfileImg.jpg';
import { HiMiniPlusCircle } from 'react-icons/hi2';
import { MdLock } from 'react-icons/md';
import { FaCommentDollar } from 'react-icons/fa';
import { FaUserLarge } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';
import { IoChevronBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import mastercardLogo from '@/assets/images/Mastercard-logo.png';
import { getProfileData } from '@/actions/profile.actions';

const Sidebar = () => {
    const router = useRouter();
    const [activePage, setActivePage] = useState('/ar/user-profile/personal-info');
    const [userName, setUserName] = useState<string | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await getProfileData();
                if (data.success && data.profile) {
                    setUserName(data.profile.name);
                    setUserImage(data.profile.image_url);
                }
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleSidebarPage = (page: string) => {
        setActivePage(page);
        router.push(page);
    }

    return (
        <div className="w-full xl:w-80 bg-gray-50 rounded-3xl shadow-lg px-4 sm:px-6 py-6 sm:py-8 h-full flex flex-col">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8 sm:mb-14">
                <div className="relative mb-4">
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40">
                        {/* Gold outer ring with gap in top-right */}
                        <div className="absolute inset-0 w-full h-full rounded-full"
                            style={{
                                background: `conic-gradient(from 90deg, #d9a645 0deg, #d9a645 270deg, #eee 270deg, #eee 360deg)`,
                                borderRadius: '50%',
                                padding: '4px'
                            }}>
                            <div className="w-full h-full rounded-full bg-gray-50"></div>
                        </div>
                        {/* White inner background with proper spacing */}
                        <div className="absolute inset-2 rounded-full bg-white" style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' }} />
                        {/* Profile image container */}
                        <div className="absolute inset-3 rounded-full overflow-hidden" style={{ width: 'calc(100% - 24px)', height: 'calc(100% - 24px)' }}>
                            <Image
                                src={userImage || profileImage}
                                alt="Profile"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                    </div>
                    {/* Floating add button */}
                    <button className="absolute top-[50%] -right-3 sm:-right-5 transform translate-y-[-50%] w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white hover:bg-[#d9a645] transition-colors">
                        <HiMiniPlusCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary text-center">{userName || ""}</h2>
            </div>

            {/* Menu Items */}
            <div className="space-y-3 sm:space-y-4 flex-grow">
                <div onClick={() => handleSidebarPage('/ar/user-profile/personal-info')}
                    className={`w-full flex items-center justify-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[20px] hover:bg-gray-200 transition-all duration-300 cursor-pointer ${activePage === '/ar/user-profile/personal-info' ? 'bg-gray-200/70' : ''}`}>
                    <div className={`${activePage === '/ar/user-profile/personal-info' ? "w-8 h-8 sm:w-10 sm:h-10 bg-white/80" : ""} rounded-full flex items-center justify-center shadow-sm transition-all duration-300`}>
                        <FaUserLarge className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                    <span className={`text-gray-600 text-base sm:text-lg font-medium transition-all duration-300 ${activePage === '/ar/user-profile/personal-info' ? 'font-bold' : ''}`}>المعلومات الشخصية</span>
                </div>

                <div onClick={() => handleSidebarPage('/ar/user-profile/loans')}
                    className={`w-full flex items-center justify-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[20px] hover:bg-gray-200 transition-all duration-300 cursor-pointer ${activePage === '/ar/user-profile/loans' ? 'bg-gray-200/70' : ''}`}>
                    <div className={`${activePage === '/ar/user-profile/loans' ? "w-8 h-8 sm:w-10 sm:h-10 bg-white/80" : ""} rounded-full flex items-center justify-center shadow-sm transition-all duration-300`}>
                        <FaCommentDollar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                    <span className={`text-gray-600 text-base sm:text-lg font-medium transition-all duration-300 ${activePage === '/ar/user-profile/loans' ? 'font-bold' : ''}`}>القروض</span>
                </div>

                <div onClick={() => handleSidebarPage('/ar/user-profile/change-password')}
                    className={`w-full flex items-center justify-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[20px] hover:bg-gray-200 transition-all duration-300 cursor-pointer ${activePage === '/ar/user-profile/change-password' ? 'bg-gray-200/70' : ''}`}>
                    <div className={`${activePage === '/ar/user-profile/change-password' ? "w-8 h-8 sm:w-10 sm:h-10 bg-white/80" : ""} rounded-full flex items-center justify-center shadow-sm transition-all duration-300`}>
                        <MdLock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                    <span className={`text-gray-700 text-base sm:text-lg transition-all duration-300 font-medium ${activePage === '/ar/user-profile/change-password' ? 'font-bold' : ''}`}>تغيير كلمة المرور</span>
                </div>

                {/* Saved Cards Section */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-gray-500 text-xs sm:text-sm font-medium">البطاقات المحفوظة</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                            <BsThreeDots className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0">
                                <div className='bg-gradient-to-br from-[#FFA346] to-[#F2E32E] rounded-sm w-20 h-12 sm:w-24 sm:h-14 text-white text-sm font-bold flex items-start justify-between p-1.5 sm:p-2'>
                                    <Image src={mastercardLogo} alt='mastercard' width={32} height={32} className='self-end ' />
                                    <span className='text-base sm:text-lg'>6753</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-start gap-2 sm:gap-3 ">
                                <div className="min-w-0 flex-1">
                                    <p className="text-primary text-sm font-bold truncate">Master Card</p>
                                    <p className="text-gray-600 text-xs sm:text-sm">****6753</p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                                    <IoChevronBack className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;