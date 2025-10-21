"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'
import React, { useState } from 'react'
import { resetPassword } from '@/actions/profile.actions'

interface PasswordFormInterface {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export default function ResetPasswordForm() {
    const [passwordForm, setPasswordForm] = useState<PasswordFormInterface>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Validation
            if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
                alert('يرجى ملء جميع الحقول');
                return;
            }

            if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                alert('كلمة المرور الجديدة غير متطابقة');
                return;
            }

            const passwordData = {
                current_password: passwordForm.currentPassword,
                new_password: passwordForm.newPassword,
                confirm_password: passwordForm.confirmPassword
            };
            
            await resetPassword(passwordData);
            
            // Clear form on success
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            
            alert('تم تغيير كلمة المرور بنجاح');
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('حدث خطأ أثناء تغيير كلمة المرور');
        } finally {
            setIsSaving(false);
        }
    }

    const handleInputChange = (field: keyof PasswordFormInterface, value: string) => {
        setPasswordForm(prev => ({
            ...prev,
            [field]: value
        }));
    }

    return (
        <>
        <div className="bg-white rounded-lg p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 bg-[#D0D5DD52] p-3 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-gray-600" />
                </div>
                <h1 className="text-lg font-semibold text-primary">تغيير كلمة المرور</h1>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="space-y-6 w-full">
                        {/* Skeleton for Current Password */}
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                        </div>

                        {/* Skeleton for New Password */}
                        <div className="space-y-2">
                            <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
                            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                        </div>

                        {/* Skeleton for Confirm Password */}
                        <div className="space-y-2">
                            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
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
                    {/* Current Password */}
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-start text-gray-700 font-bold">
                            كلمة المرور الحالية
                        </Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                            className="text-start bg-white border-gray-200 rounded-lg h-12 px-4"
                            dir="rtl"
                            placeholder="أدخل كلمة المرور الحالية"
                        />
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-start text-gray-700 font-bold">
                            كلمة المرور الجديدة
                        </Label>
                        <Input
                            id="newPassword"
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                            className="text-start bg-white border-gray-200 rounded-lg h-12 px-4"
                            dir="rtl"
                            placeholder="أدخل كلمة المرور الجديدة"
                        />
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-start text-gray-700 font-bold">
                            تأكيد كلمة المرور الجديدة
                        </Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="text-start bg-white border-gray-200 rounded-lg h-12 px-4"
                            dir="rtl"
                            placeholder="أعد إدخال كلمة المرور الجديدة"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            variant="outline"
                            className="w-auto px-8 py-3 border-2 border-secondary text-secondary hover:text-white hover:bg-secondary rounded-full font-bold bg-white disabled:opacity-50"
                        >
                            {isSaving ? 'جارِ الحفظ...' : 'تغيير كلمة المرور'}
                        </Button>
                    </div>
                </div>
            )}
        </div>  
        </>
    )
}