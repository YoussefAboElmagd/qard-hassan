"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import profileImage from '@/assets/images/userProfileImg.jpg';
import { HiMiniPlusCircle } from 'react-icons/hi2';
import { MdLock, MdNotifications } from 'react-icons/md';
import { FaCommentDollar } from 'react-icons/fa';
import { FaUserLarge } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';
import { IoChevronBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import mastercardLogo from '@/assets/images/Mastercard-logo.png';
import { useUser } from '@/contexts/UserContext';
import { changeProfilePhoto } from '@/actions/profile.actions';
import chatIcon from '@/assets/images/chaticonF.png';
import { Icon } from '@iconify/react';
import { handleApiError, showSuccessToast, showErrorToast } from '@/lib/toast-utils';
import { useTranslations, useLocale } from 'next-intl';

const Sidebar = () => {
    const router = useRouter();
    const [activePage, setActivePage] = useState('');
    const { user, refreshUser } = useUser();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('userProfile');
    const locale = useLocale();

    // Set initial active page based on current locale
    useEffect(() => {
        setActivePage(`/${locale}/user-profile/personal-info`);
    }, [locale]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    const handleSidebarPage = (page: string) => {
        setActivePage(page);
        router.push(page);
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showErrorToast(t('photoValidation.invalidType'));
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showErrorToast(t('photoValidation.sizeLimit'));
            return;
        }

        setIsUploading(true);
        setShowMenu(false);
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await changeProfilePhoto(formData);

            if (response.success) {
                showSuccessToast(response.message || t('photoSuccess'));
                await refreshUser();
            } else {
                handleApiError({
                    success: response.success,
                    message: response.message,
                    status: response.status
                });
            }
        } catch (error) {
            console.error("Error uploading profile photo:", error);
            showErrorToast(t('photoError'));
        } finally {
            setIsUploading(false);
            // Reset the input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
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
                                src={user?.image_url || profileImage}
                                alt="Profile"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                    </div>
                    {/* Floating add button with menu */}
                    <div ref={menuRef} className={`absolute top-[50%] transform translate-y-[-50%] ${locale === 'ar' ? '-right-3 sm:-right-5' : '-left-3 sm:-left-5'}`}>
                        <button 
                            onClick={toggleMenu}
                            disabled={isUploading}
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white hover:bg-[#d9a645] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUploading ? (
                                <Icon icon="eos-icons:loading" className="w-4 h-4 sm:w-6 sm:h-6" />
                            ) : (
                                <HiMiniPlusCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                            )}
                        </button>

                        {/* Small Menu */}
                        {showMenu && !isUploading && (
                            <div className={`absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-1 min-w-[160px] z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${locale === 'ar' ? 'left-1/2 transform -translate-x-1/2' : 'right-1/2 transform translate-x-1/2'}`}>
                                <button
                                    onClick={handleUploadClick}
                                    className={`w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 ${locale === 'ar' ? 'text-right justify-end' : 'text-left justify-start'}`}
                                >
                                    <span>{t('updatePhoto')}</span>
                                    <Icon icon="mdi:image-edit" className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary text-center">{user?.name || ""}</h2>
            </div>

            {/* Menu Items */}
            <div className="space-y-3 sm:space-y-4 flex-grow">
                <div onClick={() => handleSidebarPage(`/${locale}/user-profile/personal-info`)}
                    className={`w-full flex items-center justify-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[20px] hover:bg-gray-200 transition-all duration-300 cursor-pointer ${activePage === `/${locale}/user-profile/personal-info` ? 'bg-gray-200/70' : ''}`}>
                    <div className={`${activePage === `/${locale}/user-profile/personal-info` ? "w-8 h-8 sm:w-10 sm:h-10 bg-white/80" : ""} rounded-full flex items-center justify-center shadow-sm transition-all duration-300`}>
                        <FaUserLarge className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                    <span className={`text-gray-600 text-base sm:text-lg font-medium transition-all duration-300 ${activePage === `/${locale}/user-profile/personal-info` ? 'font-bold' : ''}`}>{t('personalInfo')}</span>
                </div>

                <div onClick={() => handleSidebarPage(`/${locale}/user-profile/loans`)}
                    className={`w-full flex items-center justify-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[20px] hover:bg-gray-200 transition-all duration-300 cursor-pointer ${activePage === `/${locale}/user-profile/loans` ? 'bg-gray-200/70' : ''}`}>
                    <div className={`${activePage === `/${locale}/user-profile/loans` ? "w-8 h-8 sm:w-10 sm:h-10 bg-white/80" : ""} rounded-full flex items-center justify-center shadow-sm transition-all duration-300`}>
                        <FaCommentDollar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                    <span className={`text-gray-600 text-base sm:text-lg font-medium transition-all duration-300 ${activePage === `/${locale}/user-profile/loans` ? 'font-bold' : ''}`}>{t('loans')}</span>
                </div>

                <div onClick={() => handleSidebarPage(`/${locale}/user-profile/change-password`)}
                    className={`w-full flex items-center justify-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[20px] hover:bg-gray-200 transition-all duration-300 cursor-pointer ${activePage === `/${locale}/user-profile/change-password` ? 'bg-gray-200/70' : ''}`}>
                    <div className={`${activePage === `/${locale}/user-profile/change-password` ? "w-8 h-8 sm:w-10 sm:h-10 bg-white/80" : ""} rounded-full flex items-center justify-center shadow-sm transition-all duration-300`}>
                        <MdLock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                    <span className={`text-gray-700 text-base sm:text-lg transition-all duration-300 font-medium ${activePage === `/${locale}/user-profile/change-password` ? 'font-bold' : ''}`}>{t('changePassword')}</span>
                </div>

                <div onClick={() => handleSidebarPage(`/${locale}/user-profile/notifications`)}
                    className={`w-full flex items-center justify-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[20px] hover:bg-gray-200 transition-all duration-300 cursor-pointer ${activePage === `/${locale}/user-profile/notifications` ? 'bg-gray-200/70' : ''}`}>
                    <div className={`${activePage === `/${locale}/user-profile/notifications` ? "w-8 h-8 sm:w-10 sm:h-10 bg-white/80" : ""} rounded-full flex items-center justify-center shadow-sm transition-all duration-300`}>
                        <MdNotifications className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                    <span className={`text-gray-700 text-base sm:text-lg transition-all duration-300 font-medium ${activePage === `/${locale}/user-profile/notifications` ? 'font-bold' : ''}`}>{t('notifications')}</span>
                </div>

                {/* Saved Cards Section */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-gray-500 text-xs sm:text-sm font-medium">{t('savedCards')}</h3>
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

                    {/* Help / Chat Section */}
                    <div className="mt-4 sm:mt-16">
                        <div className="bg-white rounded-2xl p-4 sm:p-5  shadow-sm border-2 border-primary ">
                            <div className="relative flex flex-col items-center text-center gap-4 pt-24">
                                <Image src={chatIcon} alt='chat' width={100} height={100} className='w-40 h-40 object-cover absolute -top-[40%] left-1/2 transform -translate-x-1/2' />
                                <p className="text-primary font-bold text-base sm:text-lg">{t('needHelp')}</p>
                                <button
                                    onClick={() => router.push(`/${locale}/user-profile/chat`)}
                                    className="w-full sm:w-auto px-14 py-2 rounded-xl cursor-pointer bg-[#3F6586] hover:bg-[#33526C] text-white font-bold transition-colors"
                                >
                                    {t('support')}
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
