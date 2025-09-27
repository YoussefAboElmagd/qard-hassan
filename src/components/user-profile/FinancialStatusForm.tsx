import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import SaudiRiyalIcon from '@/assets/images/SaudiRiyalSymbol.svg';

export default function FinancialStatusForm() {
    return (
        <Card className="w-full bg-gray-50">
            <CardHeader>
                <CardTitle className="text-right text-primary text-xl font-bold bg-[#D0D5DD52] px-6 py-3 rounded-xl">
                    الحال المالي للمقترض
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Monthly Income */}
                <div className="space-y-2">
                    <Label htmlFor="monthlyIncome" className="text-right block text-gray-600 font-medium">
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

                {/* Monthly Basic Salary */}
                <div className="space-y-2">
                    <Label htmlFor="basicSalary" className="text-right block text-gray-600 font-medium">
                        قيمة الراتب الأساسي (شهرياً)
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

                {/* Retirement Allowance */}
                <div className="space-y-2">
                    <Label htmlFor="retirementAllowance" className="text-right block text-gray-600 font-medium">
                        بدلية التقاعد (شهرياً)
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

                {/* Other Income */}
                <div className="space-y-2">
                    <Label htmlFor="otherIncome" className="text-right block text-gray-600 font-medium">
                        دخل آخر
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
            </CardContent>
        </Card>
    );
}
