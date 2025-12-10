import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import SaudiRiyalIcon from '@/assets/images/SaudiRiyalSymbol.svg';
import FileUploadField from './FileUploadField';
import { useTranslations, useLocale } from 'next-intl';
interface FinancialData {
    incomeAmount: string;
    rentAmount: string;
    electricityAvg: string;
    hasOtherCommitments: boolean;
    otherCommitmentsDetails: string;
    incomeProofFile: File | null;
}

interface FinancialStatusFormProps {
    data: FinancialData;  // All data in one object
    onChange: (field: keyof FinancialData, value: string | boolean | File | null) => void;  // Single change handler
}

export default function FinancialStatusForm({
    data,
    onChange
}: FinancialStatusFormProps) {
    const t = useTranslations('userProfile.financialStatus');
    const locale = useLocale();
    const isRTL = locale === "ar";
    return (
        <Card className="w-full bg-gray-50 border-0 shadow-none">
            <CardHeader className='p-0'>
                <CardTitle className={`text-primary text-xl font-bold bg-[#D0D5DD52] px-6 py-3 rounded-xl ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('title')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="monthlyIncome" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t('monthlyIncome')}
                    </Label>
                    <div className="relative">
                        <Input
                            id="monthlyIncome"
                            type="text"
                            placeholder="8000.00"
                            value={data.incomeAmount}
                            onChange={(e) => onChange('incomeAmount', e.target.value)}
                            className={`h-12 ${isRTL ? 'text-right' : 'text-left'}`}
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="rentAmount" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t('monthlyRent')}
                    </Label>
                    <div className="relative">
                        <Input
                            id="rentAmount"
                            type="text"
                            placeholder="2500.00"
                            value={data.rentAmount}
                            onChange={(e) => onChange('rentAmount', e.target.value)}
                            className={`h-12 ${isRTL ? 'text-right' : 'text-left'}`}
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="electricityAvg" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t('electricityCost')}
                    </Label>
                    <div className="relative">
                        <Input
                            id="electricityAvg"
                            type="text"
                            placeholder="300.50"
                            value={data.electricityAvg}
                            onChange={(e) => onChange('electricityAvg', e.target.value)}
                            className={`h-12 ${isRTL ? 'text-right' : 'text-left'}`}
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <input
                            type="checkbox"
                            id="hasOtherCommitments"
                            checked={data.hasOtherCommitments}
                            onChange={(e) => onChange('hasOtherCommitments', e.target.checked)}
                            className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 flex-shrink-0"
                        />
                        <Label htmlFor="hasOtherCommitments" className={`text-gray-700 font-bold cursor-pointer flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('hasOtherCommitments')}
                        </Label>
                    </div>
                </div>

                {data.hasOtherCommitments && (
                    <div className="space-y-2">
                        <Label htmlFor="otherCommitmentsDetails" className={`block text-gray-600 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('otherCommitmentsDetails')}
                        </Label>
                        <Input
                            id="otherCommitmentsDetails"
                            type="text"
                            placeholder={t('enterCommitmentDetails')}
                            value={data.otherCommitmentsDetails}
                            onChange={(e) => onChange('otherCommitmentsDetails', e.target.value)}
                            className={`h-12 ${isRTL ? 'text-right' : 'text-left'}`}
                        />
                    </div>
                )}

                <FileUploadField
                    id="incomeProof"
                    label={t('incomeProof')}
                    selectedFile={data.incomeProofFile}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange('incomeProofFile', file || null);
                    }}
                />
            </CardContent>
        </Card>
    );
}
