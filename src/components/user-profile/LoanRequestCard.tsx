"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';
import FileUploadField from './FileUploadField';

// Borrower Information Component
function LoanRequestForm() {
    const [formData, setFormData] = useState({
        city: '',
        nationality: 'اختيار',
        address: '',
        workTitle: '',
        workPhone: '',
        contactPerson: '',
        contactPersonPhone: '',
        loanAmount: '1000',
        installmentCount: 'اختيار',
        purpose: 'اختيار'
    });

    const [signatureFile, setSignatureFile] = useState<File | null>(null);
    const [files, setFiles] = useState({
        nationalIdCopy: null,
        mosqueReceipt: null,
        loanReceipt: null,
        proofStatus: null,
        recentReport: null,
        validityCard: null
    });

    const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSignatureFile(file);
        }
    };

    const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFiles(prev => ({ ...prev, [field]: file }));
        }
    };

    return (
        <Card className="w-full bg-gray-50 border-0 shadow-lg">
            <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-primary text-lg sm:text-xl font-bold bg-[#D0D5DD52] px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
                    بيانات المقترض
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Nationality */}
                    <div className="space-y-2">
                        <Label htmlFor="nationality" className="block text-gray-600 font-bold text-sm sm:text-base">
                            الجنسية
                        </Label>
                        <div className="relative">
                            <select
                                id="nationality"
                                value={formData.nationality}
                                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                className="h-10 sm:h-12 w-full rounded-lg border border-gray-300 bg-white px-3 appearance-none cursor-pointer text-gray-600 text-sm sm:text-base"
                            >
                                <option value="اختيار">اختيار</option>
                                <option value="سعودي">سعودي</option>
                                <option value="مقيم">مقيم</option>
                            </select>
                            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    {/* City */}
                    <div className="space-y-2">
                        <Label htmlFor="city" className="block text-gray-600 font-bold text-sm sm:text-base">
                            المدينة
                        </Label>
                        <Input
                            id="city"
                            type="text"
                            placeholder="ادخال"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="h-10 sm:h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 text-sm sm:text-base"
                        />
                    </div>
                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address" className="block text-gray-600 font-bold text-sm sm:text-base">
                            عنوان السكن
                        </Label>
                        <Input
                            id="address"
                            type="text"
                            placeholder="ادخال"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="h-10 sm:h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 text-sm sm:text-base"
                        />
                    </div>

                    {/* Work Title */}
                    <div className="space-y-2">
                        <Label htmlFor="workTitle" className="block text-gray-600 font-bold text-sm sm:text-base">
                            عنوان العمل
                        </Label>
                        <Input
                            id="workTitle"
                            type="text"
                            placeholder="ادخال"
                            value={formData.workTitle}
                            onChange={(e) => setFormData({ ...formData, workTitle: e.target.value })}
                            className="h-10 sm:h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 text-sm sm:text-base"
                        />
                    </div>

                    {/* Work Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="workPhone" className="block text-gray-600 font-bold text-sm sm:text-base">
                            جوال العمل
                        </Label>
                        <Input
                            id="workPhone"
                            type="tel"
                            placeholder="ادخال"
                            value={formData.workPhone}
                            onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
                            className="h-10 sm:h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 text-sm sm:text-base"
                        />
                    </div>

                    {/* Mobile Number (from image - has a pre-filled number) */}
                    <div className="space-y-2">
                        <Label htmlFor="mobile" className="block text-gray-600 font-bold">
                            رقم الجوال
                        </Label>
                        <Input
                            id="mobile"
                            type="tel"
                            defaultValue="966389010"
                            className="h-12 rounded-lg border-gray-300 bg-white"
                        />
                    </div>

                    {/* Contact Person */}
                    <div className="space-y-2">
                        <Label htmlFor="contactPerson" className="block text-gray-600 font-bold">
                            اسم شخص آخر يمكن الاتصال به
                        </Label>
                        <Input
                            id="contactPerson"
                            type="text"
                            placeholder="محمد أحمد محمد"
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Contact Person Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="contactPersonPhone" className="block text-gray-600 font-bold">
                            رقم جوال شخص آخر
                        </Label>
                        <Input
                            id="contactPersonPhone"
                            type="tel"
                            placeholder="966389010"
                            value={formData.contactPersonPhone}
                            onChange={(e) => setFormData({ ...formData, contactPersonPhone: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Installment Count */}
                    <div className="space-y-2">
                        <Label htmlFor="installmentCount" className="block text-gray-600 font-bold">
                            عدد الأقساط
                        </Label>
                        <div className="relative">
                            <select
                                id="installmentCount"
                                value={formData.installmentCount}
                                onChange={(e) => setFormData({ ...formData, installmentCount: e.target.value })}
                                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 appearance-none cursor-pointer text-gray-600"
                            >
                                <option value="اختيار">اختيار</option>
                                <option value="12">12 شهر</option>
                                <option value="24">24 شهر</option>
                                <option value="36">36 شهر</option>
                            </select>
                            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Loan Amount */}
                    <div className="space-y-2">
                        <Label htmlFor="loanAmount" className="block text-gray-600 font-bold">
                            مبلغ القرض
                        </Label>
                        <Input
                            id="loanAmount"
                            type="text"
                            value={formData.loanAmount}
                            onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white"
                        />
                    </div>

                    {/* Purpose */}
                    <div className="space-y-2">
                        <Label htmlFor="purpose" className="block text-gray-600 font-bold">
                            الغرض
                        </Label>
                        <div className="relative">
                            <select
                                id="purpose"
                                value={formData.purpose}
                                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 appearance-none cursor-pointer text-gray-600"
                            >
                                <option value="اختيار">اختيار</option>
                                <option value="شخصي">شخصي</option>
                                <option value="تجاري">تجاري</option>
                                <option value="عقاري">عقاري</option>
                            </select>
                            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Signature Upload */}
                    {/* <div className="space-y-2">
                        <Label className="block text-gray-600 font-bold">
                            التوقيع
                        </Label>
                        <div className="relative">
                            <input
                                type="file"
                                id="signature"
                                accept="image/*,.pdf"
                                onChange={handleSignatureUpload}
                                className="hidden"
                            />
                            <label
                                htmlFor="signature"
                                className="w-full h-12 border border-gray-300 rounded-lg bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <SlCloudUpload className="w-5 h-5 text-green-500" />
                                <span className="text-gray-600">
                                    {signatureFile ? signatureFile.name : 'رفع ملف'}
                                </span>
                            </label>
                        </div>
                    </div> */}
                    <FileUploadField
                        id="signature"
                        label="التوقيع"
                        selectedFile={signatureFile}
                        onChange={handleSignatureUpload}
                    />
                </div>

                {/* Important Attachments Section */}
                <div>
                    <div className="pb-4 mt-10">
                        <h2 className="text-[#919499] text-2xl font-bold text-right border-b border-gray-200 pb-4 mb-10">
                            مرفقات هامة
                        </h2>
                    </div>
                    <div className="space-y-8 mb-10">
                        {/* Row 1: National ID Copy and Mosque Receipt */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FileUploadField
                                id="nationalIdCopy"
                                label="إرفاق صورة العنوان الوطني"
                                selectedFile={files.nationalIdCopy as unknown as File | null}
                                onChange={(e) => handleFileUpload('nationalIdCopy', e)}
                            />
                            <FileUploadField
                                id="mosqueReceipt"
                                label="إرفاق ترخيص إمام المسجد للمقترض (خاص بالرجال)"
                                selectedFile={files.mosqueReceipt as unknown as File | null}
                                onChange={(e) => handleFileUpload('mosqueReceipt', e)}
                            />
                        </div>

                        {/* Row 3: Proof Status and Recent Report */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FileUploadField
                                id="recentReport"
                                label="و تقرير من (سمه) تقرير ملم حديث التاريخ"
                                selectedFile={files.recentReport as unknown as File | null}
                                onChange={(e) => handleFileUpload('recentReport', e)}
                            />
                            <FileUploadField
                                id="proofStatus"
                                label="اثبات حالة"
                                selectedFile={files.proofStatus as unknown as File | null}
                                onChange={(e) => handleFileUpload('proofStatus', e)}
                            />
                        </div>

                        {/* Row 4: Validity Card (Full Width) */}
                        <div className="grid grid-cols-1">
                            <FileUploadField
                                id="validityCard"
                                label="هوية سارية الصلاحية"
                                selectedFile={files.validityCard as unknown as File | null}
                                onChange={(e) => handleFileUpload('validityCard', e)}
                            />
                        </div>
                    </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3 pt-6 border-t border-gray-200">
                    <input
                        type="checkbox"
                        id="borrowerTerms"
                        className="mt-1 w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
                    />
                    <Label htmlFor="borrowerTerms" className="text-sm text-gray-700 leading-relaxed text-right">
                        أقر انا المقترض بصحة كامل البيانات المكتوبة اعلاه واحتمل كامل المسؤولية في حال ثبوت خلاف ذلك.
                    </Label>
                </div>
                <div className="flex items-start gap-3 border-gray-200">
                    <input
                        type="checkbox"
                        id="borrowerTerms"
                        className="mt-1 w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
                    />
                    <Label htmlFor="borrowerTerms" className="text-sm text-gray-700 leading-relaxed text-right">
                        اوافق علي شروط الاقتراض
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
}

export default LoanRequestForm;

