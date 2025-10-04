"use client"
import { getProfileData } from '@/actions/profile.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

interface userInfoInterface {
    fullName: string,
    email: string,
    phone: string,
    nationalId: string
}

export default function PersonalInfoForm() {
    const [userInfo, setUserInfo] = useState<userInfoInterface>({
        fullName: '',
        email: '',
        phone: '',
        nationalId: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    const getUserProfileData = async () => {
        try {
            const data = await getProfileData();
            console.log(data);
            setUserInfo({
                fullName: data.profile.name,
                email: data.profile.email,
                phone: data.profile.phone,
                nationalId: data.profile.national_id
            });
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUserProfileData();
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="space-y-6 w-full">
                        {/* Skeleton for Full Name */}
                        <div className="space-y-2">
                            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                        </div>

                        {/* Skeleton for Email */}
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                        </div>

                        {/* Skeleton for Phone */}
                        <div className="space-y-2">
                            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                        </div>

                        {/* Skeleton for National ID */}
                        <div className="space-y-2">
                            <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
                            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                        </div>

                        {/* Skeleton for Button */}
                        <div className="pt-4 flex justify-end">
                            <div className="h-12 w-32 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            ) : (
                /* Form */
                <div className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-start text-gray-700 font-bold">
                            الاسم رباعي
                        </Label>
                        <Input
                            id="fullName"
                            type="text"
                            value={userInfo.fullName}
                            disabled
                            className="text-start disabled:opacity-100 disabled:text-black bg-gray-100 border-gray-200 rounded-lg h-12 px-4 cursor-not-allowed"
                            dir="rtl"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-start text-gray-700 font-bold">
                            البريد الالكتروني
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={userInfo.email}
                            disabled
                            className="text-start disabled:opacity-100 disabled:text-black bg-gray-100 border-gray-200 rounded-lg h-12 px-4 cursor-not-allowed"
                            dir="rtl"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-start text-gray-700 font-bold">
                            رقم الهاتف
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={userInfo.phone}
                            disabled
                            className="text-end disabled:opacity-100 disabled:text-black bg-gray-100 border-gray-200 rounded-lg h-12 px-4 cursor-not-allowed"
                            dir="ltr"
                        />
                    </div>

                    {/* National ID */}
                    <div className="space-y-2">
                        <Label htmlFor="nationalId" className="text-start text-gray-700 font-bold">
                            رقم الهوية الوطنية
                        </Label>
                        <Input
                            id="nationalId"
                            type="text"
                            value={userInfo.nationalId}
                            disabled
                            className="text-start disabled:opacity-100 disabled:text-black bg-gray-100 border-gray-200 rounded-lg h-12 px-4 cursor-not-allowed"
                            dir="rtl"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 flex justify-end">
                        <Button
                            onClick={() => { }}
                            variant="outline"
                            className="w-auto px-8 py-3 border-2 border-secondary text-secondary hover:text-white hover:bg-secondary rounded-full font-bold bg-white"
                        >
                            حفظ التعديلات
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}