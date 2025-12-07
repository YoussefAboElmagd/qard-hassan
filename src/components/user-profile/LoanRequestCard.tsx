"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';
import FileUploadField from './FileUploadField';
import FinancialStatusForm from './FinancialStatusForm';
import GuarantorInformationForm from './GuarantorInformationForm';
import { getCountries } from '@/actions/loan.actions';
import { getLoanReasons } from '@/actions/loan.actions';
import { getProfileData } from '@/actions/profile.actions';
import { requestLoan } from '@/actions/loan.actions';
import { Button } from '../ui/button';
import { useTranslations, useLocale } from 'next-intl';

function normalizeToISODate(input: string): string {
    if (!input) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
    const sanitized = input.replaceAll('/', '-').trim();
    const dmyMatch = sanitized.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (dmyMatch) {
        const day = dmyMatch[1].padStart(2, '0');
        const month = dmyMatch[2].padStart(2, '0');
        const year = dmyMatch[3];
        return `${year}-${month}-${day}`;
    }
    const ymdLoose = sanitized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (ymdLoose) {
        const year = ymdLoose[1];
        const month = ymdLoose[2].padStart(2, '0');
        const day = ymdLoose[3].padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return input; 
}

// Borrower Information Component
interface Country {
    id: number;
    name: string;
    code: string;
    image?: string;
}

interface LoanReason {
    id: number;
    name: string;
}

function LoanRequestForm() {
    const t = useTranslations('userProfile.loanRequest');
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [countries, setCountries] = useState<Country[]>([]);
    const [loanReasons, setLoanReasons] = useState<LoanReason[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        nationalId: '',
        idExpiryDate: ''
    });
    const [formData, setFormData] = useState({
        city: '',
        nationality: t('select'),
        address: '',
        workTitle: '',
        workPhone: '',
        contactPerson: '',
        contactPersonPhone: '',
        loanAmount: '1000',
        installmentCount: t('select'),
        purpose: t('select')
    });

    const [financialData, setFinancialData] = useState({
        incomeAmount: '',
        rentAmount: '',
        electricityAvg: '',
        hasOtherCommitments: false,
        otherCommitmentsDetails: "",
        incomeProofFile: null as File | null
    });

    const [guarantorData, setGuarantorData] = useState({
        name: '',
        nationalId: '',
        idExpiryDate: '',
        nationalityId: t('select'),
        phone: '',
        email: '',
        street: '',
        workAddress: '',
        workPhone: '',
        city: '',
        backupName: '',
        backupPhone: '',
        signatureFile: null as File | null,
        nationalAddressFile: null as File | null,
        validIdFile: null as File | null,
        incomeProofFile: null as File | null,
        creditReportFile: null as File | null
    });

    const [signatureFile, setSignatureFile] = useState<File | null>(null);

    const [files, setFiles] = useState({
        nationalIdCopy: null,
        mosqueReceipt: null,
        loanReceipt: null,
        proofStatus: null,
        recentReport: null,
        validityCard: null,
        ibanCertificate: null,
        promissoryNote: null
    });

    // Checkbox validation state
    const [checkboxStates, setCheckboxStates] = useState({
        borrowerTerms1: false,
        borrowerTerms2: false,
        guarantorTerms: false
    });

    const [checkboxWarning, setCheckboxWarning] = useState<string | null>(null);

    const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSignatureFile(file);
        }
    };

    const handleFinancialChange = (field: keyof typeof financialData, value: string | boolean | File | null) => {
        setFinancialData(prev => ({ ...prev, [field]: value }));
    };

    const handleGuarantorChange = (field: keyof typeof guarantorData, value: string | File | null) => {
        setGuarantorData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFiles(prev => ({ ...prev, [field]: file }));
        }
    };

    // Handle checkbox changes
    const handleCheckboxChange = (checkboxName: keyof typeof checkboxStates) => {
        setCheckboxStates(prev => ({ ...prev, [checkboxName]: !prev[checkboxName] }));
        // Clear warning when user starts checking boxes
        if (checkboxWarning) {
            setCheckboxWarning(null);
        }
    };

    const getCountriesList = async () => {
        const res = await getCountries();
        setCountries(res?.countries ?? []);
    };

    const getLoanReasonsList = async () => {
        const res = await getLoanReasons();
        setLoanReasons(res?.loan_reasons ?? []);
    };

    const getUserProfileData = async () => {
        try {
            const data = await getProfileData();
            setUserInfo({
                fullName: data.profile.name ?? '',
                email: data.profile.email ?? '',
                phone: data.profile.phone ?? '',
                nationalId: data.profile.national_id ?? '',
                idExpiryDate: data.profile.id_expiry_date ?? ''
            });
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        getCountriesList();
        getLoanReasonsList();
        getUserProfileData();
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitMessage(null);
        setCheckboxWarning(null);
        
        if (isSubmitting) return;
        
        // Check if all checkboxes are checked
        const allCheckboxesChecked = Object.values(checkboxStates).every(checked => checked);
        if (!allCheckboxesChecked) {
            setCheckboxWarning(t('mustAgreeAllTerms'));
            return;
        }
        
        setIsSubmitting(true);

        try {
            const form = new FormData();

            // Requester info (from profile + local form)
            form.append('requester_name', userInfo.fullName ?? '');
            form.append('requester_national_id', userInfo.nationalId ?? '');
            form.append('requester_id_expiry_date', normalizeToISODate(userInfo.idExpiryDate ?? ''));
            form.append('requester_phone', userInfo.phone ?? '');
            form.append('requester_email', userInfo.email ?? '');

            form.append('requester_nationality_id', formData.nationality === t('select') ? '' : String(formData.nationality));
            form.append('requester_street', formData.address ?? '');
            form.append('requester_work_address', formData.workTitle ?? '');
            form.append('requester_work_phone', formData.workPhone ?? '');
            form.append('requester_city', formData.city ?? '');
            form.append('requester_backup_name', formData.contactPerson ?? '');
            form.append('requester_backup_phone', formData.contactPersonPhone ?? '');

            // Loan meta
            form.append('number_of_installments', formData.installmentCount === t('select') ? '' : String(formData.installmentCount));
            form.append('loan_amount_number', String(formData.loanAmount ?? ''));
            form.append('loan_reason_id', formData.purpose === t('select') ? '' : String(formData.purpose));

            // Financial data
            form.append('income_amount_number', String(financialData.incomeAmount ?? ''));
            form.append('rent_amount_number', String(financialData.rentAmount ?? ''));
            form.append('electricity_avg_number', String(financialData.electricityAvg ?? ''));
            form.append('has_other_commitments', String(financialData.hasOtherCommitments));
            form.append('other_commitments_details', financialData.hasOtherCommitments ? (financialData.otherCommitmentsDetails ?? '') : '');

            // Requester Files - Append files only if they exist, otherwise append empty string
            if (signatureFile) {
                form.append('requester_signature', signatureFile);
            } else {
                form.append('requester_signature', '');
            }
            
            if (files.nationalIdCopy) {
                form.append('requester_national_address_image', files.nationalIdCopy as unknown as File);
            } else {
                form.append('requester_national_address_image', '');
            }
            
            if (files.mosqueReceipt) {
                form.append('requester_imam_recommendation', files.mosqueReceipt as unknown as File);
            } else {
                form.append('requester_imam_recommendation', '');
            }
            
            if (files.proofStatus) {
                form.append('requester_najiz_report', files.proofStatus as unknown as File);
            } else {
                form.append('requester_najiz_report', '');
            }
            
            if (files.recentReport) {
                form.append('requester_credit_report', files.recentReport as unknown as File);
            } else {
                form.append('requester_credit_report', '');
            }
            
            if (files.validityCard) {
                form.append('requester_valid_id', files.validityCard as unknown as File);
            } else {
                form.append('requester_valid_id', '');
            }
            
            if (files.ibanCertificate) {
                form.append('requester_iban_certificate', files.ibanCertificate as unknown as File);
            } else {
                form.append('requester_iban_certificate', '');
            }
            
            if (files.promissoryNote) {
                form.append('requester_promissory_note', files.promissoryNote as unknown as File);
            } else {
                form.append('requester_promissory_note', '');
            }
            
            // Income proof from financialData object
            if (financialData.incomeProofFile) {
                form.append('requester_income_proof', financialData.incomeProofFile);
            } else {
                form.append('requester_income_proof', '');
            }

            // Guarantor info
            form.append('guarantor_name', guarantorData.name ?? '');
            form.append('guarantor_national_id', guarantorData.nationalId ?? '');
            form.append('guarantor_id_expiry_date', normalizeToISODate(guarantorData.idExpiryDate ?? ''));
            form.append('guarantor_nationality_id', guarantorData.nationalityId === t('select') ? '' : String(guarantorData.nationalityId));
            form.append('guarantor_phone', guarantorData.phone ?? '');
            form.append('guarantor_email', guarantorData.email ?? '');
            form.append('guarantor_street', guarantorData.street ?? '');
            form.append('guarantor_work_address', guarantorData.workAddress ?? '');
            form.append('guarantor_work_phone', guarantorData.workPhone ?? '');
            form.append('guarantor_city', guarantorData.city ?? '');
            form.append('guarantor_backup_name', guarantorData.backupName ?? '');
            form.append('guarantor_backup_phone', guarantorData.backupPhone ?? '');

            // Guarantor Files - All from guarantorData object
            if (guarantorData.signatureFile) {
                form.append('guarantor_signature', guarantorData.signatureFile);
            } else {
                form.append('guarantor_signature', '');
            }
            
            if (guarantorData.nationalAddressFile) {
                form.append('guarantor_national_address_image', guarantorData.nationalAddressFile);
            } else {
                form.append('guarantor_national_address_image', '');
            }
            
            if (guarantorData.validIdFile) {
                form.append('guarantor_valid_id', guarantorData.validIdFile);
            } else {
                form.append('guarantor_valid_id', '');
            }
            
            if (guarantorData.incomeProofFile) {
                form.append('guarantor_income_proof', guarantorData.incomeProofFile);
            } else {
                form.append('guarantor_income_proof', '');
            }
            
            if (guarantorData.creditReportFile) {
                form.append('guarantor_credit_report', guarantorData.creditReportFile);
            } else {
                form.append('guarantor_credit_report', '');
            }

            const res = await requestLoan(form);
            setSubmitMessage(res.message ?? (res.success ? t('requestSent') : t('requestFailed')));
        } catch {
            setSubmitMessage(t('errorOccurred'));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full bg-gray-50 border-0 shadow-lg">
            <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-primary text-lg sm:text-xl font-bold bg-[#D0D5DD52] px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
                    {t('borrowerInfo')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-4">
                        <div className="pb-2">
                            <h2 className={`text-[#919499] text-xl font-bold border-b border-gray-200 pb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('personalData')}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="fullName" className={`block text-gray-600 font-bold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('fullName')}
                                </Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    value={userInfo.fullName}
                                    disabled
                                    className="h-10 sm:h-12 rounded-lg border-gray-300 bg-gray-100 text-sm sm:text-base"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className={`block text-gray-600 font-bold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('email')}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={userInfo.email}
                                    disabled
                                    className="h-10 sm:h-12 rounded-lg border-gray-300 bg-gray-100 text-sm sm:text-base"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className={`block text-gray-600 font-bold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('phone')}
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={userInfo.phone}
                                    disabled
                                    className="h-10 sm:h-12 rounded-lg border-gray-300 bg-gray-100 text-sm sm:text-base"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nationalId" className={`block text-gray-600 font-bold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('nationalId')}
                                </Label>
                                <Input
                                    id="nationalId"
                                    type="text"
                                    value={userInfo.nationalId}
                                    disabled
                                    className="h-10 sm:h-12 rounded-lg border-gray-300 bg-gray-100 text-sm sm:text-base"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="idExpiryDate" className={`block text-gray-600 font-bold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('expiryDate')}
                                </Label>
                                <Input
                                    id="idExpiryDate"
                                    type="text"
                                    value={userInfo.idExpiryDate}
                                    disabled
                                    placeholder="YYYY-MM-DD"
                                    className="h-10 sm:h-12 rounded-lg border-gray-300 bg-gray-100 text-sm sm:text-base"
                                />
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <Label htmlFor="city" className={`block text-gray-600 font-bold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('city')}
                                </Label>
                                <Input
                                    id="city"
                                    type="text"
                                    placeholder={t('enter')}
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="h-10 sm:h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 text-sm sm:text-base"
                                />
                            </div>
                            {/* Address */}
                            <div className="space-y-2">
                                <Label htmlFor="address" className={`block text-gray-600 font-bold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('address')}
                                </Label>
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder={t('enter')}
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="h-10 sm:h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 text-sm sm:text-base"
                                />
                            </div>

                            {/* Work Title */}
                            <div className="space-y-2">
                                <Label htmlFor="workTitle" className={`block text-gray-600 font-bold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('workTitle')}
                                </Label>
                                <Input
                                    id="workTitle"
                                    type="text"
                                    placeholder={t('enter')}
                                    value={formData.workTitle}
                                    onChange={(e) => setFormData({ ...formData, workTitle: e.target.value })}
                                    className="h-10 sm:h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 text-sm sm:text-base"
                                />
                            </div>

                            {/* Work Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="workPhone" className={`block text-gray-600 font-bold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('workPhone')}
                                </Label>
                                <Input
                                    id="workPhone"
                                    type="tel"
                                    placeholder={t('enter')}
                                    value={formData.workPhone}
                                    onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
                                    className="h-10 sm:h-12 rounded-lg border-gray-300 bg-white placeholder:text-gray-400 text-sm sm:text-base"
                                />
                            </div>
                            {/* Contact Person */}
                            <div className="space-y-2">
                                <Label htmlFor="contactPerson" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('contactPerson')}
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
                                <Label htmlFor="contactPersonPhone" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('contactPersonPhone')}
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
                            {/* Nationality */}
                            <div className="space-y-2">
                                <Label htmlFor="nationality" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('nationality')}
                                </Label>
                                <div className="relative">
                                    <select
                                        id="nationality"
                                        value={formData.nationality}
                                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                        className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 appearance-none cursor-pointer text-gray-600"
                                    >
                                        <option value={t('select')}>{t('select')}</option>
                                        {countries.map((c: Country) => (
                                            <option key={c.id} value={String(c.id)}>{c.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`} />
                                </div>
                            </div>

                            {/* Installment Count */}
                            <div className="space-y-2">
                                <Label htmlFor="installmentCount" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('installmentCount')}
                                </Label>
                                <div className="relative">
                                    <select
                                        id="installmentCount"
                                        value={formData.installmentCount}
                                        onChange={(e) => setFormData({ ...formData, installmentCount: e.target.value })}
                                        className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 appearance-none cursor-pointer text-gray-600"
                                    >
                                        <option value={t('select')}>{t('select')}</option>
                                        <option value="12">12 {t('month')}</option>
                                        <option value="24">24 {t('month')}</option>
                                        <option value="36">36 {t('month')}</option>
                                    </select>
                                    <ChevronDown className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`} />
                                </div>
                            </div>

                            {/* Loan Amount */}
                            <div className="space-y-2">
                                <Label htmlFor="loanAmount" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('loanAmount')}
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
                                <Label htmlFor="purpose" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('purpose')}
                                </Label>
                                <div className="relative">
                                    <select
                                        id="purpose"
                                        value={formData.purpose}
                                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                        className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 appearance-none cursor-pointer text-gray-600"
                                    >
                                        <option value={t('select')}>{t('select')}</option>
                                        {loanReasons.map((r: LoanReason) => (
                                            <option key={r.id} value={String(r.id)}>{r.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`} />
                                </div>
                            </div>


                        </div>


                    </div>

                    {/* Financial Status Section */}
                  

                    {/* Important Attachments Section */}
                    <div>
                        <div className="pb-4 mt-10">
                            <h2 className={`text-[#919499] text-2xl font-bold border-b border-gray-200 pb-4 mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('importantAttachments')}
                            </h2>
                        </div>
                        <div className="space-y-8 mb-10">
                            {/* Row 1: National ID Copy and Mosque Receipt */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FileUploadField
                                    id="nationalIdCopy"
                                    label={t('nationalAddressImage')}
                                    selectedFile={files.nationalIdCopy as unknown as File | null}
                                    onChange={(e) => handleFileUpload('nationalIdCopy', e)}
                                />
                                <FileUploadField
                                    id="mosqueReceipt"
                                    label={t('mosqueReceipt')}
                                    selectedFile={files.mosqueReceipt as unknown as File | null}
                                    onChange={(e) => handleFileUpload('mosqueReceipt', e)}
                                />
                            </div>

                            {/* Row 3: Proof Status and Recent Report */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FileUploadField
                                    id="recentReport"
                                    label={t('recentReport')}
                                    selectedFile={files.recentReport as unknown as File | null}
                                    onChange={(e) => handleFileUpload('recentReport', e)}
                                />
                                <FileUploadField
                                    id="proofStatus"
                                    label={t('proofStatus')}
                                    selectedFile={files.proofStatus as unknown as File | null}
                                    onChange={(e) => handleFileUpload('proofStatus', e)}
                                />
                            </div>

                            {/* Row 4: Validity Card and IBAN Certificate */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FileUploadField
                                    id="validityCard"
                                    label={t('validId')}
                                    selectedFile={files.validityCard as unknown as File | null}
                                    onChange={(e) => handleFileUpload('validityCard', e)}
                                />
                                <FileUploadField
                                    id="ibanCertificate"
                                    label={t('ibanCertificate')}
                                    selectedFile={files.ibanCertificate as unknown as File | null}
                                    onChange={(e) => handleFileUpload('ibanCertificate', e)}
                                />
                            </div>

                            {/* Row 5: Promissory Note (Full Width) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FileUploadField
                                    id="promissoryNote"
                                    label={t('promissoryNote')}
                                    selectedFile={files.promissoryNote as unknown as File | null}
                                    onChange={(e) => handleFileUpload('promissoryNote', e)}
                                />
                                <FileUploadField
                                    id="signature"
                                    label={t('signature')}
                                    selectedFile={signatureFile}
                                    onChange={handleSignatureUpload}
                                />
                            </div>
                            <div className={`flex items-start gap-3 pt-6 border-t border-gray-200 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <input
                            type="checkbox"
                            id="borrowerTerms1"
                            checked={checkboxStates.borrowerTerms1}
                            onChange={() => handleCheckboxChange('borrowerTerms1')}
                            className="mt-1 w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2 flex-shrink-0"
                        />
                        <Label htmlFor="borrowerTerms1" className={`text-sm text-gray-700 leading-relaxed cursor-pointer flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('borrowerTerms1')}
                        </Label>
                    </div>
                    <div className={`flex items-start gap-3 border-gray-200 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <input
                            type="checkbox"
                            id="borrowerTerms2"
                            checked={checkboxStates.borrowerTerms2}
                            onChange={() => handleCheckboxChange('borrowerTerms2')}
                            className="mt-1 w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2 flex-shrink-0"
                        />
                        <Label htmlFor="borrowerTerms2" className={`text-sm text-gray-700 leading-relaxed cursor-pointer flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('borrowerTerms2')}
                        </Label>
                    </div>
                        </div>
                    </div>
 
                    <div className="mt-8">
                        {/* Much simpler! Just pass the data and one change handler */}
                        <FinancialStatusForm
                            data={financialData}
                            onChange={handleFinancialChange}
                        />
                    </div>

                    <div className="mt-8">
                        {/* Much simpler! Just pass the data, one change handler, and countries list */}
                        <GuarantorInformationForm
                            data={guarantorData}
                            onChange={handleGuarantorChange}
                            countries={countries}
                            guarantorTermsChecked={checkboxStates.guarantorTerms}
                            onGuarantorTermsChange={() => handleCheckboxChange('guarantorTerms')}
                        />
                    </div>

                    {/* Messages */}
                    {checkboxWarning && (
                        <div className="p-4 rounded-lg  border-orange-500 bg-orange-50 text-orange-800 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">{checkboxWarning}</span>
                            </div>
                        </div>
                    )}
                    
                    {submitMessage && (
                        <div className={`p-4 rounded-lg text-center ${submitMessage.includes(t('requestSent')) || submitMessage.includes('تم') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {submitMessage}
                        </div>
                    )}

                    <Button
                        variant="outline"
                        className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-12 py-3 rounded-full font-semibold text-lg transition-colors"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? t('submitting') : t('submitRequest')}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default LoanRequestForm;

