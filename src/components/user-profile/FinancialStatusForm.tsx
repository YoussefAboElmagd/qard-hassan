import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import SaudiRiyalIcon from '@/assets/images/SaudiRiyalSymbol.svg';
import FileUploadField from './FileUploadField';

// Simple data structure - everything in one place!
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
    return (
        <Card className="w-full bg-gray-50 border-0 shadow-none">
            <CardHeader className='p-0'>
                <CardTitle className="text-right text-primary text-xl font-bold bg-[#D0D5DD52] px-6 py-3 rounded-xl">
                    الحال المالي للمقترض
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="monthlyIncome" className="text-right block text-gray-600 font-bold">
                        الدخل الشهري
                    </Label>
                    <div className="relative">
                        <Input
                            id="monthlyIncome"
                            type="text"
                            placeholder="8000.00"
                            value={data.incomeAmount}
                            onChange={(e) => onChange('incomeAmount', e.target.value)}
                            className="text-right h-12 "
                            dir="rtl"
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="rentAmount" className="text-right block text-gray-600 font-bold">
                        الإيجار السكني (شهرياً)
                    </Label>
                    <div className="relative">
                        <Input
                            id="rentAmount"
                            type="text"
                            placeholder="2500.00"
                            value={data.rentAmount}
                            onChange={(e) => onChange('rentAmount', e.target.value)}
                            className="text-right h-12 "
                            dir="rtl"
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="electricityAvg" className="text-right block text-gray-600 font-bold">
                        تكلفة الكهرباء (شهرياً)
                    </Label>
                    <div className="relative">
                        <Input
                            id="electricityAvg"
                            type="text"
                            placeholder="300.50"
                            value={data.electricityAvg}
                            onChange={(e) => onChange('electricityAvg', e.target.value)}
                            className="text-right h-12 "
                            dir="rtl"
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="hasOtherCommitments"
                            checked={data.hasOtherCommitments}
                            onChange={(e) => onChange('hasOtherCommitments', e.target.checked)}
                            className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
                        />
                        <Label htmlFor="hasOtherCommitments" className="text-gray-700 font-bold cursor-pointer">
                            هل لديك التزامات مالية أخرى؟
                        </Label>
                    </div>
                </div>

                {data.hasOtherCommitments && (
                    <div className="space-y-2">
                        <Label htmlFor="otherCommitmentsDetails" className="text-right block text-gray-600 font-bold">
                            تفاصيل الالتزامات الأخرى
                        </Label>
                        <Input
                            id="otherCommitmentsDetails"
                            type="text"
                            placeholder="اكتب تفاصيل الالتزامات المالية"
                            value={data.otherCommitmentsDetails}
                            onChange={(e) => onChange('otherCommitmentsDetails', e.target.value)}
                            className="text-right h-12"
                            dir="rtl"
                        />
                    </div>
                )}

                <FileUploadField
                    id="incomeProof"
                    label="إرفاق تعريف حديث للراتب للمقترض (موجها لوقف الصدقة الجارية لإلقراض الحسن)"
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
