"use client"
import { getProfileData, editProfileData } from '@/actions/profile.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'

interface userInfoInterface {
    fullName: string,
    email: string,
    phone: string,
    nationalId: string,
    idExpiryDate: string
}

export default function PersonalInfoForm() {
    const { refreshUser } = useUser();
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
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const getUserProfileData = async () => {
        try {
            const data = await getProfileData();
            console.log(data);

            if (!data.success) {
                setModalMessage(data.message || "حدث خطأ أثناء تحميل البيانات");
                setIsError(true);
                setShowModal(true);
                return;
            }

            setUserInfo({
                fullName: data.profile.name,
                email: data.profile.email,
                phone: data.profile.phone,
                nationalId: data.profile.national_id,
                idExpiryDate: data.profile.id_expiry_date
            });
        } catch (error) {
            console.error('Error fetching profile data:', error);
            const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع";
            setModalMessage(errorMessage);
            setIsError(true);
            setShowModal(true);
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

            const response = await editProfileData(profileData);

            if (response.success) {
                setModalMessage(response.message || "تم حفظ التعديلات بنجاح!");
                setIsError(false);
                setShowModal(true);
                setIsEditing(false);

                // Refresh user data in context to update navbar and sidebar
                await refreshUser();
            } else {
                setModalMessage(response.message || "حدث خطأ أثناء حفظ البيانات");
                setIsError(true);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error saving profile data:', error);
            const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع";
            setModalMessage(errorMessage);
            setIsError(true);
            setShowModal(true);
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
                    {/* ID Expiry Date */}
                    <div className="space-y-2">
                        <Label htmlFor="idExpiryDate" className="text-start text-gray-700 font-bold">
                            تاريخ الانتهاء
                        </Label>
                        <Input
                            id="idExpiryDate"
                            type="date"
                            value={userInfo.idExpiryDate}
                            onChange={(e) => handleInputChange('idExpiryDate', e.target.value)}
                            disabled={!isEditing}
                            min={new Date().toISOString().split('T')[0]}
                            className={`text-start ${!isEditing ? 'disabled:opacity-100 disabled:text-black bg-gray-100 cursor-not-allowed' : 'bg-white'} border-gray-200 rounded-lg h-12 px-4`}
                            dir="rtl"
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

            {/* Success/Error Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
                        <div className="text-center">
                            {/* Icon */}
                            <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${isError ? 'bg-red-100' : 'bg-green-100'}`}>
                                {isError ? (
                                    <Icon icon="mdi:alert-circle" className="text-red-600" />
                                ) : (
                                    <Icon icon="mdi:check-circle" className="text-green-600" />
                                )}
                            </div>
                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                                {isError ? 'حدث خطأ!' : 'تم الحفظ بنجاح!'}
                            </h3>

                            {/* Message */}
                            <p className="text-gray-600 mb-6 text-sm sm:text-base">
                                {modalMessage}
                            </p>
                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className={`w-full font-bold py-3 px-6 rounded-lg transition-colors ${isError
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-secondary hover:bg-secondary/90 text-white'
                                    }`}
                            >
                                حسناً
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}