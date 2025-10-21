"use client"
import { getProfileData, editProfileData } from '@/actions/profile.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

interface userInfoInterface {
    fullName: string,
    email: string,
    phone: string,
    nationalId: string,
    idExpiryDate: string
}

export default function PersonalInfoForm() {
    const [userInfo, setUserInfo] = useState<userInfoInterface>({
        fullName: '',
        email: '',
        phone: '',
        nationalId: '',
        idExpiryDate: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const getUserProfileData = async () => {
        try {
            const data = await getProfileData();
            console.log(data);
            setUserInfo({
                fullName: data.profile.name,
                email: data.profile.email,
                phone: data.profile.phone,
                nationalId: data.profile.national_id,
                idExpiryDate: data.profile.id_expiry_date
            });
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const profileData = {
                name: userInfo.fullName,
                email: userInfo.email,
                phone: userInfo.phone,
                national_id: userInfo.nationalId,
                id_expiry_date: userInfo.idExpiryDate
            };
            
            await editProfileData(profileData);
            setIsEditing(false);
            // Optionally show success message
            alert('تم حفظ التعديلات بنجاح');
        } catch (error) {
            console.error('Error saving profile data:', error);
            alert('حدث خطأ أثناء حفظ التعديلات');
        } finally {
            setIsSaving(false);
        }
    }

    const handleInputChange = (field: keyof userInfoInterface, value: string) => {
        setUserInfo(prev => ({
            ...prev,
            [field]: value
        }));
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

                        {/* Skeleton for ID Expiry Date */}
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
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
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            disabled={!isEditing}
                            className={`text-start ${!isEditing ? 'disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed' : 'bg-white'} border-gray-200 rounded-lg h-12 px-4`}
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
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={!isEditing}
                            className={`text-start ${!isEditing ? 'disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed' : 'bg-white'} border-gray-200 rounded-lg h-12 px-4`}
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
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!isEditing}
                            className={`text-end ${!isEditing ? 'disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed' : 'bg-white'} border-gray-200 rounded-lg h-12 px-4`}
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
                            onChange={(e) => handleInputChange('nationalId', e.target.value)}
                            disabled={!isEditing}
                            className={`text-start ${!isEditing ? 'disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed' : 'bg-white'} border-gray-200 rounded-lg h-12 px-4`}
                            dir="rtl"
                        />
                    </div>

                    {/* ID Expiry Date */}
                    <div className="space-y-2">
                        <Label htmlFor="idExpiryDate" className="text-start text-gray-700 font-bold">
                            تاريخ الانتهاء
                        </Label>
                        <Input
                            id="idExpiryDate"
                            type="text"
                            value={userInfo.idExpiryDate}
                            onChange={(e) => handleInputChange('idExpiryDate', e.target.value)}
                            disabled={!isEditing}
                            className={`text-right ${!isEditing ? 'disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed' : 'bg-white'} border-gray-200 rounded-lg h-12 px-4`}
                            dir="rtl"
                            placeholder="YYYY-MM-DD"
                        />
                    </div>

                    {/* Edit/Save Button */}
                    <div className="pt-4 flex justify-end">
                        <Button
                            onClick={() => {
                                if (isEditing) {
                                    handleSave();
                                } else {
                                    setIsEditing(true);
                                }
                            }}
                            disabled={isSaving}
                            variant="outline"
                            className="w-auto px-8 py-3 border-2 border-secondary text-secondary hover:text-white hover:bg-secondary rounded-full font-bold bg-white disabled:opacity-50"
                        >
                            {isSaving ? 'جارِ الحفظ...' : isEditing ? 'حفظ التعديلات' : 'تعديل'}
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}