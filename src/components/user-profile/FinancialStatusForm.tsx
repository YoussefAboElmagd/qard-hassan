import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import SaudiRiyalIcon from '@/assets/images/SaudiRiyalSymbol.svg';
import FileUploadField from './FileUploadField';

export default function FinancialStatusForm() {
    const [financialStatusFile, setFinancialStatusFile] = useState<File | null>(null);

    const handleFinancialStatusUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFinancialStatusFile(file);
        }
    };
    return (
        <Card className="w-full bg-gray-50">
            <CardHeader>
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
                            placeholder=""
                            className="text-right h-12 pr-12"
                            dir="rtl"
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="basicSalary" className="text-right block text-gray-600 font-bold">
                        الإيجار السكني (شهرياً)
                    </Label>
                    <div className="relative">
                        <Input
                            id="basicSalary"
                            type="text"
                            placeholder=""
                            className="text-right h-12 pr-12"
                            dir="rtl"
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="retirementAllowance" className="text-right block text-gray-600 font-bold">
                        تكلفة الكهرباء (شهرياً)
                    </Label>
                    <div className="relative">
                        <Input
                            id="retirementAllowance"
                            type="text"
                            placeholder=""
                            className="text-right h-12 pr-12"
                            dir="rtl"
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="otherIncome" className="text-right block text-gray-600 font-bold">
                        مصاريف اخرى
                    </Label>
                    <div className="relative">
                        <Input
                            id="otherIncome"
                            type="text"
                            placeholder=""
                            className="text-right h-12 pr-12"
                            dir="rtl"
                        />
                        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            <SaudiRiyalIcon className="fill-primary inline-block w-4 h-4" />
                        </span>
                    </div>
                </div>


                <FileUploadField
                    id="financialStatus"
                    label="إرفاق تعريف حديث للراتب للمقترض (موجها لوقف الصدقة الجارية لإلقراض الحسن)"
                    selectedFile={financialStatusFile}
                    onChange={handleFinancialStatusUpload}
                />
            </CardContent>
        </Card>
    );
}
