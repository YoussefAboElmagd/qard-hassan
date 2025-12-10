import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import FileUploadField from './FileUploadField';
import { useTranslations, useLocale } from 'next-intl';

interface Country {
    id: number;
    name: string;
    code: string;
    image?: string;
}

interface GuarantorData {
    name: string;
    nationalId: string;
    idExpiryDate: string;
    nationalityId: string;
    phone: string;
    email: string;
    street: string;
    workAddress: string;
    workPhone: string;
    city: string;
    backupName: string;
    backupPhone: string;
    signatureFile: File | null;
    nationalAddressFile: File | null;
    validIdFile: File | null;
    incomeProofFile: File | null;
    creditReportFile: File | null;
}

interface GuarantorInformationFormProps {
    data: GuarantorData;  // All data in one object
    onChange: (field: keyof GuarantorData, value: string | File | null) => void;  // Single change handler
    countries: Country[];
    guarantorTermsChecked: boolean;
    onGuarantorTermsChange: () => void;
}

export default function GuarantorInformationForm({
    data,
    onChange,
    countries,
    guarantorTermsChecked,
    onGuarantorTermsChange
}: GuarantorInformationFormProps) {
    const t = useTranslations('userProfile.guarantorInfo');
    const tLoan = useTranslations('userProfile.loanRequest');
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <Card className="w-full bg-gray-50 border-0 shadow-none">
            <CardHeader className="p-0">
                <CardTitle className={`text-primary text-xl font-bold bg-[#D0D5DD52] px-6 py-3 rounded-xl ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('title')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorName" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('name')}
                        </Label>
                        <Input
                            id="guarantorName"
                            type="text"
                            placeholder="محمد أحمد محمد"
                            value={data.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorPhone" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('phone')}
                        </Label>
                        <Input
                            id="guarantorPhone"
                            type="tel"
                            placeholder="+966509876543"
                            value={data.phone}
                            onChange={(e) => onChange('phone', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorEmail" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('email')}
                        </Label>
                        <Input
                            id="guarantorEmail"
                            type="email"
                            placeholder="mohammed@example.com"
                            value={data.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Nationality */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorNationality" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('nationality')}
                        </Label>
                        <div className="relative">
                            <select
                                id="guarantorNationality"
                                value={data.nationalityId}
                                onChange={(e) => onChange('nationalityId', e.target.value)}
                                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 appearance-none cursor-pointer text-gray-600"
                            >
                                <option value={tLoan('select')}>{tLoan('select')}</option>
                                {countries.map((c: Country) => (
                                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                                ))}
                            </select>
                            <ChevronDown className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`} />
                        </div>
                    </div>

                


                    {/* ID Number */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorIdNumber" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('idNumber')}
                        </Label>
                        <Input
                            id="guarantorIdNumber"
                            type="text"
                            placeholder="9876543210987"
                            value={data.nationalId}
                            onChange={(e) => onChange('nationalId', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Expiration Date */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorExpirationDate" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('expiryDate')}
                        </Label>
                        <div className="relative">
                            <Input
                                id="guarantorExpirationDate"
                                type="date"
                                placeholder="2029-06-15"
                                value={data.idExpiryDate}
                                onChange={(e) => onChange('idExpiryDate', e.target.value)}
                                className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 pr-10"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorCity" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('city')}
                        </Label>
                        <Input
                            id="guarantorCity"
                            type="text"
                            placeholder="الرياض"
                            value={data.city}
                            onChange={(e) => onChange('city', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>
                    
                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorAddress" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('address')}
                        </Label>
                        <Input
                            id="guarantorAddress"
                            type="text"
                            placeholder="شارع العليا، حي السفارات"
                            value={data.street}
                            onChange={(e) => onChange('street', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>



                    {/* Work Mobile */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorWorkMobile" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('workPhone')}
                        </Label>
                        <Input
                            id="guarantorWorkMobile"
                            type="tel"
                            placeholder="+966118765432"
                            value={data.workPhone}
                            onChange={(e) => onChange('workPhone', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Work Title */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorWorkTitle" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('workTitle')}
                        </Label>
                        <Input
                            id="guarantorWorkTitle"
                            type="text"
                            placeholder="وزارة التعليم"
                            value={data.workAddress}
                            onChange={(e) => onChange('workAddress', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Contact Person */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorContactPerson" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('contactPerson')}
                        </Label>
                        <Input
                            id="guarantorContactPerson"
                            type="text"
                            placeholder="فاطمة محمد السعيد"
                            value={data.backupName}
                            onChange={(e) => onChange('backupName', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Mobile Number (Another) */}
                    <div className="space-y-2">
                        <Label htmlFor="guarantorContactMobile" className={`block text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('contactPersonPhone')}
                        </Label>
                        <Input
                            id="guarantorContactMobile"
                            type="tel"
                            placeholder="+966506666666"
                            value={data.backupPhone}
                            onChange={(e) => onChange('backupPhone', e.target.value)}
                            className="h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                    </div>

                    {/* Signature Upload */}
                    <FileUploadField
                        id="guarantorSignature"
                        label={t('signature')}
                        selectedFile={data.signatureFile}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange('signatureFile', file || null);
                        }}
                    />
                </div>

                {/* Important Attachments Section */}
                <div>
                    <div className="pb-4 mt-10">
                        <h2 className="text-[#919499] text-2xl font-bold text-right border-b border-gray-200 pb-4 mb-10">
                            {t('importantAttachments')}
                        </h2>
                    </div>
                    <div className="space-y-8 mb-10">
                        {/* Row 1: National Address and Valid ID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FileUploadField
                                id="guarantorNationalAddress"
                                label={t('nationalAddressImage')}
                                selectedFile={data.nationalAddressFile}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange('nationalAddressFile', file || null);
                                }}
                            />
                            <FileUploadField
                                id="guarantorValidId"
                                label={t('validId')}
                                selectedFile={data.validIdFile}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange('validIdFile', file || null);
                                }}
                            />
                        </div>

                        {/* Row 2: Income Proof and Credit Report */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FileUploadField
                                id="guarantorIncomeProof"
                                label={t('incomeProof')}
                                selectedFile={data.incomeProofFile}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange('incomeProofFile', file || null);
                                }}
                            />
                            <FileUploadField
                                id="guarantorCreditReport"
                                label={t('creditReport')}
                                selectedFile={data.creditReportFile}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange('creditReportFile', file || null);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Checkbox */}
                <div className={`flex items-start gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <input
                        type="checkbox"
                        id="guarantorTerms"
                        checked={guarantorTermsChecked}
                        onChange={onGuarantorTermsChange}
                        className="mt-1 w-4 h-4 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2 flex-shrink-0"
                    />
                    <Label htmlFor="guarantorTerms" className={`text-sm text-gray-600 leading-relaxed cursor-pointer flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t('guarantorTerms')}
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
}
