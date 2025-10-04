import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import FileUploadField from './FileUploadField';

export default function GuarantorInformationForm() {
    const [formData, setFormData] = useState({
        name: '',
        idNumber: '',
        expirationDate: '',
        nationality: 'اختيار',
        address: '',
        city: '',
        mobile: '',
        workTitle: '',
        workMobile: '',
        contactPerson: '',
        contactPersonPhone: '',
        loanAmount: '1000',
        signature: 'رفع ملف'
    });

    const [signatureFile, setSignatureFile] = useState<File | null>(null);
    const [attachments, setAttachments] = useState({
        nationalAddress: null,
        validId: null,
        salaryDefinition: null
    });

    const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSignatureFile(file);
        }
    };

    const handleAttachmentUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAttachments(prev => ({ ...prev, [field]: file }));
        }
    };

    return (
        <Card className="w-full bg-gray-50 border-0 shadow-lg">
            <CardHeader className="pb-4">
                <CardTitle className="text-primary text-xl font-bold bg-[#D0D5DD52] px-6 py-3 rounded-xl">
                    بيانات الكفيل
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="block text-gray-600 font-medium">
                            الاسم
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="محمد أحمد محمد"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-2">
                        <Label htmlFor="mobile" className="block text-gray-600 font-medium">
                            رقم الجوال
                        </Label>
                        <Input
                            id="mobile"
                            type="tel"
                            placeholder="966389010"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>
                                        {/* Nationality */}
                                        <div className="space-y-2">
                        <Label htmlFor="nationality" className="block text-gray-600 font-medium">
                            الجنسية
                        </Label>
                        <div className="relative">
                            <select
                                id="nationality"
                                value={formData.nationality}
                                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 appearance-none cursor-pointer text-gray-600"
                            >
                                <option value="اختيار">اختيار</option>
                                <option value="سعودي">سعودي</option>
                                <option value="مقيم">مقيم</option>
                            </select>
                            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                


                    {/* ID Number */}
                    <div className="space-y-2">
                        <Label htmlFor="idNumber" className="block text-gray-600 font-medium">
                            رقم الهوية
                        </Label>
                        <Input
                            id="idNumber"
                            type="text"
                            placeholder="99765421345"
                            value={formData.idNumber}
                            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>



                    {/* City */}
                    <div className="space-y-2">
                        <Label htmlFor="city" className="block text-gray-600 font-medium">
                            المدينة
                        </Label>
                        <Input
                            id="city"
                            type="text"
                            placeholder="ادخال"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>
                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address" className="block text-gray-600 font-medium">
                            عنوان السكن
                        </Label>
                        <Input
                            id="address"
                            type="text"
                            placeholder="ادخال"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>



    {/* Work Mobile */}
    <div className="space-y-2">
                        <Label htmlFor="workMobile" className="block text-gray-600 font-medium">
                            جوال العمل
                        </Label>
                        <Input
                            id="workMobile"
                            type="tel"
                            placeholder="ادخال"
                            value={formData.workMobile}
                            onChange={(e) => setFormData({ ...formData, workMobile: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Work Title */}
                    <div className="space-y-2">
                        <Label htmlFor="workTitle" className="block text-gray-600 font-medium">
                            عنوان العمل
                        </Label>
                        <Input
                            id="workTitle"
                            type="text"
                            placeholder="ادخال"
                            value={formData.workTitle}
                            onChange={(e) => setFormData({ ...formData, workTitle: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>


                    {/* Contact Person */}
                    <div className="space-y-2">
                        <Label htmlFor="contactPerson" className="block text-gray-600 font-medium">
                            اسم شخص آخر يمكن الاتصال به
                        </Label>
                        <Input
                            id="contactPerson"
                            type="text"
                            placeholder="ادخال"
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Mobile Number (Another) */}
                    <div className="space-y-2">
                        <Label htmlFor="contactMobile" className="block text-gray-600 font-medium">
                            رقم جوال شخص آخر يمكن الاتصال به
                        </Label>
                        <Input
                            id="contactMobile"
                            type="tel"
                            placeholder="966389010"
                            value={formData.contactPersonPhone}
                            onChange={(e) => setFormData({ ...formData, contactPersonPhone: e.target.value })}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Loan Amount */}
                    <div className="space-y-2">
                        <Label htmlFor="loanAmount" className="block text-gray-600 font-medium">
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
                    {/* Expiration Date */}
                    <div className="space-y-2">
                        <Label htmlFor="expirationDate" className="block text-gray-600 font-medium">
                            تاريخ الانتهاء
                        </Label>
                        <div className="relative">
                            <Input
                                id="expirationDate"
                                type="text"
                                placeholder="12-01-2025"
                                value={formData.expirationDate}
                                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                                className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 pr-10"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Signature Upload */}
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
                        {/* Row 1: National Address and Valid ID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FileUploadField
                                id="nationalAddress"
                                label="إرفاق صورة العنوان الوطني"
                                selectedFile={attachments.nationalAddress as unknown as File | null}
                                onChange={(e) => handleAttachmentUpload('nationalAddress', e)}
                            />
                            <FileUploadField
                                id="validId"
                                label="هوية سارية الصلاحية"
                                selectedFile={attachments.validId as unknown as File | null}
                                onChange={(e) => handleAttachmentUpload('validId', e)}
                            />
                        </div>

                        {/* Row 2: Salary Definition (Full Width) */}
                        <div className="grid grid-cols-1">
                            <FileUploadField
                                id="salaryDefinition"
                                label="إرفاق تعريف حديث للراتب للمقترض (موجها لوقف الصدقة الجارية للقرض الحسن)"
                                selectedFile={attachments.salaryDefinition as unknown as File | null}
                                onChange={(e) => handleAttachmentUpload('salaryDefinition', e)}
                            />
                        </div>
                    </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3 pt-4">
                    <input
                        type="checkbox"
                        id="guarantorTerms"
                        className="mt-1 w-4 h-4 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
                    />
                    <Label htmlFor="guarantorTerms" className="text-sm text-gray-600 leading-relaxed">
                    أقر انا الكفيل الغارم بصحة كامل البيانات المكتوبة اعلاه واحتمل كامل المسؤولية في حال ثبوت خلاف ذلك.                    </Label>
                </div>
            </CardContent>
        </Card>
    );
}
